import React from "react";
import { Image, ImageBackground, StyleSheet, Text, View } from "react-native";
import Loli from '../Images/loliImage.jpg';
import Background from '../Images/backgroundImage.jpg'
import UserButton from "./UserButton";
import googleIcon from "../Images/googleIcon.png";
import githubIcon from "../Images/githubIcon.png";
import GuestIcon from "../Images/guestIcon.png";
const LoginScreen = () => {

    return (
        <ImageBackground source={Background} style={styles.backgroundImage}>
            <View style={styles.container}>
                <Image source={Loli} style={styles.loliLogo} />
                <Text style={styles.heading}>Konnichiwa!</Text>
                <Text style={styles.heading}>Welcome to WaifuHQ :)</Text>
                <UserButton title={"Login with Google"} color={'black'} backgroundColor={"white"} Icon={googleIcon}/>
                <UserButton title={"Login with Github"} color={'black'} backgroundColor={"white"} Icon={githubIcon}/>
                <UserButton title={"Login as guest"} color={'black'} backgroundColor={"white"} Icon={GuestIcon}/>
            </View>
        </ImageBackground>
    )
}



const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,0.35)',
    },
    backgroundImage: {
        flex: 1,
    },
    loliLogo: {
        height: 250,
        width: 250,
        margin: 15,
        borderRadius: 125,
    },
    heading: {
        color: 'white',
        fontSize: 30,
        fontWeight: 'bold',
        textAlign: 'center',
        margin: 5,
    }

})

export default LoginScreen;