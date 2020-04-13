import {ADD_COMMENT, ADD_SUB_COMMENT, GET_COMMENTS} from "./types";

export const commentsState = {
    comments:[],
    subComments:[]
}

export const CommentsReducer = (state = commentsState,action) => {
    switch (action.type) {
        case GET_COMMENTS:
            return{
                ...state,
                comments: action.payload

            }

        case ADD_COMMENT:
            return {
                ...state,
                comments: [...state.comments,action.payload],
            }

        case ADD_SUB_COMMENT:
            return {
                ...state,
                subComments:[...state.subComments,action.payload]
            }

        default: return state

    }
}