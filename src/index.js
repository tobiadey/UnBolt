import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';

import { MoralisProvider } from "react-moralis";

ReactDOM.render(
  
  <React.StrictMode>
    <MoralisProvider 
      appId="6ri2MWBM7LvNkPja6x2x2oRKenffyBVExmk6lEoP"
      serverUrl="https://uzik23hcxxpm.usemoralis.com:2053/server"

    >
     <App />
    </MoralisProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

