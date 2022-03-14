import './Navbar.css';


const Navbar = ({props}) => {


    return(
        <div className='navbar'>
            <div className='wrapper'>
                <div className='search'>
                    <input type='text' placeholder= 'search'></input>
                </div>
            </div>
        </div>
    )
  
  }
  
  
  export default Navbar