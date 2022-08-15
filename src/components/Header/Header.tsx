import { LogoutOutlined } from '@ant-design/icons';
import { Button } from 'antd';
import React from 'react';
import { logOutTC } from '../../store/appSlice';
import { useAppDispatch, useAppSelector } from '../../store/toolkitStore';
import s from './Header.module.css'


const Header = () => {

    const dispatch = useAppDispatch()
    const isAuth = useAppSelector(state=>state.app.isAuth)
    const status = useAppSelector(state=>state.app.status)
    const logOutButtonHandler = () => {
        dispatch(logOutTC())
    }

    return (
        <div className={s.container}>
            MY_TODO_APP
            {isAuth && <Button className={s.logOutBtn}
                               type={'default'}
                               shape="round"
                               icon={<LogoutOutlined />}
                               size={'middle'}
                               onClick={logOutButtonHandler}
                               disabled={status==='loading'}
            >{}</Button>}

        </div>
    );
};

export default Header;