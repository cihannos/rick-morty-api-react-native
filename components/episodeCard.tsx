import React from 'react';
import { StyleSheet, TouchableOpacity, Button, Text, View } from 'react-native';


export default function EpisodeCard(props) {
    return (
        <View style={styles.episodeCard}>
            <Text style={styles.episodeTitle}>{props.title}</Text>
            <View style={styles.divider}></View>
            <Text style={styles.episodeDetail}>Air Date: {props.air_date}</Text>

            <Text style={styles.episodeDetail}>Episode: {props.episode}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    episodeCard: {
        borderRadius: 10,
        backgroundColor: "#fff",
        padding: 10,

        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.20,
        shadowRadius: 1.41,
        elevation: 2,
        marginBottom: 8
    },
    episodeTitle: {
        fontSize: 20,
        fontWeight: "500"
    },
    divider: {
        marginTop: 5,
        marginBottom: 5,
        borderColor: "#aaa",
        borderWidth: 1
    },
    episodeDetail: {
        fontSize: 15,
        fontWeight: "400",
        marginBottom: 2
    }
});