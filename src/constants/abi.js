// store the abi in here for easy access and keep code clean
module.exports = {
  abi: [
    {
      inputs: [],
      payable: false,
      stateMutability: 'nonpayable',
      type: 'constructor',
      constant: undefined
    },
    {
      constant: true,
      inputs: [],
      name: 'assetCount',
      outputs: [Array],
      payable: false,
      stateMutability: 'view',
      type: 'function',
      signature: '0xeafe7a74'
    },
    {
      constant: true,
      inputs: [Array],
      name: 'assets',
      outputs: [Array],
      payable: false,
      stateMutability: 'view',
      type: 'function',
      signature: '0xcf35bdd0'
    },
    {
      constant: false,
      inputs: [Array],
      name: 'createAsset',
      outputs: [],
      payable: false,
      stateMutability: 'nonpayable',
      type: 'function',
      signature: '0xdb9cc410'
    }
  ]
}
