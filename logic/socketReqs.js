const {
    addUser,
    deleteUser,
    getUsersInRoom,
    getVideoId,
    setVidId,
    getRoomForId,
} = require("./users");

const socketReqs = (io) => {
    io.on("connection", (socket) => {
        console.log("user connected...");
        socket.on("join", ({ name, room }, callback) => {
            console.log(`name: ${name}, room: ${room}`);
            const freshUser = {
                id: socket.id,
                name,
                room,
            };
            const videoId = "ScMzIvxBSi4";
            const { newUser, error } = addUser(freshUser, videoId, io, socket);
            if (error)
            {
                return callback(error);
            }
            // console.log(JSON.stringify(newUser));
            socket.join(room);
            socket.emit("userAdded", newUser);
            const usrs = getUsersInRoom(room);
            io.in(newUser.roomName).emit();
            io.in(room).emit("new-user", usrs);
        });
        //user wants video id

        // socket.once("giveVidId", ({ room }) => {
        //     var room = getRoomForId(room)
        //     console.log(room.vidId + 'line - 30');
        //     socket.emit("videoForNewUser", room.vidId);
        // })
        //play video
        socket.on("play-video", (payload) => {
            console.log("play");
            const { room } = payload;
            io.in(room).emit("play-video");
        });
        //pause video
        socket.on("pause-video", (payload) => {
            console.log("pause");
            const { room } = payload;
            io.in(room).emit("pause-video");
        });
        //seek video
        socket.on("seek-video", (payload) => {
            console.log(payload);
            var { room, timeOnClick } = payload;
            io.in(room).emit("seek-video", timeOnClick);
        });
        //set video
        socket.on("vidId", (payload) => {
            setVidId(payload);

            var { vidId, room } = payload;
            console.log(vidId);
            io.in(room).emit("setVidId", vidId);
        });
        socket.on("disconnect", (reason) => {
            // console.log(reason);
            try
            {
                console.log("disconnect event got executed");
                // if(reason !== "transport close"){
                //     const deletedUser = deleteUser(socket.id);
                // }
                let obj = deleteUser(socket.id);
                console.log("return val \n");
                console.log(obj);
                // var { userDeleted, room } = obj;
                // const usrs = getUsersInRoom(room);

                // console.log(userDeleted + " line65");
                if (obj)
                {
                    let userNamelist = obj.users.map((user) => user.name);
                    console.log(userNamelist);
                    io.in(obj.roomName).emit("new-user", userNamelist);
                }
                // socket.in(room).emit("user-deleted", userDeleted.name);
                // console.log(socket.rooms);
            } catch (err)
            {
                if (err)
                {
                    console.log(err);
                }
            }
        });
    });
};

module.exports = socketReqs;