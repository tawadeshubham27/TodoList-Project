import { View, Text, TouchableOpacity, VirtualizedList, StyleSheet, Modal, TextInput, Image } from 'react-native';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { deleteTodo, fetchTodos, setFilter, setSort, updateTodo } from '../redux/slices/todoSlice';
import { useNavigation } from '@react-navigation/native';
import { Dropdown } from 'react-native-element-dropdown';

const MainScreen = () => {
    const navigation = useNavigation();
    const dispatch = useDispatch();
    const { todos, filter, loading, sort } = useSelector(state => state.todos);
    const [editModalVisible, setEditModalVisible] = useState(false);
    const [currentEdit, setCurrentEdit] = useState({ id: null, title: '' });

    useEffect(() => {
        dispatch(fetchTodos());
    }, [dispatch]);

    const handleDelete = (id) => {
        dispatch(deleteTodo(id));
    };

    const handleEditOpen = (todo) => {
        setCurrentEdit(todo);
        setEditModalVisible(true);
    };

    const handleEditSave = () => {
        dispatch(updateTodo(currentEdit));
        setEditModalVisible(false);
    };

    const filterData = [
        { label: 'All', value: 'all' },
        { label: 'Active', value: 'active' },
        { label: 'Done', value: 'done' },
    ];

    const sortData = [
        { label: 'Sort by ID', value: 'id' },
        { label: 'Sort by Recent', value: 'recent' },
    ];

    const filteredTodos = todos.filter(todo => {
        if (filter === 'active') return !todo.completed;
        if (filter === 'done') return todo.completed;
        return true;
    });

    const sortedTodos = [...filteredTodos].sort((a, b) => {
        if (sort === 'id') return a.id - b.id;
        if (sort === 'recent') return new Date(b.created_at) - new Date(a.created_at);
        return 0;
    });

    return (
        <>
            <View style={{ flex: 1, paddingHorizontal: 16, backgroundColor: '#141828' }}>
                <Text style={[styles.text, { marginTop: 20 }]}>Total To-Do Items: {todos?.length}</Text>
                <Text style={styles.text}>Total Completed: {todos.filter(todo => todo.completed).length}</Text>
                <Text style={styles.text}>Filtered Total: {filteredTodos.length}</Text>

                <View style={{ flexDirection: 'row', marginTop: 15 }}>
                    <Text style={[styles.text, { marginTop: 7 }]}>Filter By :</Text>
                    <Dropdown
                        style={styles.dropdown}
                        data={filterData}
                        labelField="label"
                        valueField="value"
                        value={filter}
                        onChange={item => dispatch(setFilter(item.value))}
                        placeholder="Select an option"
                        placeholderStyle={styles.placeholder}
                        selectedTextStyle={styles.selectedText}
                        iconStyle={styles.icon}
                        dropdownStyle={styles.dropdownList}
                        dropdownPosition="bottom"
                    />
                </View>

                <View style={{ flexDirection: 'row' }}>
                    <Text style={[styles.text, { marginTop: 7 }]}>Sort by:</Text>
                    <Dropdown
                        style={styles.dropdown}
                        data={sortData}
                        labelField="label"
                        valueField="value"
                        value={filter}
                        onChange={item => dispatch(setFilter(item.value))}
                        placeholder="Select an option"
                        placeholderStyle={styles.placeholder}
                        selectedTextStyle={styles.selectedText}
                        iconStyle={styles.icon}
                        dropdownStyle={styles.dropdownList}
                        dropdownPosition="bottom"
                    />
                </View>

                {/* Here i have used VirtualizedList for better performance of list */}
                {loading ? (
                    <Text style={styles.text}>Loading...</Text>
                ) : (
                    <VirtualizedList
                        data={sortedTodos}
                        initialNumToRender={10}
                        getItemCount={data => data.length}
                        getItem={(data, index) => data[index]}
                        keyExtractor={item => item.id.toString()}
                        renderItem={({ item }) => (
                            <View style={styles.todoContainer}>
                                <TouchableOpacity style={styles.textContainer}>
                                    <Text style={[styles.todoText, item.completed && styles.completed]}>
                                        {item.title}
                                    </Text>
                                </TouchableOpacity>
                                <View style={{ flexDirection: 'row', gap: 5, alignItems: 'center' }}>
                                    <TouchableOpacity onPress={() => handleDelete(item.id)}>
                                        <Image
                                            source={require('../assets/deleteIcon.png')}
                                            style={{ width: 24, height: 24 }}
                                        />
                                    </TouchableOpacity>

                                    <TouchableOpacity onPress={() => handleEditOpen(item)}>
                                        <Image
                                            source={require('../assets/editIcon.png')}
                                            style={{ width: 24, height: 24 }}
                                        />
                                    </TouchableOpacity>
                                </View>
                            </View>
                        )}
                    />
                )}
            </View>

            <View
                style={{ backgroundColor: '#141828', paddingHorizontal: 16, paddingBottom: 20, paddingTop: 15 }}>
                <TouchableOpacity
                    onPress={() => navigation.navigate("AddTodo")}
                    style={styles.button}
                >
                    <Text style={styles.buttonText}>Add Todo</Text>
                </TouchableOpacity>
            </View>

            <Modal visible={editModalVisible} transparent animationType="slide">
                <View style={styles.modalContainer}>
                    <View style={styles.modalBox}>
                        <Text style={styles.textheading}>Edit Todo</Text>
                        <TextInput
                            style={styles.input}
                            value={currentEdit.title}
                            onChangeText={text => setCurrentEdit({ ...currentEdit, title: text })}
                        />
                        <View style={styles.editButtonGroup}>
                            <TouchableOpacity
                                onPress={handleEditSave}
                                style={[styles.button, { borderRadius: 8, height: 40 }]}
                            >
                                <Text style={styles.editbuttonText}>Save</Text>
                            </TouchableOpacity>

                            <TouchableOpacity
                                onPress={() => setEditModalVisible(false)}
                                style={[styles.button, { borderRadius: 8, height: 40 }]}
                            >
                                <Text style={styles.editbuttonText}>Cancel</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>
        </>
    );
};

