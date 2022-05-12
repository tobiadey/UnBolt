
//import all the pages that will need to be routed to

import Home from './pages/Home';
import About from './pages/About'
import Dashboard from './pages/Dashboard';
import CreateAsset from './pages/CreateAsset';
import CreateTask from './pages/CreateTask';
import NoAccess from './pages/NoAccess';
import Asset from './pages/Asset';
import Settings from './pages/Settings'
import Profile from './pages/Profile'
import Intermediaries from './pages/Intermediaries'

// import the react-router-dom hooks to handle the routing
import { BrowserRouter as Router, Route,Routes  } from 'react-router-dom'
import { useMoralis } from "react-moralis";

// this is the main application page (when ignoring index.js)
//this page allows for routing to different pages using react-router-dom
function App() {
  // The useMoralis hook provides all the basics functionalities that is needed for authentication and user data.
  const { isAuthenticated } = useMoralis();
  return (
    <Router>
      <>
        <Routes>
          <Route path= '/' element = {<Home/>}/>
          <Route path= '/about' element={<About />} />
           {/* for access priviledge, if user is logged in they can access dashboard and on, 
          if not it takes them to no access page */}
          {isAuthenticated ?  
          <>
          <Route path= '/dashboard' element={<Dashboard />} />
          <Route path= '/createAsset' element={<CreateAsset />} />
          <Route path= '/createTask/:id' element={<CreateTask />} />
          <Route path= '/asset/:id' element={<Asset/>} />
          <Route path= '/profile/:value' element={<Profile/>} />
          {/* <Route path= '/profile/:address' element={<Profile/>} /> */}
          <Route path= '/intermediaries' element={<Intermediaries/>} />
          </>
          :
          <>
          <Route path= '/dashboard' element={<NoAccess />} />
          <Route path= '/createAsset' element={<NoAccess />} />
          <Route path= '/createTask/:id' element={<NoAccess />} />
          <Route path= '/asset/:id' element={<NoAccess/>} />
          <Route path= '/profile/:value' element={<NoAccess/>} />
          {/* <Route path= '/profile/:address' element={<Profile/>} /> */}
          <Route path= '/intermediaries' element={<NoAccess/>} />

          </>}

        </Routes>
      </>
    </Router>
  );
}


export default App;
