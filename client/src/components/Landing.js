import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';

let socket;
const Landing = () => {
    const [name, setName] = useState('');
    const [room, setRoom] = useState('');

    socket = io.connect('http://localhost:3000');
    console.log(socket);

    const setUsername = e => {
        setName(e.target.value);
    }
    const setRoomName = e => {
        setRoom(e.target.value);
    }

    const submitFunc = (e) => {
        e.preventDefault();
        console.log('submitted');
        socket.emit('addUser', { name, room });
    }
    return (
        <div className="container">
            <form onSubmit={e => submitFunc(e)}>
                <input placeholder="Username" id="nameInput" onChange={e => setUsername(e)} />
                <input placeholder="Room Name" id="roomInput" onChange={e => setRoomName(e)} />
                <button className="btn btn-primary" type="submit">Join</button>
            </form>
        </div>
    );
}

export default Landing;