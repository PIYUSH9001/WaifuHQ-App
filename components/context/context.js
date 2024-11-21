import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { createContext, useEffect, useState } from "react";
export const HomeTabContext = createContext();

export const HomeTabProvider = (props) => {
    const [showTab, setShowTab] = useState(true);
    const [FavouriteArray,setFavouriteArray] = useState([]);
    const FetchFavouritesData = async () => {
        try{
            const jsonValue = await AsyncStorage.getItem('FavouriteAnime');
            const ParsedAnimeArray = JSON.parse(jsonValue);
            if(ParsedAnimeArray){
                setFavouriteArray(ParsedAnimeArray);
            }
            // await AsyncStorage.removeItem('FavouriteAnime');
        }
        catch(error){}
    }
    const AddToFavourite = async (anime) => {
        let updatedArray;
        if(FavouriteArray.length === 0){
            updatedArray = [anime]
        }
        else{
            updatedArray = [...FavouriteArray,anime];
        }
        setFavouriteArray(updatedArray);
        const jsonValue = JSON.stringify(updatedArray);
        await AsyncStorage.setItem('FavouriteAnime', jsonValue);
    }
    const RemoveFromFavourite = async (AnimeIDToDelete) => {
        const FilteredArray = FavouriteArray.filter(anime => anime.AnimeID !== AnimeIDToDelete);
        setFavouriteArray(FilteredArray);
        const jsonValue = JSON.stringify(FilteredArray);
        await AsyncStorage.setItem('FavouriteAnime', jsonValue);
    }
    useEffect(() => {
        FetchFavouritesData();
    },[]);

    return (
        <HomeTabContext.Provider value={
            {
                showTab,
                setShowTab,
                FavouriteArray,
                AddToFavourite,
                RemoveFromFavourite,
            }
        }>
            {props.children}
        </HomeTabContext.Provider>
    )
}