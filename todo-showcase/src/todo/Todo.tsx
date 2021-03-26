import React, { useEffect, useState } from 'react';
import './Todo.css';
import TodoList from '../components/todo-list-component/TodoList.component';
import { DragDropContext } from 'react-beautiful-dnd';
import { useDispatch, useSelector } from 'react-redux';
import { listTodos, setFilter } from './actions/todo.action';
import axios from 'axios';


function Todo(): JSX.Element {

    const todoList = useSelector((state: any) => state.todoList);
    const visibility = useSelector((state: any) => state.visibility);
    const [tasks, setTasks] = useState([]);
    const [inputData, updateInputData] = useState('');
    const [load, setLoad] = useState(true);
    const [numActiveTask, updateNnumActiveTasks] = useState(0);
    const SERVER_URL = 'http://localhost:5000/todo/';

    const dispatch = useDispatch()
    const { todos, loading, error } = todoList;


    useEffect(() => {
        const getTasks = async () => {
            await fetchTasks();
        }
        getTasks();

        dispatch(listTodos());
        return () => {
        }
    }, [dispatch]);


    // let createdTask: string;
    const updateInput = (task: string) => {
        updateInputData(task);
    }

    const handleAddTodo = async (event: any) => {
        if (event.key === "Enter") {
            if (inputData !== undefined && inputData.length !== 0) {
                const index = tasks.length + 1;
                const task = { isCompleted: false, description: inputData, index: index }
                const data = await axios.post(SERVER_URL, task);
                updateInputData('');
                fetchTasks()
            }
        }
    };

    const fetchTasks = async () => {
        const response = await axios.get(SERVER_URL);
        const data = await response.data;
        const activeTask = data.filter((task: any) => !task.isCompleted).length;
        updateNnumActiveTasks(activeTask);
        setTasks(data);
    }


    const handleCompleted = async (id: string, isCompleted: boolean) => {
        const updatedData = {
            isCompleted: !isCompleted
        }
        await axios.patch(SERVER_URL + id, updatedData);
        fetchTasks();
    }

    const handleDeleted = async (id: string) => {
        await axios.delete(SERVER_URL + id);
        fetchTasks();
    }

    const handleOnDragEnd = (result: any) => {
        const { destination, source, draggableId } = result;
        if (!destination) return;

        if (
            destination.droppableId === source.droppableId && destination.index === source.index
        ) {
            return;
        }
        const items = Array.from(tasks);
        const [reorderedItem] = items.splice(result.source.index, 1);
        items.splice(result.destination.index, 0, reorderedItem);
        setTasks(items);
    }


    const handleFilter = (filter: string) => {
        dispatch(setFilter(filter))
    }

    const handleDeleteCompletedTask = () => {
        const completedTaskIds = tasks.filter((taks: any) => taks.isCompleted);
        completedTaskIds.forEach((task: any) => handleDeleted(task._id));
    }

    const handleCompleteAll = () => {
        const completedTaskIds = tasks.filter((taks: any) => !taks.isCompleted);
        completedTaskIds.forEach((task: any) => handleCompleted(task._id, false));
    }



    return (
        <div className="App">
            <div className="main-wrapper">
                <div className="main-wrapper-content">
                    <div className="todo-wrapper">
                        <div className="todo-header padding-bottom">
                            <div className="todo-title">TODO</div>
                        </div>
                        <div className="todo-containt">
                            <div className="todo-input-wrapper">
                                <div className="input-icon" onClick={handleCompleteAll}></div>
                                <input
                                    type="text"
                                    id="todo-input"
                                    name="todo-input"
                                    placeholder="Créer une nouvelle tâche"
                                    onChange={e => updateInput(e.target.value)}
                                    onKeyPress={handleAddTodo}
                                    value={inputData}
                                />
                            </div>
                            <DragDropContext onDragEnd={handleOnDragEnd}>
                                <div className="todo-list-wrapper margin-top padding-bottom">
                                    {
                                        loading ? <div>loading </div> : error ? <div> {error}</div> : <TodoList
                                            handleCompleted={handleCompleted}
                                            handleDeleted={handleDeleted}
                                            data={tasks}
                                        />
                                    }
                                    <nav className="todo-list-navigation">
                                        <li className="text-bf"> {numActiveTask} tâche(s) restante(s)</li>
                                        <li className={visibility === 'all' ?
                                            "todo-list-ngt-item active text-bf" :
                                            "todo-list-ngt-item text-bf"}
                                            onClick={() => {
                                                handleFilter("all")
                                            }}>Toute(s)</li>
                                        <li className={visibility === 'incomplete' ? "todo-list-ngt-item  text-bf active" : "todo-list-ngt-item text-bf"} onClick={() => {
                                            handleFilter("incomplete")
                                        }} >Active(s)</li>
                                        <li className={visibility === 'completed' ? "todo-list-ngt-item text-bf active" : "todo-list-ngt-item text-bf"} onClick={() => {
                                            handleFilter("completed")
                                        }} >Complète(s)</li>
                                        <li className="todo-list-ngt-item" onClick={() => handleDeleteCompletedTask()}>Effacer les tâches terminées</li>
                                    </nav>

                                    <div className="mobile-nav">
                                        <nav className="navbar mobile-nav-task">
                                            <div className="text-bf" >{numActiveTask} tâche(s) restante(s)</div>
                                            <div className="mobile-nav-task-item" onClick={() => handleDeleteCompletedTask()} >Effacer les tâches terminées</div>
                                        </nav>
                                        <nav className="navbar mobile-nav-actions">
                                            <div className={visibility === 'all' ? "mobile-nav-actions-item text-bf active" : "mobile-nav-actions-item text-bf"} onClick={() => {
                                                handleFilter("all")
                                            }}>Toute(s)</div>
                                            <div className={visibility === 'incomplete' ? "mobile-nav-actions-item text-bf active" : "mobile-nav-actions-item text-bf"} onClick={() => {
                                                handleFilter("incomplete")
                                            }} >Active(s)</div>
                                            <div className={visibility === 'completed' ? "mobile-nav-actions-item text-bf active" : "mobile-nav-actions-item text-bf"} onClick={() => {
                                                handleFilter("completed")
                                            }}  >Complète(s)</div>
                                        </nav>
                                    </div>

                                    <div className="todo-footer">
                                        <p>Faites glisser et deposez pour réorganiser la tâche</p>
                                    </div>
                                </div>
                            </DragDropContext>
                        </div>
                    </div>
                </div>
                <div className="main-wrapper-bg">
                    <div className="main-wrapper-bg-header"></div>
                </div>
            </div>
        </div>
    );
}

export default Todo;