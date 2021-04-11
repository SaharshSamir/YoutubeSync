import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import Player from './player/player';
import io from 'socket.io-client';
import queryString from 'query-string';

let socket;
const Room = ({ location }) => {
    let [name, setName] = useState('');
    let [room, setRoom] = useState('');
    let [text, setText] = useState('');
    const ENDPOINT = 'http://localhost:8080';
    const history = useHistory();
    useEffect(() => {
        socket = io.connect(ENDPOINT, {
            withCredentials: true,
            transports: ["websocket", "polling"]
        })
        // console.log(queryString.parse(location.search));
        const { name, room } = queryString.parse(location.search);
        setRoom(room);
        setName(name);

        socket.emit('join', { name, room }, err => {
            if (err) alert(err);
            history.push('/');
        })
    }, [ENDPOINT, location.search]);

    const handleSubmit = e => {
        e.preventDefault();
        setText(e.target.value);
        if (text)
        {
            socket.emit("text", { text, room }, setText(''));
        }
        e.target.firstChild.value = '';
    }
    //------------- LEAVE -------------
    const leaveRoom = e => {
        socket.disconnect();
        history.push('/');
    }
    return (
        <div className="container">
            <p>Room Page {room}</p>
            <form onSubmit={(e) => handleSubmit(e)}>
                <input placeholder="text" onChange={e => { setText(e.target.value) }}></input>
                <button className="btn btn-primary" type="submit">Send</button>
            </form>
            <button className="btn btn-danger" onClick={e => leaveRoom(e)}>Leave room</button>
            <div className="">
                <Player />
            </div>
        </div>

    )
}

export default Room;