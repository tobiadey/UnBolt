// import logo from './logo.svg';
// import './App.css';
import HomePage from './components/HomePage';
import AboutPage from './components/AboutPage';
import { BrowserRouter as Router, Route,Routes  } from 'react-router-dom'


function App() {
  // return <HomePage/>
  // return <AboutPage/>

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
