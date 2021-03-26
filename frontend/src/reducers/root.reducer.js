import { combineReducers } from 'redux'

import { productListReducer, productDetailsReducer } from './shop.reducer'
import { cartReducer } from './cart.reducer'
import { userAuthReducer } from '../reducers/user.reducer'
// import directoryReducer from './directoryReducer'

export default combineReducers({
  userLogin: userAuthReducer,
  productList: productListReducer,
  productDetails: productDetailsReducer,
  cart: cartReducer,
})
