import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';

export default function FloatButtom({style, label, onPress, disable}) {
    return (
        <View style={[styles.container, {position: disable? 'relative' : 'absolute', display: disable? 'none' : 'flex'}]}>

            <TouchableOpacity 
            onPress={() => onPress()}
            style={[styles.buttom, style]}>
            </TouchableOpacity>

            <Text style={styles.label}>{label}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        position: 'absolute',
        bottom: '5%',
        right: '5%'
    },
    buttom: {
        backgroundColor: '#479dff',
        width: 60,
        aspectRatio: 1,
        borderRadius: 30,
        marginBottom: 5
    },
    label: {
        fontSize: 11,
        color: '#7d7d7d',
        fontWeight: 'bold'
    }
});
