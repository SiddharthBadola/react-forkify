import React from "react";
import classes from "./RecipeDisplayHeader.module.css";

const recipeDisplayHeader = (props) => (
  <figure className={classes.RecipeDisplayHeader}>
    <img src={props.imageUrl} alt="recipe" />
    <figcaption>
      <span>{props.title}</span>
    </figcaption>
  </figure>
);

export default recipeDisplayHeader;
