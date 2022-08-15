import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {AppAPI} from "../api/appApi";
import {openNotificationWithIcon} from "../utils/notification/notification";
import {getTodoListsTC} from "./todoSlice";


export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'

export const loginTC = createAsyncThunk('appSlice/login',
    async (params: { email: string, password: string, rememberMe: boolean }, thunkAPI) => {
        thunkAPI.dispatch(setAppStatus({status: "loading"}))
        try {
            const res = await AppAPI.logIn(params.email, params.password, params.rememberMe)
            if (res.data.messages[0]) {
                thunkAPI.dispatch(setAppStatus({status: "failed"}))
                openNotificationWithIcon('error', 'Error', res.data.messages[0])
                return thunkAPI.rejectWithValue(null)
            }
            if (res.data.data.userId) {
                thunkAPI.dispatch(setAppStatus({status: "succeeded"}))
                thunkAPI.dispatch(initializeAppTC())
            }
        } catch (error: any) {
            thunkAPI.dispatch(setAppStatus({status: "failed"}))
            openNotificationWithIcon('error', 'Error', error.message)
            return thunkAPI.rejectWithValue(null)
        } finally {
            thunkAPI.dispatch(setAppStatus({status: "idle"}))
        }
    })
export const logOutTC = createAsyncThunk('appSlice/logout',
    async (param, thunkAPI) => {
        thunkAPI.dispatch(setAppStatus({status: "loading"}))
        try {
            const res = await AppAPI.logOut()
            if (res.data.resultCode === 0) {
                thunkAPI.dispatch(setAppStatus({status: "succeeded"}))
                return {isAuth: false}
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
export const initializeAppTC = createAsyncThunk('appSlice/initializeApp',
    async (param, thunkAPI) => {
        thunkAPI.dispatch(setAppStatus({status: 'loading'}))
        try {
            const res = await AppAPI.me()
                if (res.data.messages[0] === 'You are not authorized') {
                    openNotificationWithIcon('error', 'Error', res.data.messages[0])
                    return thunkAPI.rejectWithValue(null)
                } else {
                    thunkAPI.dispatch(getTodoListsTC())
                    return {isAuth: true}
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


export const {initializeApp, setAppStatus} = appSlice.actions

export default appSlice.reducer