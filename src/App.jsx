import React, { useEffect, useState } from 'react'
import * as actions from './store/actions'
import { initiateStore } from './store/store'

const store = initiateStore()

const App = () => {
    const [state, setState] = useState(store.getState())
    console.log(state)
    
    useEffect(() => {
        store.subscribe(() => {
            setState(store.getState())
        })
    }, [])

    const completeTask = (taskId) => {
        store.dispatch(actions.taskCompleted(taskId))
    } 

    const changeTitle = (taskId) => {
        store.dispatch(actions.titleChanged(taskId))
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
                            onClick={() => completeTask(element.id)}
                        >
                            Complete
                        </button>
                        <button
                            onClick={() => changeTitle(element.id)}
                        >
                            Change title
                        </button>
                        <hr />
                    </li>
                ))}
            </ul>
        </>
    )
}

export default App