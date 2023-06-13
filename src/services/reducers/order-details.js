import {
  POST_ORDER_REQUEST,
  POST_ORDER_SUCCESS,
  POST_ORDER_FAILED,
  OPEN_ORDER_DETAILS_MODAL,
  CLOSE_ORDER_DETAILS_MODAL,
} from '../actions/order-details';

const initialState = {
  orderCurrent: null,
  orderRequest: false,
  orderFailed: false,
  isOrderPopupOpened: false
}

export const orderDetailsReducer = (state = initialState, action) => {
  switch (action.type) {
    case POST_ORDER_REQUEST: {
      return {
        ...state,
        orderRequest: true
      };
    }
    case POST_ORDER_SUCCESS: {
      return {
        ...state,
        orderFailed: false,
        orderRequest: false,
        orderCurrent: action.order,
      };
    }
    case POST_ORDER_FAILED: {
      return {
        ...state,
        orderFailed: true,
        orderRequest: false,
        orderCurrent: null
      };
    }
    case OPEN_ORDER_DETAILS_MODAL: {
      return {
        ...state,
        isOrderPopupOpened: true
      };
    }
    case CLOSE_ORDER_DETAILS_MODAL: {
      return {
        ...state,
        isOrderPopupOpened: false
      };
    }
    default: {
      return state;
    }
  }
};
