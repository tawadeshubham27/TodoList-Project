import { View, Text, TextInput, Button, StyleSheet, Alert, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { addTodo } from '../redux/slices/todoSlice';
import { useNavigation } from '@react-navigation/native';

const AddToScreen = () => {

  const navigation = useNavigation();
  const [title, setTitle] = useState('');
  const dispatch = useDispatch();

  const handleAddTodo = () => {
    const newTodo = {
      id: Date.now(),
      title,
      completed: false,
    };

    dispatch(addTodo(newTodo));
    setTitle('');
    navigation.goBack();
  };

  return (
    <View style={{ flex: 1, paddingHorizontal: 16, backgroundColor: '#141828',justifyContent:'center' }}>
      <Text style={styles.heading}>Add Todo</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter todo title"
        value={title}
        onChangeText={setTitle}
      />

      <TouchableOpacity
        onPress={handleAddTodo}
        style={styles.button}
      >
        <Text style={styles.buttonText}>Save Todo</Text>
      </TouchableOpacity>

    </View>
  )
};

const styles = StyleSheet.create({

  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color:'#fff'
  },

  input: {
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 16,
    paddingVertical: 10,
    marginTop: 4,
    backgroundColor: '#ffffff',
    borderColor: '#E5E5E5',
    fontSize: 14,
    lineHeight: 18.2,
    fontWeight: 500,
    letterSpacing: 0.1,
    color: '#19213D'
  },

  button: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    height: 50,
    backgroundColor: '#4563E4',
    borderRadius: 20,
    alignItems: 'center',
    marginTop:20
  },

  buttonText: {
    color: '#fff',
    fontWeight: '500',
    textAlign: 'center',
    marginTop: 5,
    fontSize: 20
  },

});

export default AddToScreen