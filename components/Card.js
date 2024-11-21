import React from "react";
import { Image, StyleSheet, View, Text, ImageBackground, TouchableNativeFeedback } from "react-native";
import LinearGradient from "react-native-linear-gradient";
import UserButton from "./UserButton";
import { useDispatch, useSelector } from "react-redux";
import { setSelectedAnime } from "./redux/animeslice";
import { Screen } from "react-native-screens";


const Card = ({ShowImage,ShowTitle,ShowDescription,ShowID,navigation}) => {
    const styles = StyleSheet.create({
        container: {
            height: 350,
            width: '100%',
            backgroundColor: 'black',
            padding: '2%',
            borderBottomColor:'white',
            borderBottomWidth:2,
        },
        showImage: {
            flex: 1,
            height: '100%',
            resizeMode: 'contain',
            // objectFit:'contain'
        },
        showTitle: {
            color: 'white',
            fontWeight: 'bold',
            fontSize: 25,
        },
        titlearea: {
            flex: 1,
            flexDirection: 'row',
            alignItems: 'flex-end',
            justifyContent: 'center',
            padding: '0.5%',

        },
        titleBar: {
            flex: 1,
            flexDirection: 'column',
            // justifyContent:'center',
            padding: '2%',
            margin: '1%'
        },
        showDescription: {
            color: 'white',
            fontSize: 15
        },
        buttonsTab:{
            height:'20%',
            flexDirection:'row',
            alignItems:'center',
            justifyContent:'center',
            padding:5,
        }
    })
    return (
        <TouchableNativeFeedback useForeground={true} onPress={() => {
            navigation.navigate("AnimeNavigation",{
                screen:'AnimeScreen',
                params:{
                    ShowTitle,ShowDescription,ShowImage,ShowID,
                }
            });
        }}>
            <View style={styles.container}>
                <ImageBackground source={{ uri: ShowImage}} style={styles.showImage}>
                    <LinearGradient
                        colors={['#00000000', '#000000']}
                        style={{ height: '100%', width: '100%' }}>
                        <View style={styles.titlearea}>
                            <View style={styles.titleBar}>
                                <Text numberOfLines={1} ellipsizeMode="tail" style={styles.showTitle}>
                                    {ShowTitle}
                                </Text>
                                <View style={styles.buttonsTab}>
                                <CardButton btnBackground={'green'} btnTitle={'Watch now'} color={'white'} func={() =>{
                                    navigation.navigate("Video",{ShowID});
                                } 
                                }/>
                                {/* <CardButton btnBackground={'white'} btnTitle={'Save to favourites'} color={'black'}/> */}
                                </View>
                            </View>
                        </View>
                    </LinearGradient>
                </ImageBackground>
            </View>
        </TouchableNativeFeedback>
    )
}

const CardButton = ({btnBackground,btnTitle,color,func=null}) => {
    const styles = StyleSheet.create({
        buttonBackground:{
            height:'100%',
            width:'50%',
            padding:'2%',
            backgroundColor:btnBackground,
            alignItems:'center',
            justifyContent:'center',
            borderRadius:10,
            margin:3,
            marginTop:10,
        },
        buttonTitle:{
            textAlign:'center',
            textAlignVertical:'center',
            color:color,
            fontSize:20,
            // fontWeight:'bold',
        },
    })
    return (
        <TouchableNativeFeedback onPress={func}>
            <View style={styles.buttonBackground}>
                <Text style={styles.buttonTitle}>{btnTitle}</Text>
            </View>
        </TouchableNativeFeedback>
    )
}

export default Card;