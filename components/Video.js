import React, { createRef, useEffect, useState } from "react";
import { Text, View, StyleSheet, TouchableNativeFeedback, Image, TouchableOpacity, Dimensions, ActivityIndicator } from "react-native";
import PauseIcon from '../Images/pauseIcon.png';
import PlayIcon from '../Images/playIcon.png';
import FulllScreenIcon from '../Images/FullScreenIcon.png';
import Video from "react-native-video";
import Orientation from "react-native-orientation-locker";
import Slider from "@react-native-community/slider";

const windowHeight = Dimensions.get('window').width * (9 / 12);
const windowWidth = Dimensions.get('window').width;

const height = Dimensions.get('window').width;
const width = Dimensions.get('window').height;

const VideoScreen = (props) => {
    const { EpisodeID } = props.route.params;
    const url = `https://api-anime-rouge.vercel.app/aniwatch/episode-srcs?id=${EpisodeID}&server=vidstreaming&category=sub`;
    const [paused, setPaused] = useState(false)
    const [videoURL, setVideoURL] = useState(null);
    const [isFullScreen, setIsFullScreen] = useState(false);
    const [progress, setProgress] = useState(null);
    const [clicked, setClicked] = useState(false);
    const VideoRef = React.createRef();
    const format = seconds => {
        let mins = parseInt(seconds / 60).toString().padStart(2, '0');
        let secs = (Math.trunc(seconds) % 60).toString().padStart(2, '0');
        return `${mins}:${secs}`;
    }
    

    const getVideoURL = async () => {
        let response = await fetch(url);
        response = await response.json();
        setVideoURL(response.sources[0].url);
    }
    useEffect(() => {
        getVideoURL();
    }, []);
    return (
        <>
            {
                videoURL ?
                    <View style={[styles.container]}>
                        <TouchableOpacity onPress={() => setClicked(!clicked)}>
                            <Video
                                ref={VideoRef}
                                source={{ uri: videoURL }}
                                muted={false}
                                onProgress={(x) => setProgress(x)}
                                controls={false}
                                paused={paused}
                                style={styles.video}
                                fullscreenOrientation="landscape"
                                resizeMode={isFullScreen?'cover':'contain'}
                            />
                            {
                                clicked &&
                                <TouchableOpacity style={{ height: '100%', width: '100%', position: 'absolute', backgroundColor: 'rgba(0,0,0,0.5)', alignItems: 'center', justifyContent: 'space-evenly', flexDirection: 'column' }}>
                                    <View style={{ flex: 1, flexDirection: "row", justifyContent: 'space-evenly', alignItems: 'center', width: "100%" }}>

                                        <TouchableOpacity onPress={() => {
                                            VideoRef.current.seek(parseInt(progress.currentTime) - 10)
                                        }}>
                                            <Image source={require('./VideoIcons/backward.png')}
                                                style={
                                                    {
                                                        height: 45, width: 45, tintColor: 'white'
                                                    }
                                                }
                                            />
                                        </TouchableOpacity>


                                        <TouchableOpacity onPress={() => setPaused(!paused)}>
                                            <Image source={paused ? require('./VideoIcons/play-button.png') : require('./VideoIcons/pause.png')}
                                                style={
                                                    {
                                                        height: 45, width: 45, tintColor: 'white'
                                                    }
                                                }
                                            />
                                        </TouchableOpacity>


                                        <TouchableOpacity onPress={() => {
                                            VideoRef.current.seek(parseInt(progress.currentTime) + 10)
                                        }}>
                                            <Image source={require('./VideoIcons/forward.png')}
                                                style={
                                                    {
                                                        height: 45, width: 45, tintColor: 'white'
                                                    }
                                                }
                                            />
                                        </TouchableOpacity>
                                    </View>
                                    <View style={{ width: '100%', justifyContent: 'space-between', flexDirection: 'row',alignItems:'center', position: 'absolute', bottom: isFullScreen?'20%':'8%', padding: 15}}>
                                        <Text style={{ color: 'white', fontSize: 15 }}>{format(progress.currentTime)}</Text>
                                        <Slider
                                            style={{ width: '80%', height: 40 }}
                                            minimumValue={0}
                                            maximumValue={progress.seekableDuration}
                                            minimumTrackTintColor="#FFFFFF"
                                            maximumTrackTintColor="#fff"
                                            onValueChange={(x) => {
                                                VideoRef.current.seek(x);
                                            } }
                                        />
                                        <Text style={{ color: 'white', fontSize: 15 }}>{format(progress.seekableDuration)}</Text>
                                    </View>
                                    <View style={{ width: '100%', justifyContent: 'space-between', flexDirection: 'row',alignItems:'center', position: 'absolute', top: isFullScreen?'18%':'11%', padding: 15}}>
                                        <TouchableOpacity onPress={() => {
                                            setIsFullScreen(!isFullScreen);
                                            if(isFullScreen){
                                                Orientation.lockToPortrait();
                                            }
                                            else{
                                                Orientation.lockToLandscape();
                                            }
                                        }}>
                                        <Image source={isFullScreen?require('./VideoIcons/minimize.png'):require('./VideoIcons/full-size.png')} style={{height:35,width:35,tintColor:'white'}} />
                                        </TouchableOpacity>
                                    </View>
                                </TouchableOpacity>
                            }
                        </TouchableOpacity>
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
        flex:1,
        height:'100%',
        width:'100%',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'black'
    },
    video: {
        width: windowWidth,
        height: windowHeight,
        backgroundColor: 'black',
    },
});

export default VideoScreen;