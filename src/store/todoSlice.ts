import {createAsyncThunk, createSlice,} from "@reduxjs/toolkit";
import {ToDoAPI} from "../api/appApi";
import {openNotificationWithIcon} from "../utils/notification/notification";


export type ToDoListType = {
    id: string
    title: string
    addedDate: string
    order: number
}

export const getTodoListsTC = createAsyncThunk('todos/getTodoListsTC', () => {
    return ToDoAPI.getToDos().then((res) => {
        return {data: res.data}
    })
})
export const addTodoListTC = createAsyncThunk('todos/addTodoListTC', (param: { newTodoListTitle: string }) => {
    return ToDoAPI.addNewToDo(param.newTodoListTitle).then((res) => {
        if (res.data.resultCode === 0) {
            return {data: res.data.data.item}

        } else if (res.data.resultCode === 1) {
            openNotificationWithIcon('error', 'Error', res.data.messages[0])
        }
    }).catch((err) => {
        console.log(err)
    })
})
export const removeTodoListTC = createAsyncThunk('todos/removeTodoListTC', (param: { todolistId: string }) => {
    return ToDoAPI.removeToDo(param.todolistId).then((res) => {
        if (res.data.resultCode === 0) {
            return {todolistId: param.todolistId}
        }
    })
})
export const changeTodoListTitleTC = createAsyncThunk('todos/changeTodoListTitle', (
    params: { todoListId: string, newTitle: string }) => {
    return ToDoAPI.changeToDoTitle(params.todoListId, params.newTitle).then((res) => {
        if (res.data.resultCode === 0) {
            return {id: params.todoListId, newTitle: params.newTitle}
        }
    })
})


const todoSlice = createSlice({
    name: 'todos',
    initialState: {
        todos: [] as Array<ToDoListType>
    },
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(addTodoListTC.fulfilled, (state, action)=>{
            if (action.payload) state.todos.unshift(action.payload.data)
        })
        builder.addCase(removeTodoListTC.fulfilled, (state, action) => {
            if (action.payload) state.todos = state.todos.filter(t => action.payload && t.id !== action.payload.todolistId)
        })
        builder.addCase(changeTodoListTitleTC.fulfilled, (state, action) => {
            if (action.payload){
                const currentTodo = state.todos.find(t => action.payload && t.id === action.payload.id)
                if (currentTodo) {
                    currentTodo.title = action.payload.newTitle
                }
            }
        })
        builder.addCase(getTodoListsTC.fulfilled, (state, action)=>{
            state.todos = action.payload.data
            }
        )
    }
})

export default todoSlice.reducer