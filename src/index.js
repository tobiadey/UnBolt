import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';

import { MoralisProvider } from "react-moralis";



// code for moralis set up in this page gotten from boilerplate code look for link and give credit
//then altered to fit my project.
// https://github.com/ethereum-boilerplate/ethereum-boilerplate/blob/main/src/index.js

//importing of environement variables
const APP_ID = process.env.REACT_APP_MORALIS_APPLICATION_ID;
const SERVER_URL = process.env.REACT_APP_MORALIS_SERVER_URL;

// For the project to build, this file must exist with this exact filename
// this is the JavaScript entry point
const Application = () => {
  const isServerInfo = APP_ID && SERVER_URL ? true : false;
  //Validate there is an appid and server url
  if (!APP_ID || !SERVER_URL)
    throw new Error(
      "Missing Moralis Application ID or Server URL. Make sure to set your .env file.",
    );
  if (isServerInfo)
    return (
      // in order to allow the application have access to moralis functions the app is wrapped 
      // using the moralis provider component.
      //it automatically initializes moralis with the app id and server url.
      // it keeps the autheticaion of the user in sync and allows for easy access. 
      //easy access in terms of easy check if the user is authenticated/logged in
      <MoralisProvider appId={APP_ID} serverUrl={SERVER_URL}>
        <App isServerInfo />
      </MoralisProvider>
    );
  else {
    return (
      <div style={{ display: "flex", justifyContent: "center" }}>
        <>No moralis appId and server set up</>
      </div>
    );
  }
};

ReactDOM.render(
  <React.StrictMode>
    <Application />
  </React.StrictMode>,
  document.getElementById('root')
);

