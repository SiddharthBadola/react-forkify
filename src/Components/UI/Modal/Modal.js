import React from "react";
import classes from "./Modal.module.css";

const modal = (props) => {
  const attachedClass = [classes.Modal, classes.Hide];
  if (props.show) attachedClass.pop();

  return <div className={attachedClass.join(" ")}>{props.children}</div>;
};

export default modal;
