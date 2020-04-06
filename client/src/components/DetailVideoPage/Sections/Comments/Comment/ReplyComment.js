import React, {useContext, useState} from "react";
import {GlobalContext} from "../../../../context/GlobalContext";
import {SingleComment} from "./SingleComment";
import {Button, Form, FormGroup, Input} from "reactstrap";
import axios from "axios";

export const ReplyComment = ({postId,parentCommentId}) => {
    const {comments,addComment} = useContext(GlobalContext)
    const [comment,setComment] = useState('')
    const onChange = e => {
        setComment(e.currentTarget.value)
    }

    const onSubmit = e => {

    }


    return (
        <div className='comment-answer'>

            {
                comments.comments.filter(f => f.responseTo === parentCommentId).map(comment=>(
                    <SingleComment key={comment._id} comment={comment} postId={postId} addComment={addComment}/>
                ))
            }

            {/*<Form onSubmit={onSubmit} className='d-flex  flex-row mb-3'>*/}
            {/*    <FormGroup className='col-10 px-0 m-0'>*/}
            {/*        <Input value={comment} onChange={onChange} type="textarea" name="comment" id="comment"/>*/}
            {/*    </FormGroup>*/}
            {/*    <Button style={{color: '#495057', backgroundColor: "#fff", border: '1px solid #ced4da'}}*/}
            {/*            className='add-comment d-block col-2 ' type='submit'>Submit</Button>*/}
            {/*</Form>*/}

        </div>
    )
}