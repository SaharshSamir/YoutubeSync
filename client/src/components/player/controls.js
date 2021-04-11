import React, { useEffect, useState } from 'react';
import styles from './player.module.css'
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import PauseIcon from '@material-ui/icons/Pause';

const Controls = () => {
    const line = <div className={styles.line} onClick={(e) => seekTo(e)}></div >
    let [player, setPlayer] = useState(0);
    let [left, setLeft] = useState("");
    const seekTo = e => {
        var videoLength = player.getDuration()
        var timeOnClick = ((e.pageX - e.target.offsetLeft) / 640) * videoLength;
        player.seekTo(timeOnClick);
        console.log(timeOnClick / 60);
    }
    const [playerReady, setPlayerReady] = useState(false);
    let boxStyles = {
        height: "15px",
        width: "15px",
        position: "relative",
        borderWidth: "2px",
        borderStyle: "solid",
        margin: "0",
        top: "8.5px",
        left: left,
        backgroundColor: "lightgoldenrodyellow",
        borderColor: "slategrey"
    }
    let box = <div style={boxStyles} onClick={(e) => console.log(e.target)}></div>

    // box.onClick(() => console.log("clicked"))
    // let player;
    // let something;
    // function onYouTubeIframeAPIReady() {
    //     player = new window.YT.Player('player', {
    //         height: '390',
    //         width: '640',
    //         videoId: 'M7lc1UVf-VE',
    //         events: {
    //             'onReady': onPlayerReady,
    //             'onStateChange': onPlayerStateChange
    //         }
    //     });
    // }

    const onPlayerReady = event => {
        // event.target.playVideo();
        setPlayerReady(true);

    };
    const loadVideo = () => {
        // const { id } = this.props;

        // the Player object is created uniquely based on the id in props
        let something = new window.YT.Player('player-1.0', {
            videoId: 'ddWKdSS5TaQ',
            height: '420px',
            width: '720px',
            playerVars: {
                color: 'white',
                controls: '0',
                disablebk: 1,
                modestbranding: '1'
            },
            events: {
                onReady: onPlayerReady,
                onStateChange: onPlayerStateChange
            }
        })
        setPlayer(something);
        // console.log(player);
    };
    useEffect(() => {
        // On mount, check to see if the API script is already loaded

        if (!window.YT)
        { // If not, load the script asynchronously
            const tag = document.createElement('script');
            tag.src = 'https://www.youtube.com/iframe_api';

            // onYouTubeIframeAPIReady will load the video after the script is loaded
            window.onYouTubeIframeAPIReady = loadVideo;

            const firstScriptTag = document.getElementsByTagName('script')[0];
            firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

        } else
        { // If script is already there, load the video directly
            loadVideo();
        }
        //end of useEffect
    }, [])
    let pauseVideo;
    let playVideo;
    pauseVideo = () => {
        player.pauseVideo();
    }
    playVideo = () => {
        player.playVideo();
    }

    var done = false;
    function onPlayerStateChange(event) {
        if (event.data == window.YT.PlayerState.PLAYING && !done)
        {
            setTimeout(player.stopVideo, 6000);
            done = true;
        }
    }
    // console.log(player);
    // timeline loop
    setInterval(() => {
        if (line == undefined || player == undefined)
        {
            return;
        }
        if (playerReady)
        {
            var fraction = (player.getCurrentTime() / player.getDuration()) * 100;
            // console.log(player);
            // var fraction = "20";
            setLeft(fraction + "%");
            // console.log(player.getCurrentTime()/60);
        }

    }, 200)
    const timeStampLeft = line.offsetLeft;
    const timeStampStyles = {
        float: 'right',
        position: 'relative',
        width: 'min-content',
        left: timeStampLeft,
        top: '5px'
    }
    const time = "2:11/10:00"
    const timeStamp = <p style={timeStampStyles}>{time}</p>

    return (
        <div className="d-flex flex-column">
            {/* <div id="player"></div> */}
            <div className="d-flex justify-content-between" style={{ width: '750px' }}>
                <div className={styles.timeLine}>
                    {line}
                    {box}
                </div>
                {timeStamp}
            </div>
            <div>
                <button className="btn btn-secondary" onClick={playVideo}>
                    <PlayArrowIcon />
                </button>
                <button className="btn btn-secondary" onClick={pauseVideo}>
                    <PauseIcon />
                </button>
            </div>
        </div>
    )
}
export default Controls;