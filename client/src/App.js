import React, {useContext, useEffect} from 'react'
import AppNavBar from './components/AppNavBar/AppNavBar'
import {Route} from 'react-router';
import SignIn from "./components/AuthPages/SignIn";
import Login from "./components/AuthPages/Login";
import {Home} from "./components/Home";
import VideoUploadPage from "./components/VideoUploadPage/VideoUploadPage";
import DetailVideoPage from "./components/DetailVideoPage/DetailVideoPage";
import {useCookies} from "react-cookie";
import {GlobalContext} from "./context/GlobalContext";
import {Subscription} from "./components/Subscriptions/Subscriptions";

export default function App() {
    const [cookies,setCookies] = useCookies(['x-auth'])
    const {Auth} = useContext(GlobalContext)
    useEffect(()=>{
        if(cookies) Auth()
    },[cookies])

    return (
        <>
            <AppNavBar/>
            <Route path='/' exact render={() => <Home/>}/>
            <Route path='/signin' render={() => <SignIn/>}/>
            <Route path='/login' render={() => <Login/>}/>
            <Route path='/upload' render={() => <VideoUploadPage/>}/>
            <Route path='/video/:videoId' render={() => <DetailVideoPage/>}/>
            <Route path='/subscription' render={() => <Subscription/>}/>
        </>
    )
}


