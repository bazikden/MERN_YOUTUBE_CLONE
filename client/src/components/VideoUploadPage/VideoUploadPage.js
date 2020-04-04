import React, {useContext, useEffect } from 'react';
import {Button, CustomInput, Form, FormGroup, Input, Label} from "reactstrap";
import Dropzone from "react-dropzone";
import axios from 'axios'
import {GlobalContext} from "../../context/GlobalContext";
import {SET_ERRORS} from "../../context/reducers/types";
import {useHistory} from "react-router";
import {useState} from "reinspect";

function VideoUploadPage(props) {
    const history = useHistory()
    const {dispatchAuth, auth} = useContext(GlobalContext)
    // const [file, setFile] = useState(null)
    const [data, setData] = useState({
        title: null,
        description: null,
        access: 0,
        category: 'Films & Animation',
        filePath: null,
        duration: null,
        thumbnail: null,
        thumbnailsArr: []
    })

    useEffect(()=>{
        console.log(data.filePath)
    },[data.filePath])

    const onChange = (e) => {
        setData({...data, [e.target.name]: e.target.value})
    }


    const onDrop = (files) => {
        const config = {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        }

        const formData = new FormData()
        formData.append('file', files[0])

        axios.post('api/video/uploadFiles', formData, config)
            .then(res => {
                if (res.data.success) {
                    console.log(res.data)
                    const fileData = {
                        filePath: res.data.file.filePath,
                        fileName: res.data.file.fileName
                    }
                    const filePath =res.data.file.filePath
                    setData({...data,filePath})
                    console.log(data)
                    // generate thumbnail with this filepath

                    axios.post('api/video/thumbnails', fileData)
                        .then(res => {
                            if (res.data.success) {
                                setData({
                                    ...data,
                                    filePath,
                                    duration: res.data.fileDuration,
                                    thumbnail: res.data.thumbFilePath,
                                    thumbnailsArr: res.data.thumbnailsArr
                                })
                            } else {
                                res.json({success: false, msg: 'Failed to make the thumbnails'})
                            }
                        })



                } else {
                    dispatchAuth({type: SET_ERRORS, payload: res.data})
                }


            })
            .catch(err => console.log(err))
    }

    const onSubmit = e => {
        e.preventDefault()
        console.log(data)
        const formData = {
            writer: auth.loginedUser.id,
            title: data.title,
            description: data.description,
            privacy: data.access,
            filePath: data.filePath,
            category: data.category,
            duration: data.duration,
            thumbnail: data.thumbnail,
            thumbnailsArr: data.thumbnailsArr
        }

        axios.post('api/video/uploadVideo', formData)
            .then(res => {
                if (res.data.success) {
                    alert("Video saved successfully");
                    history.push('/')
                } else {
                    res.json({success: false, msg: 'Failed to upload video'})
                }


            })
    }

    return (
        <div className='container'>
            <Form onSubmit={onSubmit}>
                <div className='d-flex flex-wrap '>
                    <Dropzone
                        onDrop={onDrop}
                        multiple={false}
                        maxSize={800000000}>
                        {({getRootProps, getInputProps}) => (
                            <div className='mt-5 mr-5' style={{
                                width: '300px',
                                height: '240px',
                                border: '1px solid lightgray',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                cursor: "pointer",
                                backgroundImage:`http://localhost:5000/${data.thumbnail}`
                            }}
                                 {...getRootProps()}
                            >
                                <input name='file' {...getInputProps()} />
                                <div style={{fontSize: '3rem', cursor: "pointer"}}>+</div>

                            </div>
                        )}
                    </Dropzone>

                    {
                        data.thumbnail !== '' &&
                        <div>
                            <img className='mt-5' src={data.thumbnail && `http://localhost:5000/${data.thumbnail}`}
                                 alt=""/>
                        </div>

                    }
                </div>

                {/*<div className='mt-1 mb-5'>{file && file[0].name}</div>*/}
                <FormGroup>
                    <Label for="title">Title</Label>
                    <Input onChange={onChange} type="text" name="title"/>
                </FormGroup>
                <FormGroup>
                    <Label for="description">Description</Label>
                    <Input onChange={onChange} type="textarea" name="description" id="description"/>
                </FormGroup>
                <FormGroup>
                    <Label for="access">Custom Select</Label><br/>
                    <CustomInput onChange={onChange} style={{maxWidth: '320px'}} type="select" id="access"
                                 name="access">
                        <option value={0}>Private</option>
                        <option value={1}>Public</option>
                    </CustomInput>
                </FormGroup>
                <FormGroup>
                    <Label for="category">Custom Select</Label><br/>
                    <CustomInput onChange={onChange} style={{maxWidth: '320px'}} type="select" id="category"
                                 name="category">
                        <option value="Films & Animation">Films & Animation</option>
                        <option value='Autos & Vehicles'>Autos & Vehicles</option>
                        <option value='Music'>Music</option>
                        <option value='Pets & Animals'>Pets & Animals</option>
                        <option value='Sports'>Sports</option>
                    </CustomInput>
                </FormGroup>
                <Button>Submit</Button>

            </Form>
        </div>
    );
}

export default VideoUploadPage;