import * as actionTypes from "./actionTypes";
import {
  recipeUpdateBookmarkOnReload,
  fetchBookmarkOnInit,
  fetchSummaryForBookmark,
  fetchUserRecipe,
  // recipeSetSummaryForBookmark,
} from "./recipe";
import axios from "axios";

const authStart = () => {
  return {
    type: actionTypes.AUTH_START,
  };
};

const authSuccess = (token, userId) => {
  return {
    type: actionTypes.AUTH_SUCCESS,
    token: token,
    userId: userId,
  };
};

const authFail = (error) => {
  return {
    type: actionTypes.AUTH_FAIL,
    error: error,
  };
};

export const authSignOut = (history = null) => {
  localStorage.removeItem("token");
  localStorage.removeItem("userId");
  localStorage.removeItem("loginTime");
  localStorage.removeItem("expiresIn");

  if (history) {
    history.replace("/");
    return {
      type: actionTypes.AUTH_SIGN_OUT,
    };
  } else {
    return {
      type: actionTypes.AUTH_SIGN_OUT,
    };
  }
};

const authAutoSignOutOnExpiresIn = (time) => {
  return (dispatch) => {
    // console.log("timeout dispatched");

    setTimeout(() => {
      // console.log("inside timeout");
      dispatch(authSignOut());
    }, Number(time) * 1000);
  };
};

// HELPER FUNCTION FOR SETTING LOCALSTORAGE
const settingLocalStorage = (response) => {
  localStorage.setItem("token", response.data.idToken);
  localStorage.setItem("userId", response.data.localId);
  localStorage.setItem("loginTime", new Date());
  localStorage.setItem("expiresIn", response.data.expiresIn);
};

export const submit = (submitData, login, history) => {
  return (dispatch) => {
    dispatch(authStart());
    if (login) {
      // FOR SIGNING_IN AN EXISTING USER
      axios
        .post(
          "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCWcXZtSeANFwxYuCpprc6g569dkblZkuU",
          submitData
        )
        .then((response) => {
          // console.log(response);
          dispatch(authSuccess(response.data.idToken, response.data.localId));
          dispatch(authAutoSignOutOnExpiresIn(response.data.expiresIn));
          // history.push("/");
          history.goBack();
          settingLocalStorage(response);

          //fetch bookmark on login
          dispatch(
            fetchBookmarkOnInit(response.data.idToken, response.data.localId)
          );
          // fetch userRecipe on login
          dispatch(
            fetchUserRecipe(response.data.idToken, response.data.localId)
          );
        })
        .catch((error) => {
          console.log(error);
          dispatch(authFail(error));
        });
    } else {
      // FOR SIGNING-UP NEW USERS
      axios
        .post(
          "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCWcXZtSeANFwxYuCpprc6g569dkblZkuU",
          submitData
        )
        .then((response) => {
          // console.log(response);
          dispatch(authSuccess(response.data.idToken, response.data.localId));
          dispatch(authAutoSignOutOnExpiresIn(response.data.expiresIn));
          history.push("/");
          settingLocalStorage(response);
          dispatch(
            fetchBookmarkOnInit(response.data.token, response.data.localId)
          );
        })
        .catch((error) => {
          console.log(error.response.data.error.message);
          dispatch(authFail(error));
        });
    }
  };
};

const authInit = (token, userId) => {
  return {
    type: actionTypes.AUTH_INIT,
    token: token,
    userId: userId,
  };
};

export const checkStateToken = () => {
  return (dispatch, getState) => {
    if (!localStorage.getItem("token")) return;

    const expiresInTime =
      new Date(localStorage.getItem("loginTime")).getTime() +
      localStorage.getItem("expiresIn") * 1000;
    const timeAtReload = new Date().getTime();
    if (timeAtReload < expiresInTime) {
      dispatch(
        authInit(localStorage.getItem("token"), localStorage.getItem("userId"))
      );
      // Updateing the setTimeout for auto signout on expiration of token
      // console.log((expiresInTime - new Date().getTime()) / 1000);
      dispatch(
        authAutoSignOutOnExpiresIn(
          (expiresInTime - new Date().getTime()) / 1000
        )
      );

      // fetching bookmark from firebase on reload
      axios
        .get(
          "https://react-forkify-default-rtdb.firebaseio.com/bookmark/" +
            getState().auth.userId +
            ".json?auth=" +
            getState().auth.token
        )
        .then((response) => {
          // console.log(response);
          dispatch(recipeUpdateBookmarkOnReload(response.data));

          // fetching summary on reload
          fetchSummaryForBookmark(getState().recipe.bookmark)(dispatch);
        })
        .catch((error) => {
          console.log(error);
        });
      // Fetch userRecipeOnReload
      dispatch(
        fetchUserRecipe(
          localStorage.getItem("token"),
          localStorage.getItem("userId")
        )
      );
    }
  };
};

// To rest error when an user has already viewed the error and clicks the (create account/already have an account) button

export const authResetError = () => {
  return {
    type: actionTypes.AUTH_RESET_ERROR,
  };
};
