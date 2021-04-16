import React, { useState, useEffect } from 'react';
// import io from 'socket.io-client';
import { Link } from 'react-router-dom';
// let socket;

const Landing = () => {
    const [name, setName] = useState('');
    const [room, setRoom] = useState('');
    const [users, setUsers] = useState([]);
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
    // let handleSubmit = e => {
    //     console.log(e.target);
    // }

    return (
        <div style={{ height: "100vh" }} className="container d-flex align-items-center justify-content-center">
            <form className="d-flex flex-column from-group">
                <p className="mb-1 mt-2">Username</p>
                <input placeholder="Username" className="form-control-lg" id="nameInput" onChange={e => setUsername(e)} />
                <p className="mb-1 mt-2">Room Name</p>
                <input placeholder="Room Name" className="form-control-lg" id="roomInput" onChange={e => setRoomName(e)} />
                <Link onClick={e => (!room || !name) ? someError(e) : null} to={`/room?name=${name}&room=${room}`}>
                    <button className="btn btn-primary btn-lg m-3 ml-5" type="submit">Join</button>
                </Link>
            </form>
        </div>
    );
}

export default Landing;