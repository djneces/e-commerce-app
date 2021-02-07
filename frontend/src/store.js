import { createStore, compose, applyMiddleware, combineReducers } from 'redux'
import thunk from 'redux-thunk'
import { productListReducer } from './reducers/productReducers'


const initialState = {}
const reducer = combineReducers({
    productList: productListReducer,
})

// shows redux in chrome   
const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
// after installing redux thunk 
const store = createStore(reducer, initialState, composeEnhancer(applyMiddleware(thunk)))

export default store