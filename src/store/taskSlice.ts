import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {TaskAPI} from "../api/appApi";
import {openNotificationWithIcon} from "../utils/notification/notification";
import {addTodoListTC, getTodoListsTC, removeTodoListTC, ToDoListType} from "./todoSlice";
import {initializeApp, setAppStatus} from "./appSlice";


export type TaskType = {
    addedDate: string
    deadline: string | null
    description: string | null
    id: string
    order: number
    priority: number
    startDate: string | null
    status: number
    title: string
    todoListId: string
}
type TaskDataType = {
    tasks: Array<TaskType>,
    newTaskTitle: string
}
type TaskReducerDataType = {
    [key: string]: TaskDataType
}

export const getTasks = createAsyncThunk('tasks/getTasks', async (param: { todoListId: string }, thunkAPI) => {
    thunkAPI.dispatch(setAppStatus({status: "loading"}))
    try {
        const res = await TaskAPI.getTask(param.todoListId)
        thunkAPI.dispatch(setAppStatus({status: "succeeded"}))
        return {id: param.todoListId, data: res.data.items}
    } catch (error: any) {
        thunkAPI.dispatch(setAppStatus({status: "failed"}))
        openNotificationWithIcon('error', 'Error', error.message)
        return thunkAPI.rejectWithValue(null)
    } finally {
        thunkAPI.dispatch(initializeApp())
        thunkAPI.dispatch(setAppStatus({status: 'idle'}))
    }
})
export const addTask = createAsyncThunk('tasks/addTask', async (params: { todoListId: string, newTaskTitle: string }, thunkAPI) => {
    thunkAPI.dispatch(setAppStatus({status: "loading"}))
    try {
        const res = await TaskAPI.addTask({todoListId: params.todoListId, newTaskTitle: params.newTaskTitle})
        if (res.data.resultCode === 0) {
            thunkAPI.dispatch(getTasks({todoListId: params.todoListId}))
            // thunkAPI.dispatch(setNewTaskTitleValue({todoListId: params.todoListId, newValue: ''}))
        } else if (res.data.resultCode === 1) {
            thunkAPI.dispatch(setAppStatus({status: "failed"}))
            openNotificationWithIcon('error', 'Error', res.data.messages[0])
            return thunkAPI.rejectWithValue(null)
        }
    } catch (error: any) {
        thunkAPI.dispatch(setAppStatus({status: "failed"}))
        openNotificationWithIcon('error', 'Error', error.message)
        return thunkAPI.rejectWithValue(null)
    } finally {
        thunkAPI.dispatch(initializeApp())
        thunkAPI.dispatch(setAppStatus({status: 'idle'}))
    }
})
export const removeTask = createAsyncThunk('tasks/removeTask', async (params: { todoListId: string, taskId: string }, thunkAPI) => {
    thunkAPI.dispatch(setAppStatus({status: "loading"}))
    try {
        const res = await TaskAPI.removeTask({todoListId: params.todoListId, taskId: params.taskId})
            if (res.data.resultCode === 0) {
                thunkAPI.dispatch(getTasks({todoListId: params.todoListId}))
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
        thunkAPI.dispatch(initializeApp())
        thunkAPI.dispatch(setAppStatus({status: 'idle'}))
    }
})
export const updateTaskTC = createAsyncThunk('tasks/updateTaskTC', async (params: { todoListId: string, taskId: string, data: {} }, thunkAPI) => {
    thunkAPI.dispatch(setAppStatus({status: "loading"}))
    try {
        const res = await TaskAPI.updateTask(params.todoListId, params.taskId, params.data)
            if (res.data.resultCode === 0) {
                thunkAPI.dispatch(getTasks({todoListId: params.todoListId}))
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
        thunkAPI.dispatch(initializeApp())
        thunkAPI.dispatch(setAppStatus({status: 'idle'}))
    }

})

export const taskSlice = createSlice({
    name: 'tasks',
    initialState: {} as TaskReducerDataType,
    reducers: {
        setNewTaskTitleValue(state, action: PayloadAction<{ todoListId: string, newValue: string }>) {
            state[action.payload.todoListId].newTaskTitle = action.payload.newValue
        },
    },
    extraReducers: (builder) => {
        builder.addCase(getTasks.fulfilled, (state, action) => {
            state[action.payload.id] = {tasks: action.payload.data, newTaskTitle: ''}
        })
        builder.addCase(addTodoListTC.fulfilled, (state, action) => {
            if (action.payload) state[action.payload.data.id] = {tasks: [], newTaskTitle: ''}
        })
        builder.addCase(getTodoListsTC.fulfilled, (state, action) => {
            action.payload.data.forEach((el: ToDoListType) => {
                state[el.id] = {tasks: [] as TaskType[], newTaskTitle: ''}
            })
        })
        builder.addCase(removeTodoListTC.fulfilled, (state, action) => {
            if (action.payload) delete state[action.payload.todolistId]
        })
    }
})

export const {setNewTaskTitleValue} = taskSlice.actions
export default taskSlice.reducer