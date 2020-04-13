import {GET_DISLIKES, GET_LIKES} from "./types";

export const LikeDisLikeState = {
    likes: null,
    disLikes: null
}

export const LikeDisKikeReducer = (state = LikeDisLikeState, action) => {
    switch (action.type) {
        case GET_LIKES:
            return {
                ...state,
                likes: action.payload
            }

        case GET_DISLIKES:
            return {
                ...state,
                disLikes: action.payload
            }

        default: return state
    }
}