import React from "react";
import classes from "./RecipeDisplay.module.css";
import Ingredients from "../../Components/RecipeDisplay/Ingredients/Ingredients";
import RecipeDisplayFooter from "../../Components/RecipeDisplay/RecipeDisplayFooter/RecipeDisplayFooter";
import * as actions from "../../store/action/index";
import { connect } from "react-redux";
import Spinner from "../../Components/UI/Spinner/Spinner";

import RecipeDisplayHeader from "../../Components/RecipeDisplay/RecipeDisplayHeader/RecipeDisplayHeader";
import RecipeDisplayPanel from "../../Components/RecipeDisplay/RecipeDisplayPanel/RecipeDisplayPanel";

class RecipeDisplay extends React.Component {
  state = {
    currentUserRecipe: this.props.userRecipe.some(
      (recipe) => recipe.id === this.props.match.params.id
    )
      ? this.props.userRecipe.find(
          (recipe) => recipe.id === this.props.match.params.id
        )
      : null,
  };

  userRecipeChecker() {
    return /userRecipe/.test(this.props.match.params.id);
  }

  componentDidMount() {
    // console.log("[RecipeDisplay.js] componentDidMount");
    if (!this.userRecipeChecker()) {
      // console.log("inside if");
      this.props.onFetchSummary(this.props.match.params.id);
      this.props.onInitIsBookmarked(this.props.match.params.id);
    }
    // if (this.props.auth) {
    //   this.props.onFetchBookmarkOnInit(this.props.token, this.props.userId);
    // }
  }

  componentDidUpdate(prevProps, prevState) {
    // console.log("[RecipeDisplay.js] componentDidUpdate");
    if (prevProps.match.params.id !== this.props.match.params.id) {
      // console.log("inside condidtion 1");
      this.props.onFetchSummary(this.props.match.params.id);
      this.props.onInitIsBookmarked(this.props.match.params.id);
    }
    if (prevProps.bookmark !== this.props.bookmark) {
      // console.log("inside condition 2");
      this.props.onInitIsBookmarked(this.props.match.params.id);
    }
    if (this.props.userRecipe.length) {
      if (
        (!this.state.currentUserRecipe && this.userRecipeChecker()) ||
        (this.userRecipeChecker() &&
          prevState.currentUserRecipe !== this.state.currentUserRecipe)
      ) {
        // this.props.recipeListResetError();
        // console.log("inside condition 3");
        this.setState({
          currentUserRecipe: this.props.userRecipe.find(
            (recipe) => recipe.id === this.props.match.params.id
          ),
        });
      }
    }
  }

  render() {
    const id = this.props.match.params.id;
    let recipeDisplay = null;

    if (
      (Boolean(this.state.currentUserRecipe) || !this.props.loading) &&
      (Boolean(this.state.currentUserRecipe) || !this.props.error)
    )
      recipeDisplay = (
        <div className={classes.RecipeDisplay}>
          <RecipeDisplayHeader
            // imageUrl={this.props.recipeSummary.image_url}
            imageUrl={
              this.userRecipeChecker()
                ? this.state.currentUserRecipe.image_url
                : this.props.recipeSummary.image_url
            }
            // title={this.props.recipeSummary.title}
            title={
              this.userRecipeChecker()
                ? this.state.currentUserRecipe.title
                : this.props.recipeSummary.title
            }
            userRecipe={
              this.userRecipeChecker()
                ? this.state.currentUserRecipe.userRecipe
                : false
            }
          />
          <RecipeDisplayPanel
            updateBookmark={this.props.updateBookmark}
            id={id}
            isBookmarked={this.props.isBookmarked}
            // bookmark={this.props.bookmark}
            auth={this.props.auth}
            token={this.props.token}
            userRecipe={
              this.userRecipeChecker()
                ? this.state.currentUserRecipe.userRecipe
                : false
            }
          />

          <div className={classes.Ingredients}>
            <h2>Recipe Ingredients</h2>
            <Ingredients
              ingredients={
                this.userRecipeChecker()
                  ? this.state.currentUserRecipe.ingredients
                  : this.props.recipeSummary.ingredients
              }
            />
          </div>
          <RecipeDisplayFooter
            link={
              this.userRecipeChecker()
                ? this.state.currentUserRecipe.source_url
                : this.props.recipeSummary.source_url
            }
            publisher={
              this.userRecipeChecker()
                ? this.state.currentUserRecipe.publisher
                : this.props.recipeSummary.publisher
            }
          />
        </div>
      );

    // console.log(this.props.error.response.data.message);
    if (this.props.error)
      recipeDisplay = <p>{this.props.error.response.data.message}</p>;

    if (this.props.loading && !this.userRecipeChecker())
      recipeDisplay = (
        <div className={classes.RecipeDisplay}>
          <Spinner />
        </div>
      );
    return recipeDisplay;
  }
}

const mapStateToProps = (state) => {
  return {
    recipeSummary: state.recipeList.recipeSummary,
    loading: state.recipeList.loading,
    error: state.recipeList.error,
    isBookmarked: state.recipe.isBookmarked,
    bookmark: state.recipe.bookmark,
    auth: Boolean(state.auth.token),
    token: state.auth.token,
    userId: state.auth.userId,
    userRecipe: state.recipe.userRecipe,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onFetchSummary: (id) => dispatch(actions.fetchSummary(id)),
    onInitIsBookmarked: (id) => dispatch(actions.initIsBookmarked(id)),
    updateBookmark: (id, isBookmarked, auth, token) =>
      dispatch(actions.updateBookmark(id, isBookmarked, auth, token)),
    onFetchBookmarkOnInit: (token, userId) =>
      dispatch(actions.fetchBookmarkOnInit(token, userId)),
    recipeListResetError: () => dispatch(actions.recipeListResetError()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(RecipeDisplay);
