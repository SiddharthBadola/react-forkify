import React from "react";
import classes from "./NavigationItem.module.css";
import { NavLink } from "react-router-dom";

const navigationItem = (props) => {
  // console.log(props.children);
  let child = null;
  if (props.children)
    child = <div className={classes.Icon}>{props.children}</div>;
  return (
    <li key={props.content} className={classes.NavigationItem}>
      <NavLink
        to={props.link}
        className={classes.Link}
        activeClassName={classes.Active}
      >
        {child}
        <div>{props.content}</div>
      </NavLink>
    </li>
  );
};

export default navigationItem;
