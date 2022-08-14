// import {AppThunk} from "./store";
// import {TaskAPI} from "../api/appApi";
// import {RemoveTodoListAcType, SetTodoListACType} from "./todoListReducer";
// import {openNotificationWithIcon} from "../utils/notification/notification";
//
//
// export type TaskType = {
//     addedDate: string
//     deadline: string | null
//     description: string | null
//     id: string
//     order: number
//     priority: number
//     startDate: string | null
//     status: number
//     title: string
//     todoListId: string
// }
//
// type TaskDataType = {
//     tasks: Array<TaskType>,
//     newTaskTitle: string
// }
// type TaskReducerDataType = {
//     [key: string]: TaskDataType
// }
//
//
// const initialState = {}
//
// type taskReducerActionType =
//     SetTasksACType |
//     SetNewTaskTitleValueACType |
//     SetTodoListACType |
//     RemoveTodoListAcType
//
// export const taskReducer = (state: TaskReducerDataType = initialState, action: taskReducerActionType) => {
//     switch (action.type) {
//         case "TASK-REDUCER/SET-TASKS":
//             return {
//                 ...state,
//                 [action.payload.todoListId]: {...state[action.payload.todoListId], tasks: [...action.payload.data]}
//             }
//         // return {...state, tasks: {...state.tasks, [action.payload.todoListId]: [...action.payload.data]}}
//         case "TODO-LIST-REDUCER/SET-TODO-LISTS":
//             const copyState = {...state}
//             action.data.forEach((el) => {
//                 copyState[el.id] = {tasks: [] as TaskType[], newTaskTitle: ''}
//                 // copyState.tasks[el.id] = []
//             })
//             return copyState
//         case "TASK-REDUCER/SET-NEW-TASK-TITLE-VALUE":
//             return {
//                 ...state,
//                 [action.payload.todoListId]: {
//                     ...state[action.payload.todoListId],
//                     newTaskTitle: action.payload.newValue
//                 }
//             }
//         case "TODO-LIST-REDUCER/REMOVE-TODO-LIST":
//             let newState = {...state}
//             delete newState[action.todoListId]
//             return newState
//
//         default:
//             return state
//     }
// }
//
// type SetTasksACType = ReturnType<typeof setTasks>
// export const setTasks = (payload: { data: Array<TaskType>, todoListId: string }) => {
//     return {
//         type: 'TASK-REDUCER/SET-TASKS',
//         payload,
//     } as const
// }
// type SetNewTaskTitleValueACType = ReturnType<typeof setNewTaskTitleValue>
// export const setNewTaskTitleValue = (payload: { todoListId: string, newValue: string }) => {
//     return {
//         type: 'TASK-REDUCER/SET-NEW-TASK-TITLE-VALUE',
//         payload,
//     } as const
// }
//
//
// //THUNK
//
// export const getTasks = (todoListId: string): AppThunk => {
//     return async (dispatch) => {
//         TaskAPI.getTask(todoListId).then((res) => {
//             dispatch(setTasks({todoListId, data: res.data.items}))
//         })
//     }
// }
//
// export const addTask = (todoListId: string, newTaskTile: string): AppThunk => {
//     return async (dispatch) => {
//         TaskAPI.addTask({todoListId, newTaskTile}).then((res) => {
//             console.log(res)
//             if (res.data.resultCode === 0) {
//                 dispatch(getTasks(todoListId))
//                 dispatch(setNewTaskTitleValue({todoListId, newValue: ''}))
//             } else if (res.data.resultCode === 1) {
//                 openNotificationWithIcon('error', 'Error', res.data.messages[0])
//             }
//         })
//     }
// }
//
// export const removeTask = (todoListId: string, taskId: string): AppThunk => {
//     return async (dispatch) => {
//         TaskAPI.removeTask({todoListId, taskId}).then((res) => {
//             console.log(res)
//             if (res.data.resultCode === 0) {
//                 dispatch(getTasks(todoListId))
//             }
//         })
//     }
// }
//
// export const updateTaskTC = (todoListId: string, taskId: string, data: {}): AppThunk => {
//     return async (dispatch) => {
//         TaskAPI.updateTask(todoListId, taskId, data).then((res)=>{
//             console.log(res)
//             if (res.data.resultCode === 0){
//                 dispatch(getTasks(todoListId))
//             }
//         })
//     }
// }
//
//

export default () => {}
