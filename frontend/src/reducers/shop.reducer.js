import {
  PRODUCT_LIST_REQUEST,
  PRODUCT_LIST_SUCCESS,
  PRODUCT_LIST_FAILURE,
  PRODUCT_DETAIL_REQUEST,
  PRODUCT_DETAIL_SUCCESS,
  PRODUCT_DETAIL_FAILURE,
} from '../actions/shop/shop.types'

export const productListReducer = (state = { products: [] }, action) => {
  switch (action.type) {
    case PRODUCT_LIST_REQUEST:
      return { loading: true, products: [] }

    case PRODUCT_LIST_SUCCESS:
      return { loading: false, products: action.payload }

    case PRODUCT_LIST_FAILURE:
      return { loading: false, err: action.payload }

    default:
      return state
  }
}

export const productDetailsReducer = (
  state = { product: { reviews: [] } },
  action
) => {
  switch (action.type) {
    case PRODUCT_DETAIL_REQUEST:
      return { ...state, loading: true }

    case PRODUCT_DETAIL_SUCCESS:
      return { loading: false, product: action.payload }

    case PRODUCT_DETAIL_FAILURE:
      return { loading: false, err: action.payload }

    default:
      return state
  }
}
