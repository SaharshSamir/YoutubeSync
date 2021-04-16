// const socketReqs = require("./socketReqs");

// const users = [];
const rooms = [];


const addUser = (freshUser, videoId, io, socket) => {
    let { name, room, id } = freshUser
    let searchRoom = room.trim().toLowerCase();
    let thisRoom;
    name = name.trim().toLowerCase();
    let newUser = { id, name, isAdmin: false, roomName: room };
    let newRoom = {
        roomName: room,
        totalUsers: 1,
        vidId: videoId,
        users: []
    }
    if (rooms.filter(room => room.roomName === searchRoom).length > 0)
    {
        //if the room already exists
        const currentRoom = rooms.find(room => room.roomName === searchRoom);
        thisRoom = currentRoom;
        const existingUser = currentRoom.users.find((user) => user.name === name);
        // console.log(existingUser);
        if (existingUser)
        {
            return { error: "Username is taken" };
        }
        currentRoom.users.push(newUser);
        currentRoom.totalUsers = currentRoom.users.length;
        console.log(JSON.stringify(rooms));
        socket.emit("videoForNewUser", currentRoom.vidId);
        return { newUser, thisRoom };

    } else
    {
        //if the room doesn't exist
        // rooms.push({...newRoom, users: newRoom.users.push(newUser)});\
        newUser.isAdmin = true;
        newRoom.users.push(newUser);
        rooms.push(newRoom);
        io.emit("setVidId", newRoom.vidId);
        console.log(JSON.stringify(rooms));
        return { newUser, thisRoom };

    }


    console.log(JSON.stringify(rooms));
    // console.log(`testing users: ${rooms[0].users[0].name}`)

    return { newUser, thisRoom };
}

const getUsersInRoom = (room) => {
    const currentRoom = rooms.find(i => i.roomName === room);
    // console.log(room + 'line50');
    // console.log(currentRoom);
    let usrNames = currentRoom.users.map(usr => {
        return usr.name;
    })
    // console.log(usrNames);
    return usrNames;
}

const setVidId = (payload) => {
    var { vidId, room } = payload;
    rooms.find(i => i.roomName === room).vidId = vidId;
    console.log(rooms.find(i => i.roomName === room));
}

const getVideoId = (room) => {
    // const currentRoom = rooms.find(i => i.roomName === room);
    // console.log(currentRoom);
    // return currentRoom.vidId;
}
const getRoomForId = (room) => {
    const currentRoom = rooms.find(i => i.roomName === room);
    console.log(currentRoom + 'line80 user.js');
    return currentRoom;
}

const deleteUser = (id) => {
    var i = 0;
    let userId = id.toString();
    let userFound;
    let roomFoundAt, deletedUser;
    // console.log(`we are searching for ${userId} which is a ${typeof (userId)}`);
    while (i < rooms.length)
    {
        userFound = rooms[i].users.find((user) =>
            user.id === userId
        )
        if (userFound)
        {
            roomFoundAt = i;
            break;
        }
        // console.log(rooms[i].name)
        i++;
    }

    if (userFound)
    {
        // console.log(`found: ${userFound}`);
        deletedUser = rooms[roomFoundAt].users.splice(rooms[roomFoundAt].users.indexOf(userFound), 1);
        rooms[roomFoundAt].totalUsers = rooms[roomFoundAt].users.length;
        if (rooms[roomFoundAt].totalUsers === 0)
        {
            var deleteRoom = rooms[roomFoundAt];
            rooms.splice(rooms.indexOf(deleteRoom), 1);
            // return { userDeleted: deletedUser[0], room: rooms[roomFoundAt] };
            return rooms[roomFoundAt];
        }
        if (deletedUser[0].isAdmin)
        {
            rooms[roomFoundAt].users[0].isAdmin = true;
            // return { userDeleted: deletedUser[0], room: rooms[roomFoundAt] };
            return rooms[roomFoundAt];
        }
        console.log(JSON.stringify(rooms));
        console.log(JSON.stringify(deletedUser) + " line107")
        // return { userDeleted: deletedUser[0], room: rooms[roomFoundAt] };
        return rooms[roomFoundAt];
    } else
    {
        console.log("user not found")
    }
    console.log(JSON.stringify(rooms));



}

module.exports = { addUser, deleteUser, getUsersInRoom, getVideoId, setVidId, getRoomForId };

