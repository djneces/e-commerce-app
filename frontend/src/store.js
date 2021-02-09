import { createStore, compose, applyMiddleware, combineReducers } from 'redux'
import thunk from 'redux-thunk'
import { cartReducer } from './reducers/cartReducers'
import { orderCreateReducer, orderDetailsReducer } from './reducers/orderReducers'
import { productDetailsReducer, productListReducer } from './reducers/productReducers'
import { userRegisterReducer, userSigninReducer } from './reducers/userReducers'


const initialState = {
    userSignin: {  //remembers logged name after reload
        userInfo: localStorage.getItem('userInfo')
        ? JSON.parse(localStorage.getItem('userInfo'))
        : null,
    },
    cart: { //remember cart after reload
        cartItems: localStorage.getItem('cartItems')
        ? JSON.parse(localStorage.getItem('cartItems'))
        : [],
        shippingAddress: localStorage.getItem('shippingAddress') 
        ? JSON.parse(localStorage.getItem('shippingAddress'))
        : {}, 
        paymentMethod: 'PayPal',
    }
}
const reducer = combineReducers({
    productList: productListReducer,
    productDetails: productDetailsReducer,
    cart: cartReducer,
    userSignin: userSigninReducer,
    userRegister: userRegisterReducer,
    orderCreate: orderCreateReducer,
    orderDetails: orderDetailsReducer,
})

// shows redux in chrome   
const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
// after installing redux thunk 
const store = createStore(reducer, initialState, composeEnhancer(applyMiddleware(thunk)))

export default store