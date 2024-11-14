import React, { createRef, useEffect, useState } from "react";
import { Text, View, StyleSheet, TouchableNativeFeedback, Image, TouchableOpacity, Dimensions, ActivityIndicator } from "react-native";
import PauseIcon from '../Images/pauseIcon.png';
import PlayIcon from '../Images/playIcon.png';
import FulllScreenIcon from '../Images/FullScreenIcon.png';
import Video from "react-native-video";
import Orientation from "react-native-orientation-locker";

const windowHeight = Dimensions.get('window').width * (9/12);
const windowWidth = Dimensions.get('window').width;

const height = Dimensions.get('window').width;
const width = Dimensions.get('window').height;

const VideoScreen = (props) => {
    const {EpisodeID} = props.route.params;
    const url = `https://api-anime-rouge.vercel.app/aniwatch/episode-srcs?id=${EpisodeID}&server=vidstreaming&category=sub`;
    const [VideoControlIcon, setVideoControlIcon] = useState(PauseIcon);
    const [paused, setPaused] = useState(false)
    const [videoURL, setVideoURL] = useState(null);
    const [isFullScreen,setIsFullScreen] = useState(false);
    const VideoRef = React.createRef();

    const onFullscreenPlayerWillPresent = () => {
        Orientation.lockToLandscape();
        setIsFullScreen(true);
    }
    const onFullscreenPlayerWillDismiss = () => {
        Orientation.lockToPortrait();
        setIsFullScreen(false);
    }
    
    const togglePlayPause = () => {
        setPaused(!paused);
        if (VideoControlIcon === PauseIcon) {
            setVideoControlIcon(PlayIcon);
        }
        else {
            setVideoControlIcon(PauseIcon);
        }
    };
    const getVideoURL = async () => {
        let response = await fetch(url);
        response = await response.json();
        setVideoURL(response.sources[0].url);
    }
    useEffect(() => {
        getVideoURL();
        console.warn("Hello")
    }, []);
    useEffect(()=>{
        console.warn(videoURL)
    },[videoURL])
    return (
        <>
            {
                videoURL ?
                <View style={styles.container}>
                    <Video
                    ref={VideoRef}
                    source={{uri:videoURL}}
                    muted={false}
                    controls={true}
                    style={styles.video}
                    fullscreenOrientation="landscape"
                    onFullscreenPlayerWillPresent={onFullscreenPlayerWillPresent}
                    onFullscreenPlayerDidDismiss={onFullscreenPlayerWillDismiss}
                    />
                </View>
                :
                <View style={styles.container}>
                    <ActivityIndicator size={50} color={'white'} />
                </View>
            }
        </>
    )
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'black'
    },
    video: {
        width:windowWidth,
        height:windowHeight,
        backgroundColor:'black',
    },
    controlIcon: {
        height: 75,
        width: 75,
        borderRadius: 37.5,
        backgroundColor: 'white',
        margin: 10,
    },
    overlay:{
        position:'absolute',
        top:0,
        left:0,
        bottom:0,
        right:0,
        justifyContent:'space-between',
        backgroundColor:'#000000c4'
    }
});

export default VideoScreen;