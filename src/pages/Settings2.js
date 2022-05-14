import logo from '../logo.svg';
import Button from '../components/Button'
import './Settings.css';
import {Link} from 'react-router-dom'
import { useMoralis } from "react-moralis";
import { useState, useEffect } from 'react'
import DeleteIcon from '@mui/icons-material/Delete';
import Table from '../components/Table'
import IntermediaryTable from '../components/IntermediaryTable';


// this is a handler for the about page
const Settings2 = () => {
  
   // The useMoralis hook provides all the basics functionalities that is needed for authentication and user data.
   const {user,Moralis, setUserData,useMoralisQuery } = useMoralis();

  // state hooks to know which body to use for the dashbaord
  const [username, setUsername] = useState(user.get('username'));
  const [intermediaryName, setIntermediaryName] = useState('');
  const [intermediaryAddress, setIntermediaryAddress] = useState('');
  const [intermediaryID, setIntermediaryID] = useState('');
  const [intermediary, setIntermediary] = useState({});
  const [toggleAdd, setToggleAdd] = useState(false);
  const [toggleView, setToggleView] = useState(false);
  const [buttonTextAdd, setButtonTextAdd] = useState('Add');
  const [buttonTextView, setButtonTextView] = useState('View Exisiting Intermediaries');
  const [intermediaryList, setIntermediaryList]= useState([])


  useEffect(() => {
    const loadPage = async () => {

      try {

        if (toggleAdd == true) {
            setButtonTextAdd('Close')
          } else{
            setButtonTextAdd('Add')
          }
          if (toggleView == true) {
            setButtonTextView('Close')
          } else{
            setButtonTextView('View Exisiting Intermediaries')
          }
      
          if(intermediaryList.length == 0 ){
              await setTimeout(function() { getAllIntermediaries(); }, 1000);
              // await getAllIntermediaries();
              
          }
  
      } catch (error) {
        console.log(error);
      }
    }
    // call the function loadPage on each render of the page
    loadPage()
  },[toggleAdd,toggleView,buttonTextAdd,buttonTextView]);


  async function  onSubmit(e){
    //user is changing it all

    if(intermediaryID != "None" && intermediaryID !=""){
        //find the intermediary associated with this id 
        // creating a new subclass of of an Intermediary Object.
        const Intermediary = Moralis.Object.extend("Intermediary");
        //query the Intermediary table where users equal the logged in user and return the users column
        const query = new Moralis.Query(Intermediary);
        query.equalTo("objectId", intermediaryID);
        // this returns an array of users that have been added as intermediaries
        const result = await query.find();
        // alert("Successfully retrieved " + results.length + " intermediaries.");
        //set the state hook intermediaryList to the list returned
        console.log(result[0]);
        // setIntermediaryList(results)

        console.log(intermediaryID);


        removeRelationship(result[0])
        // alert('Relationship ended :(')

    }else{
        alert('no intermediary has been selected')
    }
  }

  async function getAllIntermediaries(){
    setToggleView(!toggleView)
    // creating a new subclass of of an Intermediary Object.
    const Intermediary = Moralis.Object.extend("Intermediary");
    //query the Intermediary table where users equal the logged in user and return the users column
    const query = new Moralis.Query(Intermediary);
    query.equalTo("users", Moralis.User.current());
    // this returns an array of users that have been added as intermediaries
    const results = await query.find();
    // alert("Successfully retrieved " + results.length + " intermediaries.");
    //set the state hook intermediaryList to the list returned
    setIntermediaryList(results)
    // Do something with the returned Moralis.Object values
    for (let i = 0; i < results.length; i++) {
      const object = results[i];
      // alert(object.id + " - " + object.get("ownerName"));
    //   console.log(object);
    //   console.log(object.get("user") + " created intermediary relationship with " + object.get("name"));
    }
  }

  async function removeRelationship(_intermediary){
    //remove relationship in intermediary table
    const intermediary = _intermediary
    const relation1 = intermediary.relation("users")
    relation1.remove(Moralis.User.current())
    const result1 = await intermediary.save();
    console.log(result1);

    //remove relationship in user table
    const user = Moralis.User.current();
    const relation = user.relation("Intermediaries");
    relation.remove(_intermediary);
    const result = await user.save();
    console.log(result);
    console.log("Relationship removed");
  }

  async function createRelationship(_intermediary){
    //add relation in the intermediary table as users
    const intermediary = _intermediary
    const relation1 = intermediary.relation("users")
    relation1.add(Moralis.User.current());
    const result1 = await intermediary.save();
    console.log(result1);

    // add the realtion in the users table as Intermediaries
    const user = Moralis.User.current();
    const relation = user.relation("Intermediaries");
    relation.add(_intermediary);
    const result = await user.save();
    console.log(result);
  }

//   return (
//     <div className='section-container'>
//       <div className='section-header' >{user.get('username')}'s User Profile</div>
//       <div className='section-header2' >
//         <small>Change Username/ Add Intermediaries</small>
        
//         <Link  to={`/profile/${user.get('username')}/${user.get('ethAddress')}`}> <small className='view-profile'>View Profile</small> </Link>

//         </div>
//       <div className="profile-container">
//         {/* <div className='title'>Profile</div> */}
//         <div className='profile-form'>
//           <div className='profile-data'>
//             <div className='form-box'>
//               <div className='input'>
//                 <label className='input-title'>Username</label>
//                 <div className='input-box'>
//                   {/* <input type='text' value={name} placeholder = 'Add Asset Name...' onChange = {(e) => setName(e.target.value)}/> */}
//                   <input type='text' value={username} placeholder = 'Username...'onChange = {(e) => setUsername(e.target.value)}/>
//                 </div>
//                 <label className='input-title'>Create Intermediary Realationship</label>
//                 <div className='input-box'>
//                   {/* <Link to= '/intermediaries'> <Button text={"Add"}/> </Link>  */}
//                   {/* <Button text='test' classVar='dark' onClick = {(e) => test2()}/> */}
//                   <Button text={buttonTextAdd} classVar='dark' onClick = {(e) => setToggleAdd(!toggleAdd)}/>
//                   <Button text={buttonTextView} classVar='dark' onClick = {(e) => getAllIntermediaries()}/>
//                 </div>
//                 { toggleAdd &&
//                 <>
//                   <label className='input-title'>Intermediary</label>
//                   <div className='input-box'>
//                     {/* <input type='text' value={name} placeholder = 'Add Asset Name...' onChange = {(e) => setName(e.target.value)}/> */}
//                     <input type='intermediary-text' value={intermediaryName} placeholder = 'Name' onChange = {(e) => setIntermediaryName(e.target.value)}/>
//                     <input type='intermediary-text' value={intermediaryAddress} placeholder = 'ethereum address' onChange = {(e) => setIntermediaryAddress(e.target.value)}/>
//                   </div>
//                 </>
//                 }
//                 { toggleView && intermediaryList.length>0 &&
//                   <>
//                   {intermediaryList.map((item)=>{
//                     return(
//                       <div key={item.id} className='item'>
//                         <div>
//                         <p>{item.get("name")} <DeleteIcon className='bin' style={{cursor: 'pointer'}} onClick = {(e)=> console.log("deleting this")}/> </p> 
//                         <Button text='delete' onClick = {(e) => removeRelationship(item)}/>
//                         </div>
//                       </div>
//                     )
//                   })}
//                   </>
//                 }
//               </div>
//             </div>
//           </div>
//         </div>
//         <div className='profile-button-container'>
//           <Button text={"Save Change"} classVar={'dark'} onClick ={(e) => onSubmit(e)} />
//         </div>
//       </div>
//     </div>

//   );
    return(
        <div className='section-container'>
            <div className='section-header' >{user.get('username')}'s Relationships </div>
            <div className='section-header2' >
                <small>Add/Remove Intermediaries</small>
            </div>

            <div>
            <div className='form-box'>
                <div className='select'>
                    <label className='select-title'>End Relationship</label>
                    <div className='select-box'>
                        <div>
                        <select value={intermediaryID} onChange={(e) => setIntermediaryID(e.target.value)}>
                        <option defaultValue>None</option>
                        { intermediaryList.length > 0 && 
                            <>
                            { intermediaryList.map((item)=>{
                            // {console.log(item)}

                            return(
                            <option key={item.id} value={item.id}>{item.get("name")}</option>
                            );
                            })
                            }
                            </>
                        }
                    </select>
                        </div>
                        <div>
                            <Button text={"End Relationship"}  onClick ={(e) => onSubmit(e)} />
                        </div>

                    </div>
                </div>

            </div>
            </div>
            <div className='table-container-intermediary'>
                <div className='btn-container'>
                <Link to= '/intermediaries'> <Button classVar='dark' text={'Add Intermediary'}/> </Link> 

                </div>
                <div>
                {intermediaryList.length > 0 && <IntermediaryTable list={intermediaryList} />}

                </div>

            

            </div>
        </div>
    );
}

export default Settings2
