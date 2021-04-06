import io from 'socket.io-client';

const ENDPOINT = "http://localhost:5000";
const socket = io.connect(ENDPOINT, {
    withCredentials: true
})

export default { ENDPOINT, socket }