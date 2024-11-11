import React, { useState } from "react";
import { Image, ImageBackground, ScrollView, StyleSheet, Text, TouchableOpacity, View, } from "react-native";
import LinearGradient from "react-native-linear-gradient";
import UserButton from "./UserButton";
import { Picker } from "@react-native-picker/picker";
const AnimeScreen = (props) => {
    const [selectedSong, setSelectedSong] = useState(null);
    const {ShowTitle,ShowDescription,ShowImage,ShowID} = props.route.params;
    return (
        <View>
        <ImageBackground
            source={{ uri: ShowImage}}
            style={styles.animeImage}
        >
            <LinearGradient
                colors={['#00000000', '#000000']}
                style={{ height: '100%', width: '100%' }}
            />
        </ImageBackground>
        <ScrollView>
            <View style={{height:400,width:'100%'}}></View>
            <View style={styles.animeSynopsisTab}>
            <Text style={styles.animeTitle}>
                {ShowTitle}
            </Text>
            <Text style={styles.animeSynopsis}>
                {ShowDescription}
            </Text>
            <View style={styles.buttonTab}>
                <Button title={"Watch now"} color={"white"} BtnBgColor={"green"} />
                <Button title={"Add to favourites"} color={"black"} BtnBgColor={"white"} />
            </View>
            </View>
        </ScrollView>
    </View>
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
            textAlign:'center',
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

const styles = StyleSheet.create({
    container: {
        // flex: 1,
        // flexDirection: 'column',
        // backgroundColor: 'black',
        // alignItems: 'center',
        // padding:10,
        // justifyContent:'center',
    },
    animeImage: {
        position:'absolute',
        height: '100%',
        width: '100%',
    },
    animeTitle: {
        margin: 5,
        fontSize: 35,
        color: 'white',
        textAlign: 'center',
        fontWeight: 'bold'
    },
    animeSynopsisTab: {
        padding:5,
        borderColor:'white',
        borderWidth:1,
        borderTopLeftRadius:30,
        borderTopRightRadius:30,
        flexDirection:'column',
        alignItems:'center',
        // justifyContent:'center',
        height: 500,
        width: '100%',
        backgroundColor:'black'
    },
    animeSynopsis: {
        color: 'white',
        fontSize: 20,
        textAlign: 'center',
        padding: 5,
        width:'100%',
        // height:'50%',
        // backgroundColor:'white',
    },
    buttonTab:{
        // backgroundColor:'yellow',
        width:'100%',
        height:'25%',
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'space-around',
    }
})

export default AnimeScreen;