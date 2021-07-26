import { createStore, combineReducers, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'
import productListReducer from './reducers/productReducers'
import { composeWithDevTools } from 'redux-devtools-extension'
import {
  productReducer,
  productDetailReducer,
} from './reducers/productReducers'

import { cartReducer } from './reducers/cartReducers'

const reducer = combineReducers({
  productList: productReducer,
  productDetails: productDetailReducer,
  cart: cartReducer,
})

const cartItemsFromStorage = localStorage.getItem('cartItems')
  ? JSON.parse(localStorage.getItem('cartItems'))
  : []
const initialState = {
  cart: { cartItems: cartItemsFromStorage },
}

const middleware = [thunk]

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
)

export default store
