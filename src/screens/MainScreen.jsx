import { View, Text, FlatList, Button, TouchableOpacity, VirtualizedList, StyleSheet, Modal, TextInput } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { deleteTodo, fetchTodos, setFilter, setSort, updateTodo } from '../redux/slices/todoSlice';
import TodoItem from '../components/TodoItem';
import { Picker } from '@react-native-picker/picker';

const MainScreen = () => {

    const dispatch = useDispatch();
    const { todos, loading, error, filter, sort } = useSelector((state) => state.todos);

    const [editModalVisible, setEditModalVisible] = useState(false);
    const [currentEdit, setCurrentEdit] = useState({ id: null, title: '' });

    useEffect(() => {
        dispatch(fetchTodos());
    }, [dispatch]);

    const handleDelete = (id) => {
        console.log(id);
        dispatch(deleteTodo(id))
    };

    const handleEditOpen = (todo) => {
        setCurrentEdit(todo);
        setEditModalVisible(true);
    };

    const handleEditSave = () => {
        dispatch(updateTodo(currentEdit));
        setEditModalVisible(false);
    };

    const filteredTodos = Array.isArray(todos)
        ? todos.filter(todo => {
            if (filter === 'ALL') return true;
            if (filter === 'ACTIVE') return todo.completed == false;
            if (filter === 'DONE') return todo.completed === true;
            return true; // Default case (in case something goes wrong)
        })
        : [];

    console.log(filteredTodos);

    const itemsCompleted = Array.isArray(todos) ? todos.filter(item => item?.completed === true) : [];

    const handleEdit = (todo) => {
        setSelectedTodoId(todo.id);
        setEditTitle(todo.title);  // Prefill with current title
        setIsModalVisible(true);    // Show the modal for editing
    };

    const handleSaveEdit = () => {
        if (editTitle.trim()) {
            dispatch(updateTodo({
                id: selectedTodoId,
                title: editTitle
            }));
            setIsModalVisible(false);
        }
    };

    return (
        <>
            <View style={{ flex: 1, padding: 20 }}>
                <Text style={{ fontSize: 16, marginBottom: 10 }}>Todo List</Text>
                <Text>Total To-Do Items: {todos?.length}</Text>
                <Text>Total To-Do Items Completed: {itemsCompleted?.length}</Text>


                <View>
                    <Text>Filter By</Text>
                    <Picker
                        selectedValue={filter}
                        onValueChange={(itemValue) => dispatch(setFilter(itemValue))}
                        style={styles.picker}
                        dropdownIconColor="#FFFFFF"
                    >
                        <Picker.Item label="All" value="ALL" />
                        <Picker.Item label="Active" value="ACTIVE" />
                        <Picker.Item label="Done" value="DONE" />
                    </Picker>
                </View>


                {/* <View>
                    <View style={styles.dropdown}>
                        <Picker
                            selectedValue={sort}
                            onValueChange={(value) => dispatch(setSort(value))}
                            dropdownIconColor="#fff"
                            style={styles.picker}
                        >
                            <Picker.Item label="Sort by ID" value="ID" />
                            <Picker.Item label="Sort by Most Recent" value="RECENT" />
                        </Picker>
                    </View>
                </View> */}


                <VirtualizedList
                    data={filteredTodos}
                    initialNumToRender={10}
                    getItemCount={(data) => data.length}
                    getItem={(data, index) => data[index]}
                    keyExtractor={item => item.id.toString()}
                    renderItem={({ item }) => (
                        <>
                            <View style={styles.todoContainer}>
                                <TouchableOpacity style={styles.textContainer}>
                                    <Text style={[styles.todoText, item.completed && styles.completed]}>
                                        {item.title}
                                    </Text>
                                </TouchableOpacity>
                                <View style={{flexDirection:'row',gap:5}}>
                                    <Button title="Delete" onPress={() => handleDelete(item.id)} />
                                    <Button style={{ marginLeft: 10 }} title="Edit" onPress={() => handleEditOpen(item)} />
                                </View>
                            </View>
                        </>
                    )}
                />
            </View>

            <View style={{ paddingHorizontal: 16, paddingBottom: 10, marginBottom: 20 }}>
                <TouchableOpacity style={{ width: '100%', paddingHorizontal: 16, paddingVertical: 10, backgroundColor: '#0000FF', borderRadius: 10 }}>
                    <Text style={{ fontSize: 24, color: 'white', textAlign: 'center' }}>Add Todo</Text>
                </TouchableOpacity>
            </View>

            <Modal
                visible={editModalVisible}
                transparent
                animationType="slide"
            >
                <View style={styles.modalContainer}>
                    <View style={styles.modalBox}>
                        <Text>Edit Todo</Text>
                        <TextInput
                            style={styles.input}
                            value={currentEdit.title}
                            onChangeText={(text) => setCurrentEdit({ ...currentEdit, title: text })}
                        />
                        <View style={{flexDirection:'row',gap:5}}>
                            <Button title="Save" onPress={handleEditSave} />
                            <Button title="Cancel" onPress={() => setEditModalVisible(false)} />
                        </View>
                    </View>
                </View>
            </Modal>
        </>
    )
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

    picker: {
        color: '#FFFFFF',
        backgroundColor: '#111111',
        borderRadius: 8,
        marginBottom: 10,
    },

    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,0.5)'
    },
    modalBox: {
        backgroundColor: '#fff',
        padding: 20,
        borderRadius: 8,
        width: '80%'
    },
    input: {
        borderBottomWidth: 1,
        marginBottom: 10
    },
    textContainer: {
        flex: 1,
    },

})

export default MainScreen