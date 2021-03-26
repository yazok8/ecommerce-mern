import axios from 'axios'

import {
  PRODUCT_LIST_REQUEST,
  PRODUCT_LIST_SUCCESS,
  PRODUCT_LIST_FAILURE,
  PRODUCT_DETAIL_REQUEST,
  PRODUCT_DETAIL_SUCCESS,
  PRODUCT_DETAIL_FAILURE,
} from './shop.types'

export const listProducts = () => async (dispatch) => {
  try {
    dispatch({ type: PRODUCT_LIST_REQUEST })

    const { data } = await axios.get('/api/shop')

    dispatch({
      type: PRODUCT_LIST_SUCCESS,
      payload: data,
    })
  } catch (err) {
    dispatch({
      type: PRODUCT_LIST_FAILURE,
      payload:
        err.response && err.response.data.message
          ? err.response.data.message
          : err.message,
    })
  }
}

export const listProductDetails = (id) => async (dispatch) => {
  try {
    dispatch({ type: PRODUCT_DETAIL_REQUEST })

    const { data } = await axios.get(`/api/shop/${id}`)

    dispatch({
      type: PRODUCT_DETAIL_SUCCESS,
      payload: data,
    })
  } catch (err) {
    dispatch({
      type: PRODUCT_DETAIL_FAILURE,
      payload:
        err.response && err.response.data.message
          ? err.response.data.message
          : err.message,
    })
  }
}
