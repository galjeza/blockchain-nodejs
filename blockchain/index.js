const Block = require('./block');

class Index {
  constructor() {
    this.chain = [Block.genesis()]; // create genesis block
  }

  addBlock(data) {
    const lastBlock = this.chain[this.chain.length - 1]; // get last block
    const block = Block.mineBlock(lastBlock, data); // create new block
    this.chain.push(block); // add new block to chain
    return block;
  }

    isValidChain(chain) {
    if (JSON.stringify(chain[0]) !== JSON.stringify(Block.genesis())) { // check if genesis block is valid
      return false;
    }

    for (let i = 1; i < chain.length; i++) { // check if all other blocks are valid
        const block = chain[i];
        const lastBlock = chain[i - 1];

        if (block.lastHash !== lastBlock.hash || block.hash !== Block.blockHash(block)) {  // Preveri če je hash bloka enak hashu prejšnjega bloka in če je hash bloka enak hashu bloka
            return false;
        }

    }

    return true;
  }

  replaceChain(newChain) {
    if (newChain.length <= this.chain.length) { // Preveri če je nova veriga daljša od trenutne
      console.log('Dobljena veriga ni daljša od trenutne verige.');
      return;
    } else if (!this.isValidChain(newChain)) { // Preveri če je nova veriga veljavna
      console.log('Dobljena veriga ni veljavna.');
      return;
    }

    console.log('Veriga je zamenjana z novo verigo.');
    this.chain = newChain; // Nadomesti trenutno verigo z novo če je nova veriga daljša in veljavna
  }
}


module.exports = Index;