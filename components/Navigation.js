import { NavigationContainer } from "@react-navigation/native";
import React from "react";
import { Image, Text, View } from "react-native";
import LoginScreen from "./Login";
import HomeScreen from "./Home";
import HomeIcon from "../Images/home.png";
import HomeToAnimeNavigtion from "./HomeToAnimeNavigation";
import SearchScreen from "./Search";
import AnimeScreen from "./Anime";
import { createDrawerNavigator } from "@react-navigation/drawer";
import Icon from 'react-native-vector-icons/Ionicons';
import VideoScreen from "./Video";
import HomeNavigation from "./HomeNavigation";
import SearchNavigation from "./SearchNavigation";
import GenreScreen from "./Genre";
import FavouriteScreen from "./Favourite";
import FavouriteNavigation from "./FavouriteNavigation";

const MyDrawer = createDrawerNavigator();
const Navigation = () => {
    return (
        <NavigationContainer>
            <MyDrawer.Navigator screenOptions={{
                headerShown:false,
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
                drawerContentStyle:{
                    borderRightColor:'white',
                    borderRightWidth:2
                },
                presentation:'transparentModal',
                drawerActiveBackgroundColor: 'white',
                drawerActiveTintColor: 'black',
                drawerInactiveTintColor: 'white'
            }}>
                <MyDrawer.Screen component={HomeNavigation} name="Home" options={{
                    drawerIcon:({focused}) => (
                        <Icon name="home" size={35} color={focused?'black':'white'} />
                    )
                }} />
                    <MyDrawer.Screen component={SearchNavigation} name="Search" options={{
                        drawerIcon:({focused}) => (
                            <Icon name="search" size={35} color={focused?'black':'white'} />
                        )
                    }} />
                <MyDrawer.Screen component={FavouriteNavigation} name="Favourites" options={{
                    drawerIcon:({focused}) => (
                        <Icon name="heart" size={35} color={focused?'black':'white'} />
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