import { taskUpdated, taskDeleted } from "./actionTypes";

export function taskReducer(state = [], action) {
    switch (action.type) {
        case taskUpdated: {
            const newArray = [...state]
            const elementIndex = newArray.findIndex(element => element.id === action.payload.id)
            newArray[elementIndex] = {...newArray[elementIndex], ...action.payload}
            return newArray
        }
        case taskDeleted: {
            const newArray = [...state]
            return newArray.filter(element => element.id !== action.payload.id)
        }
        default: {
            return state;
        }
    }
}