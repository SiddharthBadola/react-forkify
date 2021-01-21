import React from "react";
import classes from "./AddRecipe.module.css";
import AddRecipeCard from "./AddRecipeCard/AddRecipeCard";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import * as actions from "../../store/action/index";

class AddRecipe extends React.Component {
  componentDidMount() {
    localStorage.setItem("path", "add-recipe");
  }

  componentWillUnmount() {
    localStorage.setItem("path", "/");
  }

  render() {
    let redirect = null;
    if (!Boolean(this.props.token)) redirect = <Redirect to="/" />;
    return (
      <div className={classes.AddRecipe}>
        {redirect}
        <AddRecipeCard
          clicked={this.props.onShowFormHandler}
          showForm={this.props.showForm}
          closeModalHandler={this.props.onHideFormHandler}
          onSubmitCloseModal={this.props.onHideFormHandler}
          onSubmitAddRecipe={this.props.addRecipe}
          token={this.props.token}
          userId={this.props.userId}
          userRecipe={this.props.userRecipe}
        />
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    token: state.auth.token,
    userId: state.auth.userId,
    userRecipe: state.recipe.userRecipe,
    showForm: state.recipe.showForm,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    addRecipe: (data, token, userId) =>
      dispatch(actions.submitRecipe(data, token, userId)),
    onShowFormHandler: () => dispatch(actions.recipeShowForm()),
    onHideFormHandler: () => dispatch(actions.recipeHideForm()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AddRecipe);
