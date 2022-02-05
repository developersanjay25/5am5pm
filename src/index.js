import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import Test from './test';


//recoil js
import { RecoilRoot } from 'recoil';


//Route Files
import { BrowserRouter, Route } from "react-router-dom";

//mui themes
import { createTheme, ThemeProvider, styled } from '@mui/material/styles';


const theme = createTheme({
  palette:{
    primary:{
      main:'#003db3',
    },
    mycolor1:{
      main:'#222',
    },
    mycolor2:{
      main:'#999',
    },
    mycolor3:{
      main:'#fff'
    }
  },
  typography:{
    fontFamily:'Jotia !important',
    h1:{
      fontSize:"2.5rem",
      fontWeight:"400",
      lineHeight:"2",
    },
    h2:{
      fontSize:"1.875rem",
      fontWeight:"300",
      lineHeight:'1.2',
    },
    h3:{
      fontSize:"1.5rem",
      fontWeight:"300",
      lineHeight:"1.1",
    },
    p:{
      fontSize:"0.983rem",
      fontWeight:"400",
      lineHeight:"1.375rem",
    },
    p1:{
      fontSize:"0.75rem",
      fontWeight:"400",
      lineHeight:'22px',
    }
  },
  
 

  
})


ReactDOM.render(
  <ThemeProvider theme={theme}>
  <RecoilRoot>
<BrowserRouter>
    <App/>  
   {/* <Test/>  */}
</BrowserRouter>
</RecoilRoot>
</ThemeProvider>
,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
