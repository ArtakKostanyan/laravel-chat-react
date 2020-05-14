import React  from 'react';
import {useDispatch, useSelector} from "react-redux";
export default function User({user}){

const [color,setColor]=useState('#ffffff');
const handleClick=(event)=>{
    
    console.log(event)
    dispatch({type:'userId',payload:user.id})
}
   const dispatch =useDispatch();
     return(


        <div className="media" style={{

            marginBottom:'5px',
            position:'relative',
        }} >
            <div className="media-left">
                <img src={user.avatar } alt="" className="media-object" />
            </div>

            <div className="media-body">
                <p className="name">{user.name}</p>
                <p className="email">{user.email}</p>
            </div>

            <div style={{
                background:'#a7a7a7',
                position:'absolute',
                width:'100%',
                height:'100%'

            }}
                 className="overlay" onClick={handleClick}> </div>
        </div>


    );
}
