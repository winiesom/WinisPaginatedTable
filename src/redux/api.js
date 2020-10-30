import {requestTodos, todosSuccess, todosError, refreshTodos} from './creator';


export const fetchTodos = () => {
    return (dispatch) => {
        dispatch(requestTodos());

        fetch('https://jsonplaceholder.typicode.com/todos')
        // .then(response => response.json())
        // .then(response => dispatch(todosSuccess(response)))

        .then(response => 
response.json()
            .then(data => ({
                data: data,
                status: response.status
            })
        )
        .then(res => {
            dispatch(todosSuccess(res.data))
            console.log(res.status, res.data)
        }))

        .catch((error) => {
            console.log(error)
            dispatch(todosError(error))
            setTimeout(() => {
                dispatch(refreshTodos())
            }, 5000)
        })
    }
}