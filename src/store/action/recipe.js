import * as actionTypes from "./actionTypes";
import axios from "axios";

const recipeAddToBookmark = (id) => {
  return {
    type: actionTypes.RECIPE_ADD_TO_BOOKMARK,
    id: id,
  };
};

const recipeRemoveFromBookmark = (id) => {
  return {
    type: actionTypes.RECIPE_REMOVE_FROM_BOOKMARK,
    id: id,
  };
};

const toggleIsBookmarked = () => {
  return {
    type: actionTypes.RECIPE_TOGGLE_IS_BOOKMARKED,
  };
};

export const initIsBookmarked = (id) => {
  return {
    type: actionTypes.RECIPE_INIT_IS_BOOKMARKED,
    id: id,
  };
};

export const recipeUpdateBookmarkOnReload = (data) => {
  return {
    type: actionTypes.RECIPE_UPDATE_BOOKMARK_ON_RELOAD,
    data: data,
  };
};

export const fetchBookmarkOnInit = (token, userId) => {
  return (dispatch) => {
    axios
      .get(
        "https://react-forkify-default-rtdb.firebaseio.com/bookmark/" +
          userId +
          ".json?auth=" +
          token
      )
      .then((response) => {
        console.log(response);
        dispatch(recipeUpdateBookmarkOnReload(response.data));
        let bookmark;
        for (let key in response.data) {
          bookmark = response.data[key];
        }

        fetchSummaryForBookmark(bookmark)(dispatch);
      })
      .catch((error) => {
        console.log(error);
      });
  };
};

// on boomark toggle fetch recipe summary and then store it at bookmarkedRecipeSummary or delete the existing one

const recipeRemoveSummary = (id) => {
  return {
    type: actionTypes.RECIPE_REMOVE_SUMMARY,
    id: id,
  };
};

const recipeAddSummary = (data) => {
  return {
    type: actionTypes.RECIPE_ADD_SUMMARY,
    data: data,
  };
};

// Handle all the dispatches and api call when bookmark is toggled

export const updateBookmark = (id, isBookmarked, auth, token) => {
  return (dispatch, getState) => {
    if (!auth) return;
    if (isBookmarked) {
      //put request delete bookmark
      dispatch(recipeRemoveFromBookmark(id));
      dispatch(recipeRemoveSummary(id));
      axios
        .delete(
          "https://react-forkify-default-rtdb.firebaseio.com/bookmark/" +
            getState().auth.userId +
            ".json?auth=" +
            token
        )
        .then((response) => {
          console.log(response);
          return axios.post(
            "https://react-forkify-default-rtdb.firebaseio.com/bookmark/" +
              getState().auth.userId +
              ".json?auth=" +
              token,
            [...getState().recipe.bookmark]
          );
        })
        .then((response) => {
          console.log(response);
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      //put request add bookmark
      dispatch(recipeAddToBookmark(id));
      axios
        .delete(
          "https://react-forkify-default-rtdb.firebaseio.com/bookmark/" +
            getState().auth.userId +
            ".json?auth=" +
            token
        )
        .then((response) => {
          console.log(response);
          return axios.post(
            "https://react-forkify-default-rtdb.firebaseio.com/bookmark/" +
              getState().auth.userId +
              ".json?auth=" +
              token,
            [...getState().recipe.bookmark]
          );
        })
        .then((response) => {
          console.log(response);
        })
        .catch((error) => {
          console.log(error);
        });
      // console.log(id);
      axios
        .get(`https://forkify-api.herokuapp.com/api/get?rId=${id}`)
        .then((response) => {
          console.log(response);
          dispatch(recipeAddSummary(response.data.recipe));
        })
        .catch((error) => {
          console.log(error);
        });
    }

    dispatch(toggleIsBookmarked());
  };
};

// For Bookmark componentDidMount to store all the bookmarked summary in the store

export const recipeSetSummaryForBookmark = (data) => {
  return {
    type: actionTypes.RECIPE_SET_SUMMARY_FOR_BOOKMARK,
    data: data,
  };
};

export const fetchSummaryForBookmark = (bookmark) => {
  return (dispatch) => {
    const arrayOfPromises = bookmark.map((id) => {
      return axios.get(`https://forkify-api.herokuapp.com/api/get?rId=${id}`);
    });
    // console.log("insisde fetchSummaryForBookmark");
    Promise.allSettled(arrayOfPromises).then((results) => {
      results.forEach((result) => console.log(result));
      dispatch(recipeSetSummaryForBookmark(results));
      // dispatch(callback(results));
    });
  };
};
