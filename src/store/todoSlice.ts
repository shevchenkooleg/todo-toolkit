import {createSlice, Dispatch, PayloadAction} from "@reduxjs/toolkit";
import {AppThunk} from "../store/toolkitStore";
import {ToDoAPI} from "../api/appApi";
import {openNotificationWithIcon} from "../utils/notification/notification";
import {ThunkAction, ThunkDispatch} from "redux-thunk";
import {ThunkResult} from "@reduxjs/toolkit/dist/query/core/buildThunks";


export type ToDoListType = {
    id: string
    title: string
    addedDate: string
    order: number
}

const todoSlice = createSlice({
    name: 'todos',
    initialState: {
        todos: [] as Array<ToDoListType>
    },
    reducers: {
        setTodoLists(state, action: PayloadAction<{data: Array<ToDoListType>}>){
            state.todos = action.payload.data
        },
        updateTodoListTitle(state, action): void {
            const currentTodo = state.todos.find(t=>t.id === action.payload.id)
            if (currentTodo){
                currentTodo.title = action.payload.newTitle
            }
        },
        removeTodoList(state, action: PayloadAction<{id: string}>){
            state.todos = state.todos.filter(t=>t.id !== action.payload.id)
        },
    },
})


//THUNK

export const getTodoListsTC = (): any => {
    return async (dispatch:Dispatch) => {
        ToDoAPI.getToDos().then((res) => {
            console.log(res.data)
            dispatch(setTodoLists({data: res.data}))
            // dispatch(setTasksForTodoLists({data: res.data}))
        })
    }
}

export const addTodoListTC = (newTodoListTitle: string):AppThunk => {
    return async (dispatch) => {
        ToDoAPI.addNewToDo(newTodoListTitle).then((res)=>{
            if (res.data.resultCode === 0) {
                dispatch(getTodoListsTC())
            } else if (res.data.resultCode ===1) {
                openNotificationWithIcon('error', 'Error', res.data.messages[0])
            }
        }).catch((err)=>{
            console.log(err)
        })
    }
}
export const removeTodoListTC = (todolistId: string): AppThunk => {
    return async (dispatch) => {
        ToDoAPI.removeToDo(todolistId).then((res)=>{
            if (res.data.resultCode === 0){
                dispatch(removeTodoList({id: todolistId}))
            }
        })
    }
}

export const changeTodoListTitle = (todoListId: string, newTitle: string): AppThunk => {
    return async (dispatch)=>{
        ToDoAPI.changeToDoTitle(todoListId, newTitle).then((res)=>{
            if (res.data.resultCode === 0){
                dispatch(updateTodoListTitle({id: todoListId, newTitle: newTitle}))
            }
        })
    }
}


export const {setTodoLists, updateTodoListTitle, removeTodoList} = todoSlice.actions

export default todoSlice.reducer