const styles = StyleSheet.create({
    todoContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: 10,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 8,
        marginVertical: 5,
        backgroundColor: '#fff',
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,0.5)',
    },
    modalBox: {
        backgroundColor: '#fff',
        padding: 20,
        borderRadius: 8,
        width: '80%',
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
    textContainer: {
        flex: 1,
    },
    todoText: {
        fontSize: 16,
        fontWeight: '400'
    },

    completed: {
        textDecorationLine: 'line-through',
        color: 'green',
    },
    dropdown: {
        height: 40,
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 10,
        backgroundColor: '#f0f0f0',
        paddingHorizontal: 10,
        marginBottom: 15,
        justifyContent: 'center',
        width: '40%',
        marginLeft: 15
    },
    placeholder: {
        color: '#999',
        fontSize: 16,
    },
    selectedText: {
        color: '#333',
        fontSize: 16,
    },
    icon: {
        width: 20,
        height: 20,
        tintColor: '#333',
    },
    dropdownList: {
        backgroundColor: '#fff',
        borderRadius: 10,
        marginTop: 10,
        borderColor: '#ddd',
        borderWidth: 1,
    },

    text: {
        fontSize: 18,
        fontWeight: '500',
        color: '#EBEEF3'
    },

    button: {
        paddingVertical: 8,
        paddingHorizontal: 16,
        height: 50,
        backgroundColor: '#4563E4',
        borderRadius: 20,
        alignItems: 'center',
    },

    buttonText: {
        color: '#fff',
        fontWeight: '500',
        textAlign: 'center',
        marginTop: 5,
        fontSize: 20
    },

    editbuttonText: {
        color: '#fff',
        fontWeight: '400',
        textAlign: 'center',
        fontSize: 16
    },

    textheading: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 10
    },

    editButtonGroup: {
        flexDirection: 'row',
        gap: 5,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 15
    }

});

export default MainScreen;
