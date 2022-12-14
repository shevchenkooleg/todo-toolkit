import React, {useEffect} from 'react';
import './App.css';
import Header from "./components/Header/Header";
import {Route, Routes } from 'react-router-dom';
import HomePage from "./components/HomePage/HomePage";
import NotFoundPage from "./components/NotFoundPage/NotFoundPage";
import Login from './components/LoginPage/Login';
import RequireAuth from "./hoc/RequireAuth";
import {useAppDispatch, useAppSelector} from './store/toolkitStore';
import { initializeAppTC } from './store/appSlice';
import Loader from "./components/Loader/Loader";


function App() {

    const dispatch = useAppDispatch()
    const status = useAppSelector(state=>state.app.status)

    useEffect(() => {
        dispatch(initializeAppTC())
    }, [dispatch])


    return (
        <>
            {status === 'loading' && <Loader/>}
            <div className="App">
                <Header/>
                <Routes>
                    <Route path={'/'} element={
                        <RequireAuth>
                            <HomePage/>
                        </RequireAuth>
                    }/>
                    <Route path={'/login'} element={<Login/>}/>
                    <Route path={'*'} element={<NotFoundPage/>}/>
                </Routes>
            </div>
        </>


    );
}

export default App;
