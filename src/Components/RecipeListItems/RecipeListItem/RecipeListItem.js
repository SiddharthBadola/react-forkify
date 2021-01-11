import React from "react";
import classes from "./RecipeListItem.module.css";
import { NavLink } from "react-router-dom";

const recipeListItem = (props) => {
  return (
    <li
      style={{ listStyle: "none" }}
      // className={classes.RecipeListItem}
      // onClick={() => props.click(props.id, props.history, props.match)}
    >
      <NavLink
        to={props.match.url + "/summary" + props.id}
        className={classes.RecipeListItem}
        activeClassName={classes.Active}
      >
        <figure>
          <img src={props.image} className={classes.Image} alt="Recipe img" />
        </figure>
        <h4 className={classes.Title}>
          {props.title.length <= 25
            ? props.title
            : props.title.substring(0, 20) + "..."}
        </h4>
        <p className={classes.Author}>{props.author}</p>
      </NavLink>
    </li>
  );
};

export default recipeListItem;
