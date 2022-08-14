// import {AppThunk} from "./store";
// import {AppAPI} from "../api/appApi";
// import {getTodoListsTC} from "./todoListReducer";
// import {openNotificationWithIcon} from "../utils/notification/notification";
//
// export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'
// export type AppDataType = {
//     isInitialized: boolean
//     isAuth: boolean
//     status: RequestStatusType
//     error: string | null
// }
//
// const initialState: AppDataType = {
//     isInitialized: false,
//     isAuth: false,
//     status: 'idle',
//     error: null,
// }
//
//
// export type AppReducerActionsType = InitializeAppAC | SetAppStatusACType | SetAuthACType
//
//
// export const appReducer = (state: AppDataType = initialState, action: AppReducerActionsType) => {
//     switch (action.type) {
//         case "APP-REDUCER/INITIALIZE-APP":
//             return {...state, isInitialized: true}
//         case "APP-REDUCER/SET-APP-STATUS":
//             return {...state, status: action.status}
//         case "APP-REDUCER/SET-AUTH":
//             return {...state, isAuth: action.auth}
//         default:
//             return state
//     }
// }
//
// type InitializeAppAC = ReturnType<typeof initializeApp>
// export const initializeApp = () => {
//     return {
//         type: 'APP-REDUCER/INITIALIZE-APP'
//     } as const
// }
// type SetAppStatusACType = ReturnType<typeof setAppStatus>
// export const setAppStatus = (status: RequestStatusType) => {
//     return {
//         type: 'APP-REDUCER/SET-APP-STATUS',
//         status
//     } as const
// }
// type SetAuthACType = ReturnType<typeof setAuth>
// export const setAuth = (auth: boolean) => {
//     return {
//         type: 'APP-REDUCER/SET-AUTH',
//         auth
//     } as const
// }
//
//
// //THUNK
//
// export const initializeAppTC = (): AppThunk => {
//     return async (dispatch) => {
//         dispatch(setAppStatus('loading'))
//         AppAPI.me().then((res) => {
//             console.log(res)
//             if (res.data.messages[0]==='You are not authorized') {
//                 openNotificationWithIcon('error', 'Error', res.data.messages[0])
//             } else {
//                 dispatch(setAuth(true))
//                 dispatch(getTodoListsTC())
//             }
//         }).catch((err) => {
//             console.log(err)
//             openNotificationWithIcon('error', 'Error', err)
//         }).finally(() => {
//                 dispatch(initializeApp())
//                 dispatch(setAppStatus('idle'))
//             }
//         )
//     }
// }
//
// export const loginTC = (email:string, password:string, rememberMe:boolean): AppThunk => {
//     return async (dispatch) => {
//         AppAPI.logIn(email, password, rememberMe).then((res)=>{
//             console.log(res)
//             if (res.data.messages[0]){
//                 openNotificationWithIcon('error', 'Error', res.data.messages[0])
//             }
//             if (res.data.data.userId) {
//                 dispatch(initializeAppTC())
//             }
//         })
//     }
// }
//
// export const logOutTC = (): AppThunk => {
//     return async (dispatch) => {
//         AppAPI.logOut().then((res)=>{
//             if (res.data.resultCode === 0) {
//                 console.log(res)
//                 dispatch(setAuth(false))
//             }
//         })
//     }
// }
//

export default () => {}
