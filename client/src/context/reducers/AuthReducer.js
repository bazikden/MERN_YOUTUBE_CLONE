import {AUTH, COOKIE, DEL_ERRORS, LOGIN, LOGOUT, REGISTER, SET_ERRORS} from "./types";
export const AuthState = {
    success:null,
    error:null,
    loginedUser:null,
    isAuth:false
}

export const AuthReducer = (state = AuthState , action) => {
    switch (action.type) {
        case REGISTER:
            return {
                ...state,
                success:action.payload.data.success,
                error: action.payload.data.success === false && action.payload.data.msg
            }

        case LOGIN:
            return {
                ...state,
                success: action.payload.success,
                loginedUser: action.payload.user
            }

        case AUTH:
            const isAuth = action.payload.isAuth
            return {
                ...state,
                loginedUser: {...action.payload,isAdmin:action.payload.role === 0 ? false:true},
                isAuth:isAuth

            }

        case COOKIE:
            return {
                ...state,
                isAuth: true
            }

        case LOGOUT:
            return {
                ...state,
                success:null,
                error: null,
                loginedUser: null,
                isAuth: false
            }

        case SET_ERRORS:
            return {
                ...state,
                success: action.payload.success,
                error: action.payload.msg
            }

        case DEL_ERRORS:
            return {
                ...state,error: null, success: null
            }

        default:
            return state
    }
}