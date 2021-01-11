import React from "react";
import classes from "./BookmarkCard.module.css";
import { Link } from "react-router-dom";
// import Ingredients from "../../RecipeDisplay/Ingredients/Ingredients";

const bookmarkCard = (props) => {
  return (
    // <Link to={"/recipe/summary" + props.id} className={classes.BookmarkCard}>
    <Link to={"/summary" + props.id} className={classes.BookmarkCard}>
      <figure>
        <img src={props.imageUrl} alt="huge" />
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
      {/* <div className={classes.BackSide}>
        <Ingredients ingredients={props.ingredients} />
      </div> */}
    </Link>
  );
};

export default bookmarkCard;
