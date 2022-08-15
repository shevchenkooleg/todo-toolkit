import {Button, Checkbox, Input} from 'antd';
import React, {ChangeEvent, useState} from 'react';
import s from './Task.module.css'
import {DeleteOutlined} from "@ant-design/icons";
import {createDataObj} from "../../utils/createDataObjForTasksUpdate";
import {removeTask, TaskType, updateTaskTC } from '../../store/taskSlice';
import {useAppDispatch, useAppSelector} from '../../store/toolkitStore';

type TaskPropsType = {
    task: TaskType
}



const Task = (props: TaskPropsType) => {

    const dispatch = useAppDispatch()
    const status = useAppSelector(state=>state.app.status)
    const [edit, setEdit] = useState(false)
    const [title, setTitle] = useState(props.task.title)

    const removeTaskHandler = () => {
        dispatch(removeTask({todoListId: props.task.todoListId, taskId: props.task.id}))
    }
    const onCheckBoxClickHandler = () => {
        dispatch(updateTaskTC({todoListId: props.task.todoListId, taskId: props.task.id, data: createDataObj(props.task)}))
    }
    const onKeyPressHandler = (e: React.KeyboardEvent<HTMLInputElement>): void => {
        if (e.key === "Enter"){
            editTaskTitleModeOff()
        } else if (e.key === "Escape"){
            setTitle(props.task.title)
            setEdit(false)
        }
    }
    const editTaskTitleHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }
    const editTaskTitleModeOn = () => {
        setEdit(true)
    }
    const editTaskTitleModeOff = () => {
        if (title !== props.task.title){
            dispatch(updateTaskTC({todoListId: props.task.todoListId, taskId: props.task.id, data: {title}}))
            setEdit(false)
        } else {
            setEdit(false)
        }
    }

    return (
        <div className={s.taskContainer}>
            <Checkbox onChange={onCheckBoxClickHandler} checked={props.task.status !== 0}></Checkbox>
            <div className={s.taskTitle}>
                {edit
                    ? <Input value={title} autoFocus={true} onChange={editTaskTitleHandler} onBlur={editTaskTitleModeOff} onKeyUp={onKeyPressHandler}/>
                    : <ul className={s.titleToDo} onDoubleClick={editTaskTitleModeOn}>{props.task.title}</ul>
                }
            </div>
            <Button icon={<DeleteOutlined />} size={"middle"} type={"text"} onClick={removeTaskHandler} disabled={status==='loading'}/>
        </div>
    );
};

export default Task;