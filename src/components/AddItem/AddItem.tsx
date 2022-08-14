import {PlusOutlined} from '@ant-design/icons';
import {Button, Input} from 'antd';
import React, {ChangeEvent, useState} from 'react';
import { addTodoListTC } from '../../store/todoSlice';
import { useAppDispatch } from '../../store/toolkitStore';
import s from './AddItem.module.css'


const AddItem = () => {

    const dispatch = useAppDispatch()
    const [newTodoTitle, setNewTodoTitle] = useState('')

    const onNewTodoTitleChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setNewTodoTitle(e.currentTarget.value)
    }
    const addTodoListHandler = () => {
        if (newTodoTitle.trim() !== '') {
            dispatch(addTodoListTC(newTodoTitle))
            setNewTodoTitle('')
        }
    }

    return (
        <div className={s.container}>
            <Input size={"small"} placeholder="Add new TODO" style={{margin: '0 15px 0 0'}}
                   value={newTodoTitle} onChange={onNewTodoTitleChangeHandler}/>
            <Button icon={<PlusOutlined/>} size={"middle"} onClick={addTodoListHandler}/>
        </div>
    );
};

export default AddItem;