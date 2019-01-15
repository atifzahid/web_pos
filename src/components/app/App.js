import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { connect } from "react-redux";
import "@trendmicro/react-sidenav/dist/react-sidenav.css";
import { signOutUser } from "../../redux/redux-token-auth-config";
import { ToastContainer } from "react-toastify";
import { Container } from "semantic-ui-react";
import Auth from "../authentication/auth";
import Navigation from "../company/navigation";
import AdminApp from "../admin/adminApp";
import { apiSubDomain, pathName } from "../../utils/api-config";

import "react-toastify/dist/ReactToastify.css";
import "./App.css";

function App({ isSignedIn, isLoading, signOutUser, isSuperAdmin }) {
  if (isLoading) {
    return (
      <img className="loading_img" src="./images/cart.gif" alt="Loading...." />
    );
  } else if (apiSubDomain === "www" || pathName === "/admin") {
    if (isSignedIn && !isSuperAdmin) {
      signOutUser();
    }
    return <AdminApp />;
  }
  return (
    <Router>
      <div className="App">
        <ToastContainer />
        <div>{isSignedIn && <Navigation />}</div>
        <Container className="marginTop" textAlign="justified">
        <div>{!isSignedIn && <Auth />}</div>
        </Container>
      </div>
    </Router>
  );
}

function mapStateToProps(state) {
  const {
    isSignedIn,
    isLoading,
    attributes
  } = state.reduxTokenAuth.currentUser;
  const { isSuperAdmin } = attributes;
  return { isSignedIn, isLoading, isSuperAdmin };
}

export default connect(
  mapStateToProps,
  { signOutUser }
)(App);
