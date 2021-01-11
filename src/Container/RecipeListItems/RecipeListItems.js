import React from "react";
import classes from "./RecipeListItems.module.css";
import RecipeListItem from "../../Components/RecipeListItems/RecipeListItem/RecipeListItem";
import Spinner from "../../Components/UI/Spinner/Spinner";
import * as actions from "../../store/action/index";
import { connect } from "react-redux";
import { Route } from "react-router-dom";
import RecipeDisplay from "../RecipeDisplay/RecipeDisplay";
import LeftArrow from "../../Components/Icons/LeftArrow";
import RightArrow from "../../Components/Icons/RightArrow";

// const callback = (props) => {
//   return function (recipe) {
//     return (
//       <RecipeListItem
//         title={recipe.title}
//         author={recipe.publisher}
//         id={recipe.recipe_id}
//         key={recipe.recipe_id}
//         image={recipe.image_url}
//         click={props.getSummary}
//       />
//     );
//   };
// };

class RecipeListItems extends React.Component {
  callback = (props) => {
    return function (recipe) {
      return (
        <RecipeListItem
          title={recipe.title}
          author={recipe.publisher}
          id={recipe.recipe_id}
          key={recipe.recipe_id}
          image={recipe.image_url}
          // click={props.getSummary}
          // click={props.onFetchSummary}
          {...props}
        />
      );
    };
  };

  render() {
    const btnLeftClasses = [classes.Left];
    const btnRightClasses = [classes.Right];

    let list = null;

    if (this.props.recipeList && this.props.recipeList.count <= 10) {
      list = [];
      list.push(this.props.recipeList.recipes.map(this.callback(this.props)));
    }

    if (this.props.recipeList && this.props.recipeList.count > 10) {
      list = [];
      const copy = [...this.props.recipeList.recipes];
      while (copy.length > 10) {
        let pageList = copy.splice(0, 10);
        list.push(pageList.map(this.callback(this.props)));
      }
      list.push(copy.map(this.callback(this.props)));

      if (this.props.currentPage === 1) btnLeftClasses.push(classes.Hide);
      if (this.props.currentPage === list.length)
        btnRightClasses.push(classes.Hide);
    }

    if (!this.props.recipeList) {
      btnLeftClasses.push(classes.Hide);
      btnRightClasses.push(classes.Hide);
    }

    if (this.props.loading) {
      btnLeftClasses.push(classes.Hide);
      btnRightClasses.push(classes.Hide);
      list = [<Spinner />];
    }

    const attachedClass = [classes.RecipeListItems];
    // const attachedClassBtnContainer = [classes.BtnContainer];
    if (!this.props.recipeList) {
      attachedClass.push(classes.HideContainer);
      // attachedClassBtnContainer.push(classes.HideContainer);
    }

    return (
      <React.Fragment>
        <ul className={attachedClass.join(" ")}>
          {list ? list[this.props.currentPage - 1] : list}
          <div className={classes.BtnContainer}>
            <button
              className={btnLeftClasses.join(" ")}
              onClick={this.props.onDecrementHandler}
            >
              <div className={classes.Desktop}>
                <span>&larr;</span>{" "}
                {"Page " + (this.props.currentPage - 1).toString()}
              </div>
              <div className={classes.Mobile}>
                <LeftArrow />
              </div>
            </button>
            <button
              className={btnRightClasses.join(" ")}
              onClick={this.props.onIncrementHandler}
            >
              <div className={classes.Desktop}>
                {"Page " + (this.props.currentPage + 1).toString()}{" "}
                <span>&rarr;</span>
              </div>
              <div className={classes.Mobile}>
                <RightArrow />
              </div>
            </button>
          </div>
        </ul>
        <Route
          path={this.props.match.url + "/summary:id"}
          exact
          component={RecipeDisplay}
        />
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    recipeList: state.search.recipeList,
    // recipeSummary: state.recipeList.recipeSummary,
    currentPage: state.recipeList.currentPage,
    loading: state.search.loading,
    error: state.recipeList.error,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onIncrementHandler: () => dispatch(actions.pageIncrementHandler()),
    onDecrementHandler: () => dispatch(actions.pageDecrementHandler()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(RecipeListItems);
