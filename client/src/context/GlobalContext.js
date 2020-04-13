import React, {createContext} from "react";
import {AuthReducer, AuthState} from "./reducers/AuthReducer";
import {Register, Login, Logout, Auth} from "./actions/UserActions";
import {StateInspector, useReducer} from "reinspect";
import {getActiveVideo, getVideos} from "./actions/VideoActions";
import {VideoReducer, VideoState} from "./reducers/VideoReducer";
import {CommentsReducer, commentsState} from "./reducers/CommentsReducer";
import {addComment, addSubComment, getComments} from "./actions/CommentsActions";
import {LikeDisKikeReducer, LikeDisLikeState} from "./reducers/LikeDisLikeReduser";


const initialState = {}

export const GlobalContext = createContext(initialState)

export const GlobalProvider = ({children}) => {
    const [auth, dispatchAuth] = useReducer(AuthReducer, AuthState)
    const [videos,dispatchVideos] = useReducer(VideoReducer,VideoState)
    const [comments,dispatchComments] = useReducer(CommentsReducer,commentsState)
    const [likes,dispatchLikes] = useReducer(LikeDisKikeReducer,LikeDisLikeState)

    window.state = {auth,videos,comments,likes}
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
        getVideos:(videos) => getVideos(videos,dispatchVideos),

        // COMMENTS
        comments,
        dispatchComments,
        addComment: (comment) => addComment(comment,dispatchComments),
        getComments: postId => getComments(postId,dispatchComments),
        addSubComment: comment => addSubComment(comment,dispatchComments),

        // Likes & DisLikes
        likes,
        dispatchLikes


    }}>{children}</GlobalContext.Provider></StateInspector>
}