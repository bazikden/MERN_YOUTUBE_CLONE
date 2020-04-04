import {AUTH,  LOGOUT, REGISTER, SET_ERRORS} from "../reducers/types";
import axios from 'axios'

const config = {
    headers: {
        'Content-Type': 'application/json'
    }
}


export const Register = (data, dispatch,cb) => {
    axios.post('api/users/register', data, config)
        .then(res => {
            cb(null,true)
            dispatch({type: REGISTER, payload: res})
        })
        .catch(err => {
            cb(err)
            dispatch({type:SET_ERRORS,payload:err.response.data})
        })

}

export const Login = (data, dispatch,cb) => {
    axios.post('api/users/login', data, config)
        .then(res => {
            if (res.data.success === false) {
                cb(res.data)
                dispatch({type: SET_ERRORS, payload: res.data})
            } else {
                axios.get('api/users/auth')
                    .then(res => {
                        cb(null,true)
                        dispatch({type: AUTH, payload: res.data})
                    })
                    .catch(err => console.log(err))
            }
        })
        .catch(err => console.log(err.response.data))
}

export const Auth = (dispatch) =>{
    axios.get('/api/users/auth')
        .then(res => {
            dispatch({type: AUTH, payload: res.data})
        })
        .catch(err => console.log(err))
}

export const Logout = (dispatch) =>{
    axios.get('api/users/logout')
        .then(res => {
            dispatch({type:LOGOUT})
        })
        .catch(err => console.log(err))
}