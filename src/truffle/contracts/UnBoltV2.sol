// SPDX-License-Identifier: GPL-3.0
pragma solidity >=0.8.7;
// pragma experimental ABIEncoderV2;

//This is an asset contract.
contract Assets{
    uint256 public assetCount = 1; //state variable to keep track of the number of assets.
    Asset[] public assets; //allows to use id as key to find assets (basically search asset by id)
    
    // //mappping each address  with an array of assets (assets each user has created)
    mapping(address => Asset[]) public userAssetMap;

    //constructor - executed once when a contract is created and it initialises contract state.
    constructor () payable { 
        // createAssets(
        //     ["Berken Bag", "PS4", "Iphone 6","Xbox 1","Issey Miyake Top"],
        //     ["Pink Bag", "Blue Ps4", "Pink Iphone", "500GB", "Home Plissee jacket"],
        //     [1000, 4500, 6500,1500,19000]
        //     );
    }

    //definition of a data type of Asset using structs
    struct Asset {
        //attributes of the struct
        uint256 id;
        string assetName; 
        string description; 
        uint256 creationTime;
        uint256 completionTime;
        // enum Status; 
        uint256 quantity;
        bool completed;
        address creator;
    }
   
    //creation of events
    event AssetCreated(uint256 indexed id,string indexed _assetName, string _description,uint256 _quantity, bool completed,address indexed creator);
    event CompletedAssetValueChanged(bool indexed newValue); 


    //create multiple assets at once. 
    //Used inn constructor but cann also be implemnted onn front end, 
    //this is one call and saves gas rather than using 5 seperate calls to create asset
   function createAssets(string[5] memory _assetNames,string[5] memory _description ,uint16[5] memory _quantities) public returns (bool) {
        uint256  assetLength = _assetNames.length;
        require(assetLength == _quantities.length, "Wrong client data");
        require(assetLength < 10, "Wrong number of assets");

        for(uint8 i=0; i < assetLength;) {
            
        createAsset(_assetNames[i],_description[i], _quantities[i]);
        unchecked {
            // There is neve going where it underflows 
            // There is never going to be where it overflow 
            ++i;
        }

        }
        return true;
    }

    //create an asset
    function createAsset(string memory _assetName,string memory _description, uint256 _quantity) public returns (bool){
        // Checks
        // Effects 
        Asset memory newAsset; //an empty temporary Asset object
        // adding the function paramenter values to it then
        newAsset.id = assetCount;
        newAsset.assetName = _assetName;
        newAsset.description = _description;
        newAsset.creationTime = block.timestamp; //store the unix timestamp of when this function was called
        newAsset.quantity = _quantity;
        // newAsset.completed = false; // using solidity language default value for primitives to my advantage
        newAsset.creator = msg.sender;
        assets.push(newAsset); // Push the newAsset struct into the asset array
        userAssetMap[msg.sender].push(newAsset);  // Push the newAsset struct into the asset array related to an eth address
        // Interaction
        ++assetCount;

        //emit event to stack
        emit AssetCreated(
            newAsset.id,
            newAsset.assetName,
            newAsset.description,
            newAsset.quantity,
            newAsset.completed,
            newAsset.creator
            );

        return true;
    }

    function getAssets() public view returns (Asset[] memory){
        return assets;
    }

    // try calling userAssetMap on it own in front end and see if each idnex is needed!!
    function getUserAssets(address _userAddress) public view returns (Asset[] memory){
        Asset[] memory tempAsset;
        tempAsset = userAssetMap[_userAddress];

        return tempAsset;
    }


    //toggle multiple assets at once. 
    //this is one call and saves gas rather toggling assets complete once at a time
   function toggleAssetsCompleted(uint256[] memory _assetIds) public returns (bool) {
        uint256  assetLength = _assetIds.length;
        require(assetLength < 6, "Too many assets selected");

        for(uint8 i=0; i < assetLength;) {
            
        toggleAssetCompleted(_assetIds[i]);
        unchecked {
            // There is neve going where it underflows 
            // There is never going to be where it overflow 
            ++i;
        }

        }
        return true;
    }

    //change the toggle completed variable to the opposide of current value
    // should only works if all tasks associated with the asset are completed (need to work on this!)
    function toggleAssetCompleted(uint256 _id) public returns (bool newCompletionStatus){
        require(assets.length >= _id, "Id not created");
        Asset memory _asset = assets[ _id - 1];
        newCompletionStatus = !_asset.completed;
        _asset.completed = newCompletionStatus;
        assets[_id - 1] = _asset;

        // find the index of the asset in the userAssetMap
        Asset[] memory _allAssets = getUserAssets(msg.sender);
        uint8 index = 0;
        for (index; index < _allAssets.length-1; index++) {
            if (_allAssets[index].id == _id) {
                index = index;
                break;
            } 
        }
        //make these changes in the userAssetMap
        // userAssetMap[msg.sender][0] = _asset;
        userAssetMap[msg.sender][index] = _asset;

      

        //toggle asset complete in the userAssetMap
        emit CompletedAssetValueChanged(newCompletionStatus);
    }

}

