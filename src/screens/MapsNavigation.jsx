import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import MapView from 'react-native-maps';

const MapsNavigation = () => {
    return (
        <View style={{ flex: 1 }}>
            <MapView
                style={styles.map}
                initialRegion={{
                    latitude: 37.78825,
                    longitude: -122.4324,
                    latitudeDelta: 0.0922,
                    longitudeDelta: 0.0421,
                }}
            />
        </View>
    )
};

const styles=StyleSheet.create({

    container:{
        ...StyleSheet.absoluteFillObject,
        justifyContent:'center',
        alignItems:'center'
    },

    map:{
        ...StyleSheet.absoluteFillObject,
    }

})

export default MapsNavigation