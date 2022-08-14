// import {AppThunk} from "../store/toolkitStore";
// import {ToDoAPI} from "../api/appApi";
// import {openNotificationWithIcon} from "../utils/notification/notification";
//
//
// type ToDoListType = {
//     id: string
//     title: string
//     addedDate: string
//     order: number
// }
//
// const initialState: Array<ToDoListType> = []
//
//
// type TodoListReducerActionsType = SetTodoListACType | UpdateTodoListTitleACType | RemoveTodoListAcType
//
// export const todoListReducer = (state: Array<ToDoListType> = initialState, action: TodoListReducerActionsType) => {
//     switch (action.type) {
//         case "TODO-LIST-REDUCER/SET-TODO-LISTS":
//             return [...action.data]
//         case "TODO-LIST-REDUCER/UPDATE-TODO-LIST-TITLE":
//             return state.map(tl => tl.id === action.payload.todoListId ? {...tl, title:action.payload.newTitle} : tl)
//         case "TODO-LIST-REDUCER/REMOVE-TODO-LIST":
//             return state.filter((el)=> el.id !== action.todoListId)
//         default:
//             return state
//     }
// }
//
// export type SetTodoListACType = ReturnType<typeof setTodoLists>
// export const setTodoLists = (data: Array<ToDoListType>) => {
//     return {
//         type: 'TODO-LIST-REDUCER/SET-TODO-LISTS',
//         data
//     } as const
// }
// export type UpdateTodoListTitleACType = ReturnType<typeof updateTodoListTitle>
// export const updateTodoListTitle = (payload: {todoListId: string, newTitle: string}) => {
//     return {
//         type: 'TODO-LIST-REDUCER/UPDATE-TODO-LIST-TITLE',
//         payload
//     } as const
// }
// export type RemoveTodoListAcType = ReturnType<typeof removeTodoList>
// export const removeTodoList = (todoListId: string) => {
//     return {
//         type: 'TODO-LIST-REDUCER/REMOVE-TODO-LIST',
//         todoListId
//     } as const
// }
//
//
//
// //THUNK
//
// export const getTodoListsTC = (): AppThunk => {
//     return async (dispatch) => {
//         ToDoAPI.getToDos().then((res) => {
//             dispatch(setTodoLists(res.data))
//         })
//     }
// }
//
// export const addTodoListTC = (newTodoListTitle: string):AppThunk => {
//     return async (dispatch) => {
//         ToDoAPI.addNewToDo(newTodoListTitle).then((res)=>{
//             if (res.data.resultCode === 0) {
//                 dispatch(getTodoListsTC())
//             } else if (res.data.resultCode ===1) {
//                 openNotificationWithIcon('error', 'Error', res.data.messages[0])
//             }
//         }).catch((err)=>{
//             console.log(err)
//         })
//     }
// }
// export const removeTodoListTC = (todolistId: string): AppThunk => {
//     return async (dispatch) => {
//         ToDoAPI.removeToDo(todolistId).then((res)=>{
//             if (res.data.resultCode === 0){
//                 dispatch(removeTodoList(todolistId))
//             }
//         })
//     }
// }
//
// export const changeTodoListTitle = (todoListId: string, newTitle: string): AppThunk => {
//     return async (dispatch)=>{
//         ToDoAPI.changeToDoTitle(todoListId, newTitle).then((res)=>{
//             if (res.data.resultCode === 0){
//                 dispatch(updateTodoListTitle({todoListId, newTitle}))
//             }
//         })
//     }
// }
//
//
export default () => {}
