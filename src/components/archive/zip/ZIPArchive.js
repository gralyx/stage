const SIGNATURE_ECD = 0x06054b50; // PK\5\6

const _entries = [];
const _entry_map = new Map();

let _comment = undefined;

        // _entries:Vector.<ZIPEntry>;
        // _entryMap:Dictionary;

export default class ZIPArchive {
    constructor() {
    }

    // get entries() {
    //     return _entries;
    // }

    get comment() {
        return _comment;
    }

    static load() {
        let result = new ZIPArchive();

        return result;
    }

    // static load(filename) {
    //     let result = ZIPArchive();
    //     return result;
    // }
}
