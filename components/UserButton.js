import React from "react";
import { Image, StyleSheet, Text, TouchableNativeFeedback, View } from "react-native";

const UserButton = ({ backgroundColor, title, color, Icon = null }) => {
    const styles = StyleSheet.create({
        ButtonBackground: {
            flexDirection:'row',
            height: 50,
            width: 300,
            backgroundColor: backgroundColor,
            borderRadius: 15,
            alignItems: 'center',
            justifyContent: 'space-evenly',
            margin: 10,
        },
        ButtonTitle: {
            fontSize: 25,
            color: color,
            fontWeight: 'bold',
            textAlign: 'center',
            textAlignVertical: 'center'
        },
        ButtonIcon:{
            height:32,
            width:32,
            marginRight:0,
            borderRadius:16,
        }
    })
    return (
        <TouchableNativeFeedback>
            <View style={styles.ButtonBackground}>
                {
                    Icon && <Image source={Icon} style={styles.ButtonIcon}/>
                }
                <Text style={styles.ButtonTitle}>
                    {title}
                </Text>
            </View>
        </TouchableNativeFeedback>
    )
}

export default UserButton;

