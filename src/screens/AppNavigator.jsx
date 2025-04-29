import { View, Text } from 'react-native'
import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import MainScreen from './MainScreen'
import AddToScreen from './AddToScreen'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import CameraPicker from './CameraPicker'
import LoginPage from './socialLogins/LoginPage'


import MapsNavigation from './MapsNavigation'
import StorageExample from './StorageExample'
import FlatListData from './FlatListData'
import PullToRefreshFakeStore from './PullToRefreshFakeStore'
import VirtualizedListWithAPI from './VirtualizedListWithAPI'
import LoadMoreBigData from './LoadMoreBigData'
import NoInternet from './NoInternet'

const Stack = createNativeStackNavigator();

const AppNavigator = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator>
                {/* <Stack.Screen name="Main" component={MainScreen} />
                <Stack.Screen name="AddTodo" component={AddToScreen} />
                <Stack.Screen name="Main" component={MainScreen} /> */}
                {/* <Stack.Screen name="CameraPicker" component={CameraPicker} /> */}
                {/* <Stack.Screen name="LoginPage" component={LoginPage} /> */}
                {/* <Stack.Screen name="StorageExample" component={StorageExample} /> */}
                {/* <Stack.Screen name="MapsNavigation" component={MapsNavigation} /> */}
                {/* <Stack.Screen name="FlatListData" component={FlatListData} /> */}
                {/* <Stack.Screen name="PullToRefreshFakeStore" component={PullToRefreshFakeStore} /> */}
                {/* <Stack.Screen name="VirtualizedListWithAPI" component={VirtualizedListWithAPI} /> */}
                {/* <Stack.Screen name="LoadMoreBigData" component={LoadMoreBigData} /> */}
                <Stack.Screen name="NoInternet" component={NoInternet} />
            </Stack.Navigator>
        </NavigationContainer>
    )
}

export default AppNavigator