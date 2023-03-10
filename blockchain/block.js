const SHA256 = require('crypto-js/sha256');

class Block {
    constructor(timestamp, lastHash, hash, data) { // create block
        this.timestamp = timestamp;
        this.lastHash = lastHash;
        this.hash = hash;
        this.data = data;
    }

    static genesis() {
        return new this('Genesis time', '-----', 'f1r57-h45h', []); // create genesis block
    }

    static hash(timestamp, lastHash, data) {
        return SHA256(`${timestamp}${lastHash}${data}`).toString(); // hash the data
    }

    static mineBlock(lastBlock, data) {
        const timestamp = Date.now(); // get current time
        const hash = Block.hash(timestamp, lastBlock.hash, data); // hash the data
        const lastHash = lastBlock.hash;

        return new this(timestamp, lastHash, hash, data); // create new block
    }

    static blockHash(block) { // hash the block
        const { timestamp, lastHash, data } = block;
        return Block.hash(
            timestamp,
            lastHash,
            data
        );
    }

    toString() {
        return `Block -
      Timestamp : ${this.timestamp}
      Last Hash : ${this.lastHash.substring(0, 10)}
      Hash      : ${this.hash.substring(0, 10)}
      Data      : ${this.data}`;
    }
}


module.exports = Block;