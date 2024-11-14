import React, { useEffect, useState } from "react";
import { ActivityIndicator, Image, ImageBackground, ScrollView, StyleSheet, Text, TouchableNativeFeedback, TouchableOpacity, View, FlatList } from "react-native";
import LinearGradient from "react-native-linear-gradient";
import UserButton from "./UserButton";
import { Picker } from "@react-native-picker/picker";
import WaveringPlaceholder from "./Placeholder";
import VideoScreen from "./Video";
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
        getAnimeEpisodes()
    }, []);
    return (
        <View style={styles2.container}>
            <View style={styles2.animeDetailsTab}>
                {
                    AnimeDetails &&
                    <Image source={{ uri: AnimeDetails.img }} style={styles2.animeImage} />
                }
                <ScrollView showsVerticalScrollIndicator={false} style={styles2.animeSynopsisTab}>
                    {
                        AnimeDetails && <Text style={styles2.animeTitle}>{AnimeDetails.name}</Text>
                    }
                    {
                        AnimeDetails && <Text style={styles2.animeSynopsis}>{AnimeDetails.description}</Text>
                    }

                </ScrollView>
            </View>
            <View style={styles2.animeEpisodesTab}>
                {
                    AnimeEpisodes ?
                        <FlatList
                            style={styles2.episodeList}
                            data={AnimeEpisodes.episodes}
                            renderItem={({ item }) => <Episodes title={`Episode ${item.episodeNo} : ${item.name}`} EpisodeID={item.episodeId} navigation={props.navigation}/>}
                        />
                        :
                        <View style={{flexDirection:'row',height:'100%',width:'100%',alignItems:'center',justifyContent:'center'}}>
                            <ActivityIndicator size={50} color={'white'}/>
                            <Text style={{ fontSize: 20, color: 'white',margin:15 }}>Loading...</Text>
                        </View>
                }
            </View>
        </View>


        // <View style={styles2.container}>
        //     <View style={styles2.animeDetailsTab}>
        //         {
        //             <Image source={{ uri: "https://img.flawlessfiles.com/_r/300x400/100/2d/1c/2d1cb3f0d6a5eea02851ea80f515b984/2d1cb3f0d6a5eea02851ea80f515b984.jpg" }} style={styles2.animeImage} />
        //         }
        //         <ScrollView style={styles2.animeSynopsisTab} showsVerticalScrollIndicator={false}>
        //             {
        //                 <Text style={styles2.animeTitle}>My Star: Season 2</Text>
        //             }
        //             {
        //                 <Text style={styles2.animeSynopsis}>With the help of producer Masaya Kaburagi, Aquamarine \"Aqua\" Hoshino and Kana Arima have landed the roles of Touki and Tsurugi in Lala Lai Theatrical Company's stage adaptation of the popular manga series Tokyo Blade. Co-starring with them is Aqua's girlfriend, Akane Kurokawa, who plays Touki's fiancée, Princess Saya. Due to the fanbase preferring Tsurugi as Touki's love interest, Saya has made fewer and fewer appearances in the manga, making it difficult for Akane to fully immerse herself in the role. Her struggles are compounded by differences between the play's script and the original work—differences that also frustrate Tokyo Blade's author, Abiko Samejima.\n\nAqua, however, is more concerned with his personal goals than he is with the play. He has only one objective in mind: to grow closer to director Toshirou Kindaichi and find out what he knows about Aqua's mother, Ai</Text>
        //             }

        //         </ScrollView>
        //     </View>
        //     <View style={styles2.animeEpisodesTab}>
        //         <FlatList style={styles2.episodeList}
        //             data={[
        //                 {
        //                     "name": "Tokyo Blade",
        //                     "episodeNo": 1,
        //                     "episodeId": "my-star-season-2-19256?ep=125795",
        //                     "filler": false
        //                 },
        //                 {
        //                     "name": "The Telephone Game",
        //                     "episodeNo": 2,
        //                     "episodeId": "my-star-season-2-19256?ep=126061",
        //                     "filler": false
        //                 },
        //                 {
        //                     "name": "Rewriting",
        //                     "episodeNo": 3,
        //                     "episodeId": "my-star-season-2-19256?ep=126315",
        //                     "filler": false
        //                 },
        //                 {
        //                     "name": "Emotional Acting",
        //                     "episodeNo": 4,
        //                     "episodeId": "my-star-season-2-19256?ep=126666",
        //                     "filler": false
        //                 },
        //                 {
        //                     "name": "The Curtain Rises",
        //                     "episodeNo": 5,
        //                     "episodeId": "my-star-season-2-19256?ep=126842",
        //                     "filler": false
        //                 },
        //                 {
        //                     "name": "Growth",
        //                     "episodeNo": 6,
        //                     "episodeId": "my-star-season-2-19256?ep=127051",
        //                     "filler": false
        //                 },
        //                 {
        //                     "name": "Sun",
        //                     "episodeNo": 7,
        //                     "episodeId": "my-star-season-2-19256?ep=127317",
        //                     "filler": false
        //                 },
        //                 {
        //                     "name": "Trigger",
        //                     "episodeNo": 8,
        //                     "episodeId": "my-star-season-2-19256?ep=127574",
        //                     "filler": false
        //                 },
        //                 {
        //                     "name": "Dream",
        //                     "episodeNo": 9,
        //                     "episodeId": "my-star-season-2-19256?ep=127740",
        //                     "filler": false
        //                 },
        //                 {
        //                     "name": "Liberation",
        //                     "episodeNo": 10,
        //                     "episodeId": "my-star-season-2-19256?ep=128005",
        //                     "filler": false
        //                 },
        //                 {
        //                     "name": "Freedom",
        //                     "episodeNo": 11,
        //                     "episodeId": "my-star-season-2-19256?ep=128164",
        //                     "filler": false
        //                 },
        //                 {
        //                     "name": "Reunion",
        //                     "episodeNo": 12,
        //                     "episodeId": "my-star-season-2-19256?ep=128248",
        //                     "filler": false
        //                 },
        //                 {
        //                     "name": "Wish",
        //                     "episodeNo": 13,
        //                     "episodeId": "my-star-season-2-19256?ep=128473",
        //                     "filler": false
        //                 }
        //             ]} renderItem={({ item }) =>
        //                 <Episodes title={`Episode ${item.episodeNo} : ${item.name}`} />
        //             } />
        //     </View>
        // </View>
    )
}

