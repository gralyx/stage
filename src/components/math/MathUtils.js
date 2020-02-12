export default class MathUtils {

    static get EPSILON() { 0.000001; }

    static toRadians(degrees) {
        return degrees * Math.PI / 180;
    }

    static toDegrees(radians) {
        return radians * 180 / Math.PI;
    }
}
