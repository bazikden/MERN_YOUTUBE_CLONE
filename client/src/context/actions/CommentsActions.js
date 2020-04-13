import {ADD_COMMENT, ADD_SUB_COMMENT, GET_COMMENTS} from "../reducers/types";
import axios from 'axios'

export const getComments = (postId,dispatch) =>{
    const data = {postId}
    axios.post('/api/comments/getComments',data)
        .then(res => {
                if(res.data.success){
                    dispatch({type: GET_COMMENTS,payload: res.data.comments})
                }

        })
        .catch(err => console.log(err))
}

export const addComment = (comment,dispatch) => {
    dispatch({type:ADD_COMMENT,payload:comment})
}

export const addSubComment = (comment,dispatch) => {
    dispatch({type:ADD_SUB_COMMENT,payload:comment})
}