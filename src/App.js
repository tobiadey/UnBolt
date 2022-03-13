// import logo from './logo.svg';
// import './App.css';
import HomePage from './components/HomePage';
import AboutPage from './components/AboutPage';
import { BrowserRouter as Router, Route,Routes  } from 'react-router-dom'
import { useMoralis } from "react-moralis";

function App() {
  const { enableWeb3, isWeb3Enabled } = useMoralis();


  // return (
  //   <div>
  //     {isWeb3Enabled ? (
  //       <>
  //         "Connected!" 
  //         {/* <button onClick={() => enableWeb3()}>Connect</button> */}
        
  //       </>
  //       ) : (
  //         <button onClick={() => enableWeb3()}>Connect</button>
  //       )}
  //   </div>
  // );




  return (
    <Router>
      <>
        <Routes>
          <Route path= '/' element = {<HomePage/>}/>
          <Route path= '/about' element={<AboutPage />} />
        </Routes>
      </>
    </Router>
  );
}


export default App;
