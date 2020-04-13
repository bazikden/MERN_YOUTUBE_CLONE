import React, {useContext, useEffect, useState} from 'react'
import axios from 'axios'
import {GlobalContext} from "../../../../context/GlobalContext";



export const Subscribe = ({userTo,setSubscribers,subscribers}) => {
    const {auth} = useContext(GlobalContext)
    const [subscribed,setSubscribed] = useState(false)

    const subscribeVariables = {
        userTo,
        userFrom: auth.loginedUser ? auth.loginedUser.id:null
    }

    useEffect(() => {
        if(userTo){
            axios.post('/api/subscribe/subscribers', subscribeVariables)
                .then(res => {
                    if (res.data.success) {

                        setSubscribers(res.data.subscribers)
                    } else {
                        alert('Failed to subscribe')
                    }
                })
                .catch(err => console.log(err))
            axios.post('/api/subscribe/subscribed', subscribeVariables)
                .then(res => {
                    if (res.data.success) {
                        setSubscribed(res.data.subscribed)
                    } else {
                        alert('Failed to subscribe')
                    }
                })
                .catch(err => console.log(err))
        }

    }, [userTo,auth.isAuth])

    const onClick = () => {
        if (!subscribed){
            axios.post('/api/subscribe/subscribe',subscribeVariables)
                .then(res => {
                    if(res.data.success){
                        setSubscribed(!subscribed)
                        setSubscribers(subscribers + 1)
                    }else {
                        alert('Failed to subscribe')
                    }
                })
                .catch(err => console.log(err))
        } else {
            axios.post('/api/subscribe/unsubscribe',subscribeVariables)
                .then(res => {
                    if(res.data.success){
                        setSubscribed(!subscribed)
                        setSubscribers(subscribers - 1)
                    }else {
                        alert('Failed to unsubscribe')
                    }
                })
                .catch(err => console.log(err))
        }

    }

    return (
        <div>
            <button className={`button ${subscribed?'subscribed':'notSubscribed'}`} onClick={onClick} >{subscribed?'Subscribed':'Subscribe'}</button>
        </div>
    )
}