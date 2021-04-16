import React from 'react';
import Youtube from 'react-youtube';
import '@material-ui/core';
// import { Button } from '@material-ui/core';
import styles from './player.module.css'
import Controls from './controls'
import { orange } from '@material-ui/core/colors';
import { getThemeProps } from '@material-ui/styles';

const Player = (props) => {
    // console.log(styles.box);
    const cover = {
        height: '420px',
        width: '720px',
        backgroundColor: 'orange',
        opacity: '0',
        position: 'absolute',
        top: '18%',
        rel: '0'
    }
    // setInterval(() => {
    //     // if (timeline == null || player == null) {
    //     //     return;
    //     // }
    //     // var fraction = (player.getCurrentTime() / player.getDuration()) * 100;
    //     // box.css({ left: fraction + "%" });
    //     console.log("i should print every 5 secs")

    //     // socket.on("serverEvent", function (data) {
    //     // player.seekTo(data.currentTime);
    //     // });


    // }, 5000)
    // boxStyles.borderColor = "green";
    // console.log(player.getVideoUrl())

    return (
        <div className="container d-flex flex-column ">
            {/* <div style={cover}></div> */}
            <div id="player-1.0"></div>
            {/* <iframe id="player" type="text/html" width="640" height="390"
                src="http://www.youtube.com/embed/M7lc1UVf-VE?enablejsapi=1"
                frameBorder="0">
            </iframe> */}
            {/* embeded from yt */}
            {/* <Youtube
                videoId={'XXYlFuWEuKI'}
                onReady={e => playerReady(e)}
            /> */}
            {/* <Button variant="contained">
                <PlayArrowIcon />
            </Button> */}
            <Controls socket={props.socket} room={props.room} vidId={props.vidId} />
        </div>
    )
}
export default Player;
// function timelineLoop() {
//     var line = $("#line");
//     var box = $("#box");
//     var videoLength = player.getDuration();

//     //Emit events
//     line.click(function (event) {
//       //send seek request
//       var divOffset = $(this).offset();
//       var seekTo = ((event.pageX - divOffset.left) / 600) * videoLength;
//       // console.log(divOffset);
//       socket.emit("clientLineEvent", { time: seekTo });
//     });

//     //Listen to events
//     socket.on("serverLineEvent", function (data) {
//       console.log(data.time);
//       player.seekTo(data.time);
//     });

//     setInterval(function () {
//       if (timeline == null || player == null) {
//         return;
//       }
//       var fraction = (player.getCurrentTime() / player.getDuration()) * 100;
//       box.css({ left: fraction + "%" });
//       socket.emit("clientEvent", { currentTime: player.getCurrentTime() });

//       socket.on("serverEvent", function (data) {
//         player.seekTo(data.currentTime);
//       });
//       // socket.emit('clientSetState', {state: player.getPlayerState})
//     }, 200);
//   }