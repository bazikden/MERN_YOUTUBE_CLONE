import {GET_ACTIVE_VIDEO, GET_VIDEOS} from "../reducers/types";


export const getVideos = (videos,dispatch) => {
    dispatch({type: GET_VIDEOS, payload: videos})
}
export const getActiveVideo = (videos,dispatch) => {
    dispatch({type: GET_ACTIVE_VIDEO, payload: videos})
}