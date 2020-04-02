import React from "react";
class SampleComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  /**
   * When Sample Component Did Mount
   * callback this function
   */
  componentDidMount() {
    return console.log("Sample Component Did Mount");
  }

  /**
   * When Sample Component Will UnMount
   * callback this function
   */
  componentWillUnmount() {
    return console.log("Sample Component Did UnMount");
  }

  render() {
    return (
      <div>
        <h1 className="greeting">Sample Component RENDER</h1>
      </div>
    );
  }
}
export default SampleComponent;
