import logo from '../logo.svg';
import Button from '../components/Button'
import './About.css';
import {Link} from 'react-router-dom'
import { useMoralis } from "react-moralis";



// this is a handler for the about page
const About = () => {
  
  // The useMoralis hook provides all the basics functionalities that is needed for authentication and user data.
  const { authenticate, isAuthenticated, logout, user } = useMoralis();


  return(
    <div className='about-page-container'>
      <div className='header display-inline'>
        {/* {check if user is already connected} */}
        {isAuthenticated ?
        // if true show:
        <>

        <>
        <div className='back-btn'>
          <Link to= '/'> <Button text={'Back'}/> </Link>
        </div>
        </>

        <>
        <small>{user.get("ethAddress")}</small>
        <Button text={'Logout'} onClick ={logout}/> 
        </>

        </>
        :
        // if false show:
        <>
        <Link to= '/'> <Button text={'Back'}/> </Link>
        <Button  text={'Connect Wallet'} onClick ={() => authenticate({ provider: "metamask" })}/> 
        </>

        }
      </div>
      <div className='about-body-container'>
        <div className='left-about'>
          <img src={logo} className="App-logo-small" alt="logo" />
        </div>
        <div className='right-about'>

          <h1>Final Year Project</h1>
          <h5>Check out the documentation on Twitter
            <a href="https://twitter.com/Adey_OF/status/1503335964067909632?ref_src=twsrc%5Etfw"  target="_blank" > (@Adey_OF) March 14, 2022</a>
          </h5>
          
          <small> 
            This project is a web application that examines several challenges in the 
            supply chain process and a defined solution to address the resulting challenges.

            The supply chain industry is one currently undergoing tension with bottlenecks, 
            the centralisation of supply chain records could be a major player with this chanllenge. 
            To solve this problem this project attempts to implement a platform that aids supply chain visibility by creating a decentralised supply chain tracker</small>
        </div>
      </div>
    </div>
  );

}

export default About