import React from 'react';
import { Droppable } from 'react-beautiful-dnd';
import { useSelector } from 'react-redux';
import TodoItem from '../todo-item-component/TodoItem.component';
import './TodoList.css';


function TodoList(props: any): JSX.Element {
    const visibility = useSelector((state: any) => state.visibility)
    const data = () => {
        if (visibility === 'all') {
            return props.data;
        } else if (visibility === 'completed') {
            return props.data.filter((item: any) => item.isCompleted)
        } else {
            return props.data.filter((item: any) => !item.isCompleted)
        }
    }
    const todos = data();

    return (
        <Droppable droppableId="todo-list">
            {(provided) => (
                <div className="todo-list" {...provided.droppableProps} ref={provided.innerRef} >
                    {
                        todos.map((task: any, index: any) => (
                            <TodoItem
                                isCompleted={task.isCompleted}
                                description={task.description}
                                key={task._id}
                                id={task._id}
                                index={index}
                                onCompleted={props.handleCompleted}
                                onDeleted={props.handleDeleted}
                            />
                        ))
                    }
                    {provided.placeholder}
                </div>
            )}
        </Droppable>
    );
}

export default TodoList;