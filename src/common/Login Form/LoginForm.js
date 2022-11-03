import React from "react";
import {
  Card,
  CardHeader,
  CardContent,
  Typography,
  Input,
  InputLabel,
  FormHelperText,
  FormControl,
  Button,
} from "@material-ui/core";
import { useState } from "react";
import { btoa } from "b2a";
import axios from "axios";
import { useLocation, useHistory, Link } from "react-router-dom";
import "./LoginForm.css";
import Header from "../header/Header";

///Login form component
function LoginForm(props) {
  const location = useLocation();
  const history = useHistory();
  console.log(history);

  console.log(location);
  const [email, setEmail] = useState("");
  const [emailErrMessage, setEmailErrMessage] = useState("");
  const [password, setPassword] = useState("");
  const [passErrMessage, setPassErrMessage] = useState("");
  //error or success message
  const [responseMessage, setResMessage] = useState("");

  //when email value field changes
  const emailChange = (event) => {
    var value = event.target.value;
    //validate the email string
    const regx = /^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-z]{2,6})/;

    //check if entered value is empty
    if (value === "") {
      setEmailErrMessage("required");
    } else if (!regx.test(value)) {
      setEmailErrMessage("Enter a valid email!");
    } else {
      setEmailErrMessage("");
    }

    //else set email as the value
    setEmail(value);
  };

  //when password value field changes
  const passwordChange = (e) => {
    var value = e.target.value;

    //check if entered value is empty
    if (value === "") {
      setPassErrMessage("required*");
    } else {
      setPassErrMessage("");
    }

    //else set email as the value
    setPassword(value);
  };

  //Handling Login button click
  const handleLogin = () => {
    if (emailErrMessage !== "" || passErrMessage !== "") {
      return;
    }

    //encoded the password before sending to server
    var data = {
      email: email,
      password: btoa(password),
    };
    //else we post login the user to authenticate with the server

    axios.post(`${props.baseURL}/auth/login`, data).then((response) => {
      if (response.status === 200) {
        debugger;
        window.sessionStorage.setItem(
          "x-auth-token",
          response.headers["x-auth-token"]
        );
        window.localStorage.setItem("isLoggedIn", true);
        window.sessionStorage.setItem("role", response.data.role);
        history.push("/products");
      } else {
        setResMessage(response.data.message);
      }
    });
  };

  ///return
  return (
    <div>
      <Header baseURL={props.baseURL} />
      <Card className="loginCardStyle">
        <CardHeader title="Login" />

        <CardContent>
          <FormControl>
            <InputLabel id="email-label" htmlFor="email">
              Email
            </InputLabel>
            <Input
              id="email"
              type="text"
              value={email}
              placeholder="Please Enter Your Email"
              onChange={(e) => emailChange(e)}
            />
            <FormHelperText>
              <Typography style={{ color: "red" }}>
                {emailErrMessage}
              </Typography>
            </FormHelperText>
          </FormControl>
        </CardContent>

        <CardContent>
          <FormControl>
            <InputLabel id="password-label" htmlFor="password">
              Password
            </InputLabel>
            <Input
              id="password"
              type="password"
              value={password}
              placeholder="Please Enter Your Password"
              onChange={(e) => {
                passwordChange(e);
              }}
            />
            <FormHelperText>
              <Typography style={{ color: "red" }}>{passErrMessage}</Typography>
            </FormHelperText>
          </FormControl>
        </CardContent>

        <CardContent>
          <Typography>{responseMessage}</Typography>
        </CardContent>

        <CardContent>
          <Button variant="contained" color="primary" onClick={handleLogin}>
            <Typography>Login</Typography>
          </Button>
        </CardContent>

        <CardContent>
          <Link to="/signup" className="link">
            Sign Up
          </Link>
        </CardContent>
      </Card>
    </div>
  );
}

export default LoginForm;
