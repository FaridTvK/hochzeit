import express from "express";
import { todos, addTodo, deleteTodo, updateTodo } from "./model/TodoModel.js"
import cors from "cors"
const app = express()
// es wird als default Port eingesetz, falls der Port nicht funktioniert hat.
const PORT = process.env.Port || 3001;

app.use(express.json())
app.use(cors())

// app.use((express.static("../front-end/build")))


app.get("/todos", (req, res) => {
    res.send(todos)
})

app.post("/todos", async (req, res) => {
    const todo = req.body
    const newTodo = await addTodo(todo)
    res.send(newTodo)
})

app.put("/todos/:id", async (req, res) => {
    const { id } = req.params;
    const todo = req.body
    const updatedTodo = await updateTodo(id, todo)
    res.send(updatedTodo)
})

app.delete("/todos/:id", (req, res) => {
    const { id } = req.params;
    console.log(id)
    deleteTodo(id)
    res.send("it has deleted")
})



app.listen(PORT, () => console.log(`Server is am laufen mit diesem Port ${PORT}`))