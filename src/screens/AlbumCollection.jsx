import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, FlatList, Image, Dimensions, TouchableOpacity } from 'react-native';
import { initializeApp } from 'firebase/app';
import { getFirestore, collection, addDoc, getDoc, doc, query, getDocs, onSnapshot } from 'firebase/firestore'
import FloatButtom from '../components/FloatButtom';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import {firebaseAuth} from '../../../credenciais'

const firebaseConfig = firebaseAuth

const app = initializeApp(firebaseConfig);
const db = getFirestore()

export default function AlbumCollection() {

  const navigation = useNavigation()

  const screenDimensions = {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height
  }

  const [photoList, setPhotoList] = useState([])
  const [albumList, setAlbumList] = useState([])

  useFocusEffect(
    React.useCallback(() => {
      GetAlbumData()
    }, [])
  );

  const GetAlbumData = async () => {

    let _albumList = []

    try {
      const q = query(collection(db, "album"))
      const querySnapshot = await getDocs(q);

      querySnapshot.forEach((doc) => {

        let _albumData = {
          id: doc.id,
          name: doc.data().name,
          date: doc.data().date,
          cover: doc.data()?.photos[0]?.url
        }

        _albumList.push(_albumData)
      })

      setAlbumList(_albumList)

    } catch (error) {
      console.log(error)
    }
  }

  const GetDocData = async () => {

    let photoArrays = []

    try {
      const docSnap = await getDoc(doc(db, "album", "nDyR7p7xV82n5ngdLiCY"))

      if (docSnap.exists()) {
        let _data = {
          key: docSnap.data().key,
          albumName: docSnap.data().name,
          date: docSnap.data().date?.seconds,
        }

        setAlbumData(_data)

        docSnap.data().photos.map((item, index) => {
          photoArrays.push(item)
        })
        setPhotoList(photoArrays)

      } else {
        // doc.data() will be undefined in this case
        console.log("No such document!");
      }

    } catch (error) {
      console.log(error)
    }
  }

  const renderItem = ({ item }) => (

    <TouchableOpacity
      onPress={() => navigation.navigate('Album', { id: item.id })}
      style={{ width: screenDimensions.width / 2, aspectRatio: 1, justifyContent: 'center', alignItems: 'center', padding: 10 }}>
      <Image
        source={{ uri: item.cover }}
        style={{ flex: 1, aspectRatio: 1, backgroundColor: 'gray', borderRadius: 12 }} />
    </TouchableOpacity>

  );

  return (
    <View style={styles.container}>
      <Text>Album</Text>
      <FlatList
        style={{ width: '100%' }}
        contentContainerStyle={{ justifyContent: 'center', alignItems: 'flex-start' }}
        columnWrapperStyle={{ alignItems: 'flex-start' }}
        numColumns={2}
        data={albumList}
        renderItem={renderItem}
        keyExtractor={item => item.id}
      />

      <FloatButtom onPress={() => navigation.navigate('Novo album')} />

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
