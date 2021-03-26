import axios from 'axios';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addTodo, listTodos } from '../../todo/actions/todo.action';
import './TodoInput.css';



function TodoInput(): JSX.Element {
    const todoList = useSelector((state: any) => state.todoList);
    const SERVER_URL = 'http://localhost:5000/todo';
    const { todos } = todoList;
    const dispatch = useDispatch();
    let createdTask: string;
    const updateInput = (task: string) => {
        createdTask = task;
    }

    const handleAddTodo = (event: any) => {
        if (event.key === "Enter") {
            if (createdTask !== undefined && createdTask.length !== 0) {
                const index = todos.length + 1;
                const task = { isCompleted: false, description: createdTask, index: index }
                console.log(task);
                const data = axios.post(SERVER_URL, task);
                dispatch(addTodo(data));
            }
        }
    };


    return (
        <div className="todo-input-wrapper">
            <div className="input-icon"></div>
            <input
                type="text"
                id="todo-input"
                name="todo-input"
                placeholder="Créer une nouvelle tâche"
                onChange={e => updateInput(e.target.value)}
                onKeyPress={handleAddTodo}
            />
        </div>)
}

export default TodoInput