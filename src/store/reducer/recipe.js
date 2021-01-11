import * as actionTypes from "../action/actionTypes";
import { updateObject } from "../utility";

const initialState = {
  bookmark: [],
  userRecipe: [],
  currentId: null,
  isBookmarked: false,
  bookmarkedRecipeSummary: null,
};

const recipeAddToBookmark = (state, action) => {
  const newBookmark = state.bookmark.concat(action.id);
  return updateObject(state, { bookmark: newBookmark });
};

const recipeRemoveFromBookmark = (state, action) => {
  const newBookmark = state.bookmark.filter((id) => id !== action.id);
  return updateObject(state, { bookmark: newBookmark });
};

const toggleIsBookmarked = (state) => {
  return updateObject(state, { isBookmarked: !state.isBookmarked });
};

const recipeInitIsBookmarked = (state, action) => {
  // console.log(state.bookmark);
  return updateObject(state, {
    isBookmarked: state.bookmark.includes(action.id),
  });
};

const recipeUpdateBookmarkOnReload = (state, action) => {
  let newBookmark;
  // console.log(action.data);
  if (!action.data) newBookmark = [];
  for (let id in action.data) {
    newBookmark = action.data[id];
    // console.log(id);
    // if (!id) newBookmark = [];
  }
  // console.log(newBookmark);
  return updateObject(state, { bookmark: newBookmark });
};

const recipeSetSummaryForBookmark = (state, action) => {
  const newBookmarkedRecipeSummary = [];
  action.data.forEach((res) => {
    // newBookmarkedRecipeSummary[res.value.data.recipe["recipe_id"]] =
    //   res.value.data.recipe;
    newBookmarkedRecipeSummary.push(res.value.data.recipe);
  });
  // console.log(newBookmarkedRecipeSummary);
  return updateObject(state, {
    bookmarkedRecipeSummary: newBookmarkedRecipeSummary,
  });
};

const recipeAddSummary = (state, action) => {
  // console.log(state.bookmarkedRecipeSummary);
  const newBookmarkedRecipeSummary = state.bookmarkedRecipeSummary.concat(
    action.data
  );
  return updateObject(state, {
    bookmarkedRecipeSummary: newBookmarkedRecipeSummary,
  });
};

const recipeRemoveSummary = (state, action) => {
  const newBookmarkedRecipeSummary = state.bookmarkedRecipeSummary.filter(
    (summary) => summary["recipe_id"] !== action.id
  );
  return updateObject(state, {
    bookmarkedRecipeSummary: newBookmarkedRecipeSummary,
  });
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.RECIPE_ADD_TO_BOOKMARK:
      return recipeAddToBookmark(state, action);
    case actionTypes.RECIPE_REMOVE_FROM_BOOKMARK:
      return recipeRemoveFromBookmark(state, action);
    case actionTypes.RECIPE_TOGGLE_IS_BOOKMARKED:
      return toggleIsBookmarked(state);
    case actionTypes.RECIPE_INIT_IS_BOOKMARKED:
      return recipeInitIsBookmarked(state, action);
    case actionTypes.RECIPE_UPDATE_BOOKMARK_ON_RELOAD:
      return recipeUpdateBookmarkOnReload(state, action);
    case actionTypes.RECIPE_SET_SUMMARY_FOR_BOOKMARK:
      return recipeSetSummaryForBookmark(state, action);
    case actionTypes.RECIPE_ADD_SUMMARY:
      return recipeAddSummary(state, action);
    case actionTypes.RECIPE_REMOVE_SUMMARY:
      return recipeRemoveSummary(state, action);
    default:
      return state;
  }
};

export default reducer;
