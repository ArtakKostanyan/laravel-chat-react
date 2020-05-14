import React, {useState} from 'react';
import {useDispatch, useSelector} from "react-redux";

export default function User({user}) {

    const [color, setColor] = useState('#ffffff');
    const handleClick = (event) => {

        setColor('#a7a7a7')
        dispatch({type: 'userId', payload: user.id})
    }
    const dispatch = useDispatch();
    return (
        <>
            {
                (user.id !== window.user.id) ?
                    <div className="media" style={{
                        background: color,
                        marginBottom: '5px',
                        position: 'relative',
                        cursor: 'pointer'
                    }}>
                        <div className="media-left">
                            <img src={user.avatar} alt="" className="media-object"/>
                        </div>

                        <div className="media-body">
                            <p className="name">{user.name}</p>
                            <p className="email">{user.email}</p>
                        </div>

                        <div style={{

                            position: 'absolute',
                            width: '100%',
                            height: '100%'

                        }}
                             className="overlay" onClick={handleClick}></div>
                    </div>

                    : ''
            }
        </>
    )
        ;
}
