import * as actionTypes from "../action/actionTypes";
import { updateObject } from "../utility";

const initialState = {
  token: null,
  userId: null,
  error: null,
  expireTime: null,
  loading: false,
};

const authStart = (state) => {
  return updateObject(state, { loading: true, error: null });
};

const authSuccess = (state, action) => {
  return updateObject(state, {
    token: action.token,
    userId: action.userId,
    loading: false,
    error: null,
  });
};

const authFail = (state, action) => {
  return updateObject(state, { error: action.error, loading: false });
};

const authSignOut = (state) => {
  return updateObject(state, { token: null, userId: null });
};

const authInit = (state, action) => {
  return updateObject(state, { token: action.token, userId: action.userId });
};

const authResetError = (state) => {
  return updateObject(state, { error: null });
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.AUTH_START:
      return authStart(state);
    case actionTypes.AUTH_SUCCESS:
      return authSuccess(state, action);
    case actionTypes.AUTH_FAIL:
      return authFail(state, action);
    case actionTypes.AUTH_SIGN_OUT:
      return authSignOut(state);
    case actionTypes.AUTH_INIT:
      return authInit(state, action);
    case actionTypes.AUTH_RESET_ERROR:
      return authResetError(state);
    default:
      return state;
  }
};

export default reducer;
