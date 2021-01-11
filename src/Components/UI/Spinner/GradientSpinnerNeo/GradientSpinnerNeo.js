import React from "react";
import classes from "./GradientSpinnerNeo.module.css";

const gradientSpinnerNeo = (props) => {
  return (
    <div className={classes.Loader}>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
    </div>
  );
};

export default gradientSpinnerNeo;
