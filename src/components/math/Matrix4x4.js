import MathUtils from "./MathUtils";

export default class Matrix4x4 extends Float32Array {

    constructor() {
        super(16);
    }

    static identity() {
        const mat4 = new Matrix4x4();
        for (let i = 0; i < mat4.length; i+=5) {
            mat4[i] = 1;
        }
        return mat4;
    }

    static clone(a) {
        const out = new Matrix4x4();
        for (let i = 0; i < a.length; i++) {
            out[i] = a[i];
        }
        return out;
    }
    clone() { return Matrix4x4.clone(this); }

    static copy(out, a) {
        for (let i = 0; i < a.length; i++) {
            out[i] = a[i];
        }
        return out;
    }
    copy(...args) { return Matrix4x4.copy(this, ...args); }

    fromValues(m00, m01, m02, m10, m11, m12, m20, m21, m22) {
        const out = new Matrix4x4();
        out[0] = m00;
        out[1] = m01;
        out[2] = m02;
        out[3] = m10;
        out[4] = m11;
        out[5] = m12;
        out[6] = m20;
        out[7] = m21;
        out[8] = m22;
        return out;
    }

    static set(out, m00, m01, m02, m10, m11, m12, m20, m21, m22) {
        out[0] = m00;
        out[1] = m01;
        out[2] = m02;
        out[3] = m10;
        out[4] = m11;
        out[5] = m12;
        out[6] = m20;
        out[7] = m21;
        out[8] = m22;
        return out;
    }
    set(...args) { return Matrix4x4.set(this, ...args); }

    static transpose(out, a) {
        if (out === a) {
          const a01 = a[1], a02 = a[2], a12 = a[5];
          out[1] = a[3];
          out[2] = a[6];
          out[3] = a01;
          out[5] = a[7];
          out[6] = a02;
          out[7] = a12;
        } else {
          out[0] = a[0];
          out[1] = a[3];
          out[2] = a[6];
          out[3] = a[1];
          out[4] = a[4];
          out[5] = a[7];
          out[6] = a[2];
          out[7] = a[5];
          out[8] = a[8];
        }

        return out;
    }
    transpose() { return Matrix4x4.transpose(this); }

    static invert(out, a) {
        const a00 = a[0], a01 = a[1], a02 = a[2];
        const a10 = a[3], a11 = a[4], a12 = a[5];
        const a20 = a[6], a21 = a[7], a22 = a[8];

        const b01 = a22 * a11 - a12 * a21;
        const b11 = -a22 * a10 + a12 * a20;
        const b21 = a21 * a10 - a11 * a20;

        const det = a00 * b01 + a01 * b11 + a02 * b21;

        if (!det) {
          return null;
        }
        det = 1.0 / det;

        out[0] = b01 * det;
        out[1] = (-a22 * a01 + a02 * a21) * det;
        out[2] = (a12 * a01 - a02 * a11) * det;
        out[3] = b11 * det;
        out[4] = (a22 * a00 - a02 * a20) * det;
        out[5] = (-a12 * a00 + a02 * a10) * det;
        out[6] = b21 * det;
        out[7] = (-a21 * a00 + a01 * a20) * det;
        out[8] = (a11 * a00 - a01 * a10) * det;
        return out;
    }
    invert(...args) { return Matrix4x4.invert(this, ...args); }

    static determinant(a) {
        const a00 = a[0], a01 = a[1], a02 = a[2];
        const a10 = a[3], a11 = a[4], a12 = a[5];
        const a20 = a[6], a21 = a[7], a22 = a[8];

        return a00 * (a22 * a11 - a12 * a21) + a01 * (-a22 * a10 + a12 * a20) + a02 * (a21 * a10 - a11 * a20);
    }
    determinant() { return Matrix4x4.determinant(this); }

    static multiply(out, a, b) {
        const a00 = a[0], a01 = a[1], a02 = a[2];
        const a10 = a[3], a11 = a[4], a12 = a[5];
        const a20 = a[6], a21 = a[7], a22 = a[8];

        const b00 = b[0], b01 = b[1], b02 = b[2];
        const b10 = b[3], b11 = b[4], b12 = b[5];
        const b20 = b[6], b21 = b[7], b22 = b[8];

        out[0] = b00 * a00 + b01 * a10 + b02 * a20;
        out[1] = b00 * a01 + b01 * a11 + b02 * a21;
        out[2] = b00 * a02 + b01 * a12 + b02 * a22;

        out[3] = b10 * a00 + b11 * a10 + b12 * a20;
        out[4] = b10 * a01 + b11 * a11 + b12 * a21;
        out[5] = b10 * a02 + b11 * a12 + b12 * a22;

        out[6] = b20 * a00 + b21 * a10 + b22 * a20;
        out[7] = b20 * a01 + b21 * a11 + b22 * a21;
        out[8] = b20 * a02 + b21 * a12 + b22 * a22;
        return out;
    }
    static mul(...args) {return Matrix4x4.multiply(...args); }
    multiply(...args) { return Matrix4x4.multiply(this, this, ...args); }
    mul(...args) { return Matrix4x4.multiply(this, this, ...args); }

