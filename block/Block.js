class Block {
  constructor (index, previousHash, timestamp, data, hash, nonce) {
    this.index = index
    this.previousHash = previousHash
    this.timestamp = timestamp
    this.data = data
    this.hash = hash
    this.nonce = nonce
  }

  static get genesis() {
    return new Block(
      0,
      '0',
      1515609704968,
      { name: 'Genesis Block', value: 0 },
      '1d79e9eef321cac0aa8f73d1245a5604a8a665e6daacf64d1b9843e2ab98fa29',
      745
    )
  }
}

module.exports = Block
