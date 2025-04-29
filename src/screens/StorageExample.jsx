import { View, Text, TextInput, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage';


let names = []

const StorageExample = () => {

    const [data, setData] = useState('');

    const saveData = async () => {
        names.push(data)
        try {
            await AsyncStorage.setItem('DATA', JSON.stringify(names));
            console.log('saved')
        } catch (error) {

        }
    }

    const getData = async () => {
        try {
            const name = await AsyncStorage.getItem('DATA');
            console.log('name :' + JSON.parse(name))
        } catch (error) {

        }
    }

    return (
        <View style={{ flex: 1, backgroundColor: '#ffff', justifyContent: 'center', alignItems: 'center' }}>
            <TextInput
                placeholder='Enter Text'
                value={data}
                style={{ padding: 10, borderRadius: 5, borderWidth: 1, width: '90%' }}
                onChangeText={txt => setData(txt)}
            />

            <TouchableOpacity
                style={{
                    width: '80%',
                    height: 50,
                    backgroundColor: 'green',
                    justifyContent: 'center',
                    alignItems: 'center',
                    marginTop: 15
                }}
                onPress={() => saveData()}
            >
                <Text style={{ color: '#ffff', fontSize: 18 }}>Save Data</Text>
            </TouchableOpacity>

            <TouchableOpacity
                style={{
                    width: '80%',
                    height: 50,
                    backgroundColor: 'green',
                    justifyContent: 'center',
                    alignItems: 'center',
                    marginTop: 15
                }}
                onPress={() => getData()}
            >
                <Text style={{ color: '#ffff', fontSize: 18 }}>Get Data</Text>
            </TouchableOpacity>

        </View>
    )
}

export default StorageExample