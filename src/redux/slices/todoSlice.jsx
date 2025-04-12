// todoSlice.js

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// Async thunk to fetch todos
export const fetchTodos = createAsyncThunk('todos/fetchTodos', async () => {
    const response = await fetch('https://jsonplaceholder.typicode.com/todos');
    return response.json();
});

// Initial state
const initialState = {
    todos: [],
    loading: false,
    error: null,
    filter: 'ALL',
    sort: 'id', 
};

// Create slice
const todoSlice = createSlice({
    name: 'todos',
    initialState,
    reducers: {
        deleteTodo: (state, action) => {
            state.todos = state.todos.filter(item => item.id != action.payload)
        },
        setFilter: (state, action) => {
            state.todos = action.payload
        },
        setSort: (state, action) => {
            state.todos = action.payload
        },
        updateTodo: (state, action) => {
            const { id, title } = action.payload;
            const todo = state.todos.find(todo => todo.id === id);
            if (todo) {
                todo.title = title; 
            }
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchTodos.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchTodos.fulfilled, (state, action) => {
                state.status = 'success';
                state.todos = action.payload;
            })
            .addCase(fetchTodos.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            });
    },
});

export const { deleteTodo,setFilter,setSort,updateTodo } = todoSlice.actions;
export default todoSlice.reducer;
