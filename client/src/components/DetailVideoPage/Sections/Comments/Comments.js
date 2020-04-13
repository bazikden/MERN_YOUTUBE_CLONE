import React, {useContext, useEffect, useState} from "react";
import {Button, Form, FormGroup, Input} from "reactstrap";
import {GlobalContext} from "../../../../context/GlobalContext";
import axios from 'axios'
import {SingleComment} from "./Comment/SingleComment";

export const Comments = ({postId}) => {
    const [comment, setComment] = useState('')
    const {auth,getComments,addComment,comments} = useContext(GlobalContext)


    useEffect(()=>{
        getComments(postId)
    },[postId])

    const onChange = (e) => {
        setComment(e.currentTarget.value)
    }

    const onSubmit = e => {
        e.preventDefault()
        const data = {
            content:comment,
            writer:auth.loginedUser.id,
            postId
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

        setComment('')
    }

    return (
        <div>
            <br/>
            <p>Replies</p>


            <hr/>

            {
                comments.comments.length > 0  && comments.comments.map(comment => (
                    !comment.responseTo && (
                        <div key={comment._id}>
                            <SingleComment  comment={comment} postId={postId} addComment={addComment} parnetCommentId={comment._id}/>
                        </div>
                    )
                ))
            }

            <hr/>
            <Form onSubmit={onSubmit} className='d-flex  flex-row mb-3'>
                <FormGroup className='col-10 px-0 m-0'>
                    <Input value={comment} onChange={onChange} type="text" name="comment" id="comment"/>
                </FormGroup>
                <Button style={{color: '#495057', backgroundColor: "#fff", border: '1px solid #ced4da'}}
                        className='add-comment d-block col-2 ' type='submit'>Reply</Button>
            </Form>


        </div>
    )
}