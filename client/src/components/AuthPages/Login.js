import React, {useContext, useEffect} from 'react';
import {Button, Form, FormGroup, Label, Input, Alert} from 'reactstrap';
import {GlobalContext} from "../../context/GlobalContext";
import {DEL_ERRORS} from "../../context/reducers/types";
import {useHistory} from "react-router";
import {useState} from "reinspect";

const Login = () => {
    const {Login,dispatchAuth,auth} = useContext(GlobalContext)
    const [data, setData] = useState({})
    const history = useHistory()

    useEffect(()=>{
        auth.isAuth && history.push('/')
    },[auth.isAuth,history])

    const onChange = (e) => {
        auth.success !==null && dispatchAuth({type:DEL_ERRORS})
        setData({...data, [e.target.name]: e.target.value})
    }

    const onSubmit =  (e) => {
        e.preventDefault()
        Login(data,((err,success)=>{
            if(err) console.log(err)
            success && history.push('/')
        }))

    }
    return (
        <div className="container mt-5">
            <Form onSubmit={onSubmit}>
                <FormGroup>
                    <Label for="email">Email</Label>
                    <Input onChange={onChange} type="email" name="email" id="email" placeholder="with a placeholder"/>
                </FormGroup>
                <FormGroup>
                    <Label for="password">Password</Label>
                    <Input onChange={onChange} type="password" name="password" id="password"
                           placeholder="password placeholder"/>
                </FormGroup>
                {
                    auth.success !== null && auth.success ===false && (
                        <Alert color="danger">
                            {auth.error}
                        </Alert>
                    )
                }

                <Button className='d-block w-25 m-auto'  type='submit'>Submit</Button>
            </Form>
        </div>

    );
}

export default Login;
