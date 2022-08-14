import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {AppAPI} from "../api/appApi";
import {openNotificationWithIcon} from "../utils/notification/notification";
import {getTodoListsTC} from "./todoSlice";


export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'

export const loginTC = createAsyncThunk('appSlice/login',
    (params: { email: string, password: string, rememberMe: boolean }, thunkAPI) => {
        AppAPI.logIn(params.email, params.password, params.rememberMe).then((res) => {
            console.log(res)
            if (res.data.messages[0]) {
                openNotificationWithIcon('error', 'Error', res.data.messages[0])
            }
            if (res.data.data.userId) {
                thunkAPI.dispatch(initializeAppTC({}))
            }
        })
    })
export const logOutTC = createAsyncThunk('appSlice/logout',
    () => {
        return AppAPI.logOut().then((res) => {
            if (res.data.resultCode === 0) {
                console.log(res)
                return {isAuth: false}
            }
        })
    })
export const initializeAppTC = createAsyncThunk('appSlice/initializeApp',
    (params: {},thunkAPI)=>{
        thunkAPI.dispatch(setAppStatus({status: 'loading'}))
        return AppAPI.me().then((res) => {
            console.log(res)
            if (res.data.messages[0] === 'You are not authorized') {
                openNotificationWithIcon('error', 'Error', res.data.messages[0])
            } else {
                thunkAPI.dispatch(getTodoListsTC())
                return {isAuth: true}
            }
        }).catch((err) => {
            console.log(err)
            openNotificationWithIcon('error', 'Error', err)
        }).finally(() => {
                thunkAPI.dispatch(initializeApp())
                thunkAPI.dispatch(setAppStatus({status: 'idle'}))
            }
        )
    })

const appSlice = createSlice({
    name: 'appSlice',
    initialState: {
        isInitialized: false,
        isAuth: false,
        status: 'idle',
        error: null,
    },
    reducers: {
        initializeApp(state) {
            state.isInitialized = true
        },
        setAppStatus(state, action: PayloadAction<{ status: RequestStatusType }>) {
            state.status = action.payload.status
        },
    },
    extraReducers: (builder) => {
        builder.addCase(logOutTC.fulfilled, (state, action) => {
            if (action.payload) state.isAuth = action.payload.isAuth
        })
        builder.addCase(initializeAppTC.fulfilled, (state, action) => {
            if (action.payload) state.isAuth = action.payload.isAuth
        })
    }
})


const {initializeApp, setAppStatus} = appSlice.actions

export default appSlice.reducer