import {CloseCircleOutlined, DeleteOutlined, PlusOutlined } from '@ant-design/icons';
import { Button, Input, Segmented } from 'antd';
import React, {ChangeEvent, useEffect, useState} from 'react';
import {addTask, getTasks, setNewTaskTitleValue, TaskType } from '../../store/taskSlice';
import {changeTodoListTitle, removeTodoListTC } from '../../store/todoSlice';
import { useAppDispatch, useAppSelector } from '../../store/toolkitStore';
import Task from '../Task/Task';
import s from './TodoList.module.css'

type TodoListPropsType = {
    id:string
}
type TaskFilterType = string


const TodoList = (props:TodoListPropsType) => {

    const dispatch = useAppDispatch()
    // const newTaskTitle = useAppSelector((state)=>state.taskReducer[props.id].newTaskTitle)
    const newTaskTitle = useAppSelector((state)=>state.tasks[props.id].newTaskTitle)
    // const todoList = useAppSelector((state)=>state.todoListReducer.find((t)=>t.id === props.id))
    const todoList = useAppSelector((state)=>state.todos.todos.find((t)=>t.id === props.id))
    // const tasks = useAppSelector((state)=>state.taskReducer[props.id].tasks)
    const tasks = useAppSelector((state)=>state.tasks[props.id].tasks)
    const [filter, setFilter] = useState<string | number>('All');
    const [edit, setEdit] = useState(false)
    const [title,setTitle] = useState(todoList ? todoList.title : '')

    useEffect(()=>{
        dispatch(getTasks(props.id))
    },[todoList, dispatch, props.id])




    const onTitleChangeHandler = (e:ChangeEvent<HTMLInputElement>) => {
        dispatch(setNewTaskTitleValue({todoListId: props.id, newValue: e.currentTarget.value}))
    }
    const addNewTaskButtonHandler = () => {
        if (newTaskTitle.trim() !== '') {
            dispatch(addTask(props.id, newTaskTitle))
        }
    }
    const removeTodoListHandler = () => {
        dispatch(removeTodoListTC(props.id))
    }

    const editModeON = () => {
        setEdit(true)
    }

    const editModeOFF = ()=>{
        if (todoList && title !== todoList.title){
            dispatch(changeTodoListTitle(props.id, title))
            setEdit(false)
        } else {
            setEdit(false)
        }
    }

    const editTodoListTitleHandler = (e:ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }

    const filteredTask = (tasks: Array<TaskType>, filter: TaskFilterType) => {
        switch (filter){
            case "All":
                return tasks.filter(el=>el.status === 1 || el.status === 0)
            case "Done":
                return tasks.filter(el=>el.status === 1)
            case "InProgress":
                return tasks.filter(el=>el.status === 0)
            default:
                return tasks
        }
    }

    return (
        <div className={s.container}>
            <div className={s.title}>
                {todoList !== undefined && !edit && <h2 onDoubleClick={editModeON}>{todoList.title}</h2>}
                {todoList !== undefined && edit && <input onChange={editTodoListTitleHandler} autoFocus={true} onBlur={editModeOFF} value={title}/>}


                <Button className={s.deleteButton} icon={<CloseCircleOutlined />} size={"large"} type={"text"}
                        onClick={removeTodoListHandler} style={{margin: '0 0 0 10px'}} shape="circle"/>
            </div>
            <div className={s.addTaskBlock}>
                <Input placeholder="Add new task" style={{width: '80%'}} value={newTaskTitle} onChange={onTitleChangeHandler}/>
                <Button icon={<PlusOutlined />} size={"middle"} onClick={addNewTaskButtonHandler}/>
            </div>
            {tasks && filteredTask(tasks, filter.toString()).map((task)=>{
                return <Task key={task.id} task={task}/>
            })}
            <div className={s.filterBlock}>
                <Segmented options={['All', 'InProgress', 'Done']} value={filter} onChange={setFilter} />
            </div>

        </div>
    );
};

export default TodoList;