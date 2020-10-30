import {ACTIONS} from './action';

const {
    GET_TODOS_LOADING,
    GET_TODOS_SUCCESS,
    GET_TODOS_ERROR,
    GET_TODOS_REFRESH
} = ACTIONS;

const initialState = {
    todosLoading: false,
    todosSuccess: false,
    todosSuccessMessage:'',
    todos:[],
    todosError: false,
    todosErrorMessage: ''
}

const tableReducer = (state=initialState, action) => {
switch(action.type) {
case GET_TODOS_LOADING:
    return {
        ...state,
        todosLoading: true
    }
case GET_TODOS_SUCCESS:
    return {
        ...state,
        todosLoading: false,
        todosSuccess: true,
        todosSuccessMessage: 'fetched successful',
        todos: action.payload
    }
 case GET_TODOS_ERROR:
        return {
         ...state,
         todosLoading: false,
         todosSuccess: false,
         todosSuccessMessage: '',
         todos: [],
         todosError: true,
         todosErrorMessage: action.payload
    }
case GET_TODOS_REFRESH:
        return {
        ...state,
        todosLoading: false,
        todosSuccess: false,
        todosSuccessMessage: '',
        todosError: false,
        todosErrorMessage: ''
    }
default:
    return state
}
}

export default tableReducer;