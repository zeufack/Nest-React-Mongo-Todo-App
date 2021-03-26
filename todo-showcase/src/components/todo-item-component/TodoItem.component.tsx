import React from 'react';
import './TodoItem.css';
import { Draggable } from 'react-beautiful-dnd';

function TodoItem(props: any): JSX.Element {

    

    if (props.isCompleted) {
        return (
            <Draggable draggableId={props.id} index={props.index}>
                {(provided, snapshot) => (
                    <div className="todo-list-item"
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}>
                        <div className="complete" onClick={() => () => props.onCompleted(props.id, props.isCompleted)}>
                            <img src="images/icon-check.svg" alt="" />
                        </div>
                        <p className="completed">{props.description} </p>
                        <div className="icon delete" onClick={() => props.onDeleted(props.id)}>
                            <img src="images/icon-cross.svg" alt="" />
                        </div>
                    </div>
                )}
            </Draggable>
        );
    } {
        return (
            <Draggable draggableId={props.id} index={props.index}>
                {(provided, snapshot) => (
                    <div className="todo-list-item"
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}>
                        <div className="uncomplete" onClick={() => props.onCompleted(props.id, props.isCompleted)}></div>
                        <p>{props.description} </p>
                        <div className="icon delete" onClick={() => props.onDeleted(props.id)}>
                            <img src="images/icon-cross.svg" alt="" />
                        </div>
                    </div>
                )}
            </Draggable>
        );
    }

}

export default TodoItem;