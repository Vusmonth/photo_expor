import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TextInput } from 'react-native';

export default function SingleLineInput({ placeholder, label, onPress, style, onEndEditing}) {

    const [inputValue, setValue] = useState('')

    return (
        <View style={[styles.container, style]}>

            <Text style={[styles.label, {position: inputValue? 'absolute' : 'relative', display: inputValue? 'flex' : 'none'}]}>
                {label}
            </Text>

            <TextInput
                style={styles.input}
                placeholder={label}
                placeholderTextColor={'gray'}
                onChangeText={(value) => setValue(value)}
                onEndEditing={() => onEndEditing(inputValue)}
            />

        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        justifyContent: 'center',
        borderColor: '#479dff',
        borderWidth: 2,
        width: '90%',
        borderRadius: 30,
        paddingVertical: 3,
    },
    input: {
        width: '90%',
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
    }
});
