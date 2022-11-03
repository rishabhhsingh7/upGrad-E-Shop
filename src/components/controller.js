import { Component } from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";
import Products from "./products/Products";
import LoginForm from "../common/loginform/LoginForm";
import SignUpForm from "../common/signupform/SignupForm";
import ProductDetail from "./productdetail/ProductDetail";
import Order from "./order/Order";

class Controller extends Component {
  baseURL = "http://localhost:8000/api";
  render() {
    return (
      <Router>
        <Switch>
          <Route
            path="/"
            exact
            render={() => {
              return window.sessionStorage.getItem("isLoggedIn") ==
                undefined ? (
                <Redirect to="/login" />
              ) : (
                <Redirect to="/products" />
              );
            }}
          />
          <Route
            path="/login"
            exact
            render={() => {
              return <LoginForm baseURL={this.baseURL} />;
            }}
          />
          <Route
            path="/signup"
            exact
            render={() => {
              return <SignUpForm baseURL={this.baseURL} />;
            }}
          />
          <Route
            path="/products/:id"
            exact
            render={() => {
              return <ProductDetail baseURL={this.baseURL} />;
            }}
          />
          <Route
            path="/products/:id/order"
            render={() => {
              return <Order baseURL={this.baseURL} />;
            }}
          />
          <Route
            path="/products"
            render={() => {
              return <Products baseURL={this.baseURL} />;
            }}
          />
        </Switch>
      </Router>
    );
  }
}

export default Controller;
