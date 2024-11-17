import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import SearchScreen from "./Search";
import AnimeNavigation from "./AnimeNavigation";

const SearchNavigation = () =>{
    const Stack = createStackNavigator();
    const fadeTransition = ({ current }) => ({
        cardStyle: {
          opacity: current.progress,
        },
      });
    return(
        <Stack.Navigator screenOptions={{
            headerShown:false,
            cardStyleInterpolator:fadeTransition,
        }}>
            <Stack.Screen component={SearchScreen} name="SearchScreen" />
            <Stack.Screen component={AnimeNavigation} name="AnimeNavigation" />
        </Stack.Navigator>
    )
}

export default SearchNavigation;