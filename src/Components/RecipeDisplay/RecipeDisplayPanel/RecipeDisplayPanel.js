import React from "react";
import classes from "./RecipeDisplayPanel.module.css";
import BookmarkIcon from "../../Icons/BookmarkIcon";

const recipeDisplayPanel = (props) => {
  const attachedClasses = [classes.Bookmark];
  if (props.isBookmarked) attachedClasses.push(classes.True);
  if (!props.auth && attachedClasses.includes(classes.True))
    attachedClasses.pop();

  return (
    <div className={classes.RecipeDisplayPanel}>
      <div className={classes.Time}>
        {" "}
        <strong>60</strong> Minute
      </div>
      <div className={classes.Serving}>
        <strong>4</strong> Servings
        {/* <button>-</button>
        <button>+</button> */}
      </div>
      {props.userRecipe ? null : (
        <div
          className={attachedClasses.join(" ")}
          onClick={() =>
            props.updateBookmark(
              props.id,
              props.isBookmarked,
              props.auth,
              props.token
            )
          }
        >
          <BookmarkIcon />
        </div>
      )}
    </div>
  );
};

export default recipeDisplayPanel;
