import React from "react";
import classes from "./Paragraph.module.css";

const paragraph = (props) => {
  let p = (
    <p className={classes.Paragraph}>
      Start by searching for a recipe or an ingredient. Have fun!
    </p>
  );
  if (props.error)
    // p = <p className={classes.Paragraph}>{props.error.message}</p>;
    p = <p className={classes.Paragraph}>Try searching for pizza or pasta</p>;
  return p;
};

export default paragraph;
