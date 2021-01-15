import React from "react";
import classes from "./AddRecipeCard.module.css";
import Modal from "../../UI/Modal/Modal";
import Backdrop from "../../UI/Backdrop/Backdrop";
import AddRecipeForm from "../../../Container/AddRecipeForm/AddRecipeForm";
import BookmarkCard from "../../UI/BookmarkCard/BookmarkCard";

const addRecipeCard = (props) => {
  return (
    <React.Fragment>
      {props.userRecipe.length
        ? props.userRecipe.map((recipe) => (
            <BookmarkCard
              imageUrl={recipe.image_url}
              title={recipe.title}
              publisher={recipe.publisher}
              id={recipe.id}
              key={recipe.publisher + recipe.image_url + recipe.title}
            />
          ))
        : null}
      <div className={classes.AddRecipeCard} onClick={props.clicked}>
        <span>+</span>
      </div>
      <Modal show={props.showForm}>
        <AddRecipeForm
          onSubmitCloseModal={props.onSubmitCloseModal}
          onSubmitAddRecipe={props.onSubmitAddRecipe}
          token={props.token}
          userId={props.userId}
        />
      </Modal>
      <Backdrop show={props.showForm} clicked={props.closeModalHandler} />
    </React.Fragment>
  );
};

export default addRecipeCard;
