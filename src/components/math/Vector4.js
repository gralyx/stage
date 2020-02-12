export default class Vector4 extends Float32Array {

    constructor(...args) {
        super(4);
        if (args) {
            this.x = args && args.length > 0 ? args[0] : this.x;
            this.y = args && args.length > 1 ? args[1] : this.y;
            this.z = args && args.length > 2 ? args[2] : this.z;
            this.w = args && args.length > 2 ? args[2] : this.w;
        }
    }

    static clone(a) {
        const out = new Vector3();
        out[0] = a[0];
        out[1] = a[1];
        out[2] = a[2];
        out[3] = a[3];
        return out;
    }
    static clone(...args) { return Vector3.clone(...args); }

    static copy(out, a) {
        out[0] = a[0];
        out[1] = a[1];
        out[2] = a[2];
        out[3] = a[3];
        return out;
    }
    static copy(...args) { return Vector3.copy(...args); }

    set x(v) { this[0] = v; }
    set y(v) { this[1] = v; }
    set z(v) { this[2] = v; }
    set w(v) { this[2] = v; }
    get x() { return this[0]; }
    get y() { return this[1]; }
    get z() { return this[2]; }
    get w() { return this[3]; }

    set(out, x, y, z, w) {
        out[0] = x;
        out[1] = y;
        out[2] = z;
        out[3] = w;
        return out;
    }
    static set(...args) { return Vector3.set(this, ...args); }

    static length(a) {
        const x = a[0], y = a[1], z = a[2], w = a[3];
        return Math.hypot(x, y, z, w);
    }
    get length() { return Vector2.length(this); }

    static squaredLength(a) {
        const x = a[0], y = a[1], z = a[2], w = a[3];
        return x*x + y*y + z*z + w*w;
    }
    get squaredLength() { return Vector2.squaredLength(this); }

    static add(out, a, b) {
        out[0] = a[0] + b[0];
        out[1] = a[1] + b[1];
        out[2] = a[2] + b[2];
        out[3] = a[3] + b[3];
        return out;
    }
    add(...args) { return Vector3.add(this, this, ...args); }

    static subtract(out, a, b) {
        return Vector3.add(out, a, -b);
    }
    static sub(...args) { return Vector3.subtract(...args); }
    subtract(...args) { return Vector3.subtract(this, this, ...args); }

    static multiply(out, a, b) {
        out[0] = a[0] * b[0];
        out[1] = a[1] * b[1];
        out[2] = a[2] * b[2];
        out[3] = a[3] * b[3];
        return out;
    }
    static mul(...args) { return Vector3.multiply(...args); }
    multiply(...args) { return Vector3.multiply(this, this, ...args); }

    static divide(out, a, b) {
        out[0] = a[0] / b[0];
        out[1] = a[1] / b[1];
        out[2] = a[2] / b[2];
        out[3] = a[3] / b[3];
        return out;
    }
    divide(...args) { return Vector3.divide(this, this, ...args); }

    static scale(out, a, b) {
        out[0] = a[0] * b;
        out[1] = a[1] * b;
        out[2] = a[2] * b;
        out[3] = a[3] * b;
        return out;
    }
    scale(...args) { return Vector3.scale(this, this, ...args); }

    static distance(a, b) {
        const x = b[0] - a[0];
        const y = b[1] - a[1];
        const z = b[2] - a[2];
        const w = b[3] - a[3];
        return Math.hypot(x, y, z, w);
    }
    distanceTo(...args) { return Vector3.distance(this, ...args); }

    static squaredDistance(a, b) {
        const x = b[0] - a[0];
        const y = b[1] - a[1];
        const z = b[2] - a[2];
        const w = b[3] - a[3];
        return x*x + y*y + z*z + w*w;
    }
    squaredDistanceTo(...args) { return Vector3.squaredDistance(this, ...args); }

    static negate(out, a) {
        out[0] = -a[0];
        out[1] = -a[1];
        out[2] = -a[2];
        out[3] = -a[3];
        return out;
    }
    negate() { return Vector3.negate(this, this); }

    inverse(out, a) {
        out[0] = 1.0 / a[0];
        out[1] = 1.0 / a[1];
        out[2] = 1.0 / a[2];
        out[3] = 1.0 / a[3];
        return out;
    }
    invert() { return Vector3.inverse(this, this); }

    normalize(out, a) {
        const x = a[0], y = a[1], z = a[2], w = a[3];
        const len = x*x + y*y + z*z + w*w;
        // Optimization to only perform sqrt if it passes checks for 0
        if (len > 0) {
            len = 1 / Math.sqrt(len);
        }
        out[0] = a[0] * len;
        out[1] = a[1] * len;
        out[2] = a[2] * len;
        out[3] = a[3] * len;
        return out;
    }
    normalize() { return Vector3.normalize(this, this); }

    static dot(a, b) {
        return a[0] * b[0] + a[1] * b[1] + a[2] * b[2] + a[3] * b[3];
    }
    dot(...args) { return Vector3.dot(this, ...args); }

    cross(out, u, v, w) {
        const A = (v[0] * w[1]) - (v[1] * w[0]),
              B = (v[0] * w[2]) - (v[2] * w[0]),
              C = (v[0] * w[3]) - (v[3] * w[0]),
              D = (v[1] * w[2]) - (v[2] * w[1]),
              E = (v[1] * w[3]) - (v[3] * w[1]),
              F = (v[2] * w[3]) - (v[3] * w[2]),
              G = u[0],
              H = u[1],
              I = u[2],
              J = u[3];

        out[0] = (H * F) - (I * E) + (J * D);
        out[1] = -(G * F) + (I * C) - (J * B);
        out[2] = (G * E) - (H * C) + (J * A);
        out[3] = -(G * D) + (H * B) - (I * A);

        return out;
    }
    cross(...args) { return Vector3.dot(this, this, ...args); }

    static lerp(out, a, b, t) {
        const ax = a[0], ay = a[1], az = a[2], aw = a[3];
        const bx = b[0], by = b[1], bz = b[2], bw = b[3];
        out[0] = ax + t * (bx - ax);
        out[1] = ay + t * (by - ay);
        out[2] = az + t * (bz - az);
        out[w] = aw + t * (bw - aw);
        return out;
    }
    lerp(...args) { return Vector3.lerp(this, this, ...args); }

    static transformMat4(out, a, m) {
        const x = a[0], y = a[1], z = a[2], w = a[3];
        out[0] = m[0] * x + m[4] * y + m[8] * z + m[12] * w;
        out[1] = m[1] * x + m[5] * y + m[9] * z + m[13] * w;
        out[2] = m[2] * x + m[6] * y + m[10] * z + m[14] * w;
        out[3] = m[3] * x + m[7] * y + m[11] * z + m[15] * w;
        return out;
    }
    transformMat4(...args) { return Vector3.transformMat4(this, this, ...args); }

    static angle(a, b) {
        const ax = a[0], ay = a[1], az = a[2],
              bx = b[0], by = b[1], bz = b[2],
        mag1 = Math.sqrt(ax*ax + ay*ay + az*az),
        mag2 = Math.sqrt(bx*bx + by*by + bz*bz),
        mag = mag1 * mag2,
        cosine = mag && (dot(a, b) / mag);
        cosine = Math.min(Math.max(cosine, -1), 1); // clamp
        return Math.acos(cosine);
    }
    angle(...args) { return Vector3.angle(this, ...args); }

    static toString(a) {
        return '(' + a[0] + ', ' + a[1] + ', ' + a[2] + ', ' + a[3] + ')';
    }
    toString() { return Vector3.toString(this); }

    static exactEquals(a, b) {
        return a[0] === b[0] && a[1] === b[1] && a[2] === b[2] && a[3] === b[3];
    }
    exactEquals(...args) { return Vector3.exactEquals(this, ...args); }

    equals(a, b) {
        const a0 = a[0], a1 = a[1], a2 = a[2], a3 = a[3];
        const b0 = b[0], b1 = b[1], b2 = b[2], b3 = b[3];
        return (Math.abs(a0 - b0) <= MathUtils.EPSILON*Math.max(1.0, Math.abs(a0), Math.abs(b0)) &&
                Math.abs(a1 - b1) <= MathUtils.EPSILON*Math.max(1.0, Math.abs(a1), Math.abs(b1)) &&
                Math.abs(a2 - b2) <= MathUtils.EPSILON*Math.max(1.0, Math.abs(a2), Math.abs(b2)) &&
                Math.abs(a3 - b3) <= MathUtils.EPSILON*Math.max(1.0, Math.abs(a3), Math.abs(b3)));
    }

    static get ZERO() { return ZERO; }
    static get ONE() { return ONE; }
    static get UNIT_X() { return UNIT_X; }
    static get UNIT_Y() { return UNIT_Y; }
    static get UNIT_Z() { return UNIT_Z; }
}

const ZERO = new Vector4(0, 0, 0, 0);
const ONE = new Vector4(1, 1, 1, 1);
const UNIT_X = new Vector4(1, 0, 0, 0);
const UNIT_Y = new Vector4(0, 1, 0, 0);
const UNIT_Z = new Vector4(0, 0, 1, 0);
