const crypto = require('crypto')
const utils = require('../utils/Utils.js')
const Block = require('../block/Block.js')

class Blockchain {
  constructor () {
    this.blockchain = [Block.genesis]
  }

  get () {
    return this.blockchain
  }

  get latestBlock () {
    return this.blockchain[this.blockchain.length - 1]
  }

  isValidHashDifficulty (hash) {
    var totalCount = 0, charACount = 0

    for (var i = 0; i < hash.length; i++) {
      if (hash[i] === 'a') charACount += 1

      var numberFromHash = +hash[i]

      if (!isNaN(numberFromHash)) totalCount += numberFromHash
    }

    return utils.isPrime(totalCount) && charACount >= 10
  }

  calculateHashForBlock (block) {
    const { index, previousHash, timestamp, data, nonce } = block

    return this.calculateHash(index, previousHash, timestamp, data, nonce)
  }

  calculateHash (index, previousHash, timestamp, data, nonce) {
    const newHash = crypto
      .createHash('sha256')
      .update(index + previousHash + timestamp + JSON.stringify(data) + nonce)
      .digest('hex')

    console.log(`New hash ${newHash} calculated for ${JSON.stringify(data)}`)

    return newHash
  }

  mine (data) {
    const newBlock = this.generateNextBlock(data)

    try {
      this.addBlock(newBlock)
    } catch (error) {
      throw error
    }
  }

  generateNextBlock (data) {
    const nextIndex = this.latestBlock.index + 1
    const previousHash = this.latestBlock.hash
    let timestamp = new Date().getTime()
    let nonce = 0
    let nextHash = this.calculateHash(nextIndex, previousHash, timestamp, data, nonce)

    while (!this.isValidHashDifficulty(nextHash)) {
      nonce = nonce + 1
      timestamp = new Date().getTime()
      nextHash = this.calculateHash(nextIndex, previousHash, timestamp, data, nonce)
    }

    console.log(`New block mined!`)

    return new Block(nextIndex, previousHash, timestamp, data, nextHash, nonce)
  }

  addBlock (newBlock) {
    if (this.isValidNextBlock(newBlock, this.latestBlock)) this.blockchain.push(newBlock)
    else throw 'Error: Invalid block'
  }

  isValidNextBlock (nextBlock, previousBlock) {
    const nextBlockHash = this.calculateHashForBlock(nextBlock)

    if (previousBlock.index + 1 !== nextBlock.index) return false
    else if (previousBlock.hash !== nextBlock.previousHash) return false
    else if (nextBlockHash !== nextBlock.hash) return false
    else if (!this.isValidHashDifficulty(nextBlockHash)) return false
    else return true
  }

  isValidChain (chain) {
    if (JSON.stringify(chain[0]) !== JSON.stringify(Block.genesis)) return false

    const tempChain = [chain[0]]
    for (var i = 1; i < chain.length; i = i + 1) {
      if (this.isValidNextBlock(chain[i], tempChain[i - 1])) tempChain.push(chain[i])
      else return false
    }

    return true
  }

  isChainLonger (chain) {
    return chain.length > this.blockchain.length
  }

  replaceChain (newChain) {
    if (this.isValidChain(newChain) && this.isChainLonger(newChain)) this.blockchain = JSON.parse(JSON.stringify(newChain))
    else throw 'Error: Invalid chain'
  }
}

module.exports = Blockchain
