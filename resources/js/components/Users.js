import React, {useState} from 'react';

import User from './User';
const URL='http://laravel-chat/api/users/';
export default function Users() {

    const [users,SetUsers]=useState([]);

    React.useEffect(()=>{
        try {
            fetch(URL)
                .then(responce=>responce.json())
                .then(res=>SetUsers(res.users))
        }catch (e) {
            alert(e)
        }

    },[])


    const UserList = users.map((user)=><User key={user.id} user={user} />)


     return (

        <div className={'container'}>
            {UserList}
        </div>
    );
}
