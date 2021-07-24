import React from 'react';
import { StyleSheet, TouchableOpacity, Button, Text, View } from 'react-native';

export default function Pagination(props) {
    return (
        <View style={{ marginTop: 20, flexDirection: 'row', alignItems: 'center', display: 'flex', justifyContent: 'center', padding: 0, margin: 0 }}>
            {
                props.cp <= 1 ? null :
                    <TouchableOpacity onPress={() => props.pagination("prev")} style={{ flex: 1, padding: 5, margin: 3, backgroundColor: "#f4511e", borderRadius: 5 }}>
                        <Text style={{ textAlign: 'center', fontSize: 20, fontWeight: 'bold', color: "#fff" }}>{'<'}</Text>
                    </TouchableOpacity>
            }
            {
                props.cp >= 3 ? null :
                    <TouchableOpacity onPress={() => props.pagination("next")} style={{ flex: 1, padding: 5, margin: 3, backgroundColor: "#f4511e", borderRadius: 5 }}>
                        <Text style={{ textAlign: 'center', fontSize: 20, fontWeight: 'bold', color: "#fff" }}>{'>'}</Text>
                    </TouchableOpacity>
            }

        </View>
    );
}