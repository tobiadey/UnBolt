import logo from '../logo.svg';
import Button from '../components/Button'
import './About.css';
import {Link} from 'react-router-dom'
import { useMoralis } from "react-moralis";



// this is a handler for the about page
const About = () => {
  
  // The useMoralis hook provides all the basics functionalities that is needed for authentication and user data.
  const { authenticate, isAuthenticated, logout, user } = useMoralis();
  
  // function onAdd (){
  //   console.log("Hiiff");
  //   console.log(user);
  // }
  
  return (
    <div className="about-page-container">
        <div className='header display-inline'>
            <div>
            <img src={logo} className="App-logo-small" alt="logo" />
            </div>
            {/* {check if user is already connected} */}
            {isAuthenticated ?
            // if true show:
            <>
              <small>{user.get("ethAddress")}</small>
              <Button text={'Logout'} onClick ={logout}/> 
            </>
              :
              // if false show:
              <Button  text={'Connect Wallet'} onClick ={() => authenticate({ provider: "metamask" })}/> 
            }
          </div>
          <div className='about-body-container'>
              <div className='back-btn'>
                <Link to= '/'> back </Link>
              </div>
              <div className='about-text-container'>
                <h2 className=''> Lorem ipsum dolor sit amet, consectetur adipiscing elit. </h2>
                <small className='desc'> 
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
                    Risus tellus scelerisque nunc odio viverra senectus. 
                    Dui sollicitudin ornare a ornare morbi posuere maecenas sagittis, nisi.
                </small>
                {/* <blockquote class="twitter-tweet"><p lang="en" dir="ltr">Currently building a decentralised supply chain tracking tool. 
                Will be updating this to create a thread 🧵 of my progress 🤝
                <a href="https://twitter.com/hashtag/SupplyChain?src=hash&amp;ref_src=twsrc%5Etfw">#SupplyChain</a> 
                <a href="https://twitter.com/hashtag/blockchain?src=hash&amp;ref_src=twsrc%5Etfw">#blockchain</a></p>&mdash; tobiadey.eth (👿,😇) (@Adey_OF) 
                <a href="https://twitter.com/Adey_OF/status/1503335964067909632?ref_src=twsrc%5Etfw">March 14, 2022</a></blockquote>
                <script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script> */}
                {/* <Button text={'Do something'} onClick = {() => onAdd()} />  */}
              </div>

           </div>
      </div>
  );
}

export default About
