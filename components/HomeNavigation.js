import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import React, { useContext, useEffect, useState } from "react";
import HomeScreen from "./Home";
import { Text } from "react-native";
import SearchScreen from "./Search";
import HomeToAnimeNavigation from "./HomeToAnimeNavigation";
import { HomeTabContext } from "./context/context";

const HomeNavigation = () => {
    const Tab = createMaterialTopTabNavigator();
    const {showTab} = useContext(HomeTabContext);
    return(
        <Tab.Navigator screenOptions={({route})=>({
            tabBarStyle:{
                backgroundColor:'black',
                display:showTab?'flex':'none',
            },
            tabBarLabelStyle:{
                fontSize:20,
                // color:'white',
                fontWeight:'bold',
                width:'100%'
            },
            tabBarIndicatorStyle:{
                backgroundColor:'white'
            },
            tabBarActiveTintColor:'white',
            tabBarInactiveTintColor:'grey',
            tabBarScrollEnabled:true,
        })}>
            <Tab.Screen component={HomeToAnimeNavigation} name="Trending"/>
            <Tab.Screen component={HomeToAnimeNavigation} name="Latest episodes"/>
            <Tab.Screen component={HomeToAnimeNavigation} name="Most popular"/>
        </Tab.Navigator>
    )
}

export default HomeNavigation;