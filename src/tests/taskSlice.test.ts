import {v1} from 'uuid'
import taskReducer, {getTasks, setNewTaskTitleValue} from '../store/taskSlice'
import {addTodoListTC, getTodoListsTC, removeTodoListTC} from "../store/todoSlice";

const todoListId1 = v1()
const todoListId2 = v1()

const taskTestDataSet = {
    [todoListId1]: {
        newTaskTitle: '',
        tasks: [
            {
                addedDate: "2022-08-09T19:09:11.43",
                deadline: "2022-08-09T19:09:11.43",
                description: "",
                id: v1(),
                order: 0,
                priority: 2,
                startDate: "2022-08-09T19:09:11.43",
                status: 0,
                title: 'Learn JS',
                todoListId: todoListId1,
            },
            {
                addedDate: "2022-08-09T19:09:11.43",
                deadline: "2022-08-09T19:09:11.43",
                description: "",
                id: v1(),
                order: 0,
                priority: 1,
                startDate: "2022-08-09T19:09:11.43",
                status: 0,
                title: 'Learn Redux Toolkit',
                todoListId: todoListId1,
            }
        ]
    },
    [todoListId2]: {
        newTaskTitle: '',
        tasks: [
            {
                addedDate: "2022-08-09T09:19:12.43",
                deadline: "2022-08-09T09:19:12.43",
                description: "",
                id: v1(),
                order: 0,
                priority: 5,
                startDate: "2022-08-09T09:19:12.43",
                status: 0,
                title: 'Ride to the sea',
                todoListId: todoListId2,
            }
        ]
    }
}


test('tasksDataArray should be set', () => {

    const taskDataArray = [{...taskTestDataSet[todoListId1].tasks[0]}, {...taskTestDataSet[todoListId1].tasks[1]}]

    const startState = {}
    const endState = taskReducer(startState, getTasks.fulfilled({
        id: todoListId1,
        data: taskDataArray
    }, '', {todoListId: todoListId1}))
    expect(endState[todoListId1].tasks[0].title).toBe('Learn JS')
    expect(endState[todoListId1].tasks[1].title).toBe('Learn Redux Toolkit')
    expect(endState[todoListId1].newTaskTitle).toBe('')
})

test('preset for the new todolist should be added', () => {

    const todoListId3 = v1()
    const payloadData = {
        addedDate: "2022-08-15T06:43:12.6431525Z",
        id: todoListId3,
        order: -4,
        title: "1234",
    }
    const startState = {...taskTestDataSet,
        [todoListId1]:{...taskTestDataSet[todoListId1], tasks: [...taskTestDataSet[todoListId1].tasks]},
        [todoListId2]:{...taskTestDataSet[todoListId2], tasks: [...taskTestDataSet[todoListId2].tasks]},
    }

    const endState = taskReducer(startState, addTodoListTC.fulfilled({data: payloadData}, '', {newTodoListTitle: payloadData.title}))
    expect(endState[todoListId3].tasks.length).toBe(0)
    expect(endState[todoListId3].newTaskTitle).toBe('')
})

test('preset for downloaded todolist should be added', () => {
    const todoListId3 = v1()
    const todoListId4 = v1()

    const payloadData = [
        {
            addedDate: "2022-08-15T06:43:12.6431525Z",
            id: todoListId3,
            order: -4,
            title: "111",
        },
        {
            addedDate: "2022-08-15T06:43:12.6431525Z",
            id: todoListId4,
            order: -4,
            title: "222",
        }]
    const startState = {...taskTestDataSet,
        [todoListId1]:{...taskTestDataSet[todoListId1], tasks: [...taskTestDataSet[todoListId1].tasks]},
        [todoListId2]:{...taskTestDataSet[todoListId2], tasks: [...taskTestDataSet[todoListId2].tasks]},
    }

    const endState = taskReducer(startState, getTodoListsTC.fulfilled({data: payloadData}, ''))
    expect(endState[todoListId1].tasks.length).toBe(2)
    expect(endState[todoListId2].tasks.length).toBe(1)
    expect(endState[todoListId3].tasks).toBeDefined()
    expect(endState[todoListId3].tasks.length).toBe(0)
    expect(endState[todoListId4].tasks).toBeDefined()
    expect(endState[todoListId4].tasks.length).toBe(0)
    expect(endState[todoListId3].newTaskTitle).toBe('')
    expect(endState[todoListId4].newTaskTitle).toBe('')
})

test('correct todolist should be remove', () => {
    const startState = {...taskTestDataSet,
        [todoListId1]:{...taskTestDataSet[todoListId1], tasks: [...taskTestDataSet[todoListId1].tasks]},
        [todoListId2]:{...taskTestDataSet[todoListId2], tasks: [...taskTestDataSet[todoListId2].tasks]},
    }
    const endState = taskReducer(startState, removeTodoListTC.fulfilled({todolistId: todoListId1}, '', {todolistId: todoListId1}))
    expect(endState[todoListId1]).toBeUndefined()
    expect(endState[todoListId2]).toBeDefined()
    expect(endState[todoListId2].tasks[0].title).toBe('Ride to the sea')
})

test('new task title value should be set', ()=>{
    const startState = {...taskTestDataSet,
        [todoListId1]:{...taskTestDataSet[todoListId1], tasks: [...taskTestDataSet[todoListId1].tasks]},
        [todoListId2]:{...taskTestDataSet[todoListId2], tasks: [...taskTestDataSet[todoListId2].tasks]},
    }
    const endState = taskReducer(startState, setNewTaskTitleValue({todoListId: todoListId2, newValue: 'bla-bla'}))
    expect(endState[todoListId1].newTaskTitle).toBe('')
    expect(endState[todoListId2].newTaskTitle).toBe('bla-bla')
})

