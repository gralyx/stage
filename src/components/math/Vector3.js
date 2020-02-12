export default class Vector3 extends Float32Array {

    constructor(...args) {
        super(3);
        if (args) {
            this.x = args && args.length > 0 ? args[0] : this.x;
            this.y = args && args.length > 1 ? args[1] : this.y;
            this.z = args && args.length > 2 ? args[2] : this.z;
        }
    }

    static clone(a) {
        const out = new Vector3();
        out[0] = a[0];
        out[1] = a[1];
        out[2] = a[2];
        return out;
    }
    static clone(...args) { return Vector3.clone(...args); }

    static copy(out, a) {
        out[0] = a[0];
        out[1] = a[1];
        out[2] = a[2];
        return out;
    }
    static copy(...args) { return Vector3.copy(...args); }

    set x(v) { this[0] = v; }
    set y(v) { this[1] = v; }
    set z(v) { this[2] = v; }
    get x() { return this[0]; }
    get y() { return this[1]; }
    get z() { return this[2]; }

    set(out, x, y, z) {
        out[0] = x;
        out[1] = y;
        out[2] = z;
        return out;
    }
    static set(...args) { return Vector3.set(this, ...args); }

    static length(a) {
        const x = a[0];
        const y = a[1];
        const z = a[2];
        return Math.hypot(x, y, z);
    }
    get length() { return Vector2.length(this); }

    static squaredLength(a) {
        const x = a[0];
        const y = a[1];
        const z = a[2];
        return x*x + y*y + z*z;
    }
    get squaredLength() { return Vector2.squaredLength(this); }

    static add(out, a, b) {
        out[0] = a[0] + b[0];
        out[1] = a[1] + b[1];
        out[2] = a[2] + b[2];
        return out;
    }

    // So you don't have to type Vector3.add(vectorVariableName, vectorVariableName, [0, 1, 0])
    // You can just type vectorVariableName.add([0, 1, 0])
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
        return out;
    }
    static mul(...args) { return Vector3.multiply(...args); }
    multiply(...args) { return Vector3.multiply(this, this, ...args); }

    static divide(out, a, b) {
        out[0] = a[0] / b[0];
        out[1] = a[1] / b[1];
        out[2] = a[2] / b[2];
        return out;
    }
    divide(...args) { return Vector3.divide(this, this, ...args); }

    static scale(out, a, b) {
        out[0] = a[0] * b;
        out[1] = a[1] * b;
        out[2] = a[2] * b;
        return out;
    }
    scale(...args) { return Vector3.scale(this, this, ...args); }

    static distance(a, b) {
        const x = b[0] - a[0];
        const y = b[1] - a[1];
        const z = b[2] - a[2];
        return Math.hypot(x, y, z);
    }
    distanceTo(...args) { return Vector3.distance(this, ...args); }

    static squaredDistance(a, b) {
        const x = b[0] - a[0];
        const y = b[1] - a[1];
        const z = b[2] - a[2];
        return x*x + y*y + z*z;
    }
    squaredDistanceTo(...args) { return Vector3.squaredDistance(this, ...args); }

    static negate(out, a) {
        out[0] = -a[0];
        out[1] = -a[1];
        out[2] = -a[2];
        return out;
    }
    negate() { return Vector3.negate(this, this); }

    inverse(out, a) {
        out[0] = 1.0 / a[0];
        out[1] = 1.0 / a[1];
        out[2] = 1.0 / a[2];
        return out;
    }
    invert() { return Vector3.inverse(this, this); }

    normalize(out, a) {
        const x = a[0];
        const y = a[1];
        const z = a[2];
        const len = x*x + y*y + z*z;
        // Optimization to only perform sqrt if it passes checks for 0
        if (len > 0) {
            len = 1 / Math.sqrt(len);
        }
        out[0] = a[0] * len;
        out[1] = a[1] * len;
        out[2] = a[2] * len;
        return out;
    }
    normalize() { return Vector3.normalize(this, this); }

    static dot(a, b) {
        return a[0] * b[0] + a[1] * b[1] + a[2] * b[2];
    }
    dot(...args) { return Vector3.dot(this, ...args); }

    cross(out, a, b) {
        const ax = a[0], ay = a[1], az = a[2];
        const bx = b[0], by = b[1], bz = b[2];

        out[0] = ay * bz - az * by;
        out[1] = az * bx - ax * bz;
        out[2] = ax * by - ay * bx;
        return out;
    }
    cross(...args) { return Vector3.dot(this, this, ...args); }

    static lerp(out, a, b, t) {
        const ax = a[0], ay = a[1], az = a[2];
        const bx = b[0], by = b[1], bz = b[2];
        out[0] = ax + t * (bx - ax);
        out[1] = ay + t * (by - ay);
        out[2] = az + t * (bz - az);
        return out;
    }
    lerp(...args) { return Vector3.lerp(this, this, ...args); }

    static transformMat4(out, a, m) {
        const x = a[0], y = a[1], z = a[2];
        const w = m[3] * x + m[7] * y + m[11] * z + m[15];
        w = w || 1.0;
        out[0] = (m[0] * x + m[4] * y + m[8] * z + m[12]) / w;
        out[1] = (m[1] * x + m[5] * y + m[9] * z + m[13]) / w;
        out[2] = (m[2] * x + m[6] * y + m[10] * z + m[14]) / w;
        return out;
    }
    transformMat4(...args) { return Vector3.transformMat4(this, this, ...args); }

    static transformMat3(out, a, m) {
        const x = a[0], y = a[1], z = a[2];
        out[0] = x * m[0] + y * m[3] + z * m[6];
        out[1] = x * m[1] + y * m[4] + z * m[7];
        out[2] = x * m[2] + y * m[5] + z * m[8];
        return out;
    }
    transformMat3(...args) { return Vector3.transformMat4(this, this, ...args); }

    static rotateAxis(out, a, b, rad, axis) {
        const p = [], r = [];
        //Translate point to the origin
        p[0] = a[0] - b[0];
        p[1] = a[1] - b[1];
        p[2] = a[2] - b[2];

        //Perform rotation
        const s = Math.sin(rad);
        const c = Math.cos(rad);

        if (axis === "x") {
            r[0] = p[0];
            r[1] = p[1]*c - p[2]*s;
            r[2] = p[1]*s + p[2]*c;
        } else if (axis === "y") {
            r[0] = p[2]*s + p[0]*c;
            r[1] = p[1];
            r[2] = p[2]*c - p[0]*s;
        } else if (axis === "z") {
            r[0] = p[0]*c - p[1]*s;
            r[1] = p[0]*s + p[1]*c;
            r[2] = p[2];

        }

        //Translate to correct position
        out[0] = r[0] + b[0];
        out[1] = r[1] + b[1];
        out[2] = r[2] + b[2];

        return out;
    }

    static rotateX(out, a, b, rad){
        return Vector3.rotateAxis(rotateAxis, "x");
    }
    rotateX(...args) { return Vector3.rotateX(this, this, ...args); }

    static rotateY(out, a, b, rad){
        return Vector3.rotateAxis(rotateAxis, "y");
    }
    rotateY(...args) { return Vector3.rotateY(this, this, ...args); }

    static rotateZ(out, a, b, rad){
        return Vector3.rotateAxis(rotateAxis, "z");
    }
    rotateZ(...args) { return Vector3.rotateZ(this, this, ...args); }

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
        return '(' + a[0] + ', ' + a[1] + ', ' + a[2] + ')';
    }
    toString() { return Vector3.toString(this); }

    static exactEquals(a, b) {
        return a[0] === b[0] && a[1] === b[1] && a[2] === b[2];
    }
    exactEquals(...args) { return Vector3.exactEquals(this, ...args); }

    equals(a, b) {
        const a0 = a[0], a1 = a[1], a2 = a[2];
        const b0 = b[0], b1 = b[1], b2 = b[2];
        return (Math.abs(a0 - b0) <= MathUtils.EPSILON*Math.max(1.0, Math.abs(a0), Math.abs(b0)) &&
                Math.abs(a1 - b1) <= MathUtils.EPSILON*Math.max(1.0, Math.abs(a1), Math.abs(b1)) &&
                Math.abs(a2 - b2) <= MathUtils.EPSILON*Math.max(1.0, Math.abs(a2), Math.abs(b2)));
    }

    static get ZERO() { return ZERO; }
    static get ONE() { return ONE; }
    static get UNIT_X() { return UNIT_X; }
    static get UNIT_Y() { return UNIT_Y; }
    static get UNIT_Z() { return UNIT_Z; }
}

const ZERO = new Vector3(0, 0, 0);
const ONE = new Vector3(1, 1, 1);
const UNIT_X = new Vector3(1, 0, 0);
const UNIT_Y = new Vector3(0, 1, 0);
const UNIT_Z = new Vector3(0, 0, 1);
