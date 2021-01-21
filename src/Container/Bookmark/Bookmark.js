import React from "react";
import classes from "./Bookmark.module.css";
import * as actions from "../../store/action/index";
import { connect } from "react-redux";
import BookmarkCard from "../../Components/UI/BookmarkCard/BookmarkCard";
import { Redirect } from "react-router-dom";

class Bookmark extends React.Component {
  componentDidMount() {
    // console.log(this.props.bookmark.length);
    // console.log("[Bookmark.js] ComponentDidMount");
    // if (
    //   this.props.bookmark.length !== 0 &&
    //   !this.props.bookmarkedRecipeSummary
    // ) {
    //   this.props.fetchSummary(this.props.bookmark);
    // }
    // this.props.recipeListResetError();
    localStorage.setItem("path", "/bookmark");
  }
  componentDidUpdate(prevProps) {
    // console.log("[Bookmark.js] ComponentDidUpdate");
    if (
      prevProps.bookmark !== this.props.bookmark
      // || prevProps.bookmarkedRecipeSummary !== this.props.bookmarkedRecipeSummary
    ) {
      this.props.fetchSummary(this.props.bookmark);
    }
  }

  componentWillUnmount() {
    // console.log("[Bookmark.js] ComponentWillUmount");
    localStorage.setItem("path", "/");
  }
  render() {
    let content;
    if (!this.props.bookmark.length)
      content = "You Can Surf and Add the Recipes You Like to View Them Later";
    if (this.props.bookmarkedRecipeSummary)
      content = this.props.bookmarkedRecipeSummary.map((recipe) => (
        <BookmarkCard
          imageUrl={recipe["image_url"]}
          title={recipe.title}
          key={recipe["recipe_id"]}
          id={recipe["recipe_id"]}
          ingredients={recipe.ingredients}
          publisher={recipe.publisher}
        />
      ));
    const attachedClass = [classes.Bookmark];
    if (this.props.loading) attachedClass.push(classes.Hide);

    let bookmark = (
      <div className={attachedClass.join(" ")}>
        <div className={classes.CardContainer}>{content}</div>
      </div>
    );

    if (!this.props.auth) bookmark = <Redirect to="/" />;

    return bookmark;
  }
}

const mapStateToProps = (state) => {
  return {
    bookmark: state.recipe.bookmark,
    bookmarkedRecipeSummary: state.recipe.bookmarkedRecipeSummary,
    loading: state.search.loading,
    auth: Boolean(state.auth.token),
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchSummary: (bookmark) =>
      dispatch(actions.fetchSummaryForBookmark(bookmark)),
    // recipeListResetError: () => dispatch(actions.recipeListResetError()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Bookmark);
