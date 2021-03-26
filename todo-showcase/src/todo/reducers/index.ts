import { combineReducers } from 'redux';
import visibilityFilter from "./visibilityFilter.reducer";
import { todoListReducer, todoToggleReducer, reorderItemReducer } from "./todo.reducer";

export default combineReducers({
    todoList: todoListReducer,
    visibility: visibilityFilter,
    todoToggle: todoToggleReducer,
    reOrderItem: reorderItemReducer
});
