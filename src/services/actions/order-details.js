import { postOrderData } from "../../api/api";

export const SET_POPUP_ORDER = "SET_POPUP_ORDER";
export const OPEN_ORDER_DETAILS_MODAL = "OPEN_ORDER_DETAILS_MODAL";
export const CLOSE_ORDER_DETAILS_MODAL = "CLOSE_ORDER_DETAILS_MODAL";

export const POST_ORDER_REQUEST = "POST_ORDER_REQUEST";
export const POST_ORDER_SUCCESS = "POST_ORDER_SUCCESS";
export const POST_ORDER_FAILED = "POST_ORDER_FAILED";

export const postOrder = (array) => {
  return function (dispatch) {
    dispatch({
      type: POST_ORDER_REQUEST,
    });
    postOrderData(array)
      .then((res) => {
        dispatch({
          type: POST_ORDER_SUCCESS,
          order: res,
        });
      })
      .catch((err) => {
        dispatch({
          type: POST_ORDER_FAILED,
        });
      });
  };
};

export const openOrderDetailsModal = () => {
  return {
    type: OPEN_ORDER_DETAILS_MODAL,
  };
};

export const closeOrderDetailsModal = () => {
  return {
    type: CLOSE_ORDER_DETAILS_MODAL,
  };
};
