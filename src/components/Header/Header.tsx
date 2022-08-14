import { LogoutOutlined } from '@ant-design/icons';
import { Button } from 'antd';
import React from 'react';
import { logOutTC } from '../../store/appSlice';
import { useAppDispatch, useAppSelector } from '../../store/toolkitStore';
import s from './Header.module.css'


const Header = () => {

    const dispatch = useAppDispatch()
    const isAuth = useAppSelector(state=>state.app.isAuth)
    const logOutButtonHandler = () => {
        dispatch(logOutTC())
    }

    return (
        <div className={s.container}>
            My_TODO-APP
            {isAuth && <Button className={s.logOutBtn}
                               type={'default'}
                               shape="round"
                               icon={<LogoutOutlined />}
                               size={'middle'}
                               onClick={logOutButtonHandler}
            >{}</Button>}

        </div>
    );
};

export default Header;