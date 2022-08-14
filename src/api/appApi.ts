import axios from 'axios'

const instance = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.1',
    withCredentials: true,
    headers: {
        'API-KEY': '9afce5af-6c20-442a-857e-f0199432fe57'
    }
})

export const AppAPI = {
    me(){
        return instance.get('/auth/me')
    },
    logIn(email: string, password: string, rememberMe: boolean){
        return instance.post('auth/login', {email, password, rememberMe})
    },
    logOut(){
        return instance.delete('auth/login')
    }
}


export const ToDoAPI = {
    getToDos(){
        return instance.get('/todo-lists')
    },
    addNewToDo(newTodoListTitle: string){
        return instance.post('/todo-lists', {title:newTodoListTitle})
    },
    removeToDo(todolistId: string){
        return instance.delete(`/todo-lists/${todolistId}`)
    },
    changeToDoTitle(todolistId: string, newTitle: string){
        return instance.put(`/todo-lists/${todolistId}`, {title: newTitle})
    }
}


export const TaskAPI = {
    getTask(todoListId: string){
        return instance.get(`/todo-lists/${todoListId}/tasks`)
    },
    addTask(data: {todoListId: string, newTaskTitle: string}){
        return instance.post(`/todo-lists/${data.todoListId}/tasks`, {title: data.newTaskTitle})
    },
    removeTask(data: {todoListId: string, taskId: string}){
        return instance.delete(`/todo-lists/${data.todoListId}/tasks/${data.taskId}`)
    },
    updateTask(todoListId: string, taskId: string, data: {}){
        return instance.put(`/todo-lists/${todoListId}/tasks/${taskId}`, data)
    }
}