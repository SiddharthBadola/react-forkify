import React from "react";
import classes from "./Ingredients.module.css";
import Ingredient from "./Ingredient/Ingredient";

const ingredients = (props) => {
  let list = null;
  //   console.log(props.ingredients);
  const uniqueIngredients = [
    ...new Set(props.ingredients.map((el) => el.trimEnd())),
  ];
  // console.log(uniqueIngredients);
  //   console.log(uniqueIngredients.length);

  //   uniqueIngredients.map((el) => console.log(el));

  list = uniqueIngredients.map((el, i) => {
    return <Ingredient key={el.substring(0, 20) + i} text={el} />;
  });
  return <ul className={classes.Ingredients}>{list}</ul>;
};

export default ingredients;
