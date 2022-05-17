
import * as React from 'react';
import { View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import AlbumCollection from './src/screens/AlbumCollection';
import NewAlbum from './src/screens/NewAlbum';
import Album from './src/screens/Album'

const Stack = createNativeStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Collection" component={AlbumCollection} options={{headerShown: false}} />
        <Stack.Screen name="Novo album" component={NewAlbum} options={{headerShown: true}} />
        <Stack.Screen name="Album" component={Album} options={{headerShown: true}} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;