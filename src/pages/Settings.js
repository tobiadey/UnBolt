import logo from '../logo.svg';
import Button from '../components/Button'
import './Settings.css';
import {Link} from 'react-router-dom'
import { useMoralis } from "react-moralis";
import { useState, useEffect } from 'react'
import DeleteIcon from '@mui/icons-material/Delete';


// this is a handler for the about page
const Settings = () => {
  
   // The useMoralis hook provides all the basics functionalities that is needed for authentication and user data.
   const {user,Moralis, setUserData,useMoralisQuery } = useMoralis();

  // state hooks to know which body to use for the dashbaord
  const [username, setUsername] = useState(user.get('username'));
  const [intermediaryName, setIntermediaryName] = useState('');
  const [intermediaryAddress, setIntermediaryAddress] = useState('');
  const [toggleAdd, setToggleAdd] = useState(false);
  const [toggleView, setToggleView] = useState(false);
  const [buttonTextAdd, setButtonTextAdd] = useState('Add');
  const [buttonTextView, setButtonTextView] = useState('View Exisiting Intermediaries');
  const [intermedairyList, setIntermediaryList]= useState([])

  useEffect(() => {
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

    // getAllIntermediaries()



  },[toggleAdd,toggleView,buttonTextAdd,buttonTextView]);

  async function  onSubmit(e){
    //user is changing it all
    if (username!= user.get('username')&& intermediaryName != '' && intermediaryAddress!= '') {
      setUserData({username})
      console.log('name:', intermediaryName,"  ", 'addr:',intermediaryAddress );
      setUsername('')
      setIntermediaryName('')
      setIntermediaryAddress('')
      alert("username and new intermediary added")


    //user is changing username only
    } else if (username!= user.get('username')&& intermediaryName == '' && intermediaryAddress== ''){
      setUserData({username})
      setUsername('')
      alert("username saved successfully")


    //user is chaning intermediary note only
    }else if (username== user.get('username')&& intermediaryName != '' && intermediaryAddress!= ''){
      addIntermediary()
      console.log('name:', intermediaryName,"  ", 'addr:',intermediaryAddress );
      setIntermediaryName('')
      setIntermediaryAddress('')

    //user has not changed anything
    }else{
      alert('Change username or add intermediary before submitting form! ')
    }

    
  }

  async function addIntermediary(){
    // Simple syntax to create a new subclass of Moralis.Object.
    const Intermediary = Moralis.Object.extend("Intermediary");  //creates a new table db table called Intermediary

    // Create a new instance of that class.
    const intermediary = new Intermediary(); //use this object to add data to a row of that table
    // map the current user to the intermediry relationship
    intermediary.set('user', user.get('username'))
    intermediary.set('name', intermediaryName)
    intermediary.set('ethAddress', intermediaryAddress)

    const relation = intermediary.relation("userRelationship");
    relation.add(Moralis.User.current());

    const result = await intermediary.save()
    createRelationship(intermediary)

    // alert("Successfully added " + results.length + " intermediary");
    alert("Successfully added intermediary");
    console.log(result); // if result try to 
    console.log(user); // if result try to 
  }


  async function getAllIntermediaries(){
    setToggleView(!toggleView)
    const Intermediary = Moralis.Object.extend("Intermediary");
    const query = new Moralis.Query(Intermediary);
    // query.equalTo("user", user.get('username'));
    query.equalTo("users", Moralis.User.current());
    const results = await query.find();
    // alert("Successfully retrieved " + results.length + " intermediaries.");
    setIntermediaryList(results)
    // Do something with the returned Moralis.Object values
    for (let i = 0; i < results.length; i++) {
      const object = results[i];
      // alert(object.id + " - " + object.get("ownerName"));
      console.log(object);
      console.log(object.get("user") + " created intermedairy relationship with " + object.get("name"));
    }
  }

  async function removeRelationship(_intermediary){
    //remove relationship in intermediary table
    const intermedairy = _intermediary
    const relation1 = intermedairy.relation("users")
    relation1.remove(Moralis.User.current())
    const result1 = await intermedairy.save();
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
    const intermedairy = _intermediary
    const relation1 = intermedairy.relation("users")
    relation1.add(Moralis.User.current());
    const result1 = await intermedairy.save();
    console.log(result1);

    const user = Moralis.User.current();
    const relation = user.relation("Intermediaries");
    relation.add(_intermediary);
    const result = await user.save();
    console.log(result);

  }

  return (
    <div className='section-container'>
      <div className='section-header' >{user.get('username')}'s User Profile</div>
      <div className='section-header2' >
        <small>Change Username/ Add Intermediaries</small>
        
        <Link  to={`/profile/${user.get('username')}/${user.get('ethAddress')}`}> <small className='view-profile'>View Profile</small> </Link>

        </div>
      <div className="profile-container">
        {/* <div className='title'>Profile</div> */}
        <div className='profile-form'>
          <div className='profile-data'>
            <div className='form-box'>
              <div className='input'>
                <label className='input-title'>Username</label>
                <div className='input-box'>
                  {/* <input type='text' value={name} placeholder = 'Add Asset Name...' onChange = {(e) => setName(e.target.value)}/> */}
                  <input type='text' value={username} placeholder = 'Username...'onChange = {(e) => setUsername(e.target.value)}/>
                </div>
                <label className='input-title'>Create Intermediary Realationship</label>
                <div className='input-box'>
                  {/* <Link to= '/intermediaries'> <Button text={"Add"}/> </Link>  */}
                  {/* <Button text='test' classVar='dark' onClick = {(e) => test2()}/> */}
                  <Button text={buttonTextAdd} classVar='dark' onClick = {(e) => setToggleAdd(!toggleAdd)}/>
                  <Button text={buttonTextView} classVar='dark' onClick = {(e) => getAllIntermediaries()}/>
                </div>
                { toggleAdd &&
                <>
                  <label className='input-title'>Intermediary</label>
                  <div className='input-box'>
                    {/* <input type='text' value={name} placeholder = 'Add Asset Name...' onChange = {(e) => setName(e.target.value)}/> */}
                    <input type='intermediary-text' value={intermediaryName} placeholder = 'Name' onChange = {(e) => setIntermediaryName(e.target.value)}/>
                    <input type='intermediary-text' value={intermediaryAddress} placeholder = 'ethereum address' onChange = {(e) => setIntermediaryAddress(e.target.value)}/>
                  </div>
                </>
                }
                { toggleView && intermedairyList.length>0 &&
                  <>
                  {intermedairyList.map((item)=>{
                    return(
                      <div key={item.id} className='item'>
                        <div>
                        <p>{item.get("name")} <DeleteIcon className='bin' style={{cursor: 'pointer'}} onClick = {(e)=> console.log("deleting this")}/> </p> 
                        {/* <Button text='delete' onClick = {(e) => removeRelationship(item)}/> */}
                        </div>
                      </div>
                    )
                  })}
                  </>
                }
              </div>
            </div>
          </div>
        </div>
        <div className='profile-button-container'>
          <Button text={"Save Change"} classVar={'dark'} onClick ={(e) => onSubmit(e)} />
        </div>
      </div>
    </div>

  );
}

export default Settings
