import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, FlatList, Image, Dimensions } from 'react-native';
import { getFirestore, getDoc, doc, onSnapshot } from 'firebase/firestore'
import RoundList from '../utils/RoundList';

import { useNavigation } from '@react-navigation/native';

const db = getFirestore()

const screenDimensions = {
  width: Dimensions.get('window').width,
  height: Dimensions.get('window').height
}

export default function Album(props) {

  const docId = props.route.params.id
  const [albumData, setAlbumData] = useState({})

  useEffect(() => {
    getData()
  }, [])

  const docRef = doc(db, "album", docId);

  const getData = async () => {
    const docSnap = await getDoc(docRef).then((data) => {
      setAlbumData(data.data())
    })
  }

  const renderItem = ({ item }) => (
    <View style={
      {
        flex: 1,
        flexBasis: 0,
        //width: screenDimensions.width / 4.4,
        aspectRatio: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 3
      }}>
      <Image
        source={{ uri: item.url }}
        style={{ flex: 1, aspectRatio: 1, backgroundColor: 'gray', borderRadius: 12 }} />
    </View>

  );

  return (
    <View style={styles.container}>
      <FlatList
        data={albumData.photos}
        numColumns={4}
        style={{ marginBottom: 20 }}
        contentContainerStyle={{ paddingTop: 10, paddingHorizontal: 10, width: screenDimensions.width }}
        columnWrapperStyle={{ width: '100%', justifyContent: 'space-evenly' }}
        renderItem={renderItem}
        keyExtractor={(obj) => obj.url}
      />

      <StatusBar style="light" translucent={false} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
