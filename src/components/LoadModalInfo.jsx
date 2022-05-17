import React from 'react';
import { StyleSheet, Text, View, Modal, ActivityIndicator } from 'react-native';

export default function LoadModalInfo({ modalState, contentText, subtitle }) {

    return (
        <Modal
            animationType="none"
            transparent={true}
            visible={modalState || false}
        >

            <View style={styles.container}>

                <ActivityIndicator size="large" color="#fff" />

                <Text style={styles.contentText} >{contentText}</Text>
                <Text style={styles.subtitle} >{subtitle}</Text>

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
        backgroundColor: '#0009',
    },
    contentText: {
        fontWeight: 'bold',
        fontSize: 14,
        textAlign: 'center',
        color: '#fff',
        marginTop: 10,
    },
    subtitle: {
        fontSize: 12,
        textAlign: 'center',
        color: '#fff',
        marginTop: 5,
    }
});
