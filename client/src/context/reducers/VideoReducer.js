import {CLEAR_VIDEO_ERRORS, GET_ACTIVE_VIDEO, GET_VIDEOS, SET_VIDEO_ERRORS,UPDATE_VIEWS} from "./types";

export const VideoState = {
    videos:null,
    activeVideo:null,
    error:null
}

export const VideoReducer = (state=VideoState,action)=>{
    switch (action.type) {
        case GET_VIDEOS:
            return{
                ...state,
                videos:action.payload
        }

        case GET_ACTIVE_VIDEO:
            return {
                ...state,
                activeVideo: action.payload
            }

        case SET_VIDEO_ERRORS:
            return {
                ...state,
                error:action.payload
            }

        case CLEAR_VIDEO_ERRORS:
            return {
                ...state,
                error:null
            }

        case UPDATE_VIEWS:
            return {
                ...state,
                videos:state.videos.map(elem=>{
                    if(elem._id === action.payload)  elem.view +=1
                    return elem
                })
            }    

        default: return state
    }
}