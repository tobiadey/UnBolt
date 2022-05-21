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


  async function  onDelete(e){
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
                            <Button text={"End Relationship"}  onClick ={(e) => onDelete(e)} />
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
