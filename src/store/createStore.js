export function createStore(reducer, initialState) {
    let state = initialState
    const listeners = []

    function getState() {
        return state
    }

    function dispatch(action) {
        state = reducer(state, action)

        for (const listener of listeners) {
            listener()
        }
    }

    function subscribe(listener) {
        listeners.push(listener)
    }

    return {getState, dispatch, subscribe}
}