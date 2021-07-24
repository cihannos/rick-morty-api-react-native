import React from 'react';
import { Text, View } from 'react-native';


export default function Header() {
    return (
        <View style={{ width: "100%", height: 80, backgroundColor: "#f4511e", justifyContent: "center", alignItems: "center",borderBottomRightRadius:"30%",borderBottomLeftRadius:"30%" }}>
            <Text style={{ color: "#fff", fontSize: 25, paddingTop: "3.5%", fontWeight: "500" }}>Rick & Morty API</Text>
            <Text style={{ color: "#fff", fontSize: 15 }}>Konuşarak Öğren Case Study</Text>
        </View>
    );
}