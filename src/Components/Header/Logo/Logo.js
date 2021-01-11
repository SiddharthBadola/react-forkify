import React from "react";
import classes from "./Logo.module.css";
import { Link } from "react-router-dom";

const logo = (props) => (
  <div className={classes.Logo}>
    <Link to="/">
      <h4>LOGO</h4>
    </Link>
  </div>
);

export default logo;
