import * as actionTypes from "../action/actionTypes";
import { updateObject } from "../utility";

const initialState = {
  recipeList: null,
  error: null,
  loading: false,
  searching: false,
};

const recipeSearchStart = (state) => {
  return updateObject(state, { loading: true });
};

const recipeSearchStartMobile = (state) => {
  return updateObject(state, { searching: true });
};

const exitSearchModal = (state) => {
  return updateObject(state, { searching: false });
};

const recipeSearchSuccessDesktop = (state, action) => {
  return updateObject(state, {
    recipeList: action.recipe,
    loading: false,
    error: null,
  });
};

const recipeSearchSuccessMobile = (state, action) => {
  return updateObject(state, {
    recipeList: action.recipe,
    loading: false,
    searching: false,
    error: null,
  });
};

const recipeSearchFailDesktop = (state, action) => {
  return updateObject(state, { error: action.error, loading: false });
};

const recipeSearchFailMobile = (state, action) => {
  return updateObject(state, {
    error: action.error,
    loading: false,
    searching: false,
  });
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.RECIPE_SEARCH_START:
      return recipeSearchStart(state);
    case actionTypes.RECIPE_SEARCH_START_MOBILE:
      return recipeSearchStartMobile(state);
    case actionTypes.EXIT_SEARCH_MODAL:
      return exitSearchModal(state);
    case actionTypes.RECIPE_SEARCH_SUCCESS_DESKTOP:
      return recipeSearchSuccessDesktop(state, action);
    case actionTypes.RECIPE_SEARCH_SUCCESS_MOBILE:
      return recipeSearchSuccessMobile(state, action);
    case actionTypes.RECIPE_SEARCH_FAIL_DESKTOP:
      return recipeSearchFailDesktop(state, action);
    case actionTypes.RECIPE_SEARCH_FAIL_MOBILE:
      return recipeSearchFailMobile(state, action);
    default:
      return state;
  }
};

export default reducer;
