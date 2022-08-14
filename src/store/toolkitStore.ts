import { configureStore } from "@reduxjs/toolkit";
import todoReducer from './todoSlice'
import {TypedUseSelectorHook, useDispatch, useSelector} from "react-redux";
import {ThunkDispatch} from "redux-thunk";
import appSlice from "./appSlice";
import taskSlice from "./taskSlice";
import thunkMiddleware from 'redux-thunk';


export const store = configureStore({
    reducer: {
        todos: todoReducer,
        tasks: taskSlice,
        app: appSlice,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().prepend(thunkMiddleware)
});


// export type AppDispatch = typeof store.dispatch
export type AppStateType = ReturnType<typeof store.getState>



export const useAppSelector: TypedUseSelectorHook<AppStateType> = useSelector
export const useAppDispatch = () => useDispatch<ThunkDispatch<AppStateType, unknown, RootReducerType>>()
export type RootReducerType = any

//@ts-ignore
window.store = store;