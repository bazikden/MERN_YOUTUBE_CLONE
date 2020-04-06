import React, {useContext, useEffect, useState} from 'react'
import {Button, Form, FormGroup, Input} from "reactstrap";
import {avatar} from "../../../../images/images";
import {ReplyComment} from "./ReplyComment";
import {GlobalContext} from "../../../../context/GlobalContext";
import axios from "axios";

export const SingleComment = ({comment, postId, addComment}) => {
    const {comments,auth} = useContext(GlobalContext)
    const [userComment,setUserComment] = useState('')
    const [countReplies, setCountReplies] = useState(0)
    useEffect(() => {
        const count = comments.comments.filter(f => f.responseTo === comment._id).length
        setCountReplies(count)
        console.log(count)
    }, [comments.comments])

    const toggleReplies = (e) => {
        if (e.currentTarget.nextElementSibling.classList.contains('active')) {
            e.currentTarget.nextElementSibling.classList.remove('active')
            e.currentTarget.firstElementChild.innerHTML = '&#9660;'
        } else {
            e.currentTarget.nextElementSibling.classList.add('active')
            e.currentTarget.firstElementChild.innerHTML = '&#9650;'
        }
    }

    const toggleReply = e =>{
        if (e.currentTarget.nextElementSibling.classList.contains('active')) {
            e.currentTarget.nextElementSibling.classList.remove('active')
        } else {
            e.currentTarget.nextElementSibling.classList.add('active')
        }
    }

    const onChange = e => {
        setUserComment(e.target.value)
    }
    const onSubmit = (e) => {
        e.preventDefault()
        const data = {
            content:userComment,
            writer:auth.loginedUser.id,
            postId,
            responseTo:comment._id
        }

        axios.post('/api/comments/saveComment',data)
            .then(res =>{
                if(res.data.success){
                    addComment(res.data.data)
                }else{
                    alert('Failed save the comment')
                }
            })
            .catch(err => console.log(err))

        setUserComment('')
    }

    return (
        <div>
            <div className='d-flex w-100 my-2'>
                <div style={{borderRadius: '50%'}} className='col-1'>
                    <img style={{width: '50px'}} src={avatar} alt=''/>
                </div>
                <div className='w-100'>
                    <span style={{fontWeight: 600}}>{comment.writer.name}</span><br/>
                    <span style={{fontSize: '0.8rem'}}>{comment.content}</span>

                    <div onClick={toggleReply} style={{fontSize: '0.8rem', color: 'blue', cursor: 'pointer'}}>
                        Reply To
                    </div>

                    <div className='comment-answer'>
                        <Form onSubmit={onSubmit} className=' d-flex  flex-row mb-3'>
                            <FormGroup className='col-10 px-0 m-0'>
                                <Input className='border-bottom' value={userComment} onChange={onChange} type="text"
                                       name="comment" id="comment"/>
                            </FormGroup>
                            <Button style={{color: '#495057', backgroundColor: "#fff", border: '1px solid #ced4da'}}
                                    className='add-comment d-block col-2 ' type='submit'>Reply</Button>
                        </Form>
                    </div>

                    <div onClick={toggleReplies} style={{fontSize: '0.8rem', color: 'blue', cursor: 'pointer'}}>

                        {
                            countReplies > 0 &&  (<span style={{display:"inline-block",color: 'black', fontWeight: 700, margin: '15px 5px 0 0'}}>&#9660;</span>)
                        }

                        {
                            countReplies > 0 && (<span>View {countReplies} replies</span>)
                        }


                    </div>
                    <ReplyComment postId={postId} parentCommentId={comment._id} addComment={addComment}/>
                </div>
            </div>
        </div>

    )
}