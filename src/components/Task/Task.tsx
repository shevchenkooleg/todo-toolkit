import {Button, Checkbox, Input} from 'antd';
import React, {ChangeEvent, useState} from 'react';
import s from './Task.module.css'
import {DeleteOutlined} from "@ant-design/icons";
import {CheckboxChangeEvent} from "antd/es/checkbox";
import {createDataObj} from "../../utils/createDataObjForTasksUpdate";
import {removeTask, TaskType, updateTaskTC } from '../../store/taskSlice';
import { useAppDispatch } from '../../store/toolkitStore';

type TaskPropsType = {
    task: TaskType
}



const Task = (props: TaskPropsType) => {

    const dispatch = useAppDispatch()
    const [edit, setEdit] = useState(false)
    const [title, setTitle] = useState(props.task.title)

    const removeTaskHandler = () => {
        dispatch(removeTask(props.task.todoListId, props.task.id))
    }
    const onCheckBoxClickHandler = (e: CheckboxChangeEvent) => {
        dispatch(updateTaskTC(props.task.todoListId, props.task.id, createDataObj(props.task)))
    }
    const editTaskTitleHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }
    const editTaskTitleModeOn = () => {
        setEdit(true)
    }
    const editTaskTitleModeOff = () => {
        if (title !== props.task.title){
            dispatch(updateTaskTC(props.task.todoListId, props.task.id, {title}))
            setEdit(false)
        } else {
            setEdit(false)
        }
    }

    return (
        <div className={s.taskContainer}>
            <Checkbox onChange={onCheckBoxClickHandler} checked={props.task.status === 0 ? false : true}></Checkbox>
            <div className={s.taskTitle}>
                {edit
                    ? <Input value={title} autoFocus={true} onChange={editTaskTitleHandler} onBlur={editTaskTitleModeOff}/>
                    : <ul className={s.titleToDo} onDoubleClick={editTaskTitleModeOn}>{props.task.title}</ul>
                }
            </div>
            <Button icon={<DeleteOutlined />} size={"middle"} type={"text"} onClick={removeTaskHandler}/>
        </div>
    );
};

export default Task;