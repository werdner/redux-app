import React, { useEffect } from 'react'
import {titleChanged, taskDeleted, completeTaskt, getTasks, loadTasks, getTasksLoadingStatus} from './store/task'
import { useDispatch, useSelector } from 'react-redux'
import { getError } from './store/errors'

const App = () => {
    const state = useSelector(getTasks())
    const isLoading = useSelector(getTasksLoadingStatus())
    const error = useSelector(getError())
    const dispatch = useDispatch()
    
    useEffect(() => {
        dispatch(loadTasks())
    }, [dispatch])

    const changeTitle = (taskId) => {
        dispatch(titleChanged(taskId))
    }

    const deleteTask = (taskId) => {
        dispatch(taskDeleted(taskId))
    } 

    if (isLoading) {
        return <h1>Loading</h1>
    }
    if (error) {
        return <h1>{error}</h1>
    }

    return (
        <>
            <h1>App</h1>
            <ul>
                {state.map(element => (
                    <li key={element.id}>
                        <p>{element.title}</p>
                        <p>{`Completed: ${element.completed}`}</p>
                        <button
                            onClick={() => dispatch(completeTaskt(element.id))}
                        >
                            Complete
                        </button>
                        <button
                            onClick={() => changeTitle(element.id)}
                        >
                            Change title
                        </button>
                        <button
                            onClick={() => deleteTask(element.id)}
                        >
                            Delete task
                        </button>
                        <hr />
                    </li>
                ))}
            </ul>
        </>
    )
}

export default App