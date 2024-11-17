import { createStackNavigator } from "@react-navigation/stack";
import React, { useContext, useEffect } from "react";
import VideoScreen from "./Video";
import AnimeScreen from "./Anime";
import SearchScreen from "./Search";
import { HomeTabContext } from "./context/context";

const AnimeNavigation = () => {
    const Stack = createStackNavigator();
    const {setShowTab} = useContext(HomeTabContext)
    const fadeTransition = ({ current }) => ({
        cardStyle: {
          opacity: current.progress,
        },
      });
    useEffect(()=>{
        setShowTab(false);
        return ()=>{
            setShowTab(true)
        }
    },[])
    return (
        <Stack.Navigator screenOptions={{
            headerShown:false,
            cardStyleInterpolator:fadeTransition,
        }}>
            <Stack.Screen component={AnimeScreen} name="AnimeScreen" />
            <Stack.Screen component={VideoScreen} name="VideoScreen" />
            <Stack.Screen component={SearchScreen} name="SearchScreen" />
        </Stack.Navigator>
    )
}

export default AnimeNavigation;