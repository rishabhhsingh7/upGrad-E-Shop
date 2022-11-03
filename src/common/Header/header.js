import React from "react";
import AppBar from "@material-ui/core/AppBar";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import { Link } from "react-router-dom";
import { useState, useEfect } from "react";
import "./Header.css";

function Header(props) {
  //Handling Logout
  const onLogout = () => {
    window.sessionStorage.clear();
  };
  const appBar = {
    height: "60px",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  };

  const logo = {
    fontSize: "3em",
    margin: "2px 1%",
    heigth: "1em",
    width: "5%",
  };
  return (
    <AppBar style={appBar}>
      {/**creating the logo */}
      <ShoppingCartIcon style={logo} />
      {(() => {
        //check if the user is not loggedin
        if (
          !window.sessionStorage.getItem("isLoggedIn") ||
          window.sessionStorage.getItem("isLoggedIn") === undefined
        ) {
          return (
            <div
              className="header-links"
              style={{ justifyContent: "flex-end" }}
            >
              <ul className="links-container">
                <li>
                  <Link to="/login" className="links">
                    Sign In
                  </Link>
                </li>
                <li>
                  <Link to="/signup" className="links">
                    Sign Up
                  </Link>
                </li>
              </ul>
            </div>
          );
        } else {
          return (
            <div className="header-links">
              <input
                type="text"
                placeholder="Search Products"
                className="search-bar"
              />
              <ul
                className="links-container"
                style={{
                  width:
                    window.sessionStorage.getItem("role") === "admin"
                      ? "20%"
                      : "15%",
                }}
              >
                <li>
                  <Link to="/" className="links">
                    Home
                  </Link>
                </li>
                {window.sessionStorage.getItem("role") === "admin" &&
                  (() => {
                    return (
                      <li>
                        <Link to="/addproduct" className="links">
                          Add Product
                        </Link>
                      </li>
                    );
                  })()}
                <li>
                  <a
                    onClick={() => {
                      onLogout();
                    }}
                  >
                    Logout
                  </a>
                </li>
              </ul>
            </div>
          );
        }
      })()}
    </AppBar>
  );
}

export default Header;
