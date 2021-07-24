import React, { useState, useEffect } from 'react';
import { StyleSheet, ActivityIndicator, ScrollView, TouchableNativeFeedback, Button, Image, Text, View, Pressable } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

export default function CharacterDetails({ route, navigation }) {

    const { characterId } = route.params;
    const [characterDetails, setCharacterDetails] = useState("loading")

    useEffect(() => {
        fetch('https://rickandmortyapi.com/api/character/' + characterId, {
            method: 'GET'
        })
            .then((response) => response.json())
            .then((responseJson) => {
                setCharacterDetails(responseJson)
            });
    }, []);

    if (characterDetails != "loading") {
        return (
            <View style={styles.body}>
                <Image
                    style={{ width: "100%", height: 225 }}
                    source={{ uri: characterDetails.image }}
                />
                <Text style={{ textAlign: 'center', fontSize: 25, padding: 5 }}>
                    {characterDetails.name}
                </Text>
                <View style={{ borderBottomWidth: 1, borderColor: "#ddd", marginRight: 50, marginLeft: 50, marginBottom: 10 }}></View>
                <Text style={{ textAlign: 'center', fontSize: 18 }}>Status: {characterDetails.status}</Text>
                <Text style={{ textAlign: 'center', fontSize: 18 }}>Species: {characterDetails.species}</Text>
                {
                    characterDetails.type
                        ?
                        <Text style={{ textAlign: 'center', fontSize: 18 }}>Type: {characterDetails.type}</Text>
                        :
                        null
                }
                <Text style={{ textAlign: 'center', fontSize: 18 }}>Gender: {characterDetails.gender}</Text>
                <Text style={{ textAlign: 'center', fontSize: 18 }}>
                    Origin: {characterDetails.origin.name}
                </Text>
                <Text style={{ textAlign: 'center', fontSize: 18 }}>
                    Location: {characterDetails.location.name}
                </Text>
                <Text style={{ textAlign: 'center', fontSize: 18 }}>Created: {characterDetails.created}</Text>
            </View>
        );
    } else {
        return (
            <View style={{ alignItems: 'center', justifyContent: 'center', display: 'flex', height: "80%" }}>
                <ActivityIndicator />
            </View>
        );
    }
}



const styles = StyleSheet.create({
    body: {
        backgroundColor: "#ebebeb",
        height: "100%"
    },
});