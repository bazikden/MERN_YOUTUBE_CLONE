import React from 'react'
import {NavLink} from "react-router-dom";

const styles = {
    duration: {
        position: 'absolute',
        bottom: 0,
        right: 0,
        margin: '4px',
        color: '#fff',
        background: 'black',
        opacity: '.7',
        padding: '0 2px'
    },
}

export const SmallCard = ({video}) => {



    const minutes = Math.floor(video.duration / 60)
    const seconds = Math.floor(video.duration - minutes * 60)
    return (
        <div style={{width:'98%'}} className='d-flex'>

                <div style={{width: '30%', position: 'relative', margin: '5px'}}>
                    <NavLink className='w-100' to={`/video/${video._id}`}>
                        <img className='w-100 h-100' src={`http://localhost:5000/${video.thumbnail}`} alt=""/>
                        <div style={styles.duration} className='duration'>
                            <span>{minutes}</span>
                            :
                            <span>{seconds}</span>
                        </div>
                    </NavLink>
                </div>



            <div>
                <span style={{fontWeight: 700, fontSize: '1rem', color: 'black'}}>{video.title}</span><br/>
                <span>{video.writer.name}</span><br/>
                <span>Views{video.view}</span><br/>

            </div>
        </div>
    )
}