
import { useState, useEffect } from 'react'
import {Link} from 'react-router-dom'
import { useMoralis, useWeb3ExecuteFunction } from "react-moralis";
import Button from '../components/Button'
import Navbar from '../components/Navbar'
import Input from '../components/Input' //at the moment this is only used to target the css, using componets causes some errors!
import './Intermediaries.css';
// import assets from '../truffle/build/contracts/Assets.json'
import contractAddress from '../constants/contractAddress';
import unbolt from '../truffle/build/contracts/UnBolt.json'




const Intermediaries = () => {

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


  async function  onSubmit(e){

    //user is addinng an intermediary 
   if (intermediaryName != '' && intermediaryAddress!= ''){
      addIntermediary()
      console.log('name:', intermediaryName,"  ", 'addr:',intermediaryAddress );
      setIntermediaryName('')
      setIntermediaryAddress('')

    //user has not enter details in form
    }else{
      alert('add intermediary details before submitting form! ')
    }

  }

  async function addIntermediary(){
    // creating a new subclass of of an Intermediary Object.
    //creates a new table db table called Intermediary (if not exisiting)
    const Intermediary = Moralis.Object.extend("Intermediary");  //creates a new table db table called Intermediary

    // Create a new instance of that class.
    //use this object to add data to a row of that table
    const intermediary = new Intermediary(); 
    // map the current user to the intermediry relationship
    intermediary.set('user', user.get('username'))
    intermediary.set('name', intermediaryName)
    intermediary.set('ethAddress', intermediaryAddress)

    //create a new column userRelationship which holds the a user object
    //database relation (user-> intermediary relationship)
    const relation = intermediary.relation("userRelationship");
    relation.add(Moralis.User.current());

    //save the intermediary
    const result = await intermediary.save()

    //create a relation in the user table and another column called users
    createRelationship(intermediary)

    // alert("Successfully added " + results.length + " intermediary");
    alert("Successfully added intermediary");
    console.log(result); // if result try to 
    console.log(user); // if result try to 
  }

  async function createRelationship(_intermediary){
    //add relation in the intermedairy table as users
    const intermedairy = _intermediary
    const relation1 = intermedairy.relation("users")
    relation1.add(Moralis.User.current());
    const result1 = await intermedairy.save();
    console.log(result1);

    // add the realtion in the users table as Intermediaries
    const user = Moralis.User.current();
    const relation = user.relation("Intermediaries");
    relation.add(_intermediary);
    const result = await user.save();
    console.log(result);
  }

  return (
      <>
        <Navbar/>
        <div className='createAsset'>
            {/* <Link to= '/dashboard'> <Button color='black' text={'Go Back'} /> </Link> */}
            <div className='title'>Add an Inntermediary Relationship</div>
            <div className='createAsset-form'>
                <div className='createAsset-data'>
                    <div className='form-box'>
                        <div className='input'>
                            <label className='input-title'>Name*</label>
                            <div className='input-box'>
                                <input type='text' value={intermediaryName} placeholder = 'Add Asset Name...' onChange = {(e) => setIntermediaryName(e.target.value)}/>
                            </div>
                        </div>
                    </div>
                    <div className='form-box'>
                        <div className='input'>
                            <label className='input-title'>Ethereum Address*</label>
                            <div className='input-box'>
                                <input type='text' value={intermediaryAddress} placeholder = 'Add New Description...' onChange = {(e) => setIntermediaryAddress(e.target.value)}/>
                            </div>
                        </div>
                    </div>
                </div>
        
            </div>

            <div className='createAsset-button-container'>
            <Link to= '/dashboard'> <Button text={'Go Back'} /> </Link>
            <Button text={"Complete"} classVar={'dark'} onClick ={(e) => onSubmit(e)} />
            </div>
        </div>
      </>

  );
}

export default Intermediaries

