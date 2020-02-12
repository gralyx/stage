export default function GLInstance(canvasId) {
    const canvas = document.getElementById(canvasId);
    const gl = canvas.getContext('webgl2');

    if (!gl) {
        console.log('WebGL2 not supported, falling back on webgl');
        gl = canvas.getContext('webgl');

        if (!gl) {
            console.log('WebGL not supportedm, falling back on experimental-webgl');
            gl = canvas.getContext('experimental-webgl');

            if (!gl) {
                console.log('Your browser does not support WebGL');
                return null;
            }
        }
    }

    gl.clearColor(0.75, 0.85, 0.8, 1.0);

    gl.fClear = function () { this.clear(this.COLOR_BUFFER_BIT | this.DEPTH_BUFFER_BIT); return this; }

    gl.fCreateArrayBuffer = function(floatArray, isStatic=true) {
        const buf = this.createBuffer();
        this.bindBuffer(this.ARRAY_BUFFER, buf);
        this.bufferData(this.ARRAY_BUFFER, floatArray, isStatic ? this.STATIC_DRAW : this.DYNAMIC_DRAW );

        return buf;
    }

    gl.fSetSize = function(w, h) {
        this.canvas.style.width = w + "px";
        this.canvas.style.height = h + "px";
        this.canvas.width = w;
        this.canvas.height = h;

        gl.viewport(0, 0, w, h);

        return gl;
    }

    return gl;
}