    static translate(out, a, v) {
        const x0 = a[0], x1 = a[1], x2 = a[2],
              y0 = a[3], y1 = a[4], y2 = a[5],
              z0 = a[6], z1 = a[7], z2 = a[8];
        const x = v[0], y = v[1];

        if (out !== a) {
            out[0] = x0;
            out[1] = x1;
            out[2] = x2;

            out[3] = y0;
            out[4] = y1;
            out[5] = y2;
        }

        out[6] = x * x0 + y * y0 + z0;
        out[7] = x * x1 + y * y1 + z1;
        out[8] = x * x2 + y * y2 + z2;
        return out;
    }
    translate(...args) { return Matrix4x4.translate(this, this, ...args); }

    static rotate(out, a, rad) {
        const a00 = a[0], a01 = a[1], a02 = a[2],
              a10 = a[3], a11 = a[4], a12 = a[5],
              a20 = a[6], a21 = a[7], a22 = a[8];

        const s = Math.sin(rad);
        const c = Math.cos(rad);

        out[0] = c * a00 + s * a10;
        out[1] = c * a01 + s * a11;
        out[2] = c * a02 + s * a12;

        out[3] = c * a10 - s * a00;
        out[4] = c * a11 - s * a01;
        out[5] = c * a12 - s * a02;

        out[6] = a20;
        out[7] = a21;
        out[8] = a22;
        return out;
    }
    rotate(...args) { return Matrix4x4.rotate(this, this, ...args); }

    static scale(out, a, v) {
        const x = v[0], y = v[1];

        out[0] = x * a[0];
        out[1] = x * a[1];
        out[2] = x * a[2];

        out[3] = y * a[3];
        out[4] = y * a[4];
        out[5] = y * a[5];

        out[6] = a[6];
        out[7] = a[7];
        out[8] = a[8];
        return out;
    }
    scale(...args) { return Matrix4x4.scale(this, this, ...args); }

    static fromTranslation(out, v) {
        out[0] = 1;
        out[1] = 0;
        out[2] = 0;
        out[3] = 0;
        out[4] = 1;
        out[5] = 0;
        out[6] = v[0];
        out[7] = v[1];
        out[8] = 1;
        return out;
    }

    static fromRotation(out, rad) {
        const s = Math.sin(rad);
        const c = Math.cos(rad);

        out[0] = c;
        out[1] = s;
        out[2] = 0;

        out[3] = -s;
        out[4] = c;
        out[5] = 0;

        out[6] = 0;
        out[7] = 0;
        out[8] = 1;
        return out;
    }

    static fromScaling(out, v) {
        out[0] = v[0];
        out[1] = 0;
        out[2] = 0;

        out[3] = 0;
        out[4] = v[1];
        out[5] = 0;

        out[6] = 0;
        out[7] = 0;
        out[8] = 1;
        return out;
    }

    static fromMat2d(out, a) {
        out[0] = a[0];
        out[1] = a[1];
        out[2] = 0;

        out[3] = a[2];
        out[4] = a[3];
        out[5] = 0;

        out[6] = a[4];
        out[7] = a[5];
        out[8] = 1;
        return out;
    }

    static projection(out, width, height) {
        out[0] = 2 / width;
        out[1] = 0;
        out[2] = 0;
        out[3] = 0;
        out[4] = -2 / height;
        out[5] = 0;
        out[6] = -1;
        out[7] = 1;
        out[8] = 1;
        return out;
    }

    static toString(a) {
        return 'mat3(' + a[0] + ', ' + a[1] + ', ' + a[2] + ', ' +
                         a[3] + ', ' + a[4] + ', ' + a[5] + ', ' +
                         a[6] + ', ' + a[7] + ', ' + a[8] + ')';
    }
    toString() { return Matrix4x4.toString(); }

    static add(out, a, b) {
        for (let i = 0; i < a.length; i++) {
            out[i] = a[i] + b[i];
        }
        return out;
    }
    add(...args) { return Matrix4x4.add(this, this, ...args); }

    static subtract(out, a, b) {
        for (let i = 0; i < a.length; i++) {
            out[i] = a[i] - b[i];
        }
        return out;
    }
    static sub(out, a, b) { return Matrix4x4.subtract(out, a, b); }
    subtract(...args) { return Matrix4x4.subtract(this, this, ...args); }
    sub(...args) { return Matrix4x4.subtract(this, this, ...args); }

    static exactEquals(a, b) {
        if (a.length !== b.length) return false;

        for (let i = 0; i < a.length; i++) {
            if (a[i] !== b[i]) return false;
        }

        return true;
    }
    exactEquals(...args) { return Matrix4x4.exactEquals(this, ...args); }

