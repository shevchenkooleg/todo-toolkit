import { TaskType } from "../store/taskSlice"



export const createDataObj = (task: TaskType) => {
    const newTaskStatus = () => {
        switch(task.status){
            case 1:
                return 0
            case 0:
                return 1
            default: return 0
        }
    }
    console.log({title: task.title, status: newTaskStatus()})
    return {title: task.title, status: newTaskStatus()}
}