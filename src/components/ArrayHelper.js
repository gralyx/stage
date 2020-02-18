let _buffer;
let _bytes;
let _position = 0;

export default class ArrayHelper {
    // Uint8Array, Uint16Array, Uint32Array
    constructor(buffer) {
        _buffer = buffer ? buffer : new ArrayBuffer();
        _bytes = new Uint8Array(buffer);
        _position = 0
    }

    get position() {
        return _position;
    }

    get size() {
        return _buffer.byteLength;
    }

    read_bool() {
        return this.read_byte() == 0;
    }

    read_byte() {
        return _position < this.size ? _bytes[_position++] : null;
    }

    read_ushort() {
        return (this.read_byte() << 8) | this.read_byte();
    }

    read_uint() {
        return ((this.read_byte() << 24) | (this.read_byte() << 16) | (this.read_byte() << 8) | this.read_byte()) >>> 0;
    }

    // static from_arrayBuffer(buffer){
    //     var buffer = new ArrayBuffer(8);
    //     var view   = new Int32Array(buffer);
    // }
}