//This is just a task contract.
// Tasks which inherts from Assets (all functions and variables from Assets can be accessed int Tasks)
contract Tasks is Assets{ //make assets the parent contract
    uint256 public taskCount = 1;//state variable to keep track of the number of assets.
    Task[] public tasks;//allows to use id as key to find tasks (basically search task by id)

    //mappping each asset (id) with an array of Tasks it is made up of
    mapping(uint256 => Task[]) public assetTaskMap;

    //constructor - executed once when a contract is created and it initialises contract state.

      constructor () payable { 
        // createTasks(
        //     ["Source Leather", "Transport to Factory", "Assemble the plastic"],
        //     ["Make sure it is the best quality mushroom leather", "Make to deliver before 2/03/2022", "Make sure to use blue plastic!"],
        //     [1, 1, 3],
        //     [0x5E7b2Bbb14B8a9097A26A93982624067A1dB11dE, 0x5E7b2Bbb14B8a9097A26A93982624067A1dB11dE,0x5B38Da6a701c568545dCfcB03FcB875f56beddC4]
        //     );
    }

    //definition of a data type of Task using structs
    struct Task {
        //attributes of the struct
        uint256 id;
        string content;
        string creator_note; //the task creators message 
        string intermediary_note; // the signators message (e.g message on why things are behind schedule)
        uint256 creationTime;
        uint256 completionTime;
        bool completed;
        address signator;
        Asset asset; //an Asset object/struct what is associated with the task
    }

    event Sender(address indexed who, address indexed signator );
    event TaskCreated(uint indexed id,address indexed who, string indexed content);
    event CompletedTaskValueChanged(bool indexed newValue);

    //create multiple tasks at once. 
    //Used in constructor but cann also be implemnted onn front end, 
    //this is one call and saves gas rather than using 3 seperate calls to create tasks
    function createTasks(string[3] memory _taskContents,string[3] memory _notes ,uint8[3] memory _assetIds, address[3] memory _adresses) public returns (bool) {
        uint256  taskLength = _taskContents.length;
        require(taskLength == _assetIds.length, "Wrong client data");
        require(taskLength < 5, "Wrong number of tasks");

        for(uint8 i=0; i < taskLength;) {
            createTask(_taskContents[i],_notes[i], _assetIds[i], _adresses[i]);
            unchecked {
                // There is neve going where it underflows 
                // There is never going to be where it overflow 
                ++i;
            }

        }
    return true;
    }

    //create a task
    function createTask(string memory _taskContent,string memory _note, uint256 _assetId, address _signator) public returns (bool){        
        
        //get asset assoicated with current task and make sure 
        //the function is being called by the asset creator
        Asset memory currAsset;  //create empty temporary Asset
        currAsset = assets[_assetId-1]; //get the associated asset value to store temporary asset
        // require(msg.sender == currAsset.creator, "This function is restricted to the asset creator"); 

        //create an empty temporary Task object adding the function paramenter values to it then
        //it is pushed into the the array of assets
        Task memory newTask; 
        newTask.id = taskCount;
        newTask.content = _taskContent;
        newTask.creator_note = _note;
        // newTask.intermediary_note = '';
        newTask.creationTime = block.timestamp;
        // newTask.completed = false;
        newTask.signator = _signator;
        newTask.asset = assets[_assetId-1];
        tasks.push(newTask); // Push the newTask struct into the task array
        // map newly created task to its associated assed based on the "_assedID"
        assetTaskMap[_assetId-1].push(newTask); // each assetid maps to a task[]
        taskCount++;

        emit TaskCreated(
            newTask.id,
            newTask.signator,
            newTask.content
            );
        return true;
    }

    // //get all tasks 
    // function getAllTasks() public view returns (Task[] memory){
    //     return tasks;
    // }

    //get all tasks associated with a certain asset (by using assetID)
   function getAssetTasks( uint256 _assetID) public view returns (Task[] memory){
        Task[] memory _tasks = assetTaskMap[_assetID-1];
        return _tasks;
    }

    // add a message for a task being perfromed (signators message)
    function addDescription(uint _TaskId,string memory _note ) public returns (bool){
        Task memory _task = tasks[_TaskId-1];
        emit Sender(
            msg.sender,
            _task.signator
            );
        require(msg.sender == _task.signator, "This function is restricted to the signator");

        _task.intermediary_note = _note;
        tasks[_TaskId-1] = _task;

        //make same change inn assetTaskMap
        // find the index of the task in the assetTaskMap
        Task[] memory _allTasks = getAssetTasks(_task.asset.id);
        uint8 index = 0;
        for (index; index < _allTasks.length-1; index++) {
            if (_allTasks[index].id == _TaskId) {
                index = index;
                break;
            } 
        }
        //make these changes in the asset task map
        // assetTaskMap[_task.asset.id][0] = _task;
        assetTaskMap[_task.asset.id-1][index] = _task;


        
        return true;
    }

    //change the toggle completed variable to the opposide of current value
    function toggleTaskCompleted(uint _id) public returns (bool){
        Task memory _task = tasks[_id-1];
        // require(msg.sender == _task.signator, "This function is restricted to the signator");
        _task.completed = !_task.completed;
        tasks[_id-1] = _task;


        // find the index of the task in the assetTaskMap
        Task[] memory _allTasks = getAssetTasks(_task.asset.id);
        uint8 index = 0;
        for (index; index < _allTasks.length-1; index++) {
            if (_allTasks[index].id == _id) {
                index = index;
                break;
            } 
        }
        //make these changes in the asset task map
        // assetTaskMap[_task.asset.id][0] = _task;
        assetTaskMap[_task.asset.id-1][index] = _task;

      
        // // Task[] memory _allTasks = getAssetTasks(_task.asset.id);
        
        

        emit CompletedTaskValueChanged(!_task.completed);
        return !_task.completed;  // retruns the new value 
    }
}

