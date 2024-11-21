import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import FavouriteScreen from "./Favourite";
import AnimeNavigation from "./AnimeNavigation";

const FavouriteNavigation = () => {
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
            <Stack.Screen component={FavouriteScreen} name="FavouriteScreen" />
            <Stack.Screen component={AnimeNavigation} name="AnimeNavigation" />
        </Stack.Navigator>
    )
}

export default FavouriteNavigation;