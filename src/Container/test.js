import React from "react";
import App from "../App";

class Test extends React.Component {
  state = {
    show: false,
  };

  clickHandler = () => {
    const flag = this.state.show;
    this.setState({ show: !flag });
  };
  render() {
    let app = <p>Testing</p>;

    if (this.state.show) app = <App />;

    return (
      <div>
        <button onClick={this.clickHandler}>Show</button>
        {app}
      </div>
    );
  }
}

export default Test;
