// const socketReqs = require("./socketReqs");

// const users = [];
const rooms = [];


const addUser = (freshUser) => {
    let { name, room, id } = freshUser
    let searchRoom = room.trim().toLowerCase();
    let thisRoom;
    name = name.trim().toLowerCase();
    let newUser = { id, name, isAdmin: false };
    let newRoom = {
        roomName: room,
        totalUsers: 1,
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
    } else
    {
        //if the room doesn't exist
        // rooms.push({...newRoom, users: newRoom.users.push(newUser)});\
        newUser.isAdmin = true;
        newRoom.users.push(newUser);
        rooms.push(newRoom);

    }


    console.log(JSON.stringify(rooms));
    // console.log(`testing users: ${rooms[0].users[0].name}`)

    return { newUser, thisRoom };
}

// const getUserInRoom = (room) => {
//     users.filter(user => { user.room === room });
// }

const deleteUser = (id) => {
    var i = 0;
    let userId = id.toString();
    let userFound;
    let roomFoundAt, deletedUser;
    console.log(`we are searching for ${userId} which is a ${typeof (userId)}`);
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
    // console.log(userFound);
    // do{
    //     console.log(rooms[i].users);
    //     userFound = rooms[i].users.find((user) => 

    //     )
    //     i++;
    //     if(userFound) found = true;
    // }while(found)
    if (userFound)
    {
        console.log(`found: ${userFound}`);
        deletedUser = rooms[roomFoundAt].users.splice(rooms[roomFoundAt].users.indexOf(userFound), 1);

        rooms[roomFoundAt].totalUsers = rooms[roomFoundAt].users.length;
        if (rooms[roomFoundAt].totalUsers === 0)
        {
            var deleteRoom = rooms[roomFoundAt];
            rooms.splice(rooms.indexOf(deleteRoom), 1);
            return;
        }
        if (deletedUser.isAdmin)
        {
            rooms[roomFoundAt].users[0].isAdmin = true;
        }

    } else
    {
        console.log("user not found")
    }


    console.log(rooms);
    return deletedUser;

}

module.exports = { addUser, deleteUser };