    static equals(a, b) {
        if (a.length !== b.length) return false;

        for (let i = 0; i < a.length; i++) {
            if (Math.abs(a[i] - b[i]) > MathUtils.EPSILON*Math.max(1.0, Math.abs(a0), Math.abs(b0))) {
                return false;
            }
        }

        const a0 = a[0], a1 = a[1], a2 = a[2], a3 = a[3];
        const b0 = b[0], b1 = b[1], b2 = b[2], b3 = b[3];
        return (Math.abs(a0 - b0) <= MathUtils.EPSILON*Math.max(1.0, Math.abs(a0), Math.abs(b0)) &&
                Math.abs(a1 - b1) <= MathUtils.EPSILON*Math.max(1.0, Math.abs(a1), Math.abs(b1)) &&
                Math.abs(a2 - b2) <= MathUtils.EPSILON*Math.max(1.0, Math.abs(a2), Math.abs(b2)) &&
                Math.abs(a3 - b3) <= MathUtils.EPSILON*Math.max(1.0, Math.abs(a3), Math.abs(b3)));
    }
    equals(...args) { return Matrix4x4.equals(this, ...args); }

    static multiplyScalar(out, a, b) {
        out[0] = a[0] * b;
        out[1] = a[1] * b;
        out[2] = a[2] * b;
        out[3] = a[3] * b;
        out[4] = a[4] * b;
        out[5] = a[5] * b;
        out[6] = a[6] * b;
        out[7] = a[7] * b;
        out[8] = a[8] * b;
        return out;
    }
    multiplyScalar(...args) { return Matrix4x4.multiplyScalar(this, this, ...args); }

    static lookAt(out, target, cameraPosition, up) {
        let x0, x1, x2, y0, y1, y2, z0, z1, z2, len;
        const targetX = target[0];
        const targetY = target[1];
        const targetZ = target[2];
        const upX = up[0];
        const upY = up[1];
        const upZ = up[2];
        const cameraPositionX = cameraPosition[0];
        const cameraPositionY = cameraPosition[1];
        const cameraPositionZ = cameraPosition[2];

        const EPSILON = 0.00001;

        if (Math.abs(targetX - cameraPositionX) < EPSILON &&
            Math.abs(targetY - cameraPositionY) < EPSILON &&
            Math.abs(targetZ - cameraPositionZ) < EPSILON) {
            return identity();
        }

        z0 = targetX - cameraPositionX;
        z1 = targetY - cameraPositionY;
        z2 = targetZ - cameraPositionZ;

        len = 1 / Math.hypot(z0, z1, z2);
        z0 *= len;
        z1 *= len;
        z2 *= len;

        x0 = upY * z2 - upZ * z1;
        x1 = upZ * z0 - upX * z2;
        x2 = upX * z1 - upY * z0;
        len = Math.hypot(x0, x1, x2);
        if (!len) {
            x0 = 0;
            x1 = 0;
            x2 = 0;
        } else {
            len = 1 / len;
            x0 *= len;
            x1 *= len;
            x2 *= len;
        }

        y0 = z1 * x2 - z2 * x1;
        y1 = z2 * x0 - z0 * x2;
        y2 = z0 * x1 - z1 * x0;

        len = Math.hypot(y0, y1, y2);
        if (!len) {
            y0 = 0;
            y1 = 0;
            y2 = 0;
        } else {
            len = 1 / len;
            y0 *= len;
            y1 *= len;
            y2 *= len;
        }

        out[0] = x0;
        out[1] = y0;
        out[2] = z0;
        out[3] = 0;
        out[4] = x1;
        out[5] = y1;
        out[6] = z1;
        out[7] = 0;
        out[8] = x2;
        out[9] = y2;
        out[10] = z2;
        out[11] = 0;
        out[12] = -(x0 * targetX + x1 * targetY + x2 * targetZ);
        out[13] = -(y0 * targetX + y1 * targetY + y2 * targetZ);
        out[14] = -(z0 * targetX + z1 * targetY + z2 * targetZ);
        out[15] = 1;

        return out;
    }

    static perspective(out, fovy, aspect, near, far) {
        const f = 1.0 / Math.tan(fovy / 2);
        out[0] = f / aspect;
        out[1] = 0;
        out[2] = 0;
        out[3] = 0;
        out[4] = 0;
        out[5] = f;
        out[6] = 0;
        out[7] = 0;
        out[8] = 0;
        out[9] = 0;
        out[11] = -1;
        out[12] = 0;
        out[13] = 0;
        out[15] = 0;
        if (far != null && far !== Infinity) {
          const nf = 1 / (near - far);
          out[10] = (far + near) * nf;
          out[14] = (2 * far * near) * nf;
        } else {
          out[10] = -1;
          out[14] = -2 * near;
        }
        return out;
      }
}
