import './Profile.css';
import { useParams, Link} from 'react-router-dom'
import { useMoralis } from "react-moralis";
import { useState, useEffect } from 'react'
import Button from '../components/Button'



// this is a handler for the profile page
const Profile = () => {
  
const {name,address} = useParams()
  
  // The useMoralis hook provides all the basics functionalities that is needed for authentication and user data.
  const {user,Moralis, setUserData,useMoralisQuery } = useMoralis();
  const [ethAddress, setEthAddress] = useState('');
  const [bio, setBio] = useState(user.get('bio'));
  const [otherUserbio, setOtherUserBio] = useState('');
  const [username, setUserName] = useState(user.get('username'));



  useEffect(() => {
    if (user.get('username') != name && otherUserbio == '' ) {
      // await getUsersBio()
      setOtherUserBio("not me")
    }

  },[otherUserbio]);


  
 
//add bio to database helper function
  async function saveChange(){
      //user is changing it all
      if (username!= user.get('username') && bio != user.get('bio')) {
        setUserData({username})
        addBio()
        console.log('bio:', bio,"  " );
        setUsername('')
        setBio('')
        alert("username and new bio added")
  
  
      //user is changing username only
      } else if (username!= user.get('username') && bio == user.get('bio')){
        setUserData({username})
        setUsername('')
        alert("username saved successfully")
  
  
      //user is chaning bio only
      }else if (username== user.get('username') && bio!= user.get('bio')){
        addBio()
        console.log('bio:', bio);
        setBio('')
        alert("Bio saved successfully")

      //user has not changed anything
      }else{
        alert('Change username or add bio before submitting form! ')
      }

  }

  
  //commit changes of bio to the database
  async function addBio(){

    // add new column bio in the users table
    const user = Moralis.User.current();
    user.set('bio',bio)
    const result = await user.save();
    console.log(result);
  }

    //commit changes of bio to the database
    async function getUsersBio(){
   
    //get all users onn platform
    // const results = await Moralis.Cloud.run("getAllUsers") 
    // console.log(results);
    // console.log(results.length);

    //prinnt hello name
    // const results = await Moralis.Cloud.run("hello", {name:"Jeff"}) 
    // console.log(results);

    // get user by username
    const results = await Moralis.Cloud.run("getEthAddress", {name:name}) 
    console.log(results[0]);


    // make sure username is not taken
    
 
      return results[0].attributes.bio

    }
   

 
  return (
    <div className='user-container-profile'>
      {/* Profile of {params.name} */}
      <div className='section-container-profile'>
        <div className='section-header-profile' >@{name}</div>
        <div className='section-header2-profile' >
         <Link  to={'/dashboard'}> <small>Go Back to dashboard</small> </Link>
        </div>
        <div>
          {/* <p className='profile-message'>  */}
          {/* Loading of Assets asscoaited with {address} coming soon */}
          {/* {otherUserbio} */}
      
          {/* </p> */}
  

          { user.get('username') != name ? 
            <div>
              <Button text={'test'} classVar='dark' onClick = {(e) => getUsersBio()}/>
              {otherUserbio}

            </div>

            :
            <div>
             <Button text={'test'} classVar='dark' onClick = {(e) => getUsersBio()}/>
             <div className='bio-container'>
             {bio}
             </div>
            {/* <input type='text' value={bio} placeholder = 'Add Bio...' onChange = {(e) => setBio(e.target.value)}/> */}
            <div className='form-box'>
              <div className='input'>
                  <label className='input-title'>Username</label>
                  <div className='input-box'>
                      <input type='text' value={username} placeholder = 'Add New Message...' onChange = {(e) => setUserName(e.target.value)}/>
                  </div>
              </div>
            </div>
            
            <div className='form-box'>
              <div className='input'>
                  <label className='input-title'>Bio</label>
                  <div className='input-box'>
                      <input className='bio' type='text' value={bio} placeholder = 'Add Bio...' onChange = {(e) => setBio(e.target.value)}/>
                  </div>
              </div>
            </div>

            <Button text={'Save Bio'} classVar='dark' onClick = {(e) => saveChange()}/>

            </div>

          }
      


        </div>
      </div>


      <div/>
    </div>
  );
}


export default Profile; 
