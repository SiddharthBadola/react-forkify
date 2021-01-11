import React from "react";
import classes from "./NavigationItems.module.css";
import NavigationItem from "./NavigationItem/NavigationItem";
import PlusIcon from "../../Icons/PlusIcon";
import BookmarkIcon from "../../Icons/BookmarkIcon";

const navigationItems = (props) => {
  return (
    <ul className={classes.NavigationItems}>
      {props.auth ? (
        <React.Fragment>
          <NavigationItem content="Add Recipe" link="/my-recipe">
            <PlusIcon />
          </NavigationItem>
          <NavigationItem content="Bookmark" link="/bookmark">
            <BookmarkIcon />
          </NavigationItem>
        </React.Fragment>
      ) : null}

      <NavigationItem content={props.auth ? "LOGOUT" : "LOGIN"} link="/login" />
    </ul>
  );
};

export default navigationItems;
