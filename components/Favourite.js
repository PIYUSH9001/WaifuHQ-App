import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useContext, useEffect, useState } from "react";
import { Dimensions, ImageBackground, StyleSheet, Text, TouchableNativeFeedback, View } from "react-native";
import { HomeTabContext } from "./context/context";
import { FlatList } from "react-native-gesture-handler";
import LinearGradient from "react-native-linear-gradient";
const { width } = Dimensions.get('window');
const styles = StyleSheet.create({
    container:{
        backgroundColor:"black",
        flexGrow:1,
        justifyContent:'center'
    },
    FavouriteAnime:{
        height:'100%',
        width:width-10/2,
        // backgroundColor:'yellow',
        aspectRatio:1,
        objectFit:'cover',
        margin:5,
        flex:1
    },
    FavouriteAnimeImage:{
        height:'100%',
        width:"100%",
    },
    FavouriteAnimeList:{
        backgroundColor:'#2b2a2a',
    },
    FavouriteAnimeTitle:{
        color:'white',
        width:'100%',
        fontSize:20,
        textAlign:'center',
        position:'relative',
        fontWeight:'bold',
        top:'80%',
        overflow:'ellipse'
    }
})

const FavouriteScreen = ({navigation}) => {
    const {FavouriteArray} = useContext(HomeTabContext);
    return(
        <View style={styles.container}>
            {
                FavouriteArray.length > 0 ? <FlatList data={FavouriteArray} 
                contentContainerStyle={styles.FavouriteAnimeList}
                numColumns={2}
                columnWrapperStyle={{ alignItems:'center', justifyContent: "space-between" }}
                renderItem={
                    ({item}) =>
                    <TouchableNativeFeedback key={item.AnimeID} useForeground={true} onPress={() => {
                        navigation.navigate("AnimeNavigation",{
                            screen:"AnimeScreen",
                            params:{
                                ShowID:item.AnimeID
                            }
                        })
                    }}>
                        <View style={styles.FavouriteAnime}>
                        <ImageBackground source={{uri:item.AnimeIMG}} style={styles.FavouriteAnimeImage}>
                        <LinearGradient
                        colors={['#00000000', '#000000']}
                        style={{ height: '100%', width: '100%' }}>
                        <Text ellipsizeMode="tail" numberOfLines={1} style={styles.FavouriteAnimeTitle}>{item.AnimeName}</Text>
                        </LinearGradient>
                        </ImageBackground>
                        </View>
                    </TouchableNativeFeedback>
                } /> : ''
            }
        </View>
    )
}

export default FavouriteScreen;