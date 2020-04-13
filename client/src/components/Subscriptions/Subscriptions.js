import React, {useContext, useEffect, useState} from 'react'
import {GlobalContext} from "../../context/GlobalContext";
import axios from "axios";
import {Row} from "reactstrap";
import {VideoCard} from "../DetailVideoPage/Sections/Card/Card";

export const Subscription = () =>{
    const {getVideos,videos,auth} = useContext(GlobalContext)
    const [subscribedVideos,setSubscribedVideos] = useState(null)

    useEffect(()=>{
        const data = {
            userFrom:auth.loginedUser && auth.loginedUser.id
        }
        data.userFrom && axios.post('/api/subscribe/getSubscribedVideo',data)
            .then(result =>{
                if(result.data.success){
                    setSubscribedVideos(result.data.video)
                }else{
                    alert('Cannot get subscribed videos')
                }
            })
            .catch(err  => console.log(err))
    },[auth.loginedUser])



    return (
        <div>
            <div style={{width: '85%', margin: '3rem auto'}}>
                <h1>Subscribed Videos</h1>
                <hr/>
                <Row className='mx-auto'>
                    {
                        subscribedVideos && subscribedVideos.map(video =>(

                            <VideoCard
                                key={video._id}
                                video={video}
                            />
                        ))
                    }
                </Row>

            </div>
        </div>
    )
}