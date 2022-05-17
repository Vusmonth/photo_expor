import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, FlatList, Image, Dimensions, TouchableOpacity } from 'react-native';
import { initializeApp } from 'firebase/app';
import { getFirestore, collection, addDoc } from 'firebase/firestore'
import { getStorage } from 'firebase/storage'

import { useNavigation } from '@react-navigation/native';
import UploadImage from '../utils/UploadImage';

import SingleLineInput from '../components/SingleLineInput';
import DatePicker from '../components/DatePicker';
import FloatButtom from '../components/FloatButtom';
import ImageGalery from '../components/ImagePicker';
import LoadModalInfo from '../components/LoadModalInfo';

import {firebaseAuth} from '../../../credenciais'

const firebaseConfig = firebaseAuth

const app = initializeApp(firebaseConfig);
const db = getFirestore()
const storage = getStorage();

export default function NewAlbum() {

  const navigation = useNavigation()

  const screenDimensions = {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height
  }

  const [name, setName] = useState('')
  const [acessKey, setAcessKey] = useState('')
  const [date, setDate] = useState('')

  const [disableButtom, setButtomState] = useState(true)
  const [GaleryPickState, setGaleryState] = useState(false)
  const [loadState, setLoadState] = useState(false)

  const [photoList, setPhotoList] = useState([])
  const [DocPhotoList, setDocPhotoList] = useState([])

  useEffect(() => {

    if (!name || !acessKey) {
      setButtomState(true)
    }
    else {
      setButtomState(false)
    }

  }, [name, acessKey, date, photoList])

  useEffect(() => {

    if (photoList.length > 0 && DocPhotoList.length == photoList.length) {
      //console.log(DocPhotoList)
      setLoadState(false)
      addAlbum()
    }

  }, [DocPhotoList])

  const addAlbum = async () => {
    try {
      await addDoc(collection(db, "album"), {
        name: name,
        acessKey: acessKey,
        date: date,
        photos: DocPhotoList
      }).then(
        navigation.goBack()
      )

    } catch (error) {
      console.log(error)
      alert(error)
    }
  }

  const AddPhotosToStorage = async () => {

    setLoadState(true)

    photoList.map(async (item, index) => {

      try {
        UploadImage(
          {
            _index: index,
            uri: item.uri,
            albumName: name,
            filename: item.filename,
            callback: (value) => { setDocPhotoList(oldArray => [...oldArray, value]) }
          })
      } catch (error) {

        setLoadState(false)
        alert(error)
        console.log('AddPhotosToStorage error: ', error)

      }
    })

  }

  const renderItem = ({ item }) => (
    <View style={{ width: screenDimensions.width / 4.4, aspectRatio: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Image
        source={{ uri: item.uri }}
        style={{ flex: 1, aspectRatio: 1, backgroundColor: 'gray', borderRadius: 12 }} />
    </View>

  );

  const EmptyList = ({ item }) => (

    <View style={{ flexDirection: 'row', width: '100%', justifyContent: 'space-between', marginVertical: 10 }}>

      <Text>Fotos selecionadas: ({photoList.length})</Text>

      <TouchableOpacity
        onPress={() => setGaleryState(true)}>
        <Text style={{ textAlign: 'center', fontWeight: 'bold', fontSize: 14, color: '#479dff' }}>Editar</Text>
      </TouchableOpacity>
    </View>


  );

  return (
    <View style={styles.container}>

      <SingleLineInput
        label='Nome do album'
        style={{ marginBottom: 25 }}
        onEndEditing={(e) => setName(e)}
      />

      <SingleLineInput
        label='Chave de acesso'
        style={{ marginBottom: 25 }}
        onEndEditing={(e) => setAcessKey(e)}
      />

      <DatePicker
        label='Data'
        onEndEditing={(e) => setDate(e)}
      />

      <FlatList
        data={photoList}
        numColumns={4}
        style={{ marginBottom: 20 }}
        contentContainerStyle={{ paddingTop: 10, paddingHorizontal: 10, width: screenDimensions.width }}
        columnWrapperStyle={{ width: '100%', justifyContent: 'space-between' }}
        renderItem={renderItem}
        keyExtractor={(obj) => obj.id}
        ListHeaderComponent={EmptyList}
      />

      <ImageGalery
        modalState={GaleryPickState}
        onCancel={() => setGaleryState(false)}
        onConfirm={(photos) => { setPhotoList(photos), setGaleryState(false) }}
      />

      <LoadModalInfo
        modalState={loadState}
        contentText={'Enviando imagens, por favor aguarde.'}
        subtitle={`(${DocPhotoList.length}/${photoList.length})`}
      />

      <FloatButtom onPress={() => AddPhotosToStorage()} label="Salvar album" disable={disableButtom} />
      <FloatButtom onPress={() => UploadImage({ uri: 'file:///storage/emulated/0/Download/FOfGal0XMAY5_HT.jpg' })} label="Salvar album" disable={true} />

      <StatusBar style="light" translucent={false} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingTop: 20
  },
});
