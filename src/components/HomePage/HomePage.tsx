import React from 'react';
import AddItem from "../AddItem/AddItem";
import TodoList from "../Todolist/TodoList";
import Loader from "../Loader/Loader";
import s from './HomePage.module.css'
import { useAppSelector } from '../../store/toolkitStore';

const HomePage = () => {


    const isInitialized = useAppSelector(state => state.app.isInitialized)

    const todoLists = useAppSelector((state) => state.todos.todos)

    return (
        <>
            {isInitialized ?
                <>
                    <AddItem/>
                    <div className={s.appTodo}>
                        {todoLists.map((todo) => {
                            return <TodoList id={todo.id} title={todo.title} key={todo.id}/>
                        })}
                    </div>
                </> :
                <>
                    <Loader/>
                </>
            }
        </>
    );
};

export default HomePage;