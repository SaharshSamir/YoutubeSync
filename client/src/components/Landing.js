import React, { useState, useEffect } from 'react';
// import io from 'socket.io-client';
import { Link } from 'react-router-dom';
// let socket;

const Landing = () => {
    const [name, setName] = useState('');
    const [room, setRoom] = useState('');
    // const ENDPOINT = "http://localhost:5000";
    // useEffect(() => {
    //     socket = io.connect(ENDPOINT, {
    //         withCredentials: true
    //     });
    //     console.log(socket);
    // }, [ENDPOINT]);
    

    const setUsername = e => {
        setName(e.target.value);
    }
    const setRoomName = e => {
        setRoom(e.target.value);
    }
    const someError = e => {
        e.preventDefault();
        alert("Please fill in both the fields");
    }
    return (
        <div className="container">
            <form>
                <input placeholder="Username" id="nameInput" onChange={e => setUsername(e)} />
                <input placeholder="Room Name" id="roomInput" onChange={e => setRoomName(e)} />
                <Link onClick={e => (!room || !name) ? someError(e) : null} to={`/room?name=${name}&room=${room}`}>
                    <button className="btn btn-primary" type="submit">Join</button>
                </Link>
            </form>
        </div>
    );
}

export default Landing;