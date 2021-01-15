import React from "react";
import classes from "./Input.module.css";

const input = (props) => {
  let inputElement = null;
  const attachedClass = [classes.Container, classes.Valid];
  if (!props.valid && props.touch) {
    attachedClass.pop();
    attachedClass.push(classes.Invalid);
  }

  switch (props.elementType) {
    case "number":
      inputElement = (
        <div className={attachedClass.join(" ")}>
          <input
            className={classes.Input}
            {...props.config}
            value={props.value}
            onChange={props.onChange}
          />
        </div>
      );
      break;
    case "email":
      inputElement = (
        <div className={attachedClass.join(" ")}>
          <input
            className={classes.Input}
            {...props.config}
            value={props.value}
            onChange={props.onChange}
          />
        </div>
      );
      break;
    default:
      inputElement = (
        <div className={attachedClass.join(" ")}>
          <input
            className={classes.Input}
            {...props.config}
            value={props.value}
            onChange={props.onChange}
          />
        </div>
      );
  }

  return inputElement;
};

export default input;
