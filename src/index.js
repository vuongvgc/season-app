import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import SeasonDisplay from "./SeasonDisplay";
import Spinner from "./Spinner";
export function App() {
  const [lat, setLat] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");
  useEffect(() => {
    window.navigator.geolocation.getCurrentPosition(
      (position) => setLat(position.coords.latitude),
      (err) => setErrorMessage(err.message)
    );
  }, []);
  let renderContent = () => {
    if (errorMessage) {
      return <div>Error: {errorMessage}</div>;
    }
    if (lat) {
      return <SeasonDisplay lat={lat} />;
    }
    return <Spinner message="Please accept location request" />;
  };
  return <div className="border red">{renderContent()}</div>;
}

// class App extends React.Component {
//   state = { lat: null, errorMessage: '' };

//   componentDidMount() {
//     window.navigator.geolocation.getCurrentPosition(
//       position => this.setState({ lat: position.coords.latitude }),
//       err => this.setState({ errorMessage: err.message })
//     );
//   }

//   renderContent() {
//     if (this.state.errorMessage && !this.state.lat) {
//       return <div>Error: {this.state.errorMessage}</div>;
//     }

//     if (!this.state.errorMessage && this.state.lat) {
//       return <SeasonDisplay lat={this.state.lat} />;
//     }

//     return <Spinner message="Please accept location request" />;
//   }

//   render() {
//     return <div className="border red">{this.renderContent()}</div>;
//   }
// }

ReactDOM.render(<App />, document.querySelector("#root"));
