import MathUtils from "./MathUtils";

export default class Vector2 extends Float32Array {

    constructor(...args) {
        super(2);
        if (args) {
            this.x = args && args.length > 0 ? args[0] : this.x;
            this.y = args && args.length > 1 ? args[1] : this.y;
        }
    }

    static clone(a) {
        return new Vector2(a[0], a[1]);
    }

    static copy(out, a) {
        out[0] = a[0];
        out[1] = a[1];
        return out;
    }

    static set (out, x, y) {
        out[0] = x;
        out[1] = y;
        return out;
    }

    static get ZERO() { return ZERO; }
    static get ONE() { return ONE; }
    static get UNIT_X() { return UNIT_X; }
    static get UNIT_Y() { return UNIT_Y; }

    set x(v) { this[0] = v; }
    set y(v) { this[1] = v; }
    get x() { return this[0]; }
    get y() { return this[1]; }

    static length(a) {
        const x = a[0];
        const y = a[1];
        return Math.hypot(x, y);
    }
    get length() { return Vector2.length(this); }

    static squaredLength(a) {
        const x = a[0];
        const y = a[1];
        return x*x + y*y;
    }
    get squaredLength() { return Vector2.squaredLength(this); }

    static add(out, a, b) {
        out[0] = a[0] + b[0];
        out[1] = a[1] + b[1];
        return out;
    }
    add(...args) { return Vector2.add(this, this, ...args); }

    static subtract(out, a, b) {
        out[0] = a[0] - b[0];
        out[1] = a[1] - b[1];
        return out;
    }
    static sub(...args) { return Vector2.subtract(...args); }
    subtract(...args) { return Vector2.subtract(this, this, ...args); }

    static multiply(out, a, b) {
        out[0] = a[0] * b[0];
        out[1] = a[1] * b[1];
        return out;
    }
    static mul(...args) { return Vector2.multiply(...args); }
    multiply(...args) { return Vector2.multiply(this, this, ...args); }

    static divide(out, a, b) {
        out[0] = a[0] / b[0];
        out[1] = a[1] / b[1];
        return out;
    }
    divide(...args) { return Vector2.divide(this, this, ...args); }

    static scale(out, a, b) {
        out[0] = a[0] * b;
        out[1] = a[1] * b;
        return out;
    }
    scale(...args) { return Vector2.scale(this, this, ...args); }

    static distance(a, b) {
        const x = b[0] - a[0];
        const y = b[1] - a[1];
        return Math.hypot(x, y);
    }
    distanceTo(...args) { return Vector2.distance(this, ...args); }

    static squaredDistance(a, b) {
        const x = b[0] - a[0];
        const y = b[1] - a[1];
        return x*x + y*y;
    }
    squaredDistanceTo(...args) { return Vector2.squaredDistance(this, ...args); }

    static negate(out, a) {
        out[0] = -a[0];
        out[1] = -a[1];
        return out;
    }
    negate() { return Vector2.negate(this, this); }

    static inverse(out, a) {
        out[0] = 1.0 / a[0];
        out[1] = 1.0 / a[1];
        return out;
    }
    invert() { return Vector2.inverse(this, this); }

    static normalize(out, a) {
        const x = a[0];
        const y = a[1];
        const len = x*x + y*y;
        // Optimization to only perform sqrt if it passes checks for 0
        if (len > 0) {
            len = 1 / Math.sqrt(len);
        }
        out[0] = a[0] * len;
        out[1] = a[1] * len;
        return out;
    }
    normalize() { return Vector2.normalize(this, this); }

    static dot(a, b) {
        return a[0] * b[0] + a[1] * b[1];
    }
    dot(...args) { return Vector2.dot(this, ...args); }

    static cross(out, a, b) {
        const z = a[0] * b[1] - a[1] * b[0];

        out[0] = 0;
        out[1] = 0;
        out[2] = z;
        return out;
    }
    cross(...args) { return Vector2.dot(this, this, ...args); }

    static lerp(out, a, b, t) {
        const ax = a[0], ay = a[1],
              bx = b[0], by = b[1];
        out[0] = ax + t * (bx - ax);
        out[1] = ay + t * (by - ay);
        return out;
    }
    lerp(...args) { return Vector2.lerp(this, this, ...args); }

    static transformMat2(out, a, m) {
        const x = a[0], y = a[1];
        const x0 = m[0], x1 = a[1],
              y0 = m[2], y1 = a[3];
        out[0] = x0 * x + y0 * y;
        out[1] = x1 * x + y1 * y;
        return out;
    }
    transformMat2(...args) { return Vector2.transformMat2(this, this, ...args); }

    static transformMat3(out, a, m) {
        const x = a[0], y = a[1];
        const x0 = m[0], x1 = m[1],
              y0 = m[3], y1 = m[4],
              z0 = m[6], z1 = m[7];
        out[0] = x0 * x + y0 * y + z0;
        out[1] = x1 * x + y1 * y + z1;
        return out;
    }
    transformMat3(...args) { return Vector2.transformMat3(this, this, ...args); }

    static transformMat4(out, a, m) {
        const x = a[0], y = a[1];
        const x0 = m[0],  x1 = m[1],
              y0 = m[4],  y1 = m[5],
              w0 = m[12], w1 = m[13];
        out[0] = x0 * x + y0 * y + w0;
        out[1] = x1 * x + y1 * y + w1;
        return out;
    }
    transformMat4(...args) { return Vector2.transformMat4(this, this, ...args); }

    /**
     * Rotate a 2D vector
     * @param {Vector2} out The receiving Vector2
     * @param {Vector2} a The Vector2 point to rotate
     * @param {Vector2} b The origin of the rotation
     * @param {Number} rad The angle of rotation in radians
     * @returns {Vector2} out
     */
    static rotate(out, a, b, rad) {
        //Translate point to the origin
        const p0 = a[0] - b[0],
              p1 = a[1] - b[1];
        const s = Math.sin(rad);
        const c = Math.cos(rad);

        //Perform rotation and translate to correct position
        out[0] = p0*c - p1*s + b[0];
        out[1] = p0*s + p1*c + b[1];

        return out;
    }
    rotate(...args) { return Vector2.rotate(this, ...args); }

    static toString(a) {
        return '(' + a[0] + ', ' + a[1] + ')';
    }
    toString() { return Vector2.toString(this); }

    static exactEquals(a, b) {
        return a[0] === b[0] && a[1] === b[1];
    }
    exactEquals() { return Vector2.exactEquals(this, b); }

    equals(a, b) {
        const ax = a[0], ay = a[1];
        const bx = b[0], by = b[1];
        return (Math.abs(ax - bx) <= MathUtils.EPSILON*Math.max(1.0, Math.abs(ax), Math.abs(bx)) &&
                Math.abs(ay - by) <= MathUtils.EPSILON*Math.max(1.0, Math.abs(ay), Math.abs(by)));
    }

}

const ZERO = new Vector2(0, 0);
const ONE = new Vector2(1, 1);
const UNIT_X = new Vector2(1, 0);
const UNIT_Y = new Vector2(0, 1);
