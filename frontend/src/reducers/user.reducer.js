import {
  USER_LOGIN_FAIL,
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGOUT,
} from '../actions/user/user.types'

export const userAuthReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_LOGIN_REQUEST:
      return { loading: true }

    case USER_LOGIN_SUCCESS:
      return { loading: false, userInfo: action.payload }

    case USER_LOGIN_FAIL:
      return { loading: false, err: action.payload }

    case USER_LOGOUT:
      return {}

    default:
      return state
  }
}
