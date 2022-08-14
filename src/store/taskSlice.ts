import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {TaskAPI} from "../api/appApi";
import {openNotificationWithIcon} from "../utils/notification/notification";
import {getTodoListsTC, removeTodoListTC, ToDoListType} from "./todoSlice";


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

export const getTasks = createAsyncThunk('tasks/getTasks', (param: { todoListId: string }) => {
    return TaskAPI.getTask(param.todoListId).then((res) => {
        return {id: param.todoListId, data: res.data.items}
    })
})
export const addTask = createAsyncThunk('tasks/addTask', (params: { todoListId: string, newTaskTitle: string }, thunkAPI) => {
    TaskAPI.addTask({todoListId: params.todoListId, newTaskTitle: params.newTaskTitle}).then((res) => {
        console.log(res)
        if (res.data.resultCode === 0) {
            thunkAPI.dispatch(getTasks({todoListId: params.todoListId}))
            thunkAPI.dispatch(setNewTaskTitleValue({todoListId: params.todoListId, newValue: ''}))
        } else if (res.data.resultCode === 1) {
            openNotificationWithIcon('error', 'Error', res.data.messages[0])
        }
    })
})
export const removeTask = createAsyncThunk('tasks/removeTask', (params: { todoListId: string, taskId: string }, thunkAPI) => {

    TaskAPI.removeTask({todoListId: params.todoListId, taskId: params.taskId}).then((res) => {
        console.log(res)
        if (res.data.resultCode === 0) {
            thunkAPI.dispatch(getTasks({todoListId: params.todoListId}))
        }
    })
})
export const updateTaskTC = createAsyncThunk('tasks/updateTaskTC', (params: { todoListId: string, taskId: string, data: {} }, thunkAPI) => {
    TaskAPI.updateTask(params.todoListId, params.taskId, params.data).then((res) => {
        console.log(res)
        if (res.data.resultCode === 0) {
            thunkAPI.dispatch(getTasks({todoListId: params.todoListId}))
        }
    })
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
        builder.addCase(getTodoListsTC.fulfilled, (state, action) => {
            action.payload.data.forEach((el: ToDoListType) => {
                state[el.id] = {tasks: [] as TaskType[], newTaskTitle: ''}
            })
        })
        builder.addCase(removeTodoListTC.fulfilled, (state, action) => {
            if (action.payload) delete state[action.payload.id]
        })
    }
})

export const {setNewTaskTitleValue} = taskSlice.actions
export default taskSlice.reducer