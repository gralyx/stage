import MathUtils from "./MathUtils";

export default class Matrix2x2 extends Float32Array {

    constructor() {
        super(4);
    }

    static identity() {
        const mat4 = new Matrix2x2();
        for (let i = 0; i < mat4.length; i+=3) {
            mat4[i] = 1;
        }
        return mat4;
    }

    static clone(a) {
        const out = new Matrix2x2();
        out[0] = a[0];
        out[1] = a[1];
        out[2] = a[2];
        out[3] = a[3];
        return out;
    }
    clone() { return Matrix2x2.clone(this); }

    static copy(out, a) {
        out[0] = a[0];
        out[1] = a[1];
        out[2] = a[2];
        out[3] = a[3];
        return out;
    }
    copy(...args) { return Matrix2x2.copy(this, ...args); }

    static rotate(out, a, rad) {
        const x0 = a[0], x1 = a[1],
              y0 = a[2], y1 = a[3];
        const s = Math.sin(rad);
        const c = Math.cos(rad);
        out[0] = x0 *  c + y0 * s; out[1] = x1 *  c + y1 * s;
        out[2] = x0 * -s + y0 * c; out[3] = x1 * -s + y1 * c;
        return out;
    }
    transpose(...args) { return Matrix2x2.transpose(this, this, ...args); }

    static identity(out) {
        out[0] = 1; out[1] = 0;
        out[2] = 0; out[3] = 1;
        return out;
    }
    identity() { return Matrix2x2.identity(this); }

    static set(out, m00, m01, m10, m11) {
        out[0] = m00;
        out[1] = m01;
        out[2] = m10;
        out[3] = m11;
        return out;
    }
    set(...args) { return Matrix2x2.set(this, ...args); }

    static transpose(out, a) {
        if (out === a) {
          const a1 = a[1];
          out[1] = a[2];
          out[2] = a1;
        } else {
          out[0] = a[0];
          out[1] = a[2];
          out[2] = a[1];
          out[3] = a[3];
        }

        return out;
    }
    transpose() { return Matrix2x2.transpose(this); }

    static invert(out, a) {
        const x = a[0], y = a[1], z = a[2], w = a[3];

        const det = x * w - z * y;

        if (!det) {
          return null;
        }

        det = 1.0 / det;

        out[0] =  w * det;
        out[1] = -y * det;
        out[2] = -z * det;
        out[3] =  x * det;

        return out;
    }
    invert(...args) { return Matrix2x2.invert(this, ...args); }

    static determinant(a) {
        return a[0] * a[3] - a[2] * a[1];
    }
    determinant() { return Matrix2x2.determinant(this); }

    static multiply(out, a, b) {
        const x0 = a[0], ay = a[1], az = a[2], aw = a[3];
        const bx = b[0], by = b[1], bz = b[2], bw = b[3];
        out[0] = ax * bx + az * by;
        out[1] = ay * bx + aw * by;
        out[2] = ax * bz + az * bw;
        out[3] = ay * bz + aw * bw;
        return out;
    }
    static mul(...args) {return Matrix2x2.multiply(...args); }
    multiply(...args) { return Matrix2x2.multiply(this, this, ...args); }
    mul(...args) { return Matrix2x2.multiply(this, this, ...args); }

    static rotate(out, a, rad) {
        const x = a[0], y = a[1], z = a[2], w = a[3];
        const s = Math.sin(rad);
        const c = Math.cos(rad);
        out[0] = x *  c + z * s;
        out[1] = y *  c + w * s;
        out[2] = x * -s + z * c;
        out[3] = y * -s + w * c;
        return out;
    }
    rotate(...args) { return Matrix2x2.rotate(this, this, ...args); }

    static scale(out, a, v) {
        const x0 = a[0], x1 = a[1], y0 = a[2], y1 = a[3];
        const vx = v[0], vy = v[1];
        out[0] = x0 * vx;
        out[1] = x1 * vx;
        out[2] = y0 * vy;
        out[3] = y1 * vy;
        return out;
    }
    scale(...args) { return Matrix2x2.scale(this, this, ...args); }

    static fromRotation(out, rad) {
        const s = Math.sin(rad);
        const c = Math.cos(rad);
        out[0] =  c; out[1] = s;
        out[2] = -s; out[3] = c;
        return out;
    }
    fromRotation(...args) { return Matrix2x2.fromRotation(this, ...args); }

    static fromScaling(out, v) {
        out[0] = v[0];
        out[1] = 0;
        out[2] = 0;
        out[3] = v[1];
        return out;
    }
    fromScaling(...args) { return Matrix2x2.fromScaling(this, ...args); }

    static toString(a) {
        return 'mat2(' + a[0] + ', ' + a[1] + ', ' + a[2] + ', ' + a[3] + ')';
    }
    toString() { return Matrix2x2.toString(); }

    static add(out, a, b) {
        out[0] = a[0] + b[0];
        out[1] = a[1] + b[1];
        out[2] = a[2] + b[2];
        out[3] = a[3] + b[3];
        return out;
    }
    add(...args) { return Matrix2x2.add(this, this, ...args); }

    static subtract(out, a, b) {
        out[0] = a[0] - b[0];
        out[1] = a[1] - b[1];
        out[2] = a[2] - b[2];
        out[3] = a[3] - b[3];
        return out;
    }
    static sub(out, a, b) { return Matrix2x2.subtract(out, a, b); }
    subtract(...args) { return Matrix2x2.subtract(this, this, ...args); }
    sub(...args) { return Matrix2x2.subtract(this, this, ...args); }

    static exactEquals(a, b) {
        return a[0] === b[0] && a[1] === b[1] && a[2] === b[2] && a[3] === b[3];
    }
    exactEquals(...args) { return Matrix2x2.exactEquals(this, ...args); }

    static equals(a, b) {
        const a0 = a[0], a1 = a[1], a2 = a[2], a3 = a[3];
        const b0 = b[0], b1 = b[1], b2 = b[2], b3 = b[3];
        return (Math.abs(a0 - b0) <= glMatrix.EPSILON*Math.max(1.0, Math.abs(a0), Math.abs(b0)) &&
                Math.abs(a1 - b1) <= glMatrix.EPSILON*Math.max(1.0, Math.abs(a1), Math.abs(b1)) &&
                Math.abs(a2 - b2) <= glMatrix.EPSILON*Math.max(1.0, Math.abs(a2), Math.abs(b2)) &&
                Math.abs(a3 - b3) <= glMatrix.EPSILON*Math.max(1.0, Math.abs(a3), Math.abs(b3)));
    }
    equals(...args) { return Matrix2x2.equals(this, ...args); }

    static multiplyScalar(out, a, b) {
        out[0] = a[0] * b;
        out[1] = a[1] * b;
        out[2] = a[2] * b;
        out[3] = a[3] * b;
        return out;
    }
    multiplyScalar(...args) { return Matrix2x2.multiplyScalar(this, this, ...args); }
}
