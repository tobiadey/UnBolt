import logo from '../logo.svg';
import Button from './Button'
import '../App.css';
import {Link} from 'react-router-dom'


function onAdd (){
    console.log("Hii");
  }

const HomePage = ({}) => {
  return (
    <div className="App App-home-body">
        <div>
        <img src={logo} className="App-logo-lar" alt="logo" />
        </div>


        <div className='container'>
            <h2 className='desc'> A decentralised supply chain tracker </h2>
            <small className='desc'> 
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
                Risus tellus scelerisque nunc odio viverra senectus. 
                Dui sollicitudin ornare a ornare morbi posuere maecenas sagittis, nisi.
            </small>
        </div>

        <div className='container'>
            <div className='row'>
            <Button color='black' text={'Connect Wallet'} onClick ={ onAdd}/>
            <Link to= 'about'> <Button color='black' text={'Read More'} onClick ={ onAdd} /> </Link>
            </div>

        </div>



    </div>
  );
}

export default HomePage
