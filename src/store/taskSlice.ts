import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {AppThunk} from "./toolkitStore";
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

export const taskSlice = createSlice({
    name: 'taskSlice',
    initialState: {} as TaskReducerDataType,
    reducers: {
        setTasks(state, action) {
            state[action.payload.id] = {tasks: action.payload.data, newTaskTitle:''}
        },
        setTasksForTodoLists(state, action: PayloadAction<{data: Array<TaskType>}>) {
            action.payload.data.forEach((el: ToDoListType) => {
                state[el.id] = {tasks: [] as TaskType[], newTaskTitle: 'qqq'}
            })
        },
        setNewTaskTitleValue(state, action: PayloadAction<{todoListId: string, newValue: string}>) {
            state[action.payload.todoListId].newTaskTitle = action.payload.newValue
        },
    },
    extraReducers: (builder) => {
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



//THUNK

    export const getTasks = (todoListId: string): AppThunk => {
        return async (dispatch) => {
            TaskAPI.getTask(todoListId).then((res) => {
                dispatch(setTasks({id: todoListId, data: res.data.items}))
            })
        }
    }

    export const addTask = (todoListId: string, newTaskTile: string): AppThunk => {
        return async (dispatch) => {
            TaskAPI.addTask({todoListId, newTaskTile}).then((res) => {
                console.log(res)
                if (res.data.resultCode === 0) {
                    dispatch(getTasks(todoListId))
                    dispatch(setNewTaskTitleValue({todoListId, newValue: ''}))
                } else if (res.data.resultCode === 1) {
                    openNotificationWithIcon('error', 'Error', res.data.messages[0])
                }
            })
        }
    }

    export const removeTask = (todoListId: string, taskId: string): AppThunk => {
        return async (dispatch) => {
            TaskAPI.removeTask({todoListId, taskId}).then((res) => {
                console.log(res)
                if (res.data.resultCode === 0) {
                    dispatch(getTasks(todoListId))
                }
            })
        }
    }

    export const updateTaskTC = (todoListId: string, taskId: string, data: {}): AppThunk => {
        return async (dispatch) => {
            TaskAPI.updateTask(todoListId, taskId, data).then((res) => {
                console.log(res)
                if (res.data.resultCode === 0) {
                    dispatch(getTasks(todoListId))
                }
            })
        }
    }


    export const {setNewTaskTitleValue, setTasks, setTasksForTodoLists} = taskSlice.actions
    export default taskSlice.reducer