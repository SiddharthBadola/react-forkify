import * as actionTypes from "./actionTypes";
import axios from "axios";

const recipeSearchSuccessDesktop = (recipe) => {
  return {
    type: actionTypes.RECIPE_SEARCH_SUCCESS_DESKTOP,
    recipe: recipe,
  };
};

const recipeSearchSuccessMobile = (recipe) => {
  return {
    type: actionTypes.RECIPE_SEARCH_SUCCESS_MOBILE,
    recipe: recipe,
  };
};

const recipeSearchFailDesktop = (error) => {
  return {
    type: actionTypes.RECIPE_SEARCH_FAIL_DESKTOP,
    error: error,
  };
};

const recipeSearchFailMobile = (error) => {
  return {
    type: actionTypes.RECIPE_SEARCH_FAIL_MOBILE,
    error: error,
  };
};

const recipeSearchStart = () => {
  return {
    type: actionTypes.RECIPE_SEARCH_START,
  };
};

const recipeSearchStartMobile = () => {
  return {
    type: actionTypes.RECIPE_SEARCH_START_MOBILE,
  };
};

export const checkSearchState = (el) => {
  return (dispatch) => {
    // console.log(el);
    if (getComputedStyle(el).getPropertyValue("position") === "static") {
      dispatch(recipeSearchStartMobile());
    }
  };
};

export const exitSearchModal = () => {
  return {
    type: actionTypes.EXIT_SEARCH_MODAL,
  };
};

export const fetchRecipe = (currentSearch, searching, history) => {
  return (dispatch) => {
    dispatch(recipeSearchStart());
    // changes made here to get loading without depending on spinner in App component
    history.push("/recipe");
    axios
      .get(`https://forkify-api.herokuapp.com/api/search?q=${currentSearch}`)
      .then((res) => {
        // console.log(res.data);
        if (searching) {
          dispatch(recipeSearchSuccessMobile(res.data));
        } else {
          dispatch(recipeSearchSuccessDesktop(res.data));
        }
        history.push("/recipe");
      })
      .catch((error) => {
        console.log(error);

        if (searching) {
          dispatch(recipeSearchFailMobile(error));
        } else {
          dispatch(recipeSearchFailDesktop(error));
        }
        history.push("/");
      });
  };
};
