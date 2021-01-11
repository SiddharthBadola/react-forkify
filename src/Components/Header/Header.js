import React from "react";
import classes from "./Header.module.css";
import SearchBar from "../../Container/SearchBar/SearchBar";
import NavigationItems from "./NavigationItems/NavigationItems";
import Logo from "./Logo/Logo";
import GlassModal from "../UI/Modal/GlassModal";
import Backdrop from "../UI/Backdrop/Backdrop";
import { Route } from "react-router-dom";
import Paragraph from "./Paragraph/Paragraph";

class Header extends React.Component {
  constructor(props) {
    super(props);
    this.searchDiv = React.createRef();
  }

  componentWillUnmount() {
    // console.log("[Header.js] in componentDidUnmount");
  }

  render() {
    const attachedClass = [classes.Header];
    if (this.props.fix) attachedClass.push(classes.HeaderFixed);

    let search = null;
    if (!this.props.show)
      search = (
        <div className={classes.SearchBar} ref={this.searchDiv}>
          <SearchBar
            // Passed on from App.js
            focus={() => this.props.focus(this.searchDiv.current)}
            // value={this.props.value}
          />
        </div>
      );

    return (
      <React.Fragment>
        <header className={attachedClass.join(" ")}>
          <div className={classes.Menu} onClick={this.props.showMenu}></div>
          <Logo />
          {search}
          <GlassModal show={this.props.show} click={this.modalCloseHandler}>
            <SearchBar
              change={this.props.changeHandler}
              submit={this.props.submitHandler}
              value={this.props.value}
            />
          </GlassModal>
          <Backdrop show={this.props.show} clicked={this.props.clicked} />
          <nav className={classes.Nav}>
            <NavigationItems auth={this.props.auth} />
          </nav>
        </header>
        <Route
          path="/"
          exact
          render={() => <Paragraph error={this.props.error} />}
        />
      </React.Fragment>
    );
  }
}

export default Header;
