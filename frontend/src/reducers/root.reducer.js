import { combineReducers } from 'redux'

import { productListReducer, productDetailsReducer } from './shop.reducer'
import { cartReducer } from './cart.reducer'
import { userAuthReducer, userRegisterReducer } from '../reducers/user.reducer'
// import directoryReducer from './directoryReducer'

export default combineReducers({
  userLogin: userAuthReducer,
  userRegister: userRegisterReducer,
  productList: productListReducer,
  productDetails: productDetailsReducer,
  cart: cartReducer,
})
