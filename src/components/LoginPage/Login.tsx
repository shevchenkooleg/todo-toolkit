import React from 'react';
import {useFormik} from "formik";
import {Button, Input } from 'antd';
import s from './Login.module.css'
import {LoginValidationSchema} from "../../utils/validators/validators";
import {openNotificationWithIcon} from "../../utils/notification/notification";
import { Navigate } from 'react-router-dom';
import {useAppDispatch, useAppSelector } from '../../store/toolkitStore';
import { loginTC } from '../../store/appSlice';

const Login = () => {

    const dispatch = useAppDispatch()
    const isAuth = useAppSelector(state=>state.app.isAuth)

    const formik = useFormik({
        initialValues: {
            login: '',
            password: '',
            rememberMe: false
        },
        validationSchema: LoginValidationSchema,
        onSubmit: (values, actions) => {
            dispatch(loginTC({email: values.login, password: values.password, rememberMe: values.rememberMe}))
            actions.resetForm({values:{login:'', password:'',rememberMe:false}})

        }
    })

    const errorHandler = () => {
        if (!!formik.errors.login && formik.touched.login && formik.errors.login) {
            openNotificationWithIcon('error', 'Incorrect login', formik.errors.login)}
        if (!!formik.errors.password && formik.touched.password && formik.errors.password) {
        openNotificationWithIcon('error', 'Incorrect password', formik.errors.password)}
    }
    if (isAuth) {
        return <Navigate to={'/'}/>
    }

    return (
        <div className={s.container}>
            <form onSubmit={formik.handleSubmit} >
                <div className={s.form}>
                    <label htmlFor="login">Email Address </label>
                    <Input
                        id="login"
                        name="login"
                        type="email"
                        onChange={formik.handleChange}
                        status={!!formik.errors.login && formik.touched.login ? 'error' : ''}
                        placeholder={formik.touched.login ? formik.errors.login : ''}
                        value={formik.values.login}
                        style={{width:'200px'}}
                    />



                    <label htmlFor="password">Password </label>
                    <Input.Password
                        id="password"
                        name="password"
                        type="password"
                        onChange={formik.handleChange}
                        value={formik.values.password}
                        style={{width:'200px'}}
                        status={!!formik.errors.password && formik.touched.password ? 'error' : ''}
                        placeholder={formik.touched.password ? formik.errors.password : ''}
                    />



                    <label htmlFor="password">Remember me? </label>
                    <Input
                        id="rememberMe"
                        name="rememberMe"
                        type="checkbox"
                        onChange={formik.handleChange}
                        value={formik.values.password}
                    />
                </div>
                <Button htmlType='submit' onClick={errorHandler}>Submit</Button>

            </form>
        </div>

    );
};

export default Login;