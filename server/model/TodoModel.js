import fs from "node:fs/promises"
import { v4 as uuidv4 } from "uuid";

const File_Path = "./data/todos.json"

export let todos = [];

const _setUp = async () => {
    const buffer = await fs.readFile(File_Path)
    const data = JSON.parse(buffer)
    todos = data
}

_setUp();

const _saveTodo = async () => {
    await fs.writeFile(File_Path, JSON.stringify(todos))
} 

// const _getTodobyId = () => {
//     const lastId = todos[todos.length - 1]?.id
//     if(lastId){
//         return lastId + 1
//     }
//     return 1;
// }





const _findEntry = (id) => {
    return todos.findIndex((todo) => todo.id === Number(id))
}


export const addTodo = async (todo) => {
    const newTodo = {...todo, id: uuidv4()}
    todos.push(newTodo)
    await _saveTodo()
    return newTodo
}

export const getOneTodo = (id) => {
    return _findEntry;
} 

export const updateTodo = async (id, todo) => {
    const todoUpdate = _findEntry(id)
    Object.assign(todoUpdate, todo)
    await _saveTodo();
    return todoUpdate;
}

export const deleteTodo = async (id) => {
    const index = todos.findIndex((todo) => todo.id === Number(id));
    todos.splice(index, 1)
    await _saveTodo()
} 