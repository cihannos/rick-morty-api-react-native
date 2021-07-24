import React, { useState, useEffect } from 'react';
import { StyleSheet, ActivityIndicator, ScrollView, TouchableOpacity, Button, Image, Text, View, Pressable } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';


export default function EpisodeDetails({ route, navigation }) {

    const { episodeId, episodeTitle, episodeAirDate, episode, characters } = route.params;
    const [episodeDetails, setEpisodeDetails] = useState(null);
    const [characterDetails, setCharacterDetails] = useState([]);

    useEffect(() => {
        let arr = [];
        characters.map((val, i) => {
            fetch(characters[i], {
                method: 'GET'
            }).then((response) => response.json()).then((responseJson) => {
                arr.push(responseJson)
                if (characters.length === i + 1) {
                    setCharacterDetails(arr)
                }
            });
        });


    }, []);


    const goCDetails = (ref) => {
        navigation.navigate("Character Details", {
            characterId: ref
        });
    }

    return (
        <View style={styles.body}>
            <Text style={styles.episodeTitle}>{episodeTitle}</Text>
            <View style={styles.divider}></View>
            <Text style={styles.detailtext}>
                Air Date: <Text style={styles.bold}>{episodeAirDate}</Text>
            </Text>
            <Text style={styles.detailtext}>
                Episode: <Text style={styles.bold}>{episode}</Text>
            </Text>
            <View style={styles.divider}></View>
            <View>
                <Text style={styles.detailtext}>Characters</Text>
                <View style={{ margin: 5 }}></View>
                <ScrollView>
                    {
                        characterDetails && characterDetails.length > 0
                            ?
                            characterDetails.map((value, key) => (
                                <CharacterListButton goCD={goCDetails} c_id={value.id} key={key} avatar={value.image} live={value.status} characterName={value.name} />
                            ))
                            :
                            <View style={{ alignItems: 'center', justifyContent: 'center', height: 325 }}>
                                <ActivityIndicator />
                            </View>
                    }


                    <View style={{ marginBottom: 220 }}></View>
                </ScrollView>

            </View>
        </View>
    );
}

function CharacterListButton(props) {

    const [loading, setLoading] = useState(false);
    const [imgStyle, setImgStyle] = useState("none");
    const [indStyle, setIndStyle] = useState("flex");

    useEffect(() => {
        if (loading===false) {
            setImgStyle("none");
            setIndStyle("flex");
        } else {
            setImgStyle("flex");
            setIndStyle("none");
        }
    }),[loading];

    return (
        <Pressable
            onPress={() => { props.goCD(props.c_id) }}
            style={
                ({ pressed }) => [
                    {
                        borderColor: pressed
                            ? '#aaa'
                            : '#666',
                        margin: 5,
                        borderWidth: 1,
                        backgroundColor: "#fff",
                        borderRadius: 15
                    }
                ]} >
            <View style={{ flex: 1, flexDirection: 'row' }}>
                <View style={{ flex: 2, margin: 0, padding: 0 }}>
                    {/*AVATAR*/}
                    <Image
                        onLoad={() => setLoading(true)}
                        style={[styles.fullWH,{ borderTopLeftRadius: 15, borderBottomLeftRadius: 15,display:imgStyle}]}
                        source={{
                            uri: props.avatar,
                        }}
                    />
                    <ActivityIndicator style={[styles.fullWH,{display:indStyle}]} />
                </View>
                <View style={{ flex: 4, padding: 5, margin: 0 }}>
                    {/*CHARACTER-INFO*/}
                    <View style={{ marginTop: 25 }}>

                        <Text style={{ fontWeight: 'bold', textAlign: 'center', fontSize: 19 }}>
                            {props.characterName}
                        </Text>

                        {
                            props.live === "Alive"
                                ?
                                <Text style={{ textAlign: 'center', color: "green" }}>{props.live}</Text>
                                :
                                <Text style={{ textAlign: 'center', color: "red" }}>{props.live}</Text>
                        }
                    </View>
                </View>
            </View>
        </Pressable>
    );
}

const styles = StyleSheet.create({
    body: {
        padding: 5,
        backgroundColor: "#ebebeb",
        height: "100%"
    },
    episodeTitle: {
        fontSize: 30,
        textAlign: 'center',
        marginTop: 10,
        color: "#333"
    },
    divider: {
        borderBottomWidth: 1,
        borderBottomColor: "#ddd",
        paddingTop: 20,
        marginBottom: 20,
        marginRight: 20,
        marginLeft: 20,
    },
    detailtext: {
        textAlign: 'center',
        fontSize: 18,
    },
    bold: {
        fontWeight: 'bold'
    },
    characterList: {
        padding: 10,
        margin: 5,
        borderWidth: 1,
    },
    dFlex:{
        display:'flex'
    },
    dNone:{
        display:'none'
    },
    fullWH:{
        width:100,
        height:100
    }
});