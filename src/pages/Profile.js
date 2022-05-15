import './Profile.css';
import { useParams, Link } from 'react-router-dom'
import { useMoralis } from "react-moralis";
import { useState, useEffect } from 'react'
import Button from '../components/Button'
import AssetDisplay from '../components/AssetDisplay'
import unbolt from '../truffle/build/contracts/UnBolt.json'
import contractAddress from '../constants/contractAddress';



// this is a handler for the profile page
const Profile = () => {
  
const {value} = useParams()
  
  // The useMoralis hook provides all the basics functionalities that is needed for authentication and user data.
  const {user,Moralis, setUserData,useMoralisQuery, authenticate, isAuthenticated, enableWeb3,isWeb3Enabled, logout } = useMoralis();
  const [ethAddress, setEthAddress] = useState('');
  const [bio, setBio] = useState('');
  const [otherUserbio, setOtherUserBio] = useState('');
  const [username, setUsername] = useState(user.get('username'));
  const [name, setName] = useState(user.get(''));
  const [userAssets, setUserAssets] = useState([]);


  // allows for performing side effects in the component
  // side effect in this case being calling the enableWeb3 function
  // use effect runs after every render
  // if the value of the second argunment changes(isAuthenticated, isWeb3Enabled), useEffect is rerun

  useEffect(() => {
    const loadPage = async () => {
      const connectorId = window.localStorage.getItem("connectorId");
      if (isAuthenticated && !isWeb3Enabled){
          await enableWeb3({ provider: connectorId });
      }

      if (bio== ''){
        const bioValue = await getUsersBio()
        if (bioValue != undefined) {
          await setBio(bioValue)
        } else {
          await setBio("This user has not defined a bio")
        }  
      }

      if(userAssets.length == 0){
        // call the function loadData() but wait 1 second before doing this in order to let enableweb3() run above
        await setTimeout(function() { getUserAssets() }, 100);
      }
  }

    loadPage()

  },[isAuthenticated, isWeb3Enabled,bio]);




  
 
//add bio to database helper function
  async function saveChange(){
      //user is changing it all
      //check if username is take
      // if (username is taken){
      //   alert("username is taken")
      // }

      //add conditions here to know that username is not taken 
      if (username!= user.get('username') && bio != user.get('bio')) {
        const tempUsername = username
        await setUserData({username})
        await addBio()
        console.log('bio:', bio,"  " );
        await setUsername('')
        await setBio('')
        await alert("username and new bio added")
        //navigate to the url of the new newusername as old endpoint doesnt work anymore
        await navigate(`../profile/${tempUsername}`, { replace: true });
        await window.location.reload();
  
  
      //user is changing username only
      } else if (username!= user.get('username') && bio == user.get('bio')){
        const tempUsername = username
        await setUserData({username})
        await setUsername('')
        await alert("username saved successfully")
        //navigate to the url of the new newusername as old endpoint doesnt work anymore
        await navigate(`../profile/${tempUsername}`, { replace: true });
        await window.location.reload();



  
  
      //user is chaning bio only
      }else if (username== user.get('username') && bio!= user.get('bio')){
        await addBio()
        console.log('bio:', bio);
        await setBio('')
        await alert("Bio saved successfully")

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

    // check username has not been taken 
    //code 

    
    // https://ethereum.stackexchange.com/questions/1374/how-can-i-check-if-an-ethereum-address-is-valid
    function validateInputAddresses(address) {
      return (/^(0x){1}[0-9a-fA-F]{40}$/i.test(address));
    }

    // if we have the eth address as the params
    // get username only
    // if (hasNumber.test(value) && value.length == ){
    if (validateInputAddresses(value)){
      setEthAddress(value)
      const results = await Moralis.Cloud.run("getUsernames", {address:value.toLowerCase()}) 
      console.log(results[0].attributes.username);
      setName(results[0].attributes.username)
      return results[0].attributes.bio
  
    // we have the user name, therefore lets get the address
      // get user by username
    }else{
      setName(value)
      const results = await Moralis.Cloud.run("getEthAddress", {name:value}) 
      console.log(results[0]);
      setEthAddress(results[0].attributes.ethAddress)
      return results[0].attributes.bio
    }
  
    }

    async function getUserAssets(){
      //defining the parameters for the execute function call, which executes a function in the smart contract
      console.log(unbolt.abi)
      
      const options = {
        abi: unbolt.abi,
        contractAddress: contractAddress.unboltContractAddress,
        functionName: 'getUserAssets',
        params:{
          _userAddress: ethAddress
        }
      }
      //calls the smart contract function while returning the data in variable message
      const message = await Moralis.executeFunction(options)
      console.log(message);
      setUserAssets(message)

      }


   

 
  return (
    // <> { name != 'search' ? <> profile </> : <> fllf </> }</>
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
            <div className='bio-container'>
              {/* <Button text={'test'} classVar='dark' onClick = {(e) => getUsersBio()}/> */}
              {bio}

            </div>

            :
            <div>
             {/* <Button text={'test'} classVar='dark' onClick = {(e) => getUsersBio()}/> */}
             <div className='bio-container'>
             {bio}
             </div>
            {/* <input type='text' value={bio} placeholder = 'Add Bio...' onChange = {(e) => setBio(e.target.value)}/> */}
            <div className='form-box'>
              <div className='input'>
                  <label className='input-title'>Username</label>
                  <div className='input-box'>
                      <input type='text' value={username} placeholder = 'Add New Message...' onChange = {(e) => setUsername(e.target.value)}/>
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

          <div className='user-asset-display'>

          { userAssets.length > 0 ? 
          <div>
            <div className='item-header'>
            All assets asscoaited with this user 
            
            </div>
          {userAssets.map((item)=>{
            return(
              <div className='item' key={parseInt(item.id)}>
              <AssetDisplay 
              id={item.id} 
              assetName={item.assetName} 
              username={item.creator.slice(0,4)+'...'+item.creator.slice(-4)} 
              onClick={(e)=>{console.log(item.assetName)}
              } /> 
              </div>

            )
          
              })}

          </div> 
          : 
          <>
            No assets asscoaited with this user 

          </>

          }


          {/* <Button text={'test'} classVar='dark' onClick = {(e) => console.log(userAssets)}/>
          <Button text={'call'} classVar='dark' onClick = {(e) => getUserAssets()}/> */}

          </div>
                


        </div>
      </div>


      <div/>
    </div>
  );
}


export default Profile; 
