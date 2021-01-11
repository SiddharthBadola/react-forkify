import React from "react";

import classes from "./SideDrawer.module.css";
import Logo from "../Logo/Logo";
import NavigationItems from "../NavigationItems/NavigationItems";
import Backdrop from "../../UI/Backdrop/Backdrop";

const sideDrawer = (props) => {
  const attachedClass = [classes.SideDrawer];
  if (props.show) attachedClass.push(classes.Open);
  if (!props.show) attachedClass.push(classes.Close);
  return (
    <React.Fragment>
      <div className={attachedClass.join(" ")}>
        <div onClick={props.click}>
          <div className={classes.Logo}>
            <Logo />
          </div>
          <nav>
            <NavigationItems auth={props.auth} />
          </nav>
        </div>
      </div>
      <Backdrop show={props.show} clicked={props.clicked} />
    </React.Fragment>
  );
};

export default sideDrawer;
