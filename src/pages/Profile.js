import './Profile.css';
import { useParams, Link} from 'react-router-dom'
import { useMoralis } from "react-moralis";
import { useState, useEffect } from 'react'
import Button from '../components/Button'



// this is a handler for the profile page
const Profile = () => {
  
const {name,address} = useParams()
  
  // The useMoralis hook provides all the basics functionalities that is needed for authentication and user data.
  const {Moralis } = useMoralis();
  const [ethAddress, setEthAddress] = useState('');

  //search user account and get their ethAddress using username
  async function getUser(){
    // const query = new Moralis.Query(Moralis.User.current());
    // query.equalTo("username", params.name);
    // const results = await query.find();
    // console.log(results);

    // const user = Moralis.Object.extend("User");
    // const query = new Moralis.Query(user);
    // query.equalTo("username", params.name);
    // const results = await query.find();
    // console.log(results);

    // https://forum.moralis.io/t/how-to-get-user-list/5836
    // Moralis.Cloud.run("averageStars", async (request) => {
    //   const query = new Moralis.Query("User");
    //   const results = await query.find({ useMasterKey: true });
    //   console.log(results);
    //   return results;
    // });

    // const param =  { username: params.name };
    // const ratings = await Moralis.Cloud.run("averageStars", params);
    // ratings should be 4.5



    // setEthAddress(results)

    // Do something with the returned Moralis.Object values
    // for (let i = 0; i < results.length; i++) {
    //   const object = results[i];
    //   // alert(object.id + " - " + object.get("ownerName"));
    //   console.log(object);
    //   console.log(object.get("user") + " created intermedairy relationship with " + object.get("name"));
    // }
  }
 
  return (

    
    <div className='user-container'>
      {/* Profile of {params.name} */}
      <div className='section-container'>
        <div className='section-header' >@{name}</div>
        <div className='section-header2' >
         <Link  to={'/dashboard'}> <small>Go Back to dashboard</small> </Link>
        </div>
        <div>
          <>
          {address}

          </>
          More... coming soon
          Get assets created by user (smart contract)
          <Button text={'test'} classVar='dark' onClick = {(e) => getUser()}/>

        </div>
      </div>


      <div/>
    </div>
  );
}


export default Profile; 
