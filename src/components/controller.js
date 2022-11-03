import { Component, Fragment } from "react";
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
import ModifyProduct from "./modifyproduct/ModifyProduct";
import AddProduct from "./addproduct/AddProduct";

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
              return window.localStorage.getItem("isLoggedIn") == undefined ? (
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
            exact
            render={() => {
              return <Order baseURL={this.baseURL} />;
            }}
          />
          <Route
            path="/products"
            exact
            render={() => {
              return <Products baseURL={this.baseURL} />;
            }}
          />
          <Route
            path="/modifyproduct/:id"
            exact
            render={() => {
              return <ModifyProduct baseURL={this.baseURL} />;
            }}
          />
          <Route
            path="/addproduct"
            exact
            render={() => {
              return <AddProduct baseURL={this.baseURL} />;
            }}
          />
        </Switch>
      </Router>
    );
  }
}

export default Controller;
