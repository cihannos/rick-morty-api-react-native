import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, ActivityIndicator, ScrollView, View, Button, TouchableOpacity, Pressable } from 'react-native';
import Header from './components/header';
import EpisodeCard from './components/episodeCard';
import Pagination from './components/pagination';
import EpisodeDetails from "./components/episodeDetails";
import CharacterDetails from './components/characterDetails';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';




function HomeScreen({ navigation }) {

  const [episodes, setEpisodes] = useState(null);
  const [currentPage, setCurrentPage] = useState(1)

  useEffect(() => {
    getEpisodes();
  }, []);

  const getEpisodes = () => {
    fetch('https://rickandmortyapi.com/api/episode?page=' + currentPage, {
      method: 'GET'
    })
      .then((response) => response.json())
      .then((responseJson) => {
        setEpisodes(responseJson)
      });
  }

  useEffect(() => {
    getEpisodes();
  },[currentPage]);

  const paginate = (ref) => {
    if (ref === "next") {
      if (currentPage < 3 ) {
        setEpisodes(null)
        setCurrentPage(currentPage + 1); 
      }
    } else {
      if (currentPage > 1 ) {
        setEpisodes(null)
        setCurrentPage(currentPage - 1);
      }
    }
  }

  if (episodes) {
    return (
      <View style={styles.container}>
        <Header />
        <View style={{ margin: "2%" }}>
          <ScrollView>

            {
              episodes.results.map((value, key) => (
                <Pressable key={key} onPress={() => navigation.navigate('Episode Details', {
                  episodeId: value.id,
                  episodeTitle: value.name,
                  episodeAirDate: value.air_date,
                  episode: value.episode,
                  characters: value.characters
                })}>
                  <EpisodeCard key={key} title={value.name} air_date={value.air_date} episode={value.episode} />
                </Pressable>
              ))
            }

            <Pagination cp={currentPage} pagination={paginate} />

            <View style={{ marginBottom: 100 }}></View>
          </ScrollView>


        </View>
        <StatusBar style="auto" />
      </View>
    )
  } else {
    return (
      <View style={styles.container}>
        <Header />
        <View style={{ alignItems: 'center', justifyContent: 'center', height: "88%" }}>
          <ActivityIndicator size="large" />
        </View>
      </View>
    )
  }
}





const Stack = createStackNavigator();

export default function App() {

  const [episodes, setEpisodes] = useState(null);

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Episodes" component={HomeScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Episode Details" component={EpisodeDetails} options={{
          headerBackTitleVisible: false,
          headerStyle: {
            backgroundColor: '#f4511e',
            shadowRadius: 0,
            shadowOffset: {
              height: 0
            }
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }} />
        <Stack.Screen name="Character Details" component={CharacterDetails} options={{
          headerBackTitleVisible: false,
          headerStyle: {
            backgroundColor: '#f4511e',
            shadowRadius: 0,
            shadowOffset: {
              height: 0
            }
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgb(240,240,240)'
  },
});
