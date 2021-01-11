import * as actionTypes from "../action/actionTypes";
import { updateObject } from "../utility";

const initialState = {
  recipeSummary: null,
  currentPage: 1,
  loading: true,
  error: null,
};

const recipeListSearchStart = (state) => {
  return updateObject(state, { loading: true });
};

const recipeListSearchSuccess = (state, action) => {
  return updateObject(state, {
    loading: false,
    recipeSummary: action.recipeSummary,
    error: null,
  });
};

const recipeListSearchFail = (state, action) => {
  return updateObject(state, { loading: false, error: action.error });
};

const pageIncrementHandler = (state) => {
  return updateObject(state, { currentPage: state.currentPage + 1 });
};

const pageDecrementHandler = (state) => {
  return updateObject(state, { currentPage: state.currentPage - 1 });
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.RECIPELIST_SEARCH_SUMMARY_START:
      return recipeListSearchStart(state);
    case actionTypes.RECIPELIST_SEARCH_SUMMARY_SUCCESS:
      return recipeListSearchSuccess(state, action);
    case actionTypes.RECIPELIST_SEARCH_SUMMARY_FAIL:
      return recipeListSearchFail(state, action);
    case actionTypes.PAGE_INCREMENT:
      return pageIncrementHandler(state);
    case actionTypes.PAGE_DECREMENT:
      return pageDecrementHandler(state);
    default:
      return state;
  }
};

export default reducer;
