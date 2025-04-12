import { View, Text } from 'react-native'
import React from 'react'
import store from './src/redux/store'
import { Provider } from 'react-redux'
import AppNavigator from './src/screens/AppNavigator'

const App = () => {
  return (
    <>
      <Provider store={store}>
        <AppNavigator/>
      </Provider>
    </>
  )
}

export default App