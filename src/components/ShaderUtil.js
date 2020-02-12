export default class ShaderUtil {
    static createShader(gl, src, type) {
        var shader = gl.createShader(type);
        gl.shaderSource(shader,src);
        gl.compileShader(shader);

        // Get Error data if shader failed compiling
        if(!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
            console.error("Error compiling shader : " + src, gl.getShaderInfoLog(shader));
            gl.deleteShader(shader);
            return null;
        }

        return shader;
    }

    static createProgram(gl, vShader, fShader, doValidate=true) {
        // Link shaders together
        var prog = gl.createProgram();
        gl.attachShader(prog, vShader);
        gl.attachShader(prog, fShader);
        gl.linkProgram(prog);

        // Check if successful
        if(!gl.getProgramParameter(prog, gl.LINK_STATUS)) {
            console.error("Error creating shader program.", gl.getProgramInfoLog(prog));
            gl.deleteProgram(prog);
            return null;
        }

        // Only do this for additional debugging.
        if(doValidate) {
            gl.validateProgram(prog);
            if(!gl.getProgramParameter(prog,gl.VALIDATE_STATUS)) {
                console.error("Error validating program", gl.getProgramInfoLog(prog));
                gl.deleteProgram(prog);
                return null;
            }
        }

        // Can delete the shaders since the program has been made.
        gl.detachShader(prog, vShader);
        gl.deleteShader(fShader);
        gl.deleteShader(vShader);

        return prog;
    }

    static shaderProgram(gl, vShaderSource, fShaderSource, doValidate=true) {
        if (!vShaderSource || !fShaderSource) return null;
        const vShader = ShaderUtil.createShader(gl, vShaderSource, gl.VERTEX_SHADER);
        const fShader = ShaderUtil.createShader(gl, fShaderSource, gl.FRAGMENT_SHADER);
        if (!vShader || !fShader) return null;

        const program = ShaderUtil.createProgram(gl, vShader, fShader, doValidate);

        return program;
    }

    static enableVertexAttribArray(gl, program, name, size, type, normalized, stride, offset) {
        const index = gl.getAttribLocation(program, name);
        gl.vertexAttribPointer(index, size, type, normalized, stride, offset);
        gl.enableVertexAttribArray(index);
    }

    static createTexture(
        gl,
        target, // target e.g. TEXTURE_2D, TEXTURE_CUBE_MAP, TEXTURE_3D(WebGL2 only)
        wrapS, // Wrapping function for s e.g. CLAMP_TO_EDGE, REPEAT, MIRRORED_REPEAT
        wrapT, // Wrapping function for t e.g. CLAMP_TO_EDGE, REPEAT, MIRRORED_REPEAT
        minFilter, // Texture minification filter e.g. LINEAR, NEAREST, NEAREST_MIPMAP_NEAREST
        magFilter // Texture magnification filter LINEAR or NEAREST
    ) {
        const texture = gl.createTexture();
        gl.bindTexture(target, texture);
        gl.texParameteri(target, gl.TEXTURE_WRAP_S, wrapS);
        gl.texParameteri(target, gl.TEXTURE_WRAP_T, wrapT);
        gl.texParameteri(target, gl.TEXTURE_MIN_FILTER, minFilter);
        gl.texParameteri(target, gl.TEXTURE_MAG_FILTER, magFilter);

        return texture;
    }
}
