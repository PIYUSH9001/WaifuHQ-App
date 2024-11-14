import { NavigationContainer } from "@react-navigation/native";
import React from "react";
import { Image, Text, View } from "react-native";
import LoginScreen from "./Login";
import HomeScreen from "./Home";
import HomeIcon from "../Images/home.png";
import HomeNavigtion from "./HomeNavigation";
import SearchScreen from "./Search";
import AnimeScreen from "./Anime";
import { createDrawerNavigator } from "@react-navigation/drawer";
import Icon from 'react-native-vector-icons/Ionicons';
import VideoScreen from "./Video";

const MyDrawer = createDrawerNavigator();
const Navigation = () => {
    return (
        <NavigationContainer>
            <MyDrawer.Navigator screenOptions={{
                drawerStyle: {
                    backgroundColor: 'black',
                    width: '65%'
                },
                headerStyle: {
                    backgroundColor: 'black',
                    borderBottomColor: 'white',
                    borderBottomWidth: 2
                },
                headerTintColor: 'white',
                drawerLabelStyle: {
                    // color:'white',
                    fontSize: 20,
                    fontWeight: 'bold',
                },
                drawerActiveBackgroundColor: 'white',
                drawerActiveTintColor: 'black',
                drawerInactiveTintColor: 'white'
            }}>
                <MyDrawer.Screen component={HomeNavigtion} name="Home" options={{
                    drawerIcon:({focused}) => (
                        <Icon name="home-outline" size={35} color={focused?'black':'white'} />
                    )
                }} />
                <MyDrawer.Screen component={SearchScreen} name="Search" options={{
                    drawerIcon:({focused}) => (
                        <Icon name="search" size={35} color={focused?'black':'white'} />
                    )
                }} />
                {/* <MyDrawer.Screen component={LoginScreen} name="Favourites" options={{
                    drawerIcon:({focused}) => (
                        <Icon name="heart-outline" size={35} color={focused?'black':'white'} />
                    )
                }} />
                <MyDrawer.Screen component={VideoScreen} name="Credits" options={{
                    drawerIcon:({focused}) => (
                        <Icon name="person-outline" size={35} color={focused?'black':'white'} />
                    )
                }} /> */}
            </MyDrawer.Navigator>
        </NavigationContainer>
    )
}

export default Navigation;