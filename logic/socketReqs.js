const { addUser, deleteUser } = require('./users');

const socketReqs = io => {
    io.on('connection', socket => {
        console.log('user connected...');
        socket.on("join", ({ name, room }, callback) => {
            console.log(`name: ${name}, room: ${room}`);
            const freshUser = {
                id: socket.id,
                name,
                room
            }
            const { newUser, error } = addUser(freshUser);
            if (error)
            {
                return callback(error);
            }
            socket.join(room);
            socket.emit('userAdded', newUser);
            console.log(io.sockets.adapter.rooms[room])
        });
        socket.on("text", (payload) => {
            const { room } = payload;
            console.log("log")
            io.in(room).emit("textServer", payload);
        });
        socket.emit("hi", "hi from server");
        socket.on("disconnect", (reason) => {
            // console.log(reason);
            try
            {
                console.log("disconnect event got executed");
                // if(reason !== "transport close"){
                //     const deletedUser = deleteUser(socket.id);
                // }
                deleteUser(socket.id);
                // console.log(socket.rooms);
            } catch (err)
            {   if(err){
                console.log(err);
                }
            }
        })
    });
};

module.exports = socketReqs;


