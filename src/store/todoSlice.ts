import {createAsyncThunk, createSlice,} from "@reduxjs/toolkit";
import {ToDoAPI} from "../api/appApi";
import {openNotificationWithIcon} from "../utils/notification/notification";
import {setAppStatus} from "./appSlice";


export type ToDoListType = {
    id: string
    title: string
    addedDate: string
    order: number
}

export const getTodoListsTC = createAsyncThunk('todos/getTodoListsTC', async (param, thunkAPI) => {
    thunkAPI.dispatch(setAppStatus({status: "loading"}))
    try {
        const res = await ToDoAPI.getToDos()
        thunkAPI.dispatch(setAppStatus({status: "succeeded"}))
        return {data: res.data}
    } catch (error: any) {
        thunkAPI.dispatch(setAppStatus({status: "failed"}))
        openNotificationWithIcon('error', 'Error', error.message)
        return thunkAPI.rejectWithValue(null)
    } finally {
        thunkAPI.dispatch(setAppStatus({status: "idle"}))
    }
})
export const addTodoListTC = createAsyncThunk('todos/addTodoListTC', async (param: { newTodoListTitle: string }, thunkAPI) => {
    try {
        thunkAPI.dispatch(setAppStatus({status: "loading"}))
        const res = await ToDoAPI.addNewToDo(param.newTodoListTitle)
        if (res.data.resultCode === 0) {
            thunkAPI.dispatch(setAppStatus({status: "succeeded"}))
            return {data: res.data.data.item}
        } else {
            thunkAPI.dispatch(setAppStatus({status: "failed"}))
            openNotificationWithIcon('error', 'Error', res.data.messages[0])
            return thunkAPI.rejectWithValue(null)
        }
    } catch (error: any) {
        thunkAPI.dispatch(setAppStatus({status: "failed"}))
        openNotificationWithIcon('error', 'Error', error.message)
        return thunkAPI.rejectWithValue(null)
    } finally {
        thunkAPI.dispatch(setAppStatus({status: "idle"}))
    }
})
export const removeTodoListTC = createAsyncThunk('todos/removeTodoListTC', async (param: { todolistId: string }, thunkAPI) => {
    thunkAPI.dispatch(setAppStatus({status: "loading"}))
    try {
        const res = await ToDoAPI.removeToDo(param.todolistId)
        if (res.data.resultCode === 0) {
            thunkAPI.dispatch(setAppStatus({status: "succeeded"}))
            return {todolistId: param.todolistId}
        } else {
            thunkAPI.dispatch(setAppStatus({status: "failed"}))
            openNotificationWithIcon('error', 'Error', res.data.messages[0])
            return thunkAPI.rejectWithValue(null)
        }
    } catch (error: any) {
        thunkAPI.dispatch(setAppStatus({status: "failed"}))
        openNotificationWithIcon('error', 'Error', error.message)
        return thunkAPI.rejectWithValue(null)
    } finally {
        thunkAPI.dispatch(setAppStatus({status: "idle"}))
    }
})
export const changeTodoListTitleTC = createAsyncThunk('todos/changeTodoListTitle', async (
    params: { todoListId: string, newTitle: string }, thunkAPI) => {
    thunkAPI.dispatch(setAppStatus({status: "loading"}))
    try {
        const res = await ToDoAPI.changeToDoTitle(params.todoListId, params.newTitle)
        if (res.data.resultCode === 0) {
            thunkAPI.dispatch(setAppStatus({status: "succeeded"}))
            return {id: params.todoListId, newTitle: params.newTitle}
        } else {
            thunkAPI.dispatch(setAppStatus({status: "failed"}))
            openNotificationWithIcon('error', 'Error', res.data.messages[0])
            return thunkAPI.rejectWithValue(null)
        }
    } catch (error: any) {
        thunkAPI.dispatch(setAppStatus({status: "failed"}))
        openNotificationWithIcon('error', 'Error', error.message)
        return thunkAPI.rejectWithValue(null)
    } finally {
        thunkAPI.dispatch(setAppStatus({status: "idle"}))
    }
})

const todoSlice = createSlice({
    name: 'todos',
    initialState: {
        todos: [] as Array<ToDoListType>
    },
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(addTodoListTC.fulfilled, (state, action) => {
            if (action.payload) state.todos.unshift(action.payload.data)
        })
        builder.addCase(removeTodoListTC.fulfilled, (state, action) => {
            if (action.payload) state.todos = state.todos.filter(t => action.payload && t.id !== action.payload.todolistId)
        })
        builder.addCase(changeTodoListTitleTC.fulfilled, (state, action) => {
            if (action.payload) {
                const currentTodo = state.todos.find(t => action.payload && t.id === action.payload.id)
                if (currentTodo) {
                    currentTodo.title = action.payload.newTitle
                }
            }
        })
        builder.addCase(getTodoListsTC.fulfilled, (state, action) => {
                state.todos = action.payload.data
            }
        )
    }
})

export default todoSlice.reducer