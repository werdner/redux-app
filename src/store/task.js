import { createSlice } from "@reduxjs/toolkit"
import { todosService } from "../services/todos.service"
import { setErrors } from "./errors"

const initialState = {entities: [], isLoading: true}

const taskSlice = createSlice({
    name: 'task',
    initialState,
    reducers: {
        recivied(state, action) {
            state.entities = action.payload
            state.isLoading = false
        },
        taskCreated(state, action) {
            state.entities = [...state.entities, action.payload]
            state.isLoading = false
        },
        update(state, action) {
            const elementIndex = state.entities.findIndex(element => element.id === action.payload.id)
            state.entities[elementIndex] = {...state.entities[elementIndex], ...action.payload}
        },
        remove(state, action) {
            state.entities = state.entities.filter(
                (el) => el.id !== action.payload.id
            );
        },
        taskRequested(state) {
            state.isLoading = true
        },
        taskFaild(state) {
            state.isLoading = false
        }
}})

const {actions, reducer: taskReducer} = taskSlice
const {update, remove, recivied, taskRequested, taskFaild, taskCreated} = actions

export const loadTasks = () => async (dispatch) => {
    dispatch(taskRequested())
    try {
        const data = await todosService.fetch()
        dispatch(recivied(data))
    } catch (error) {
        dispatch(taskFaild(error.message))
        dispatch(setErrors(error.message))
    }
}

export const createTask = () => async (dispatch) => {
    dispatch(taskRequested())
    try {
        const data = await todosService.create(Math.floor(Math.random() * 100))
        dispatch(taskCreated(data))
    } catch (error) {
        dispatch(taskFaild(error.message))
        dispatch(setErrors(error.message))
    }
}

export const completeTaskt = (id) => ((dispatch) => {
    dispatch(update({id, completed: true}))
})

export function taskCompleted(id) {
    return update({id, completed: true})
}

export function taskDeleted(id) {
    return remove({id})
}

export function titleChanged(id) {
    return update({id, title: `New title for ${id}`})
}

export const getTasks = () => (state) => {
    return state.tasks.entities
}
export const getTasksLoadingStatus = () => (state) => state.tasks.isLoading

export default taskReducer
