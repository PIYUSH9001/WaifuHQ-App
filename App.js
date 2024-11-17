import React, { useEffect } from "react";
import { Text } from "react-native";
import LoginScreen from "./components/Login";
import Navigation from "./components/Navigation";
import ShowCard from "./components/Card";
import HomeScreen from "./components/Home";
import VideoScreen from "./components/Video";
import SearchScreen from "./components/Search";
import HomeNavigtion from "./components/HomeToAnimeNavigation";
import { HomeTabProvider } from "./components/context/context";



// const url = `https://api.animethemes.moe/anime?filter[has]=resources&filter[site]=MyAnimeList&filter[external_id]=${AnimeID}&include=animethemes.animethemeentries.videos`

const App = () => {
    return (
      // <LoginScreen/>
      // <SearchScreen/>
      <HomeTabProvider>
        <Navigation/>
      </HomeTabProvider>
      
      // <HomeNavigtion/>
      // <VideoScreen/>
      // <HomeScreen/>
      // <Text>Anime bonanza</Text>
      // <Text>Hello</Text>
    )
}

export default App;