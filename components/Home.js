import React, { useEffect, useState } from "react";
import { ActivityIndicator, FlatList, StyleSheet, Text, TouchableNativeFeedback, View } from "react-native";
import ShowCard from "./Card";
import Card from "./Card";

const HomeScreen = (props) => {
    const styles = StyleSheet.create({
        loading:{flex:1,
            alignItems:'center',
            justifyContent:'center', backgroundColor:'black'},
    })
    const [AiringShows,setAiringShows] = useState(null);
    const {key} = props.route.params;
    const Fetchdata = async () => {
        const url = "https://api-anime-rouge.vercel.app/aniwatch/";
        let response = await fetch(url);
        response = await response.json();
        switch (key) {
            case "Trending":
                setAiringShows(response.trendingAnimes);
                break;
            case "Latest episodes":
                setAiringShows(response.latestEpisodes);
                break;
            case "Most popular":
                setAiringShows(response.featuredAnimes.mostPopularAnimes);
                break;
            default:
                // setAiringShows(response.trendingAnimes);
                break;
        }
    }
    useEffect(() => {
        Fetchdata();
    },[])
    return (
        <View style={AiringShows?{backgroundColor:'black',paddingBottom:5}:styles.loading}>
        {
            AiringShows?
            <FlatList data={AiringShows} renderItem={({item}) => <Card ShowImage={item.img} ShowTitle={item.name} ShowID={item.id} navigation={props.navigation}/>} />
            :
            <ActivityIndicator color={'white'}  size={50}/>
        }
        </View>
    )
}



export default HomeScreen;