const Episodes = ({ title ,EpisodeID,navigation}) => {
    const styles = StyleSheet.create({
        EpisodeStyle: {
            height: 60,
            width: '90%',
            backgroundColor: 'white',
            margin: 'auto',
            marginBottom: 10,
            marginTop: 10,
            alignItems: 'center',
            flexDirection: 'row',
            justifyContent: 'center',
            borderRadius: 30,
            padding: 5,
        },
        EpisodesTitle: {
            color: 'black',
            fontSize: 20,
            textAlign: 'center'
        }
    })
    return (
        <TouchableNativeFeedback onPress={()=>{
            navigation.navigate("VideoScreen",{EpisodeID})
        }}>
            <View style={styles.EpisodeStyle}>
                <Text style={styles.EpisodesTitle}>
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
    },
    animeDetailsTab: {
        flexDirection: 'row',
        height: '45%',
        width: '100%',
        backgroundColor: '#2b2a2a',
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
        flexDirection: 'row',
        height: '45%',
        width: '100%',
        backgroundColor: '#2b2a2a',
        alignItems: 'center',
        justifyContent: 'space-around',
        borderRadius: 10,

    },
    episodeList: {
        minHeight: '90%',
        backgroundColor: '#2b2a2a',
        margin: 5
    },
})

const styles = StyleSheet.create({
    container: {
        // flex: 1,
        // flexDirection: 'column',
        // backgroundColor: 'black',
        // alignItems: 'center',
        // padding:10,
        // justifyContent:'center',
    },
    episodesTab: {
        height: 200,
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'scroll',
        flexDirection: 'row',
        flexWrap: 'wrap',
        width: '90%',
        margin: 10,
        backgroundColor: 'yellow',
        borderRadius: 15,
        padding: 5,
        backgroundColor: '#2b2a2a'
    },
    loadingScreen: {
        position: 'absolute',
        backgroundColor: 'black',
        height: '100%',
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
    },
    animeImage: {
        position: 'absolute',
        height: '100%',
        width: '100%',
    },
    animeTitle: {
        margin: 5,
        fontSize: 30,
        color: 'white',
        textAlign: 'center',
        fontWeight: 'bold'
    },
    animeSynopsisTab: {
        padding: 5,
        borderColor: 'white',
        borderWidth: 1,
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        flexDirection: 'column',
        alignItems: 'center',
        // justifyContent:'center',
        height: 500,
        width: '100%',
        backgroundColor: 'black'
    },
    animeSynopsis: {
        color: 'white',
        fontSize: 20,
        textAlign: 'center',
        padding: 5,
        width: '100%',
        height: '30%',
        overflow: 'scroll',
        // backgroundColor:'white',
    },
    buttonTab: {
        // backgroundColor:'yellow',
        width: '100%',
        height: '25%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-around',
    }
})

export default AnimeScreen;