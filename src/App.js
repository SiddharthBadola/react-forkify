import React from "react";
// import axios from "axios";
import classes from "./App.module.css";
import Header from "./Components/Header/Header";
import RecipeListItems from "./Container/RecipeListItems/RecipeListItems";
// import RecipeDisplay from "./Components/RecipeDisplay/RecipeDisplay";
import SideDrawer from "./Components/Header/SideDrawer/SideDrawer";
import * as actions from "./store/action/index";
import { connect } from "react-redux";
import { Route, Switch } from "react-router-dom";
import Login from "./Container/Login/Login";
import Bookmark from "./Container/Bookmark/Bookmark";
import RecipeDisplay from "./Container/RecipeDisplay/RecipeDisplay";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.testRef = React.createRef();
    this.observer = null;
  }
  state = {
    // recipe: null,
    // input: "",
    // error: null,
    fix: false,
    // loading: falsprops loading: false,
    // currentPage: 1,
    // recipeSummary: null,
    showSideDrawer: false,
    // searching: false,
  };

  componentDidMount() {
    // console.log("[App.js] in componentDidMount");
    // const tog = !this.state.toggle;

    const options = {
      root: null,
      rootMargin: "80px 0px 0px 0px",
      threshold: [0.5],
    };
    this.observer = new IntersectionObserver((entry, observer) => {
      // console.log(entry);
      if (entry[0].isIntersecting) this.setState({ fix: false });

      if (!entry[0].isIntersecting) this.setState({ fix: true });
    }, options);

    this.observer.observe(this.testRef.current);

    this.props.onInit();
  }

  inputChangeHandler = (e) => {
    this.setState({ input: e.target.value });
  };

  // submitInputHandler = (e) => {
  //   e.preventDefault();
  //   if (!this.state.input) return;
  //   console.log(this.state.input);
  //   this.props.getRecipe(this.state.input, this.props.searching);
  //   //   document.getElementById("Header-Input").blur();
  //   // this.setState({ loading: true });
  //   //   thispropstate({ loading: true });
  //   //   axios
  //   //     .get(`https://forkify-api.herokuapp.com/api/search?q=${this.state.input}`)
  //   //     .then((res) => {
  //   //       console.log(res.data);
  //   //       if (this.state.searching) {
  //   //         this.setState({
  //   //           recipe: res.data,
  //   //           error: null,
  //   //          loading: false,
  //   //     loading: false,
  //   //           searching: false,
  //   //         });
  //   //         document.getElementById("Header-Input").value = "";
  //   //       } else {
  //   //this.setState({ recipe: res.data, error: null, loading: false });
  //   //         this.setState({ recipe: res.data, eprops null, loading: false });
  //   //         document.getElementById("Header-Input").value = "";
  //   //       }
  //   //     })
  //   //     .catch((err) => {
  //   //       console.log(err);
  //   //       document.getElementById("Header-Input").value = "";
  //   //       if (this.state.searching) {
  //   //this.setState({ error: err, loading: false, searching: false });
  //   //         this.setState({ props: err, loading: false, searching: false });
  //   //         document.getElementById("Header-Input").value = "";
  //   //       } else {
  //   //this.setState({ error: err, loading: false });
  //   //         this.setState({ props: err, loading: false });
  //   //         document.getElementById("Header-Input").value = "";
  //   //       }
  //   //     });
  // };

  // pageIncrementHandler = () => {
  //   const page = this.state.currentPage;
  //   this.setState({ currentPage: page + 1 });
  // };

  // pageDecrementHandler = () => {
  //   const page = this.state.currentPage;
  //   this.setState({ currentPage: page - 1 });
  // };

  // displayRecipeSummaryHandler = (id) => {
  //   return function () {
  //     axios
  //       .get(`https://forkify-api.herokuapp.com/api/get?rId=${id}`)
  //       .then((res) => {
  //         // console.log(res.data.recipe);
  //         this.setState({ recipeSummary: res.data.recipe });
  //       })
  //       .catch((err) => {
  //         console.log(err);
  //         this.setState({ error: err });
  //       });
  //   }.bind(this);
  // };

  componentWillUnmount() {
    // console.log("[App.js] componentDidUnmount");
    this.observer.unobserve(this.testRef.current);
  }

  sideDrawerHandler = () => {
    this.setState((prevState) => {
      return { showSideDrawer: !prevState.showSideDrawer };
    });
  };
  // To close the side handler when any one of its nav link is clicked
  sideDrawerHandlerOnDiv = () => {
    this.setState({ showSideDrawer: false });
  };

  render() {
    let filler = null;

    if (this.state.fix) filler = <div></div>;

    const home = (
      <React.Fragment>
        <Header
          fix={this.state.fix}
          showMenu={this.sideDrawerHandler}
          show={this.props.searching}
          clicked={this.props.onExitModal}
          focus={this.props.checkSearchState}
          error={this.props.error}
          auth={this.props.auth}
        />
        {filler}
        <div className={classes.Test} ref={this.testRef}></div>
      </React.Fragment>
    );
    return (
      <div className={classes.App}>
        <SideDrawer
          show={this.state.showSideDrawer}
          // To close side drawer on click on backdrop
          clicked={this.sideDrawerHandler}
          auth={this.props.auth}
          // To close the side handler when any one of its nav link is clicked
          click={this.sideDrawerHandlerOnDiv}
        />

        <Route path="/" render={() => home} />

        <Switch>
          <Route path="/recipe" component={RecipeListItems} />
          <Route path="/login" component={Login} />
          <Route path="/bookmark" component={Bookmark} />
          <Route path="/summary:id" component={RecipeDisplay} />
        </Switch>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    recipeList: state.search.recipeList,
    // recipeSummary: state.recipeList.recipeSummary,
    error: state.search.error,
    searching: state.search.searching,
    loading: state.search.loading,
    auth: Boolean(state.auth.token),
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    checkSearchState: (element) => dispatch(actions.checkSearchState(element)),
    onExitModal: () => dispatch(actions.exitSearchModal()),
    onInit: () => dispatch(actions.checkStateToken()),
    // onFetchBookmarkOnInit: (tokken, userId)=>dispatch(actions.fetchBookmarkOnInit(tokken,userId))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
