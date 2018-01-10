const Blockchain = require('./blockchain/Blockchain.js')

const thisBlockchain = new Blockchain()

const arrayToMine = [
  {
    name: 'String 1',
    value: 25
  }, {
    name: 'String 2',
    value: 47
  }, {
    name: 'String 3',
    value: 12
  }, {
    name: 'String 4',
    value: 73
  }, {
    name: 'String 5',
    value: 183
  }, {
    name: 'String 6',
    value: 22
  }, {
    name: 'String 7',
    value: 4
  }, {
    name: 'String 8',
    value: 986
  }, {
    name: 'String 9',
    value: 334
  }, {
    name: 'String 10',
    value: 55
  }, {
    name: 'String 11',
    value: 11
  }, {
    name: 'String 12',
    value: 656
  }, {
    name: 'String 13',
    value: 321
  }, {
    name: 'String 14',
    value: 693
  }, {
    name: 'String 15',
    value: 222
  }
]

arrayToMine.map(each => {
  thisBlockchain.mine(each)
})
