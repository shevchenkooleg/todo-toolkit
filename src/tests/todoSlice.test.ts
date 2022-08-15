import { v1 } from "uuid";
import {addTodoListTC, changeTodoListTitleTC, getTodoListsTC, removeTodoListTC, ToDoListType} from "../store/todoSlice";
import todoListsReducer from "../store/todoSlice"

test('correct todolist should be removed', () => {
    let todolistId1 = v1();
    let todolistId2 = v1();

    const startState: {todos: Array<ToDoListType>} = {todos: [
        {id: todolistId1, title: "What to learn", addedDate:"2022-08-09T19:09:11.43", order:-1},
        {id: todolistId2, title: "What to buy", addedDate:"2022-07-21T06:12:43.05", order:0}
    ]}

    const endState = todoListsReducer(startState, removeTodoListTC.fulfilled({todolistId: todolistId1}, '', {todolistId: todolistId1}))

    expect(endState.todos.length).toBe(1);
    expect(endState.todos[0].id).toBe(todolistId2);
});


test('correct todolist should be added', () => {
    let todolistId1 = v1();
    let todolistId2 = v1();
    let todolistId3 = v1();

    let newTodoListData ={id: todolistId3, title: "New Title", addedDate:"2022-08-09T19:09:11.43", order:-2};

    const startState: {todos: Array<ToDoListType>} = {todos: [
            {id: todolistId1, title: "What to learn", addedDate:"2022-08-09T19:09:11.43", order:-1},
            {id: todolistId2, title: "What to buy", addedDate:"2022-07-21T06:12:43.05", order:0}
        ]}

    const endState = todoListsReducer(startState, addTodoListTC.fulfilled({data: newTodoListData}, '', {newTodoListTitle: newTodoListData.title}))

    expect(endState.todos.length).toBe(3);
    expect(endState.todos[2].title).toBe("What to buy");
    expect(endState.todos[2].id).toBeDefined();
});

test('correct todolist should change its name', () => {
    let todolistId1 = v1();
    let todolistId2 = v1();

    let newTodolistTitle = "New Todolist";

    const startState: {todos: Array<ToDoListType>} = {todos: [
            {id: todolistId1, title: "What to learn", addedDate:"2022-08-09T19:09:11.43", order:-1},
            {id: todolistId2, title: "What to buy", addedDate:"2022-07-21T06:12:43.05", order:0}
        ]}


    const action = changeTodoListTitleTC.fulfilled({id: todolistId2, newTitle: newTodolistTitle},'', {todoListId: todolistId2, newTitle: newTodolistTitle});

    const endState = todoListsReducer(startState, action);

    expect(endState.todos[0].title).toBe("What to learn");
    expect(endState.todos[1].title).toBe(newTodolistTitle);
});

test('todos data Array must set in state correct', ()=>{
    let todolistId1 = v1();
    let todolistId2 = v1();
    let todolistId3 = v1();

    let responseData = [
        {id: todolistId3, title: "What to learn", addedDate:"2022-08-09T19:09:11.43", order:0},
        {id: todolistId2, title: "What to buy", addedDate:"2022-07-21T06:12:43.05", order:-1},
        {id: todolistId1, title: "What to eat", addedDate:"2022-07-21T06:12:43.05", order:-2},
    ]
    const startState: {todos: Array<ToDoListType>} = {todos: []}

    const action = getTodoListsTC.fulfilled({data: responseData}, '');
    const endState = todoListsReducer(startState, action);
    expect(endState.todos[0].title).toBe("What to learn")
    expect(endState.todos.length).toBe(3)
    expect(endState.todos[2].id).toBe(todolistId1)
})
