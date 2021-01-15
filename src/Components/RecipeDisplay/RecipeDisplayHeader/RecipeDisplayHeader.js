import React from "react";
import classes from "./RecipeDisplayHeader.module.css";
import Image from "../../../Assets/default-food-pic-small.jpg";

const recipeDisplayHeader = (props) => (
  <figure className={classes.RecipeDisplayHeader}>
    {props.userRecipe ? (
      <img src={props.imageUrl ? props.imageUrl : Image} alt="recipe" />
    ) : (
      <img src={props.imageUrl} alt="recipe" />
    )}
    <figcaption>
      <span>{props.title}</span>
    </figcaption>
  </figure>
);

export default recipeDisplayHeader;
