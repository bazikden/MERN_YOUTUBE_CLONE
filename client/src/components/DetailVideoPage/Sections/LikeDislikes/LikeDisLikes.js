import React,{useState,useEffect} from "react";
import {Icon} from "semantic-ui-react";
import Axios from "axios";

const styles = {
    cursor:'pointer',
}



export const LikeDisLikes = ({videoId,userId,commentId}) => {
    const [liked,setLiked] = useState(false)
    const [disliked,setDisLiked] = useState(false)
    const [likesCount,setLikesCount] = useState(0)
    const [dislikesCount,setDisLikesCount] = useState(0)
    let data = {}

    useEffect(() => {
        if(videoId){
            data = {videoId,userId}
        } else{
            data = {commentId,userId}
        }

        Axios.post('/api/likes/getLikes',data)
            .then(res => {
                if(res.data.success){

                    setLikesCount(res.data.likes.length)

                    res.data.likes.map(like=>{
                        like.userId === userId && setLiked(true)
                    })
                } else{
                    alert('Failed to get likes')
                }
            })

    }, [videoId])

    const onLikeClick = (e) =>{
        const data = {
            videoId,
            userId,
            commentId
        }
        liked ? setLiked(false):setLiked(true)
        disliked && setDisLiked(false)
        Axios.post('/api/likes/addLikes',data)
            .then(res => {console.log(res)})
            .catch(err => console.log(err))
    }       

    const onDislikeClick = (e) =>{
        disliked ? setDisLiked(false):setDisLiked(true)
        liked && setLiked(false)
    }
    return(
        <div className='align-self-center mr-2'>
            {
                liked ? <Icon style={styles} onClick={onLikeClick}  name="thumbs up"/>
                :
                <Icon  style={styles}  onClick={onLikeClick}  name="thumbs up outline"/>
            }
            {likesCount}
            {
                disliked ?<Icon style={styles} onClick={onDislikeClick} name="thumbs down"/>
                :
                <Icon style={styles} onClick={onDislikeClick}  name="thumbs down outline"/>
            }




        </div>

    )
}