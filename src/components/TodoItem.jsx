// src/components/TodoItem.js
import React from 'react';
import { View, Text, TouchableOpacity, Button, StyleSheet } from 'react-native';

const TodoItem = ({ todo, onToggle, onDelete,onEdit }) => {
    return (
        <View style={styles.todoContainer}>
            <TouchableOpacity style={styles.textContainer}>
                <Text style={[styles.todoText, todo.completed && styles.completed]}>
                    {todo.title}
                </Text>
            </TouchableOpacity>
            <View style={styles.buttonContainer}>
                <Button title="Delete" onPress={() => onDelete(todo.id)} />
                <Button style={{marginLeft:10}} title="Edit" onPress={() => onEdit(todo.id)} />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    todoContainer: {
        flexDirection: 'row',        // horizontal layout
        alignItems: 'center',        // vertically center items
        justifyContent: 'space-between', // push text left, button right
        padding: 10,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 8,
        marginVertical: 5,
        backgroundColor: '#fff',
    },
    textContainer: {
        flex: 1,
    },
    todoText: {
        fontSize: 16,
    },
    completed: {
        textDecorationLine: 'line-through',
        color: 'gray',
    },
    buttonContainer: {
        flexDirection:'row',
        marginLeft: 10,              // space between text and button
    },
});


export default TodoItem;
