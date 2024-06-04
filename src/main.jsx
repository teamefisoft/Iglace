import React from "react";
import ReactDOM from "react-dom/client";
import { ThemeProvider } from "@material-tailwind/react";
import { MantineProvider } from '@mantine/core';
import { BrowserRouter } from "react-router-dom";
import App from "./App.jsx";
import "./index.css";
//import "typeface-poppins";
import "typeface-roboto";
import { ToastContainer } from 'react-toastify'
import { Provider } from 'react-redux'
import { store } from './App/store'


<link
  href="https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css"
  rel="stylesheet"
  integrity="sha384-wvfXpqpZZVQGK6TAh5PVlGOfQNHSoD2xbE+QkPxCAFlNEevoEH3Sl0sibVcOQVnN"
  crossorigin="anonymous"
></link>;

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
      <ThemeProvider>
        <Provider store={store}>
          
        <App />
         
        <ToastContainer />
        </Provider>
      </ThemeProvider>
  </React.StrictMode>
);
