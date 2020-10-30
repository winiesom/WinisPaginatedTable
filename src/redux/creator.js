import { ACTIONS } from './action';

const  {
    GET_TODOS_LOADING,
    GET_TODOS_SUCCESS,
    GET_TODOS_ERROR,
    GET_TODOS_REFRESH
} = ACTIONS;


export const requestTodos = () => {
    return {
        type: GET_TODOS_LOADING
    }
}

export const todosSuccess = (payload) => {
    return {
        type: GET_TODOS_SUCCESS,
        payload: payload
    }
}

export const todosError = (payload) => {
    return {
        type: GET_TODOS_ERROR,
        payload: payload
    }
}

export const refreshTodos = () => {
    return {
        type: GET_TODOS_REFRESH
    }
}