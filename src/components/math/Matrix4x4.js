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

    fromValues(m00, m01, m02, m03,
               m10, m11, m12, m13,
               m20, m21, m22, m23,
               m30, m31, m32, m33) {
        const out = new Matrix4x4();
        out[0] = m00;  out[1] = m01;  out[2] = m02;  out[3] = m03;
        out[4] = m10;  out[5] = m11;  out[6] = m12;  out[7] = m13;
        out[8] = m20;  out[9] = m21;  out[10] = m22; out[11] = m23;
        out[12] = m30; out[13] = m31; out[14] = m32; out[15] = m33;
        
        return out;
    }

    static set(out, m00, m01, m02, m03,
                    m10, m11, m12, m13,
                    m20, m21, m22, m23,
                    m30, m31, m32, m33) {
        out[0] = m00;
        out[1] = m01;
        out[2] = m02;
        out[3] = m03;
        out[4] = m10;
        out[5] = m11;
        out[6] = m12;
        out[7] = m13;
        out[8] = m20;
        out[9] = m21;
        out[10] = m22;
        out[11] = m23;
        out[12] = m30;
        out[13] = m31;
        out[14] = m32;
        out[15] = m33;
        return out;
    }
    set(...args) { return Matrix4x4.set(this, ...args); }

    static transpose(out, a) {
        if (out === a) {
            const a01 = a[1],
                  a02 = a[2],
                  a03 = a[3],
                  a12 = a[6],
                  a13 = a[7],
                  a23 = a[11];
        
            out[1] = a[4];
            out[2] = a[8];
            out[3] = a[12];
            out[4] = a01;
            out[6] = a[9];
            out[7] = a[13];
            out[8] = a02;
            out[9] = a12;
            out[11] = a[14];
            out[12] = a03;
            out[13] = a13;
            out[14] = a23;
          } else {
            out[0] = a[0];
            out[1] = a[4];
            out[2] = a[8];
            out[3] = a[12];
            out[4] = a[1];
            out[5] = a[5];
            out[6] = a[9];
            out[7] = a[13];
            out[8] = a[2];
            out[9] = a[6];
            out[10] = a[10];
            out[11] = a[14];
            out[12] = a[3];
            out[13] = a[7];
            out[14] = a[11];
            out[15] = a[15];
        }

        return out;
    }
    transpose() { return Matrix4x4.transpose(this); }

    static invert(out, a) {
        const a00 = a[0],  a01 = a[1],  a02 = a[2],  a03 = a[3],
              a10 = a[4],  a11 = a[5],  a12 = a[6],  a13 = a[7],
              a20 = a[8],  a21 = a[9],  a22 = a[10], a23 = a[11], 
              a30 = a[12], a31 = a[13], a32 = a[14], a33 = a[15];

        const b00 = a00 * a11 - a01 * a10;
        const b01 = a00 * a12 - a02 * a10;
        const b02 = a00 * a13 - a03 * a10;
        const b03 = a01 * a12 - a02 * a11;
        const b04 = a01 * a13 - a03 * a11;
        const b05 = a02 * a13 - a03 * a12;
        const b06 = a20 * a31 - a21 * a30;
        const b07 = a20 * a32 - a22 * a30;
        const b08 = a20 * a33 - a23 * a30;
        const b09 = a21 * a32 - a22 * a31;
        const b10 = a21 * a33 - a23 * a31;
        const b11 = a22 * a33 - a23 * a32;

        // Calculate the determinant
        const det =
            b00 * b11 - b01 * b10 + b02 * b09 + b03 * b08 - b04 * b07 + b05 * b06;

        if (!det) {
            return null;
        }
        det = 1.0 / det;

        out[0] = (a11 * b11 - a12 * b10 + a13 * b09) * det;
        out[1] = (a02 * b10 - a01 * b11 - a03 * b09) * det;
        out[2] = (a31 * b05 - a32 * b04 + a33 * b03) * det;
        out[3] = (a22 * b04 - a21 * b05 - a23 * b03) * det;
        out[4] = (a12 * b08 - a10 * b11 - a13 * b07) * det;
        out[5] = (a00 * b11 - a02 * b08 + a03 * b07) * det;
        out[6] = (a32 * b02 - a30 * b05 - a33 * b01) * det;
        out[7] = (a20 * b05 - a22 * b02 + a23 * b01) * det;
        out[8] = (a10 * b10 - a11 * b08 + a13 * b06) * det;
        out[9] = (a01 * b08 - a00 * b10 - a03 * b06) * det;
        out[10] = (a30 * b04 - a31 * b02 + a33 * b00) * det;
        out[11] = (a21 * b02 - a20 * b04 - a23 * b00) * det;
        out[12] = (a11 * b07 - a10 * b09 - a12 * b06) * det;
        out[13] = (a00 * b09 - a01 * b07 + a02 * b06) * det;
        out[14] = (a31 * b01 - a30 * b03 - a32 * b00) * det;
        out[15] = (a20 * b03 - a21 * b01 + a22 * b00) * det;

        return out;
    }
    invert(...args) { return Matrix4x4.invert(this, ...args); }

    static determinant(a) {
        const a00 = a[0],  a01 = a[1],  a02 = a[2],  a03 = a[3],
              a10 = a[4],  a11 = a[5],  a12 = a[6],  a13 = a[7],
              a20 = a[8],  a21 = a[9],  a22 = a[10], a23 = a[11], 
              a30 = a[12], a31 = a[13], a32 = a[14], a33 = a[15];

        const b00 = a00 * a11 - a01 * a10;
        const b01 = a00 * a12 - a02 * a10;
        const b02 = a00 * a13 - a03 * a10;
        const b03 = a01 * a12 - a02 * a11;
        const b04 = a01 * a13 - a03 * a11;
        const b05 = a02 * a13 - a03 * a12;
        const b06 = a20 * a31 - a21 * a30;
        const b07 = a20 * a32 - a22 * a30;
        const b08 = a20 * a33 - a23 * a30;
        const b09 = a21 * a32 - a22 * a31;
        const b10 = a21 * a33 - a23 * a31;
        const b11 = a22 * a33 - a23 * a32;

        return b00 * b11 - b01 * b10 + b02 * b09 + b03 * b08 - b04 * b07 + b05 * b06;
    }
    determinant() { return Matrix4x4.determinant(this); }

    static multiply(out, a, b) {
        const a00 = a[0],  a01 = a[1],  a02 = a[2],  a03 = a[3],
              a10 = a[4],  a11 = a[5],  a12 = a[6],  a13 = a[7],
              a20 = a[8],  a21 = a[9],  a22 = a[10], a23 = a[11], 
              a30 = a[12], a31 = a[13], a32 = a[14], a33 = a[15];

        let b0 = b[0],
            b1 = b[1],
            b2 = b[2],
            b3 = b[3];
        out[0] = b0 * a00 + b1 * a10 + b2 * a20 + b3 * a30;
        out[1] = b0 * a01 + b1 * a11 + b2 * a21 + b3 * a31;
        out[2] = b0 * a02 + b1 * a12 + b2 * a22 + b3 * a32;
        out[3] = b0 * a03 + b1 * a13 + b2 * a23 + b3 * a33;

        b0 = b[4];
        b1 = b[5];
        b2 = b[6];
        b3 = b[7];
        out[4] = b0 * a00 + b1 * a10 + b2 * a20 + b3 * a30;
        out[5] = b0 * a01 + b1 * a11 + b2 * a21 + b3 * a31;
        out[6] = b0 * a02 + b1 * a12 + b2 * a22 + b3 * a32;
        out[7] = b0 * a03 + b1 * a13 + b2 * a23 + b3 * a33;

        b0 = b[8];
        b1 = b[9];
        b2 = b[10];
        b3 = b[11];
        out[8] = b0 * a00 + b1 * a10 + b2 * a20 + b3 * a30;
        out[9] = b0 * a01 + b1 * a11 + b2 * a21 + b3 * a31;
        out[10] = b0 * a02 + b1 * a12 + b2 * a22 + b3 * a32;
        out[11] = b0 * a03 + b1 * a13 + b2 * a23 + b3 * a33;

        b0 = b[12];
        b1 = b[13];
        b2 = b[14];
        b3 = b[15];
        out[12] = b0 * a00 + b1 * a10 + b2 * a20 + b3 * a30;
        out[13] = b0 * a01 + b1 * a11 + b2 * a21 + b3 * a31;
        out[14] = b0 * a02 + b1 * a12 + b2 * a22 + b3 * a32;
        out[15] = b0 * a03 + b1 * a13 + b2 * a23 + b3 * a33;

        return out;
    }
    static mul(...args) {return Matrix4x4.multiply(...args); }
    multiply(...args) { return Matrix4x4.multiply(this, this, ...args); }
    mul(...args) { return Matrix4x4.multiply(this, this, ...args); }

    static translate(out, a, v) {
        const x = v[0],
              y = v[1],
              z = v[2];

        if (a === out) {
            out[12] = a[0] * x + a[4] * y + a[8] * z + a[12];
            out[13] = a[1] * x + a[5] * y + a[9] * z + a[13];
            out[14] = a[2] * x + a[6] * y + a[10] * z + a[14];
            out[15] = a[3] * x + a[7] * y + a[11] * z + a[15];
        } else {
            const a00 = a[0],  a01 = a[1],  a02 = a[2],  a03 = a[3],
                  a10 = a[4],  a11 = a[5],  a12 = a[6],  a13 = a[7],
                  a20 = a[8],  a21 = a[9],  a22 = a[10], a23 = a[11];
            out[0] = a00;
            out[1] = a01;
            out[2] = a02;
            out[3] = a03;
            out[4] = a10;
            out[5] = a11;
            out[6] = a12;
            out[7] = a13;
            out[8] = a20;
            out[9] = a21;
            out[10] = a22;
            out[11] = a23;

            out[12] = a00 * x + a10 * y + a20 * z + a[12];
            out[13] = a01 * x + a11 * y + a21 * z + a[13];
            out[14] = a02 * x + a12 * y + a22 * z + a[14];
            out[15] = a03 * x + a13 * y + a23 * z + a[15];
        }

        return out;
    }
    translate(...args) { return Matrix4x4.translate(this, this, ...args); }

    static rotate(out, a, rad, axis) {
        let x = axis[0], y = axis[1], z = axis[2];
        let len = Math.hypot(x, y, z);

        if (len < MathUtils.EPSILON) {
            return null;
        }

        len = 1 / len;
        
        x *= len;
        y *= len;
        z *= len;

        const s = Math.sin(rad);
        const c = Math.cos(rad);
        const t = 1 - c;

        const a00 = a[0],  a01 = a[1],  a02 = a[2],  a03 = a[3],
              a10 = a[4],  a11 = a[5],  a12 = a[6],  a13 = a[7],
              a20 = a[8],  a21 = a[9],  a22 = a[10], a23 = a[11];

        // Construct the elements of the rotation matrix
        const b00 = x * x * t + c;
        const b01 = y * x * t + z * s;
        const b02 = z * x * t - y * s;
        const b10 = x * y * t - z * s;
        const b11 = y * y * t + c;
        const b12 = z * y * t + x * s;
        const b20 = x * z * t + y * s;
        const b21 = y * z * t - x * s;
        const b22 = z * z * t + c;

        // Perform rotation-specific matrix multiplication
        out[0] = a00 * b00 + a10 * b01 + a20 * b02;
        out[1] = a01 * b00 + a11 * b01 + a21 * b02;
        out[2] = a02 * b00 + a12 * b01 + a22 * b02;
        out[3] = a03 * b00 + a13 * b01 + a23 * b02;
        out[4] = a00 * b10 + a10 * b11 + a20 * b12;
        out[5] = a01 * b10 + a11 * b11 + a21 * b12;
        out[6] = a02 * b10 + a12 * b11 + a22 * b12;
        out[7] = a03 * b10 + a13 * b11 + a23 * b12;
        out[8] = a00 * b20 + a10 * b21 + a20 * b22;
        out[9] = a01 * b20 + a11 * b21 + a21 * b22;
        out[10] = a02 * b20 + a12 * b21 + a22 * b22;
        out[11] = a03 * b20 + a13 * b21 + a23 * b22;

        if (a !== out) {
            // If the source and destination differ, copy the unchanged last row
            out[12] = a[12];
            out[13] = a[13];
            out[14] = a[14];
            out[15] = a[15];
        }
        return out;
    }
    rotate(...args) { return Matrix4x4.rotate(this, this, ...args); }

    static rotateAxis(out, a, b, rad, axis) {
        const s = Math.sin(rad);
        const c = Math.cos(rad);
        const a00 = a[0],  a01 = a[1],  a02 = a[2],  a03 = a[3],
              a10 = a[4],  a11 = a[5],  a12 = a[6],  a13 = a[7],
              a20 = a[8],  a21 = a[9],  a22 = a[10], a23 = a[11];

        if (axis === "x") {
            if (a !== out) {
                // If the source and destination differ, copy the unchanged rows
                out[0] = a[0];
                out[1] = a[1];
                out[2] = a[2];
                out[3] = a[3];
                out[12] = a[12];
                out[13] = a[13];
                out[14] = a[14];
                out[15] = a[15];
            }
            out[4] = a10 * c + a20 * s;
            out[5] = a11 * c + a21 * s;
            out[6] = a12 * c + a22 * s;
            out[7] = a13 * c + a23 * s;
            out[8] = a20 * c - a10 * s;
            out[9] = a21 * c - a11 * s;
            out[10] = a22 * c - a12 * s;
            out[11] = a23 * c - a13 * s;
        } else if (axis === "y") {
            if (a !== out) {
                // If the source and destination differ, copy the unchanged rows
                out[4] = a[4];
                out[5] = a[5];
                out[6] = a[6];
                out[7] = a[7];
                out[12] = a[12];
                out[13] = a[13];
                out[14] = a[14];
                out[15] = a[15];
            }
            out[0] = a00 * c - a20 * s;
            out[1] = a01 * c - a21 * s;
            out[2] = a02 * c - a22 * s;
            out[3] = a03 * c - a23 * s;
            out[8] = a00 * s + a20 * c;
            out[9] = a01 * s + a21 * c;
            out[10] = a02 * s + a22 * c;
            out[11] = a03 * s + a23 * c;
        } else if (axis === "z") {
            if (a !== out) {
                // If the source and destination differ, copy the unchanged last row
                out[8] = a[8];
                out[9] = a[9];
                out[10] = a[10];
                out[11] = a[11];
                out[12] = a[12];
                out[13] = a[13];
                out[14] = a[14];
                out[15] = a[15];
            }
            out[0] = a00 * c + a10 * s;
            out[1] = a01 * c + a11 * s;
            out[2] = a02 * c + a12 * s;
            out[3] = a03 * c + a13 * s;
            out[4] = a10 * c - a00 * s;
            out[5] = a11 * c - a01 * s;
            out[6] = a12 * c - a02 * s;
            out[7] = a13 * c - a03 * s;

        }

        return out;
    }

    static rotateX(out, a, b, rad){
        return Matrix4x4.rotateAxis(rotateAxis, "x");
    }
    rotateX(...args) { return Matrix4x4.rotateX(this, this, ...args); }

    static rotateY(out, a, b, rad){
        return Matrix4x4.rotateAxis(rotateAxis, "y");
    }
    rotateY(...args) { return Matrix4x4.rotateY(this, this, ...args); }

    static rotateZ(out, a, b, rad){
        return Matrix4x4.rotateAxis(rotateAxis, "z");
    }
    rotateZ(...args) { return Matrix4x4.rotateZ(this, this, ...args); }

    static scale(out, a, v) {
        const x = v[0], y = v[1], z = v[2];

        out[0] = a[0] * x;
        out[1] = a[1] * x;
        out[2] = a[2] * x;
        out[3] = a[3] * x;
        out[4] = a[4] * y;
        out[5] = a[5] * y;
        out[6] = a[6] * y;
        out[7] = a[7] * y;
        out[8] = a[8] * z;
        out[9] = a[9] * z;
        out[10] = a[10] * z;
        out[11] = a[11] * z;
        out[12] = a[12];
        out[13] = a[13];
        out[14] = a[14];
        out[15] = a[15];
        return out;
    }
    scale(...args) { return Matrix4x4.scale(this, this, ...args); }

    static fromTranslation(out, v) {
        out[0] = 1;
        out[1] = 0;
        out[2] = 0;
        out[3] = 0;
        out[4] = 0;
        out[5] = 1;
        out[6] = 0;
        out[7] = 0;
        out[8] = 0;
        out[9] = 0;
        out[10] = 1;
        out[11] = 0;
        out[12] = v[0];
        out[13] = v[1];
        out[14] = v[2];
        out[15] = 1;
        return out;
    }

    static fromRotation(out, rad, axis) {
        let x = axis[0],  y = axis[1], z = axis[2];
        let len = Math.hypot(x, y, z);

        if (len < MathUtils.EPSILON) {
            return null;
        }

        len = 1 / len;


        x *= len;
        y *= len;
        z *= len;

        const s = Math.sin(rad);
        const c = Math.cos(rad);
        const t = 1 - c;

        // Perform rotation-specific matrix multiplication
        out[0] = x * x * t + c;
        out[1] = y * x * t + z * s;
        out[2] = z * x * t - y * s;
        out[3] = 0;
        out[4] = x * y * t - z * s;
        out[5] = y * y * t + c;
        out[6] = z * y * t + x * s;
        out[7] = 0;
        out[8] = x * z * t + y * s;
        out[9] = y * z * t - x * s;
        out[10] = z * z * t + c;
        out[11] = 0;
        out[12] = 0;
        out[13] = 0;
        out[14] = 0;
        out[15] = 1;
        
        return out;
    }

    static fromQuat(out, q) {
        const x = q[0], y = q[1], z = q[2], w = q[3];
        const x2 = x + x;
        const y2 = y + y;
        const z2 = z + z;
      
        const xx = x * x2;
        const yx = y * x2;
        const yy = y * y2;
        const zx = z * x2;
        const zy = z * y2;
        const zz = z * z2;
        const wx = w * x2;
        const wy = w * y2;
        const wz = w * z2;
      
        out[0] = 1 - yy - zz;
        out[1] = yx + wz;
        out[2] = zx - wy;
        out[3] = 0;
      
        out[4] = yx - wz;
        out[5] = 1 - xx - zz;
        out[6] = zy + wx;
        out[7] = 0;
      
        out[8] = zx + wy;
        out[9] = zy - wx;
        out[10] = 1 - xx - yy;
        out[11] = 0;
      
        out[12] = 0;
        out[13] = 0;
        out[14] = 0;
        out[15] = 1;
      
        return out;
    }

    static fromScaling(out, v) {
        out[0] = v[0];
        out[1] = 0;
        out[2] = 0;
        out[3] = 0;
        out[4] = 0;
        out[5] = v[1];
        out[6] = 0;
        out[7] = 0;
        out[8] = 0;
        out[9] = 0;
        out[10] = v[2];
        out[11] = 0;
        out[12] = 0;
        out[13] = 0;
        out[14] = 0;
        out[15] = 1;
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

    static getTranslation(out, mat) {
        out[0] = mat[12];
        out[1] = mat[13];
        out[2] = mat[14];
      
        return out;
    }
    getTranslation(...args) { return Matrix4x4.getTranslation(this, ...args); }

    static getScaling(out, mat) {
        let m11 = mat[0];
        let m12 = mat[1];
        let m13 = mat[2];
        let m21 = mat[4];
        let m22 = mat[5];
        let m23 = mat[6];
        let m31 = mat[8];
        let m32 = mat[9];
        let m33 = mat[10];
      
        out[0] = Math.hypot(m11, m12, m13);
        out[1] = Math.hypot(m21, m22, m23);
        out[2] = Math.hypot(m31, m32, m33);
      
        return out;
    }
    getScaling(...args) { return Matrix4x4.getScaling(this, ...args); }

    static getRotation(outQuat, mat) {
        const scaling = new Float32Array(3);
        getScaling(scaling, mat);
      
        const is1 = 1 / scaling[0];
        const is2 = 1 / scaling[1];
        const is3 = 1 / scaling[2];
      
        const sm11 = mat[0] * is1;
        const sm12 = mat[1] * is2;
        const sm13 = mat[2] * is3;
        const sm21 = mat[4] * is1;
        const sm22 = mat[5] * is2;
        const sm23 = mat[6] * is3;
        const sm31 = mat[8] * is1;
        const sm32 = mat[9] * is2;
        const sm33 = mat[10] * is3;
      
        const trace = sm11 + sm22 + sm33;
        const S = 0;
      
        if (trace > 0) {
          S = Math.sqrt(trace + 1.0) * 2;
          outQuat[3] = 0.25 * S;
          outQuat[0] = (sm23 - sm32) / S;
          outQuat[1] = (sm31 - sm13) / S;
          outQuat[2] = (sm12 - sm21) / S;
        } else if (sm11 > sm22 && sm11 > sm33) {
          S = Math.sqrt(1.0 + sm11 - sm22 - sm33) * 2;
          outQuat[3] = (sm23 - sm32) / S;
          outQuat[0] = 0.25 * S;
          outQuat[1] = (sm12 + sm21) / S;
          outQuat[2] = (sm31 + sm13) / S;
        } else if (sm22 > sm33) {
          S = Math.sqrt(1.0 + sm22 - sm11 - sm33) * 2;
          outQuat[3] = (sm31 - sm13) / S;
          outQuat[0] = (sm12 + sm21) / S;
          outQuat[1] = 0.25 * S;
          outQuat[2] = (sm23 + sm32) / S;
        } else {
          S = Math.sqrt(1.0 + sm33 - sm11 - sm22) * 2;
          outQuat[3] = (sm12 - sm21) / S;
          outQuat[0] = (sm31 + sm13) / S;
          outQuat[1] = (sm23 + sm32) / S;
          outQuat[2] = 0.25 * S;
        }
      
        return outQuat;
    }
    getRotation(...args) { return Matrix4x4.getRotation(this, ...args); }

    static fromRotationTranslationScale(out, q, v, s) {
        // Quaternion math
        const x = q[0], y = q[1], z = q[2], w = q[3];
        const x2 = x + x;
        const y2 = y + y;
        const z2 = z + z;
      
        const xx = x * x2;
        const xy = x * y2;
        const xz = x * z2;
        const yy = y * y2;
        const yz = y * z2;
        const zz = z * z2;
        const wx = w * x2;
        const wy = w * y2;
        const wz = w * z2;
        const sx = s[0];
        const sy = s[1];
        const sz = s[2];
      
        out[0] = (1 - (yy + zz)) * sx;
        out[1] = (xy + wz) * sx;
        out[2] = (xz - wy) * sx;
        out[3] = 0;
        out[4] = (xy - wz) * sy;
        out[5] = (1 - (xx + zz)) * sy;
        out[6] = (yz + wx) * sy;
        out[7] = 0;
        out[8] = (xz + wy) * sz;
        out[9] = (yz - wx) * sz;
        out[10] = (1 - (xx + yy)) * sz;
        out[11] = 0;
        out[12] = v[0];
        out[13] = v[1];
        out[14] = v[2];
        out[15] = 1;
      
        return out;
    }

    static frustum(out, left, right, bottom, top, near, far) {
        const rl = 1 / (right - left);
        const tb = 1 / (top - bottom);
        const nf = 1 / (near - far);
        out[0] = near * 2 * rl;
        out[1] = 0;
        out[2] = 0;
        out[3] = 0;
        out[4] = 0;
        out[5] = near * 2 * tb;
        out[6] = 0;
        out[7] = 0;
        out[8] = (right + left) * rl;
        out[9] = (top + bottom) * tb;
        out[10] = (far + near) * nf;
        out[11] = -1;
        out[12] = 0;
        out[13] = 0;
        out[14] = far * near * 2 * nf;
        out[15] = 0;
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
        return 'mat4(' + a[0] + ', '  + a[1] + ', '  + a[2]  + ', ' + a[3 ] + ', ' +
                         a[4] + ', '  + a[5] + ', '  + a[6]  + ', ' + a[7]  + ', ' +
                         a[8] + ', '  + a[9] + ', '  + a[10] + ', ' + a[11] + ', ' +
                         a[12] + ', ' + a[13] + ', ' + a[14] + ', ' + a[15] + ')';
    }
    toString() { return Matrix4x4.toString(this); }

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
        for (let i = 0; i < a.length; i++) {
            out[i] = a[i] * b;
        }
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

    static ortho(out, left, right, bottom, top, near, far) {
        const lr = 1 / (left - right);
        const bt = 1 / (bottom - top);
        const nf = 1 / (near - far);
        out[0] = -2 * lr;
        out[1] = 0;
        out[2] = 0;
        out[3] = 0;
        out[4] = 0;
        out[5] = -2 * bt;
        out[6] = 0;
        out[7] = 0;
        out[8] = 0;
        out[9] = 0;
        out[10] = 2 * nf;
        out[11] = 0;
        out[12] = (left + right) * lr;
        out[13] = (top + bottom) * bt;
        out[14] = (far + near) * nf;
        out[15] = 1;
        return out;
    }
}
