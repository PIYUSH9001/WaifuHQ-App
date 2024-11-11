import React from "react";
import { Text } from "react-native";
import LoginScreen from "./components/Login";
import Navigation from "./components/Navigation";
import ShowCard from "./components/Card";
import HomeScreen from "./components/Home";
import VideoScreen from "./components/Video";
import SearchScreen from "./components/Search";

// const url = `https://api.animethemes.moe/anime?filter[has]=resources&filter[site]=MyAnimeList&filter[external_id]=${AnimeID}&include=animethemes.animethemeentries.videos`

const App = () => {
    return (
      // <LoginScreen/>
      <SearchScreen/>
      // <Navigation/>
      // <VideoScreen/>
      // <HomeScreen/>
      // <Text>Hello</Text>
    )
}

export default App;