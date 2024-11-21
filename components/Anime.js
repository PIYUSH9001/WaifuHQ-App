import React, { useContext, useEffect, useState } from "react";
import { ActivityIndicator, Image, ImageBackground, ScrollView, StyleSheet, Text, TouchableNativeFeedback, TouchableOpacity, View, FlatList } from "react-native";
import LinearGradient from "react-native-linear-gradient";
import UserButton from "./UserButton";
import { Picker } from "@react-native-picker/picker";
import WaveringPlaceholder from "./Placeholder";
import VideoScreen from "./Video";
import BackgroundIMG from '../Images/backgroundImage.jpg'
import Icon from 'react-native-vector-icons/Ionicons';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { HomeTabContext } from "./context/context";
const AnimeScreen = (props) => {
    const { ShowID } = props.route.params;
    const [AnimeDetails, setAnimeDetails] = useState(null);
    const [AdditionalAnimeDetails, setAdditionalAnimeDetails] = useState(null);
    const [AnimeEpisodes, setAnimeEpisodes] = useState(null);
    const getAnimeDetails = async () => {
        const url = `https://api-anime-rouge.vercel.app/aniwatch/anime/${ShowID}`;
        let response = await fetch(url);
        response = await response.json();
        setAnimeDetails(response.info);
        setAdditionalAnimeDetails(response.moreInfo);
    }
    const getAnimeEpisodes = async () => {
        const url = `https://api-anime-rouge.vercel.app/aniwatch/episodes/${ShowID}`;
        let response = await fetch(url);
        response = await response.json();
        setAnimeEpisodes(response);
    }
    useEffect(() => {
        getAnimeDetails();
        getAnimeEpisodes();
    }, []);
    return (
        <ImageBackground source={BackgroundIMG} style={styles2.container}>
            <View style={styles2.animeDetailsTab}>
                {
                    AnimeDetails ?
                    <>
                        <Image source={{ uri: AnimeDetails.img }} style={styles2.animeImage} />
                        <AddToFavouriteBtn AnimeID={ShowID} AnimeName={AnimeDetails.name} AnimeIMG={AnimeDetails.img} />
                    </>
                    :
                    <WaveringPlaceholder height={'100%'} width={'45%'}/>
                }
                <ScrollView showsVerticalScrollIndicator={false} style={styles2.animeSynopsisTab}>
                    {
                        AnimeDetails ? <Text style={styles2.animeTitle}>{AnimeDetails.name}</Text>:
                        <WaveringPlaceholder height={25}/>
                    }
                    {
                        AnimeDetails ? <Text style={styles2.animeSynopsis}>{AnimeDetails.description}</Text>:
                        <WaveringPlaceholder height={15} width={150}/>
                    }

                </ScrollView>
            </View>
            <View style={styles2.animeEpisodesTab}>
                <Text style={{color:'white',textAlign:'left',width:'90%',padding:2,fontSize:20,fontWeight:'bold'}}>Episodes:</Text>
                {
                    AnimeEpisodes ?
                        <FlatList
                            style={styles2.episodeList}
                            data={AnimeEpisodes.episodes}
                            renderItem={({ item }) => <Episodes title={item.name} EpisodeID={item.episodeId} EpisodeCount={item.episodeNo} navigation={props.navigation} />}
                        />
                        :
                        <View style={{ flexDirection: 'row', height: '100%', width: '100%', alignItems: 'center', justifyContent: 'center' }}>
                            <ActivityIndicator size={50} color={'white'} />
                            <Text style={{ fontSize: 20, color: 'white', margin: 15 }}>Loading...</Text>
                        </View>
                }
            </View>
        </ImageBackground>
    )
}

const AddToFavouriteBtn = ({ AnimeID, AnimeName, AnimeIMG }) => {
    const [isAddedToFavourites, setIsAddedToFavourites] = useState(false);
    const {AddToFavourite,FavouriteArray,RemoveFromFavourite} = useContext(HomeTabContext);
    useEffect(()=>{
        if(FavouriteArray){
            const FindAnimeInFavourites = FavouriteArray.find(Anime => Anime.AnimeID === AnimeID);
            if(FindAnimeInFavourites){
                setIsAddedToFavourites(true);
            }
        }
    },[])
    const StoreToFavourites = async () => {
        try {
            const AnimeData = {
                AnimeID,
                AnimeName,
                AnimeIMG
            }
            await AddToFavourite(AnimeData);
        }
        catch (error) {
            console.warn(error)
        }
    }
    const DeleteFromFavourite = async () => {
        try{
            const AnimeData = {
                AnimeID,
                AnimeName,
                AnimeIMG
            }
            await RemoveFromFavourite(AnimeData.AnimeID);
        }
        catch (error) {
            console.warn(error)
        }
    }
    return (
        <TouchableNativeFeedback onPress={() => {
            if (isAddedToFavourites === false) {
                StoreToFavourites();
            }
            else{
                DeleteFromFavourite();
            }
            setIsAddedToFavourites(!isAddedToFavourites);
        }}>
            <View style={{ height: 50, width: 50, position: 'absolute', top: '8%', left: '4%', borderRadius: 25, backgroundColor: 'rgba(0,0,0,0.5)', alignItems: 'center', justifyContent: 'center' }}>
                <Icon name={`heart${!isAddedToFavourites ? '-outline' : ''}`} size={36} color="white" />
            </View>
        </TouchableNativeFeedback>
    )
}

