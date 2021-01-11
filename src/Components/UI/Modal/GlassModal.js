import React from "react";
import classes from "./GlassModal.module.css";

const modal = (props) => {
  let attachedClass = [classes.Modal, classes.Hide];
  if (props.show) {
    attachedClass.pop();
    attachedClass.push(classes.Show);
  }
  return <div className={attachedClass.join(" ")}>{props.children}</div>;
};

export default modal;
