import React from 'react'
import ReactDom from 'react-dom'
import App from './App'
import 'semantic-ui-css/semantic.min.css'
import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import {BrowserRouter as Router} from "react-router-dom";
import {GlobalProvider} from "./context/GlobalContext";
import {CookiesProvider} from "react-cookie";

ReactDom.render(
    <CookiesProvider>
        <GlobalProvider>
            <Router>
                <App/>
            </Router>
        </GlobalProvider>
    </CookiesProvider>


   , document.getElementById('root'))