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
  componentDidMount() {
    // console.log("[RecipeDisplay.js] componentDidMount");
    this.props.onFetchSummary(this.props.match.params.id);
    this.props.onInitIsBookmarked(this.props.match.params.id);
    // if (this.props.auth) {
    //   this.props.onFetchBookmarkOnInit(this.props.token, this.props.userId);
    // }
  }

  componentDidUpdate(prevProps) {
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
  }
  render() {
    // console.log(this.props);
    const id = this.props.match.params.id;
    let recipeDisplay = null;

    if (!this.props.loading && !this.props.error)
      recipeDisplay = (
        <div className={classes.RecipeDisplay}>
          <RecipeDisplayHeader
            imageUrl={this.props.recipeSummary.image_url}
            title={this.props.recipeSummary.title}
          />
          <RecipeDisplayPanel
            updateBookmark={this.props.updateBookmark}
            id={id}
            isBookmarked={this.props.isBookmarked}
            // bookmark={this.props.bookmark}
            auth={this.props.auth}
            token={this.props.token}
          />

          <div className={classes.Ingredients}>
            <h2>Recipe Ingredients</h2>
            <Ingredients ingredients={this.props.recipeSummary.ingredients} />
          </div>
          <RecipeDisplayFooter
            link={this.props.recipeSummary.source_url}
            publisher={this.props.recipeSummary.publisher}
          />
        </div>
      );

    // console.log(this.props.error.response.data.message);
    if (this.props.error)
      recipeDisplay = <p>{this.props.error.response.data.message}</p>;

    if (this.props.loading) recipeDisplay = <Spinner />;
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
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(RecipeDisplay);
