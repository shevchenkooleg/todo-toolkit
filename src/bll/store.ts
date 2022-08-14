// import {TypedUseSelectorHook, useDispatch, useSelector} from "react-redux";
// import {ThunkAction, ThunkDispatch} from "redux-thunk";
// import {applyMiddleware, combineReducers, createStore} from 'redux'
// import thunkMiddleware from 'redux-thunk'
// import {appReducer} from "./appReducer";
// import {todoListReducer} from "./todoListReducer";
// import { taskReducer } from "./taskReducer";


// const rootReducer = combineReducers({
//         appReducer: appReducer,
//         todoListReducer: todoListReducer,
//         taskReducer: taskReducer,
//     }
// )


// export type AppStateType = ReturnType<typeof rootReducer>
// export type RootReducerType = any
// export type AppThunk<T = void> = ThunkAction<T, AppStateType, unknown, RootReducerType>

// export const useAppSelector: TypedUseSelectorHook<AppStateType> = useSelector
// export const useAppDispatch = () => useDispatch<ThunkDispatch<AppStateType, unknown, RootReducerType>>()

// export const store = createStore(rootReducer, applyMiddleware(thunkMiddleware));

//@ts-ignore
// window.store = store;

export default () => {}