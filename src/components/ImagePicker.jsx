import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Modal } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { ImageBrowser } from 'expo-image-picker-multiple';

export default function ImageGalery({ style, onConfirm, onCancel, modalState }) {

    const [photoList, setPhotoList] = useState([])

    return (
        <Modal
            animationType="slide"
            transparent={false}
            visible={modalState || false}
        >

            <View
                style={[styles.container, style]}
            >
                <View style={styles.header}>
                    <TouchableOpacity style={styles.touchbleArea} onPress={() => onCancel()}>
                        <Text>Cancelar      {photoList.length}</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.touchbleArea} onPress={() => onConfirm(photoList)}>
                        <Text style={styles.textButtom}>OK</Text>
                    </TouchableOpacity>
                </View>

                <ImageBrowser
                    max={150}
                    onChange={(num, onSubmit) => {

                    }}
                    callback={async (callback) => {
                        let result = await callback
                        setPhotoList(result)
                    }}
                />

            </View>
        </Modal>
    );
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        height: '100%',
        flex: 1,
        paddingVertical: 3,
    },
    input: {
        width: '90%',

        paddingVertical: 5,
        textAlignVertical: 'center',
    },
    label: {
        fontSize: 14,
        color: '#479dff',
        backgroundColor: '#fff',
        position: 'absolute',
        top: -12,
        left: 15,
        paddingHorizontal: 5,
        textAlign: 'center'
    },
    header:{
        width: '100%',
        height: 40,
        borderBottomWidth: 1,
        borderBottomColor: '#999',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 10   
    },
    touchbleArea:{
        padding: 10
    },
    textButtom:{
        fontWeight: 'bold',
        color: '#479dff'
    }
});
