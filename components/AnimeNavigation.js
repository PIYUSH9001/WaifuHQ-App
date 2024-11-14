import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import VideoScreen from "./Video";
import AnimeScreen from "./Anime";
const AnimeNavigation = () => {
    const Stack = createStackNavigator();
    const fadeTransition = ({ current }) => ({
        cardStyle: {
          opacity: current.progress,
        },
      });
    return (
        <Stack.Navigator screenOptions={{
            headerShown:false,
            cardStyleInterpolator:fadeTransition,
        }}>
            <Stack.Screen component={AnimeScreen} name="AnimeScreen" />
            <Stack.Screen component={VideoScreen} name="VideoScreen" />
        </Stack.Navigator>
    )
}

export default AnimeNavigation;