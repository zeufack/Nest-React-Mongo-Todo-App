import {
    TODO_LIST_FAIL,
    TODO_LIST_REQUEST,
    TODO_LIST_SUCCESS,
    TODO_SAVE_FAIL,
    TODO_SAVE_REQUEST,
    TODO_SAVE_SUCCESS,
    TODO_TOGGLE_REQUEST,
    TODO_TOGGLE_SUCCESS,
    TODO_TOGGLE_FAIL,
    REODER_ITEMS
} from "../actions/action.type";

function todoListReducer(state = { todos: [] }, action: any) {
    switch (action.type) {
        case TODO_LIST_REQUEST:
            return { loading: true };
        case TODO_LIST_SUCCESS:
            return { loading: false, todos: action.payload };
        case TODO_LIST_FAIL:
            return { loading: false, error: action.payload };
        default:
            return state;
    }
}

function todoSaveReducer(state = { todos: [] }, action: any) {
    switch (action.type) {
        case TODO_SAVE_REQUEST:
            return { loading: true };
        case TODO_SAVE_SUCCESS:
            return { loading: false, success: true, todos: action.payload };
        case TODO_SAVE_FAIL:
            return { loading: false, success: false, error: action.payload };
        default:
            return state;
    }
}

function reorderItemReducer(state = { todos: [] }, action: any) {
    switch (action.type) {
        case REODER_ITEMS:
            const items = Array.from(state.todos);
            const [reorderedItem] = items.splice(action.payload.source.index, 1);
            items.splice(action.payload.destination.index, 0, reorderedItem);

            return { todo: { ...items } };

        default:
            return state;
    }
}

function todoToggleReducer(state: any, action: any) {
    switch (action.type) {
        case TODO_TOGGLE_REQUEST:
            console.log('toggle request');
            return { loading: true }
        case TODO_TOGGLE_SUCCESS:
            console.log('toggle success');
            return state.map((todo: any) =>
                (todo.id === action.id)
                    ? { ...todo, completed: !todo.completed }
                    : todo
            )
        case TODO_TOGGLE_FAIL:
            return { loading: false, success: false, error: action.payload };

        default:
            return [];
    }
}


export { todoListReducer, todoSaveReducer, todoToggleReducer, reorderItemReducer };




// import { ADD_TODO, TOGGLE_TODO } from "../actions/action.type";

// const initialState = {
//     allIds: [],
//     byIds: {}
// };

// export default function (state = initialState, action: any) {
//     switch (action.type) {
//         case ADD_TODO: {
//             const { id, content } = action.payload;
//             return {
//                 ...state,
//                 allIds: [...state.allIds, id],
//                 byIds: {
//                     ...state.byIds,
//                     [id]: {
//                         content,
//                         completed: false
//                     }
//                 }
//             };
//         }
//         case TOGGLE_TODO: {
//             const { id } = action.payload;
//             return {
//                 ...state,
//                 byIds: {
//                     ...state.byIds,
//                     // [id]: {
//                     //     ...state.byIds[id],
//                     //     completed: !state.byIds[id].completed
//                     // }
//                 }
//             };
//         }
//         default:
//             return state;
//     }
// }
