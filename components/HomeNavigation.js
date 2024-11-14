import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import HomeScreen from "./Home";
import VideoScreen from "./Video";
import AnimeScreen from "./Anime";
import AnimeNavigation from "./AnimeNavigation";

const HomeNavigtion = () => {
    const fadeTransition = ({ current }) => ({
        cardStyle: {
          opacity: current.progress,
        },
      });
    const Stack = createStackNavigator();
    return (
            <Stack.Navigator screenOptions={{
                headerShown:false,
                cardStyleInterpolator:fadeTransition,
            }}>
                <Stack.Screen component={HomeScreen} name="Home" />
                <Stack.Screen component={AnimeNavigation} name="AnimeNavigation" />
            </Stack.Navigator>
    )
}

export default HomeNavigtion;