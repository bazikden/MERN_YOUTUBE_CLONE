import React, {createContext} from "react";
import {AuthReducer, AuthState} from "./reducers/AuthReducer";
import {Register, Login, Logout, Auth} from "./actions/UserActions";
import {StateInspector, useReducer} from "reinspect";
import {getActiveVideo, getVideos} from "./actions/VideoActions";
import {VideoReducer, VideoState} from "./reducers/VideoReducer";


const initialState = {}

export const GlobalContext = createContext(initialState)

export const GlobalProvider = ({children}) => {
    const [auth, dispatchAuth] = useReducer(AuthReducer, AuthState)
    const [videos,dispatchVideos] = useReducer(VideoReducer,VideoState)

    window.state = {auth,videos}
    return <StateInspector name='GlobalProvider' initialState={auth}> <GlobalContext.Provider value={{
        // AUTH
        auth,
        Register: (data,cb) => Register(data, dispatchAuth,cb),
        Login: (data,cb) => Login(data, dispatchAuth,cb),
        LogOut:()=>Logout(dispatchAuth),
        Auth:()=>Auth(dispatchAuth),
        dispatchAuth,

        // VIDEOS
        videos,
        dispatchVideos,
        getActiveVideo: (video) => getActiveVideo(video,dispatchVideos),
        getVideos:(videos) => getVideos(videos,dispatchVideos)
    }}>{children}</GlobalContext.Provider></StateInspector>
}