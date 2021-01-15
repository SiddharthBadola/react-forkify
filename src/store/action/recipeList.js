import * as actionTypes from "./actionTypes";
import axios from "axios";

const recipeListSearchStart = () => {
  return {
    type: actionTypes.RECIPELIST_SEARCH_SUMMARY_START,
  };
};

const recipeListSearchSuccess = (recipeSummary) => {
  return {
    type: actionTypes.RECIPELIST_SEARCH_SUMMARY_SUCCESS,
    recipeSummary: recipeSummary,
  };
};

const recipeListSearchFail = (error) => {
  return {
    type: actionTypes.RECIPELIST_SEARCH_SUMMARY_FAIL,
    error: error,
  };
};

export const fetchSummary = (id) => {
  return (dispatch) => {
    dispatch(recipeListSearchStart());
    axios
      .get(`https://forkify-api.herokuapp.com/api/get?rId=${id}`)
      .then((res) => {
        // console.log(res.data);
        // console.log(res.data.recipe);
        dispatch(recipeListSearchSuccess(res.data.recipe));

        // this.setState({ recipeSummary: res.data.recipe });
        // history.push(match.url + "/summary");
      })
      .catch((err) => {
        console.log(err);
        dispatch(recipeListSearchFail(err));
        // this.setState({ error: err });
      });
  };
};

export const pageIncrementHandler = () => {
  return {
    type: actionTypes.PAGE_INCREMENT,
  };
};

export const pageDecrementHandler = () => {
  return {
    type: actionTypes.PAGE_DECREMENT,
  };
};

// Setting the error to null when we visit the bookmark page so that the we can visit the user recipe summary on reload

export const recipeListResetError = () => {
  return {
    type: actionTypes.RECIPELIST_RESET_ERROR,
  };
};
