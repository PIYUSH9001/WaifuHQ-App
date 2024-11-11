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
    const Fetchdata = async () => {
        const url = "https://api.jikan.moe/v4/seasons/now";
        let response = await fetch(url);
        response = await response.json();
        setAiringShows(response.data);
    }
    useEffect(() => {
        Fetchdata();
    },[])
    return (
        <View style={AiringShows?{backgroundColor:'black',paddingBottom:5}:styles.loading}>
        {
            AiringShows?
            <FlatList data={AiringShows} renderItem={({item}) => <Card ShowImage={item.images.jpg.large_image_url} ShowTitle={item.title_english} ShowDescription={item.synopsis} ShowID={item.mal_id} navigation={props.navigation}/>} />
            :
            <ActivityIndicator color={'white'}  size={50}/>
        }
        </View>
    )
}



export default HomeScreen;