//when a contract inherits from these two only 1 contract is created on the blockchain which is this one
contract Unbolt is Tasks{  //inheritance

    constructor () payable { 
        createAssets(
            ["Berken Bag", "PS4", "Iphone 6","Xbox 1","Issey Miyake Top"],
            ["Pink Bag", "Blue Ps4", "Pink Iphone", "500GB", "Home Plissee jacket"],
            [1000, 4500, 6500,1500,19000]
        );
        // createTask("contennt", "note", 1, 0x5B38Da6a701c568545dCfcB03FcB875f56beddC4);
        createTasks(
            ["Source Leather", "Transport to Factory", "Assemble the plastic"],
            ["Make sure it is the best quality mushroom leather", "Make to deliver before 2/03/2022", "Make sure to use blue plastic!"],
            [1, 1, 3],
            [0x5E7b2Bbb14B8a9097A26A93982624067A1dB11dE, 0x5E7b2Bbb14B8a9097A26A93982624067A1dB11dE,0x5B38Da6a701c568545dCfcB03FcB875f56beddC4]
        );
    }


}

// unbolt = await Tasks.deployed()
// unbolt = await Unbolt.deployed()

// 0xA169AcB9061aEAd2a8A6B06ffE008F75f3d70b70



// https://ethereum.stackexchange.com/questions/25968/how-do-i-control-compiler-settings-with-truffle
// "Unbolt" ran out of gas. Something in the constructor (ex: infinite loop) caused gas estimation to fail. Try:
//    * Making your contract constructor more efficient (done)
//    * Setting the gas manually in your config or as a deployment parameter
//    * Using the solc optimizer settings in 'truffle-config.js' (done)
//    * Setting a higher network block limit if you are on a
//      private network or test client (like ganache).