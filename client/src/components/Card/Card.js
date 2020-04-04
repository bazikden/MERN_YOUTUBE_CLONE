import React from "react";
import {avatar} from "../../images/images";
import {Card, Col} from "reactstrap";
import moment from "moment"
import {NavLink} from "react-router-dom";

const styles ={
    card:{

        margin:'1rem auto'
    },
    description:{
        display:'flex'
    },
    avatar:{
        width:'40px'
    },
    video:{
      position: 'relative'
    },
    videoImg:{
      width: '100%'
    },
    duration:{
        position:'absolute',
        bottom:0,
        right:0,
        margin: '4px',
        color:'#fff',
        background:'black',
        opacity:'.7',
        padding: '0 2px'
    },
    avatarImg:{
        margin:'0 5px'
    },
    videoDescription:{
        margin:'0 5px'
    }
}


export const VideoCard = ({video}) =>{
    const minutes = Math.floor(video.duration/60)
    const seconds = Math.floor(video.duration - minutes * 60)

    return(
        <Col lg={3} md={4} xs={24}>
            <NavLink to={`video/${video._id}`}>
            <Card style={styles.card}>
                <div style={styles.video}  className='video'>
                    <img style={styles.videoImg} src={video.thumbnail.replace(/'public,uploads'/gi,'')} alt=""/>
                    <div style={styles.duration} className='duration'>
                        <span>{minutes}</span>
                        :
                        <span>{seconds}</span>
                    </div>
                </div>
                <div style={styles.description} className="description">
                    <div style={styles.avatarImg} className="avatar">
                        <img style={styles.avatar} src={avatar} alt=""/>
                    </div>
                    <div style={styles.videoDescription} className="video-description">
                        <div className="video-title">
                            {video.title}
                        </div>
                        <div className="video-writer">{video.writer.name}</div>
                        <div className="views">
                            <span>{video.view} views</span>-<span>{moment(video.createdAt).format("MMM Do YY")}</span>
                        </div>
                    </div>
                </div>
            </Card>
            </NavLink>
        </Col>

    )
}