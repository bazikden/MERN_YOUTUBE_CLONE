import React, {useContext, useEffect, useState} from 'react';
import {avatar} from "../../images/images";
import {useParams} from "react-router";
import axios from 'axios'
import {GlobalContext} from "../../context/GlobalContext";
import {Alert, Col, Row} from "reactstrap";
import {CLEAR_VIDEO_ERRORS, SET_VIDEO_ERRORS} from "../../context/reducers/types";
import {SmallCard} from "../SmallCard/SmallCard";
import {Subscribe} from "../Subscribe/Subscribe";

export const DetailVideoPage = () => {
    const {videoId} = useParams()
    const {dispatchVideos, videos, getActiveVideo, getVideos, auth} = useContext(GlobalContext)

    const [video, setVideo] = useState(null)
    const [videoList, setVideoList] = useState(null)

    const [subscribers, setSubscribers] = useState(0)

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
        <Row>
            <Col className='col-lg-9 col-12'>
                <div className='videoPage'>
                    <video style={{width:'98%'}} src={video && `http://localhost:5000/${video.filePath}`} controls autoPlay ></video>
                    {videos.error && (<Alert className='mx-3' color='danger'>{videos.error}</Alert>)}
                    <div className='details'>
                        <div className='d-flex justify-content-between'>
                            <div className='d-flex'>
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
                                    <Subscribe
                                        userTo={video && video.writer._id}
                                        subscribers={subscribers}
                                        setSubscribers={setSubscribers}
                                    />
                                )}

                        </div>

                        <div>{video && video.description}</div>
                    </div>
                </div>
            </Col>
            <Col className='col-lg-3 col-12 '>
                {videoList && videoList.videos && videoList.videos.map(video => (

                    <SmallCard key={video._id} video={video}/>
                ))}
            </Col>

        </Row>
    );
}

export default DetailVideoPage;