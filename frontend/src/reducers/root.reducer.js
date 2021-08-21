import { combineReducers } from 'redux'

import {
  productListReducer,
  productDetailsReducer,
  productDeleteReducer,
} from './shop.reducer'
import { cartReducer } from './cart.reducer'
import {
  userAuthReducer,
  userRegisterReducer,
  userDetailsReducer,
  userUpdateProfileReducer,
  userListReducer,
  userDeleteReducer,
  userUpdateReducer,
} from '../reducers/user.reducer'
import {
  orderCreateReducer,
  orderDetailsReducer,
  orderMyListReducer,
  orderPayReducer,
} from './order.reducer'
// import directoryReducer from './directoryReducer'

export default combineReducers({
  userLogin: userAuthReducer,
  userRegister: userRegisterReducer,
  userDetails: userDetailsReducer,
  userUpdateProfile: userUpdateProfileReducer,
  userDelete: userDeleteReducer,
  userUpdate: userUpdateReducer,
  userList: userListReducer,
  productList: productListReducer,
  productDetails: productDetailsReducer,
  productDelete: productDeleteReducer,
  cart: cartReducer,
  orderCreate: orderCreateReducer,
  orderDetails: orderDetailsReducer,
  orderPay: orderPayReducer,
  orderList: orderMyListReducer,
})
