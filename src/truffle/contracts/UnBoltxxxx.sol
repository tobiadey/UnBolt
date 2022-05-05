// // SPDX-License-Identifier: GPL-3.0
// pragma solidity >=0.8.7;
// // pragma experimental ABIEncoderV2;


// //This is an asset contract.
// contract Assets{
//     uint256 public assetCount = 0; //state variable to keep track of the number of assets.
//     Asset[] public assets; //allows to use id as key to find assets (basically search asset by id)

//     constructor() { 
//         createAssets(["Berken Bag", "PS4", "Iphone 6"], [1000, 4500, 6500]);
//     }

//     //definition of a data type of Asset using structs
//     struct Asset {
//         //attributes of the struct
//         uint256 id;
//         string assetName; 
//         uint256 quantity;
//         bool completed;
//         address creator;
//     }
   
//     //creation of events
//     event AssetCreated(uint256 indexed id,string indexed _assetName, uint256 _quantity, bool completed,address indexed creator);
//     event CompletedAssetValueChanged(bool indexed newValue); 

//     function createAssets(string[3] memory _assetNames, uint16[3] memory _quantities) public returns (bool) {
//         uint256  assetLength = _assetNames.length;
//         require(assetLength == _quantities.length, "Wrong client data");
//         require(assetLength < 10, "Wrong number of assets");

//         for(uint8 i=0; i < assetLength;) {

//             createAsset(_assetNames[i], _quantities[i]);
//             unchecked {
//                 // There is neve going where it underflows 
//                 // There is never going to be where it overflow 
//                 i++;
//             }

//         }
//         return true;

//     }

//     // Re-entrancy 
//     function createAsset(string memory _assetName, uint256 _quantity) public returns (bool){
//         // Checks
//         // Effects 
//         Asset memory newAsset;
//         newAsset.id = assetCount;
//         newAsset.assetName = _assetName;
//         newAsset.quantity = _quantity;
//         newAsset.creator = msg.sender;
//         // Always use a language default values for pimitives to your advantage
//         assets.push(newAsset);
//         // Interaction
//        assetCount++;
        
//         //emit event to stack
//         emit AssetCreated(
//             newAsset.id,
//             newAsset.assetName,
//             newAsset.quantity,
//             newAsset.completed,
//             newAsset.creator
//         );
//         return true;
//     }

//     //change the toggle completed variable to the opposide of current value
//     // should only works if all tasks associated with the asset are completed (need to work on this!)
//     function toggleAssetCompleted(uint256 _id) public returns (bool newCompletionStatus){
//         require(assets.length >= _id, "Id not created");
//         Asset memory _asset = assets[ _id - 1];
//         newCompletionStatus = !_asset.completed;
//         _asset.completed = newCompletionStatus;
//         assets[_id - 1] = _asset;
//         emit CompletedAssetValueChanged(newCompletionStatus);
//     }

// }


// contract Tasks is Assets { 
//     uint256 public taskCount = 0;
//     Task[] public tasks;
//     mapping(uint256 => Task[]) public assetTaskMap;

//     //constructor - executed once when a contract is created and it initialises contract state.
//     constructor() {
//         createTask( "Source Leather","Make sure it is the best quality mushroom leather",1,0x5E7b2Bbb14B8a9097A26A93982624067A1dB11dE);
//         createTask( "Transport to Factory","Make to deliver before 2/03/2022",1,0x5E7b2Bbb14B8a9097A26A93982624067A1dB11dE);
//         createTask( "Assemble the plastic","Make sure to use blue plastic!",3,0x5B38Da6a701c568545dCfcB03FcB875f56beddC4);
//     }

//     //definition of a data type of Task using structs
//     struct Task {
//         //attributes of the struct
//         uint256 id;
//         string content;
//         string creator_note; //the task creators message 
//         string intermediary_note; // the signators message (e.g message on why things are behind schedule)
//         bool completed;
//         address signator;
//         Asset asset; //an Asset object/struct what is associated with the task
//     }

//     event Sender(address indexed who, address indexed signator );
//     event TaskCreated(uint indexed id,address indexed who, string indexed content);
//     event CompletedTaskValueChanged(bool indexed newValue);


//     //create a task
//     function createTask(string memory _taskContent, string memory _note, uint256 _assetId, address _signator) public returns (bool){        
        
//         //get asset assoicated with current task and make sure 
//         //the function is being called by the asset creator
//         Asset memory currAsset;  //create empty temporary Asset
//         currAsset = assets[_assetId-1]; //get the associated asset value to store temporary asset
//         require(msg.sender == currAsset.creator, "This function is restricted to the asset creator"); 

//         taskCount++;
//         //create an empty temporary Task object adding the function paramenter values to it then
//         //it is pushed into the the array of assets
//         Task memory newTask; 
//         newTask.id = taskCount;
//         newTask.content = _taskContent;
//         newTask.creator_note = _note;
//         newTask.intermediary_note = '';
//         newTask.completed = false;
//         newTask.signator = _signator;
//         newTask.asset = assets[_assetId-1];
//         tasks.push(newTask); // Push the newTask struct into the task array

//         // map newly created task to its associated assed based on the "_assedID"
//         assetTaskMap[_assetId-1].push(newTask); // each assetid maps to a task[]

//         emit TaskCreated(newTask.id,newTask.signator,newTask.content);
//         return true;
//     }


//     //get all tasks associated with a certain asset (by using assetID)
//    function getAssetTasks( uint256 _assetID) public view returns (Task[] memory _tasks){
//         _tasks = assetTaskMap[_assetID-1];
//     }


//     // add a message for a task being perfromed (signators message)
//     function addDescription(uint256 _id, string memory _note ) public {
//         Task memory _task = tasks[_id - 1];
//         require(msg.sender == _task.signator, "This function is restricted to the signator");
//         _task.intermediary_note = _note;
//         tasks[_id - 1 ] = _task;
//         emit Sender(msg.sender,_task.signator);
//     }

//     //change the toggle completed variable to the opposide of current value
//     function toggleTaskCompleted(uint _id) public returns (bool completionStatus){
//         Task memory _task = tasks[_id-1];
//         require(msg.sender == _task.signator, "This function is restricted to the signator");
//         completionStatus = !_task.completed;
//         _task.completed = completionStatus;
//         tasks[ _id - 1] = _task;

//         emit CompletedTaskValueChanged(completionStatus);
//     }
// }