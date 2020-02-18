import 'main.css';
import Application from 'components/Application';
import cat from  "resources/cat.jpg";
import ZIPArchive from './components/archive/zip/ZIPArchive';
import ArrayHelper from './components/ArrayHelper';

function toHex(x) {
    return "0x" + x.toString(16).toUpperCase();
}
function load_file(filename, callback) {
    var xhr = new XMLHttpRequest();
    xhr.open("GET", filename, true);
    xhr.responseType = "arraybuffer";
    // xhr.responseType = "blob";
    xhr.onload = callback;
    xhr.send(null);
}

// function load_duck(event) {
//     let xhr = event.srcElement;
//     let zip = ZIPArchive.load(xhr.response);
// }

const main = async () => {
    load_file("duck.obj", (event) => {
        let xhr = event.srcElement;
        let buffer = xhr.response;
        let helper = new ArrayHelper(buffer);

        let byte = 0xff;
        let thirty_two_bits = (byte << 24 | byte << 16 | byte << 8 | byte) >>> 4;

        let s = 0xfffffff;

        // console.log(toHex(s))
        console.log(s)

        // let b = helper.read_byte();
        // let s = helper.read_ushort();
        // let i = helper.read_uint();
        // console.log(toHex(b));
        // console.log(toHex(s));
        // console.log(toHex(i));



        // console.log(i)
        // // let zip = ZIPArchive.load();
     });

    // const div = document.createElement('div');
    // div.className = 'main';
    // document.body.appendChild(div);
    // let canvas = document.getElementById("canvas");
    // document.body.appendChild(canvas);

    // const img = document.createElement('img');
    // img.src = cat;
    // img.id = 'texture-image';
    // img.width = 0;
    // img.height = 0;
    // document.body.appendChild(img);
    // window.addEventListener("load", Application);
}

main().then(() => console.log('Started'));
