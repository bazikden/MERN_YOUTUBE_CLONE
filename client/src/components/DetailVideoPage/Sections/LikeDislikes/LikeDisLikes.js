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
                    // alert('Failed to get likes')
                }
            })

            Axios.post('/api/likes/getDisLikes',data)
            .then(res => {
                if(res.data.success){

                    setDisLikesCount(res.data.dislikes.length)

                    res.data.dislikes.map(dislike=>{
                        dislike.userId === userId && setDisLiked(true)
                    })
                } else{
                    // alert('Failed to get likes')
                }
            })            

    }, [])

    const onLikeClick = (e) =>{
        const data = {
            videoId,
            userId,
            commentId
        }

        if(disliked){
            setDisLiked(false)
            setDisLikesCount(dislikesCount - 1)
        }

        !liked && setLikesCount(likesCount + 1)

        liked ? setLiked(false):setLiked(true)
        Axios.post('/api/likes/addLikes',data)
            .then(res => {console.log(res)})
            .catch(err => console.log(err))
    }       

    const onDislikeClick = (e) =>{
        const data = {
            videoId,
            userId,
            commentId
        }
        if(liked){
            setLiked(false)
            setLikesCount(likesCount - 1)
        }

        !disliked && setDisLikesCount(dislikesCount + 1)

        disliked ? setDisLiked(false):setDisLiked(true)
        Axios.post('/api/likes/addDisLikes',data)
            .then(res => {console.log(res)})
            .catch(err => console.log(err))
    }
    return(
        <div className='align-self-center mr-2'>
            {
                liked ? <Icon style={styles} onClick={onLikeClick}  name="thumbs up"/>
                :
                <Icon  style={styles}  onClick={onLikeClick}  name="thumbs up outline"/>
            }
            <span className='mx-1'>{likesCount}</span>
            {
                disliked ?<Icon style={styles} onClick={onDislikeClick} name="thumbs down"/>
                :
                <Icon style={styles} onClick={onDislikeClick}  name="thumbs down outline"/>
            }
            <span className='mx-1'>{dislikesCount}</span>    



        </div>

    )
}