import React, {useContext, useEffect, useState} from 'react';
import {avatar} from "../../images/images";
import {useParams} from "react-router";
import axios from 'axios'
import {GlobalContext} from "../../context/GlobalContext";
import {Alert, Col, Row} from "reactstrap";
import {CLEAR_VIDEO_ERRORS, GET_DISLIKES, GET_LIKES, SET_VIDEO_ERRORS} from "../../context/reducers/types";
import {SmallCard} from "./Sections/SmallCard/SmallCard";
import {Subscribe} from "./Sections/Subscribe/Subscribe";
import {Comments} from "./Sections/Comments/Comments";
import {LikeDisLikes} from "./Sections/LikeDislikes/LikeDisLikes";

export const DetailVideoPage = () => {
    const {videoId} = useParams()
    const {dispatchVideos, videos, getActiveVideo, getVideos, auth,dispatchLikes,likes} = useContext(GlobalContext)

    const [video, setVideo] = useState(null)
    const [videoList, setVideoList] = useState(null)

    const [subscribers, setSubscribers] = useState(0)

    // useEffect(()=>{
    //     const data = {
    //         videoId
    //     }
    //     console.log('video load')
    //     axios.post('/api/likes/getLikes',data)
    //         .then(res => {
    //             if(res.data.success){
    //                 dispatchLikes({type:GET_LIKES,payload:res.data.likes})

    //             }
    //         })
    //         .catch(err => console.log(err))

    //     axios.post('/api/likes/getDislikes')
    //         .then(res => {
    //             if(res.data.success){
    //                 dispatchLikes({type:GET_DISLIKES,payload:res.data.disLikes})
    //             }
    //         })
    //         .catch(err => console.log(err))
    // },[])


    useEffect(() => {
        axios.post('/api/video/getVideo', {videoId})
            .then(res => {
                if (res.data.success) {
                    getActiveVideo(res.data.video)
                    setVideo(res.data.video)
                    dispatchVideos({type: CLEAR_VIDEO_ERRORS})
                } else {
                    dispatchVideos({type: SET_VIDEO_ERRORS, payload: res.data.msg})
                }
            })
            .catch(err => dispatchVideos({type: SET_VIDEO_ERRORS, payload: err.response.data.msg}))
    }, [videoId])

    useEffect(() => {
        if (!videos.videos) {
            axios.get('/api/video/getVideos')
                .then(res => {
                    if (res.data.success) {
                        getVideos(res.data.videos)
                        setVideoList(res.data.videos)
                    } else alert('Failed to load video')
                })
                .catch(err => console.log(err))
        } else setVideoList(videos)
    }, [videos.videos])


    return (
        <Row style={{width:'98%'}} className='ml-1'>
            <Col className='col-lg-9 col-12 px-0 mx-0'>
                <div style={{width:'98%'}} className='videoPage px-2'>
                    <video onCompositionStart={()=>console.log('video play')}  className='w-100' src={video && `http://localhost:5000/${video.filePath}`} controls  ></video>
                    {videos.error && (<Alert className='mx-3' color='danger'>{videos.error}</Alert>)}
                    <div className='details'>
                        <div className='d-flex'>
                            <div className='d-flex flex-grow-1'>
                                <div>
                                    <img style={{width: '50px'}} src={avatar} alt=""/>
                                </div>

                                <div>
                                    <div><span>{video && video.writer.name}</span></div>
                                    <div style={{fontSize: '0.8rem'}}>Subscribers: {subscribers}</div>
                                </div>


                            </div>

                            {
                                auth.loginedUser && video && auth.loginedUser.id !== video.writer._id && (
                                    <div className='d-inline-flex'>
                                        <LikeDisLikes 
                                            videoId={video._id}
                                            userId={auth.loginedUser.id} 
                                        />
                                        <Subscribe
                                            userTo={video && video.writer._id}
                                            subscribers={subscribers}
                                            setSubscribers={setSubscribers}
                                        />
                                    </div>

                                )}

                        </div>

                        <div>{video && video.description}</div>
                    </div>
                    <Comments postId={videoId}/>
                </div>
            </Col>
            <Col className='col-lg-3 col-12 px-0'>
                {videoList && videoList.videos && videoList.videos.map(video => (
                    <SmallCard key={video._id} video={video}/>
                ))}
            </Col>

        </Row>
    );
}

export default DetailVideoPage;