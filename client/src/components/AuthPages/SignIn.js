import React, { useContext, useEffect, useRef} from 'react';
import {Button, Form, FormGroup, Label, Input, Alert} from 'reactstrap';
import {GlobalContext} from "../../context/GlobalContext";
import {DEL_ERRORS} from "../../context/reducers/types";
import {useState} from "reinspect";
import {useHistory} from "react-router";


const SignIn = () => {
    const [data, setData] = useState({})
    const {Register, auth, dispatchAuth} = useContext(GlobalContext)
    const history = useHistory()

    const alert1 = React.createRef()
    const alert2 = useRef()

    useEffect(() => {
        dispatchAuth({type: DEL_ERRORS})
    }, [dispatchAuth])


    const onChange = (e) => {
        auth.success !== null && dispatchAuth({type: DEL_ERRORS})
        setData({...data, [e.target.name]: e.target.value})
    }

    const onSubmit = (e) => {
        e.preventDefault()
        Register(JSON.stringify(data),(err,success)=>{
            if(err) console.log(err)
            success && history.push('/')
        })

    }
    return (
        <div className="container mt-5">
            <Form onSubmit={onSubmit}>
                <FormGroup>
                    <Label for="name">FirstName</Label>
                    <Input  onChange={onChange} type="text" name="name" id="name" placeholder="Enter the name"/>
                </FormGroup>
                <FormGroup>
                    <Label for="lastname">LastName</Label>
                    <Input  onChange={onChange} type="text" name="lastname" id="lastname"
                           placeholder="Lastname"/>
                </FormGroup>
                <FormGroup>
                    <Label for="email">Email</Label>
                    <Input  onChange={onChange} type="email" name="email" id="email" placeholder="Email"/>
                </FormGroup>
                <FormGroup>
                    <Label for="password">Password</Label>
                    <Input  onChange={onChange} type="password" name="password" id="password"
                           placeholder="Password"/>
                </FormGroup>
                {
                    auth.success === true ? (
                        <div ref={alert1} className="alert_info">
                            <Alert color="success">
                                Congratulation !!! You Registered successful!!
                            </Alert>
                        </div>

                    ) : auth.success !== null && (
                        <div ref={alert2} className="alert_info">
                            <Alert  color="danger">
                                {auth.error}
                            </Alert>
                        </div>
                    )
                }

                <Button className='d-block w-25 m-auto' type='submit'>Submit</Button>
            </Form>
        </div>

    );
}

export default SignIn;
