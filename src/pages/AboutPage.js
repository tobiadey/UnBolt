import logo from '../logo.svg';
import Button from '../components/Button'
import './AboutPage.css';
import {Link} from 'react-router-dom'
import { useMoralis } from "react-moralis";


function onAdd (){
    console.log("Hii");
  }

const AboutPage = () => {
  const { authenticate, isAuthenticated, logout, user } = useMoralis();

  
  return (
    <div className="about-page-container">
        <div className='header display-inline'>
            <div>
            <img src={logo} className="App-logo-small" alt="logo" />
            </div>
            {/* {check if user is already connected} */}
            {isAuthenticated ?
            <>
              <small>{user.get("ethAddress")}</small>
              <Button text={'Logout'} onClick ={logout}/> 
            </>
              :
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

                <Button text={'Do something'}/> 
              </div>

           </div>
      </div>
  );
}

export default AboutPage
