

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';


export const fetchTodos = createAsyncThunk('todos/fetchTodos', async () => {
    const response = await fetch('https://jsonplaceholder.typicode.com/todos');
    return response.json();
});

const initialState = {
    todos: [],
    loading: false,
    error: null,
    filter: 'all',
    sort: 'id',
};

const todoSlice = createSlice({

    
    name: 'todos',
    initialState,
    reducers: {
        deleteTodo: (state, action) => {
            state.todos = state.todos.filter(item => item.id !== action.payload);
        },
        setFilter: (state, action) => {
            state.filter = action.payload;
        },
        setSort: (state, action) => {
            state.sort = action.payload;
        },
        updateTodo: (state, action) => {
            const index = state.todos.findIndex(todo => todo.id === action.payload.id);
            if (index !== -1) {
                state.todos[index] = {
                    ...state.todos[index],
                    title: action.payload.title,
                    updated_at: new Date().toISOString(),
                };
            }
        },
        addTodo: (state, action) => {
            const newTodo = {
                ...action.payload,
                id: Date.now(),
                completed: false,
                created_at: new Date().toISOString(),
                updated_at: new Date().toISOString(),
            };
            state.todos.unshift(newTodo);
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchTodos.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchTodos.fulfilled, (state, action) => {
                state.loading = false;
                state.todos = action.payload;
            })
            .addCase(fetchTodos.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            });
    },
});

export const { deleteTodo, setFilter, setSort, updateTodo, addTodo } = todoSlice.actions;
export default todoSlice.reducer;
