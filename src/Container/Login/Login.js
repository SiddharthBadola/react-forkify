import React from "react";
import classes from "./Login.module.css";
import * as actions from "../../store/action/index";
import { connect } from "react-redux";
import Spinner from "../../Components/UI/Spinner/GradientSpinnerNeo/GradientSpinnerNeo";

class Login extends React.Component {
  state = {
    userName: "test@test.com",
    password: "123456",
    login: true,
  };

  componentDidMount() {
    if (this.props.auth) this.props.onSignout(this.props.history);
  }

  onUserNameChangeHandler = (e) => {
    this.setState({ userName: e.target.value });
  };

  onPasswordChangeHandler = (e) => {
    this.setState({ password: e.target.value });
  };

  onSubmitHandler = (e) => {
    e.preventDefault();
    const submitData = {
      email: this.state.userName,
      password: this.state.password,
      returnSecureToken: true,
    };
    this.props.onSubmit(submitData, this.state.login, this.props.history);
    this.setState({ userName: "", password: "" });
  };

  // For Create Account Button
  onClickHandler = () => {
    this.setState((prevState) => {
      return {
        login: !prevState.login,
      };
    });
    this.props.resetError();
  };

  render() {
    // console.log(this.props);

    let errorMessage = null;
    if (this.props.error)
      errorMessage = (
        <p className={classes.Error}>
          {this.props.error.response.data.error.message}
        </p>
      );

    let content = (
      <div className={classes.Container}>
        {errorMessage}
        <form onSubmit={this.onSubmitHandler}>
          <input
            type="text"
            placeholder="Username"
            onChange={this.onUserNameChangeHandler}
            value={this.state.userName}
          />
          <input
            type="password"
            placeholder="Password"
            onChange={this.onPasswordChangeHandler}
            value={this.state.password}
          />
          <button className={classes.Signin}>
            {this.state.login ? "LOGIN" : "SIGNUP"}
          </button>
        </form>
        <button onClick={this.onClickHandler}>
          {this.state.login ? "Create An Account" : "Already Have an Account"}
        </button>
      </div>
    );

    if (this.props.loading) content = <Spinner />;
    return <div className={classes.Login}>{content}</div>;
  }
}

const mapStateToPtops = (state) => {
  return {
    error: state.auth.error,
    loading: state.auth.loading,
    auth: Boolean(state.auth.token),
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onSubmit: (submitData, login, history) =>
      dispatch(actions.submit(submitData, login, history)),
    onSignout: (history) => dispatch(actions.authSignOut(history)),
    resetError: () => dispatch(actions.authResetError()),
  };
};

export default connect(mapStateToPtops, mapDispatchToProps)(Login);
