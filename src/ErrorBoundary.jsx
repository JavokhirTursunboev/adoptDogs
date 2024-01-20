import { Component } from "react";
import { Link } from "react-router-dom";

class ErrorBoundary extends Component {
  state = { hasError: false };

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error, info) {
    console.error("Error boundary component caught an error ", error, info);
  }

  render() {
    if (this.state.hasError) {
      return (
        <h2>
          There was an error with this list. <Link to={"/"}>Click here</Link> to go back to the homepage.
        </h2>
      );
    }
    return this.props.children;
  }
}

export default ErrorBoundary;
