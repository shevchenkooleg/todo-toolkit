import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAppSelector } from '../store/toolkitStore';

const RequireAuth = ({children}: any) => {

    const isAuth = useAppSelector(state=>state.app.isAuth)

    if (!isAuth){
        return <Navigate to={'/login'} />
    }

    return children
};

export default RequireAuth;