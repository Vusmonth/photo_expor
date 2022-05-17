import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { DateToString } from '../utils/ConvertDate';

export default function DatePicker({ placeholder, label, onPress, style, onEndEditing }) {

    let today = new Date()

    const [inputValue, setValue] = useState(today)
    const [visible, setVisible] = useState(false)

    return (
        <TouchableOpacity
            onPress={() => setVisible(true)}
            style={[styles.container, style]}>

            <Text style={[styles.label, { position: inputValue ? 'absolute' : 'relative', display: inputValue ? 'flex' : 'none' }]}>
                {label}
            </Text>

            <Text style={styles.input}>
                {DateToString(inputValue)}
            </Text>

            {visible ? <DateTimePicker
                mode="date"
                value={new Date()}
                onChange={(value) => {setValue(value.nativeEvent.timestamp), setVisible(false), onEndEditing(value.nativeEvent.timestamp)}}
                onTouchCancel={() => setVisible(false)}
            /> : <></>}


        </TouchableOpacity>
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
    }
});
