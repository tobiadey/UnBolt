pragma solidity >=0.4.25 <0.7.0;

// This is just an asset contract.
contract Assets {
    // state variable to keep track of the number of assets.
    uint256 public assetCount = 0;


    //allows to use id as key to find assets & tasks (basically search asset by id)
    mapping(uint256 => Asset) public assets;

    //constructor, execultes when code is run
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


    function createAsset(string memory _assetName, uint256 quantity) public {
        assetCount++;
        assets[assetCount] = Asset(assetCount, _assetName, quantity, false);
    }

}
