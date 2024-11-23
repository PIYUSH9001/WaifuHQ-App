import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import React, { useEffect } from "react";
import HomeScreen from "./Home";
import VideoScreen from "./Video";
import AnimeScreen from "./Anime";
import AnimeNavigation from "./AnimeNavigation";
import HomeNavigation from "./HomeNavigation";

const HomeToAnimeNavigation = (props) => {
    const fadeTransition = ({ current }) => ({
        cardStyle: {
          opacity: current.progress,
        },
      });
      const key = props.route.name;
    const Stack = createStackNavigator();
    return (
            <Stack.Navigator screenOptions={{
                headerShown:false,
                cardStyleInterpolator:fadeTransition,
                presentation:'transparentModal',
            }}>
                <Stack.Screen component={HomeScreen} name="Home" initialParams={{key}}/>
                <Stack.Screen component={AnimeNavigation} name="AnimeNavigation" />
            </Stack.Navigator>
    )
}

export default HomeToAnimeNavigation;