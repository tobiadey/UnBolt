pragma solidity >=0.4.25 <0.7.0;

// This is just an asset contract.
contract Assets {
    // state variable to keep track of the number of assets.
    uint256 public assetCount = 0;

    //allows to use id as key to find assets (basically search asset by id)
    mapping(uint256 => Asset) public assets;

    //constructor
    //executed once when a contract is created and it initialises contract state.
    constructor() public {
        createAsset("Berken Bag", 1000);
    }

    //definition of a data type of Asset using structs
    struct Asset {
        //attributes of the struct
        uint256 id;
        string assetName;
        uint256 quantity;
        bool completed;
    }

    //create an asset
    function createAsset(string memory _assetName, uint256 quantity) public {
        assetCount++;
        assets[assetCount] = Asset(assetCount, _assetName, quantity, false);
    }

    function toggleCompleted(uint _id) public {
        Asset memory _asset = assets[_id];
        _asset.completed = !_asset.completed;
        assets[_id] = _asset;
  }

// https://medium.com/coinmonks/solidity-tutorial-returning-structs-from-public-functions-e78e48efb378
    // recreating the getter for assets even thoug soloditiy provides it
    // function getAssets(uint256 _id) public  view returns (uint256 id, string memory assetName, uint256 _quantity, bool _completed) {
    //     // copy the data into memory
    //     Asset memory asset = assets[_id];
    //     // break the struct's members out into a tuple
    //     return (asset.id, asset.assetName, asset.quantity, asset.completed);
    // }

}

//To access in truffle console 
// truffle compile
// truffle migrate --reset
// truffle console

// asset = await Assets.deployed()
// assetOne = await asset.assets(1)
// assetOne.id.toNumber()