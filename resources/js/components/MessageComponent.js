import React, {useRef} from 'react';
import ReactDOM from 'react-dom';
import './App.css'
import configureStore from "../store";
import Users from './Users';
import {Provider, useDispatch, useSelector} from "react-redux";

export default function Message() {

    const message = useSelector(state => state.message)
    const userId = useSelector(state => state.userId)
    const inputEl = React.createRef();
    const mesRef = React.useRef(null);
    const dispatch = useDispatch();

    React.useEffect(() => {

        if (message.length > 0) {
            scrollToBottom()
            console.log('exab')
        }
    })


    React.useEffect(() => {

        Pusher.logToConsole = false;

        var pusher = new Pusher('6e24f1ee209792d80437', {
            cluster: 'ap2'
        });

        var channel = pusher.subscribe('my-channel');
        channel.bind('my-event', function (data) {

            let arr = [];

            if (data.message.from === window.user.id) {

                arr.push(data.message);

                dispatch({type: 'message', payload: arr})


            } else if (data.message.to === window.user.id) {

                arr.push(data.message);

                dispatch({type: 'message', payload: arr})
            }
           

        });
    }, [])
    React.useEffect(() => {

        fetch('http://laravel-chat/api/message', {
            method: 'POST',
            headers: {
                'content-type': 'application/json',
            },
            cache: 'no-cache',
            body: JSON.stringify({
                my: window.user.id,
                user: userId
            })

        })
            .then(response => response.json())
            .then(resulte => {
                if (resulte.ok) {
                    dispatch({type: 'message', payload: resulte.messages, first: true})
                }
            }).catch(error => console.error('asd'))




    }, [userId])
    const sendMessage = (event) => {


        fetch('http://laravel-chat/api/send-message', {

            method: 'POST',
            headers: {
                'content-type': 'application/json',
            },
            cache: 'no-cache',
            body: JSON.stringify({
                my: window.user.id,
                receiver_id: userId,
                text: inputEl.current.value
            })

        }).catch(error => console.error('Send Error'))

        inputEl.current.value = ''
    }
    const scrollToBottom = () => {
        if (mesRef.current !== null) {
            mesRef.current.scrollIntoView({behavior: "smooth", block: "end", inline: "nearest"});
        }
    };

    const handleKeyPress = (e) => {

        if (e.key === 'Enter') {
            sendMessage()
            inputEl.current.value = ''
        }
    }

    return (
        <>

            <div className={'container flex'}>

                <div style={{

                    maxHeight: '300px',
                    overflow: 'scroll',
                    width: '30%',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center'
                }}>
                    < Users/>
                </div>
                {userId ?

                    <div className="mesgs">
                        <div className="msg_history">
                            <div className="incoming_msg" ref={mesRef}>

                                {message.map((mes) => {

                                    if (mes.from === window.user.id) {
                                        return (
                                            <>

                                                <div key={mes.id} className="flex profile_img">
                                                    <img src={"https://ptetutorials.com/images/user-profile.png"}/>
                                                    <div className="sent">
                                                        <p>{mes.message}</p>
                                                        <p className="date">{message.created_at}</p>
                                                    </div>
                                                </div>


                                            </>
                                        )
                                    } else {

                                        return (
                                            <>
                                                <div key={mes.id} className="flex profile_img">

                                                    <div className="received">
                                                        <p>{mes.message}</p>
                                                        <p className="date">{message.created_at}</p>
                                                    </div>
                                                    <img src={"https://image.flaticon.com/icons/svg/194/194938.svg"}/>
                                                </div>


                                            </>
                                        )
                                    }

                                })}
                            </div>

                        </div>
                        <div className="input-text">

                            <input
                                onKeyPress={handleKeyPress}
                                ref={inputEl}
                                type="text"
                                name="message"
                                className="submit"
                                placeholder={'Type a message'}/>
                            <button
                                onClick={sendMessage}
                                className="msg_send_btn" type="button">
                                <i className="fa fa-paper-plane-o">
                                </i>
                            </button>
                        </div>

                    </div>


                    : ''}
            </div>
        </>
    );

}


if (document.getElementById('message')) {
    const store = configureStore();
    ReactDOM.render(
        <Provider
            store={store}
        >
            <Message/>
        </Provider>


        , document.getElementById('message'));
}
