import { combineReducers, createStore, applyMiddleware, compose } from 'redux'
import { reducer as appReducer } from './app/reducer'

const rootReducer = combineReducers({
    app: appReducer
})

const logger = (store) => (next) => (action) => {
    // console.log("Dispatching Action Logger1", action, store.getState())
    const value = next(action)

    // console.log("Now State in Logger1", store.getState());
    return value
}

const logger2 = (store) => (next) => (action) => {
    // console.log("Dispatching Action Logger2", action, store.getState())
    const value = next(action)

    // console.log("Now State in Logger2", store.getState());
    return value
}

const createComposer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

const store = createStore(rootReducer,
    createComposer( applyMiddleware(logger, logger2))
    
)

export {store}