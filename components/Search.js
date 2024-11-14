import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View, TextInput, Image, ScrollView, FlatList, TouchableNativeFeedback } from "react-native";
const SearchScreen = () => {
    const [result, setResult] = useState([]);
    const FetchResult = async (input) => {
        const url = `https://api-anime-rouge.vercel.app/aniwatch/search?keyword=${input}`
        let response = await fetch(url);
        response = await response.json();
        if (response && response.animes) {
            setResult(response.animes.slice(0,10));
        }
    }
    return (
        <View style={styles.container}>
            <TextInput style={styles.searchBox} placeholder="Search any anime"
                placeholderTextColor={'white'}
                onChangeText={(text) => FetchResult(text)}
            />
            {
                (result.length > 0) &&
                <ScrollView style={styles.resultContainer}>
                    {
                        result.map(element =>
                        <TouchableNativeFeedback onPress={() => {
                            navigation.navigate("AnimeScreen",{ShowID});
                        }}
                        >

                         <View style={styles.resultItem} key={element.mal_id}>
                            <Image source={{uri:element.img}} style={styles.resultImage}/>
                            <Text style={styles.resultTitle}>{element.name}
                            </Text>
                        </View>
                        </TouchableNativeFeedback>
                        )
                    }
                </ScrollView>
            }
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        alignItems: 'center',
        backgroundColor: 'black',
    },
    searchBox: {
        width: '95%',
        height: 50,
        fontSize: 21,
        backgroundColor: '#2b2a2a',
        padding: 5,
        margin: 10,
        marginTop: 20,
        color: 'white',
    },
    resultContainer: {
        height: '25%',
        width: '100%',
        backgroundColor: 'white',
        marginTop: 10,
        backgroundColor: '#2b2a2a',
        padding: 10,
    },
    resultTitle: {
        margin: 10,
        fontSize: 20,
        color: 'white',
        textAlign: 'center',
        height: '75%',
        width: '70%'
    },
    resultItem: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        // justifyContent:'center',
        height: 125,
        width: '100%',
        borderTopColor: 'white',
        borderTopWidth: 1,
        borderBottomColor: 'white',
        borderBottomWidth: 1,
    },
    resultImage: {
        height: 100,
        width: 100,
        objectFit: 'cover',
        backgroundColor: 'white',
        borderRadius: 10
    }
})

export default SearchScreen;