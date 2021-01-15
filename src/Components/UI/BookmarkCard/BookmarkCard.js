import React from "react";
import classes from "./BookmarkCard.module.css";
import { Link } from "react-router-dom";
// import Ingredients from "../../RecipeDisplay/Ingredients/Ingredients";
import Image from "../../../Assets/default-food-pic-small.jpg";

const bookmarkCard = (props) => {
  return (
    // <Link to={"/recipe/summary" + props.id} className={classes.BookmarkCard}>
    <Link to={"/summary" + props.id} className={classes.BookmarkCard}>
      <figure>
        <img src={props.imageUrl ? props.imageUrl : Image} alt="huge" />
        <figcaption>
          <h3>
            <span>{props.title}</span>
          </h3>
        </figcaption>
      </figure>
      <div className={classes.Publisher}>
        <span>by</span>
        <h4>{props.publisher}</h4>
      </div>
    </Link>
  );
};

export default bookmarkCard;
