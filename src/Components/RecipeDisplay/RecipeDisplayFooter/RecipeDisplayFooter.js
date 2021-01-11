import React from "react";
import classes from "./RecipeDisplayFooter.module.css";

const recipeDisplayFooter = (props) => {
  return (
    <div className={classes.RecipeDisplayFooter}>
      <h2>HOW TO COOK IT</h2>
      <p>
        This recipe was carefully designed and tested by
        <span>{props.publisher}</span>. Please check out directions at their
        website.
      </p>
      <a href={props.link} target="_blank" rel="noreferrer">
        Directions &rarr;
      </a>
    </div>
  );
};

export default recipeDisplayFooter;