const Episodes = ({ title, EpisodeID, EpisodeCount, navigation }) => {
    const styles = StyleSheet.create({
        EpisodeStyle: {
            height: 50,
            width: '95%',
            margin: 'auto',
            marginTop: 5,
            marginBottom: 5,
            backgroundColor: '#2b2a2a',
            alignItems: 'center',
            justifyContent: 'space-evenly',
            flexDirection: 'row',
        },
        EpisodesTitle: {
            color: 'white',
            width: '70%',
            fontSize: 20,
            textAlign: 'center',
            textAlignVertical: 'center',
        },
        EpisodeCount: {
            textAlignVertical: 'center',
            color: 'white',
            fontSize: 20,
            width: '15%',
            textAlign: 'center',
            backgroundColor: 'grey',
            height: '100%',
            fontWeight: 'bold'
        }
    })
    return (
        <TouchableNativeFeedback onPress={() => {
            navigation.navigate("VideoScreen", { EpisodeID })
        }}
            background={TouchableNativeFeedback.Ripple('black', false)}
        >
            <View style={styles.EpisodeStyle}>
                <Text style={styles.EpisodeCount}>EP {EpisodeCount}</Text>
                <Text ellipsizeMode="tail" numberOfLines={2} style={styles.EpisodesTitle}>
                    {title}
                </Text>
            </View>
        </TouchableNativeFeedback>
    )
}

const Button = ({ BtnBgColor, color, title }) => {
    const BtnStyle = StyleSheet.create({
        btn: {
            height: '50%',
            width: '45%',
            padding: 0,
            backgroundColor: BtnBgColor,
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: 10,
        },
        btnTitle: {
            textAlign: 'center',
            fontSize: 25,
            color: color,
        }
    })
    return (
        <TouchableOpacity style={BtnStyle.btn}>
            <View>
                <Text style={BtnStyle.btnTitle}>
                    {title}
                </Text>
            </View>
        </TouchableOpacity>
    )
}

const styles2 = StyleSheet.create({
    container: {
        height: '100%',
        width: '100%',
        backgroundColor: 'black',
        flexDirection: 'column',
        padding: 5,
        alignItems: 'center',
        // justifyContent:'center',
        // objectFit:'contain',
    },
    animeDetailsTab: {
        flexDirection: 'row',
        height: '45%',
        width: '100%',
        backgroundColor: 'rgba(0,0,0,0.4)',
        alignItems: 'center',
        justifyContent: 'space-around',
        margin: 5,
        padding: 10,
        borderRadius: 10
    },
    animeImage: {
        height: '100%',
        width: '45%',
        borderRadius: 10
    },
    animeSynopsisTab: {
        flexDirection: 'column',
        // alignItems:'center',
        // justifyContent:'center',
        // backgroundColor:'blue',
        padding: 0,
        margin: 5,
        borderRadius: 10,
    },
    animeTitle: {
        fontSize: 30,
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center',
    },
    animeSynopsis: {
        fontSize: 20,
        color: 'white',
        textAlign: 'center',
    },
    animeEpisodesTab: {
        flexDirection: 'column',
        height: '40%',
        width: '100%',
        backgroundColor: 'rgba(0,0,0,0.4)',
        alignItems: 'center',
        justifyContent: 'space-around',
        borderRadius: 10,
    },
    episodeList: {
        minHeight: '90%',
        backgroundColor: 'rgba(0,0,0,0.4)',
        margin: 5
    },
})

// const styles = StyleSheet.create({
//     container: {
//         // flex: 1,
//         // flexDirection: 'column',
//         // backgroundColor: 'black',
//         // alignItems: 'center',
//         // padding:10,
//         // justifyContent:'center',
//     },
//     episodesTab: {
//         height: 200,
//         alignItems: 'center',
//         justifyContent: 'center',
//         overflow: 'scroll',
//         flexDirection: 'row',
//         flexWrap: 'wrap',
//         width: '90%',
//         margin: 10,
//         backgroundColor: 'yellow',
//         borderRadius: 15,
//         padding: 5,
//         backgroundColor: '#2b2a2a'
//     },
//     loadingScreen: {
//         position: 'absolute',
//         backgroundColor: 'black',
//         height: '100%',
//         width: '100%',
//         alignItems: 'center',
//         justifyContent: 'center',
//     },
//     animeImage: {
//         position: 'absolute',
//         height: '100%',
//         width: '100%',
//     },
//     animeTitle: {
//         margin: 5,
//         fontSize: 30,
//         color: 'white',
//         textAlign: 'center',
//         fontWeight: 'bold'
//     },
//     animeSynopsisTab: {
//         padding: 5,
//         borderColor: 'white',
//         borderWidth: 1,
//         borderTopLeftRadius: 30,
//         borderTopRightRadius: 30,
//         flexDirection: 'column',
//         alignItems: 'center',
//         // justifyContent:'center',
//         height: 500,
//         width: '100%',
//         backgroundColor: 'black'
//     },
//     animeSynopsis: {
//         color: 'white',
//         fontSize: 20,
//         textAlign: 'center',
//         padding: 5,
//         width: '100%',
//         height: '30%',
//         overflow: 'scroll',
//         // backgroundColor:'white',
//     },
//     buttonTab: {
//         // backgroundColor:'yellow',
//         width: '100%',
//         height: '25%',
//         flexDirection: 'row',
//         alignItems: 'center',
//         justifyContent: 'space-around',
//     }
// })

export default AnimeScreen;