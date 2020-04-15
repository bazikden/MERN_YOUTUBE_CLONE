import React, { useEffect } from "react";
import {avatar} from "../../../../images/images";
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
      width: '100%',
      //transform: 'scale(2)',
      transition: '.3s ease-in'
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
    console.log(video.thumbnailsArr[3]);




 let start

    const onVideoEnter = e => {
        e.persist()
        let number = 0
        start =  setInterval(()=>{
            number === video.thumbnailsArr.length - 1 ? number = 0:number +=1
            e.target.src = 'public/uploads/thumbnails/' +video.thumbnailsArr[number]
        },1500)
    }

    const onVideoLeave = () => {
        console.log('leave')
        clearInterval(start)
    }
    
    return(
        <Col lg={3} md={4} xs={24}>

            <Card style={styles.card}>
                <NavLink to={`video/${video._id}`}>
                <div style={styles.video}  className='video'>
                    <img  onMouseLeave={onVideoLeave} onMouseOver={onVideoEnter} style={styles.videoImg} src={video.thumbnail} alt=""/>
                    <div style={styles.duration} className='duration'>
                        <span>{minutes}</span>
                        :
                        <span>{seconds}</span>
                    </div>
                </div>
                </NavLink>
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
         </Col>

    )
}