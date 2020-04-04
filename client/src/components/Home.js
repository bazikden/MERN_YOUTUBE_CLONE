import React, {useContext, useEffect} from "react";
import {VideoCard} from "./Card/Card";
import axios from "axios";
import {GlobalContext} from "../context/GlobalContext";
import {Row} from "reactstrap";



export const Home = () => {
    const {getVideos,videos} = useContext(GlobalContext)

    useEffect(()=>{
        axios.get('api/video/getVideos')
            .then(res =>{
                if(res.data.success){
                    getVideos(res.data.videos)
                }else alert('Failed to load video')
            })
            .catch(err => console.log(err))
    },[])



    return (
        <div>
            <div style={{width: '85%', margin: '3rem auto'}}>
                <h1>Recommended</h1>
                <hr/>
                <Row className='mx-auto'>
                {
                    videos.videos && videos.videos.map(video =>(

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