import { View, Text } from 'react-native'
import React, { useEffect, useState } from 'react'
import { addEventListener } from "@react-native-community/netinfo";

const NoInternet = () => {

    const [isConnected, setIsConnected] = useState(false);

    useEffect(() => {
        const unsubscribe = addEventListener(state => {
            console.log("Connection type", state.type);
            console.log("Is connected?", state.isConnected);
            setIsConnected(state.isConnected)
        });

        return () => {
            unsubscribe();
        };
    }, []);

    return (
        <View style={{ flex: 1 }}>
            <View
                style={{
                    position:'absolute',
                    bottom:0,
                    height:50,
                    width:'100%',
                    justifyContent:'center',
                    alignItems:'center',
                    backgroundColor: isConnected ? '#008000' : 'black',
                }}
            >
                <Text style={{color:'#FFFFFF',}}>{isConnected ? 'Back Online' : 'Not Connected'}</Text>
            </View>
        </View>
    )
}

export default NoInternet