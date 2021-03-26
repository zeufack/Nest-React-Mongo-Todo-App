import {
    ADD_TODO,
    SET_FILTER,
    TODO_LIST_REQUEST,
    TODO_LIST_SUCCESS,
    TODO_LIST_FAIL,
    TODO_TOGGLE_REQUEST,
    TODO_TOGGLE_FAIL,
    TODO_TOGGLE_SUCCESS,
    REODER_ITEMS
} from "./action.type";

import { getAll } from "../todo.service";

let nextTodoId = 0;


export const listTodos = () => async (dispatch: any) => {
    try {
        dispatch({ type: TODO_LIST_REQUEST });
        const { data } = await getAll();
        dispatch({ type: TODO_LIST_SUCCESS, payload: data });
    } catch (error) {
        dispatch({ type: TODO_LIST_FAIL, payload: error.message })
    }

}



export const toggleTodo = (id: any, dispatch: any) => {

    try {
        dispatch({ type: TODO_TOGGLE_REQUEST });
        // call api 
        dispatch({ type: TODO_TOGGLE_SUCCESS, payload: id });
        console.log('toggle action');
    } catch (error) {
        dispatch({ type: TODO_TOGGLE_FAIL, payload: error.message });
    }


}

export const addTodo = (content: any) => {
    return ({
        type: ADD_TODO,
        payload: content
    });
};

export const reOrderItem = (source: any, destination: any) => ({
    type: REODER_ITEMS,
    payload: {
        source,
        destination
    }
})

// export const toggleTodo = (id: any) => (dispatch: any) => ({
//     type: TOGGLE_TODO,
//     payload: { id }
// });

export const setFilter = (filter: any) => ({ type: SET_FILTER, payload: { filter } });
