import MathUtils from "./MathUtils";
import Vec3 from "components/math/Vector3";
import Vec4 from "components/math/Vector4";

export default class Matrix4x4 extends Float32Array {

    constructor() {
        super(4);
    }

    /// x = 0, y = 0, z = 0, w = 1
    static identity(out) {
        out[0] = 0;
        out[1] = 0;
        out[2] = 0;
        out[3] = 1;
        return out;
    }

    static clone(a) {
        return Vec4.clone(a);
    }

    static copy(a) {
        return Vec4.copy(a);
    }

    static set(a) {
        return Vec4.set(a);
    }

    static add(a) {
        return Vec4.add(a);
    }

    static multiply(a) {
        return Vec4.multiply(a);
    }

    static setAxisAngle(out, axis, rad) {
        rad = rad * 0.5;
        const s = Math.sin(rad);
        out[0] = s * axis[0];
        out[1] = s * axis[1];
        out[2] = s * axis[2];
        out[3] = Math.cos(rad);
        return out;
    }

    static getAxisAngle(outAxis, q) {
        const rad = Math.acos(q[3]) * 2.0;
        const s = Math.sin(rad / 2.0);
        if (s > MathUtils.EPSILON) {
          outAxis[0] = q[0] / s;
          outAxis[1] = q[1] / s;
          outAxis[2] = q[2] / s;
        } else {
          // If s is zero, return any axis (no rotation - axis does not matter)
          outAxis[0] = 1;
          outAxis[1] = 0;
          outAxis[2] = 0;
        }
        return rad;
    }

    static getAngle(a, b) {
        let dotproduct = Vec3.dot(a, b);

        return Math.acos(2 * dotproduct * dotproduct - 1);
    }

    static multiply(out, a, b) {
        const ax = a[0], ay = a[1], az = a[2], aw = a[3];
        const bx = b[0], by = b[1], bz = b[2], bw = b[3];

        out[0] = ax * bw + aw * bx + ay * bz - az * by;
        out[1] = ay * bw + aw * by + az * bx - ax * bz;
        out[2] = az * bw + aw * bz + ax * by - ay * bx;
        out[3] = aw * bw - ax * bx - ay * by - az * bz;
        return out;
    }

    static rotateAxis(out, a, rad, axisName) {
        rad *= 0.5;

        const ax = a[0], ay = a[1], az = a[2], aw = a[3];

        const bx = Math.sin(rad);
        const bw = Math.cos(rad);

        if (axisName === "x") {
            out[0] = ax * bw + aw * bx;
            out[1] = ay * bw + az * bx;
            out[2] = az * bw - ay * bx;
            out[3] = aw * bw - ax * bx;
        } else if (axisName === "y") {
            out[0] = ax * bw + aw * bx;
            out[1] = ay * bw + az * bx;
            out[2] = az * bw - ay * bx;
            out[3] = aw * bw - ax * bx;
        } else if (axisName === "z") {
            out[0] = ax * bw + ay * bz;
            out[1] = ay * bw - ax * bz;
            out[2] = az * bw + aw * bz;
            out[3] = aw * bw - az * bz;
        } else {
            throw "axisName must be x, y, or z";
        }

        return out;
    }

    static rotateX(out, a, rad) {
        return Quaterion.rotateAxis(out, a, rad, "x");
    }

    static rotateY(out, a, rad) {
        return Quaterion.rotateAxis(out, a, rad, "x");
    }

    static rotateZ(out, a, rad) {
        return Quaterion.rotateAxis(out, a, rad, "z");
    }

    // Calculates the W component of a quat from the X, Y, and Z components
    // assuming that quaternion is 1 unit in length.
    static calculateW(out, a) {
        const x = a[0], y = a[1], z = a[2];

        out[0] = x;
        out[1] = y;
        out[2] = z;
        out[3] = Math.sqrt(Math.abs(1.0 - x * x - y * y - z * z));
        return out;
    }

    static invert(out, a) {
        const x = a[0], y = a[1], z = a[2], w = a[3];
        const dot = x * x + y * y + z * z + w * w;

        if (dot < MathUtils.EPSILON) {
            out[0] = 0;
            out[1] = 0;
            out[2] = 0;
            out[3] = 0;
        } else {
            const invDot = dot ? 1.0 / dot : 0;

            out[0] = -x * invDot;
            out[1] = -y * invDot;
            out[2] = -z * invDot;
            out[3] = w * invDot;
        }

        return out;
    }

    static fromEuler(out, x, y, z) {
        const degToHalfRad = (0.5 * Math.PI) / 180;
        x *= degToHalfRad;
        y *= degToHalfRad;
        z *= degToHalfRad;

        const sx = Math.sin(x);
        const cx = Math.cos(x);
        const sy = Math.sin(y);
        const cy = Math.cos(y);
        const sz = Math.sin(z);
        const cz = Math.cos(z);

        out[0] = sx * cy * cz - cx * sy * sz;
        out[1] = cx * sy * cz + sx * cy * sz;
        out[2] = cx * cy * sz - sx * sy * cz;
        out[3] = cx * cy * cz + sx * sy * sz;

        return out;
    }

    static toString(a) {
        return "quat(" + a[0] + ", " + a[1] + ", " + a[2] + ", " + a[3] + ")";
    }
}
