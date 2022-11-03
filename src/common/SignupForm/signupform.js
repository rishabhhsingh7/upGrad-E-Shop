import React, { useState } from "react";
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
import "./SignupForm.css";
import loadData from "../../middleware/loadData";
import { Link } from "react-router-dom";

function SignUpForm(props) {
  const [email, setEmail] = useState("");
  const [firstname, setFirstName] = useState("");
  const [lastname, setLastName] = useState("");
  const [password, setPassword] = useState("");
  const [contactNumber, setContactNumber] = useState("");
  const [emailErrMessage, setEmailErrMessage] = useState("");
  const [firstNameErrMessage, setFirstNAmeErrMessage] = useState("");
  const [lastNameErrMessage, setLastNameErrMessage] = useState("");
  const [passwordErrMessage, setPassErrMessage] = useState("");
  const [contactErrMessage, setContactErrMessage] = useState("");
  const [responseMessage, setResponseMessage] = useState("");

  //email input field change handler
  const emailChange = (e) => {
    setResponseMessage("");
    var value = e.target.value;
    //validate the email string
    const regx = /^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-z]{2,6})/;

    //check if entered value is empty

    if (value === "") {
      setEmailErrMessage("required!");
    } else if (!regx.test(value)) {
      setEmailErrMessage("Enter a valid email!");
    } else {
      setEmailErrMessage("");
    }

    //else set email as the value
    setEmail(value);
  };

  //first name input field change handler
  const firstnameChange = (e) => {
    var value = e.target.value;

    //to check if the name field is empty if yes set required* if not set ""
    if (value === "") {
      setFirstNAmeErrMessage("required*");
    } else {
      setFirstNAmeErrMessage("");
    }

    setFirstName(value);
  };

  //last name input field change handler
  const lastNameChange = (e) => {
    var value = e.target.value;

    //to check if the name field is empty if yes set required* if not set ""
    if (value === "") {
      setLastNameErrMessage("required*");
    } else {
      setLastNameErrMessage("");
    }

    setLastName(value);
  };

  //password input field change handler
  const passwordChange = (e) => {
    var value = e.target.value;

    //to check if the name field is empty if yes set required* if not set ""
    if (value === "") {
      setPassErrMessage("required*");
    } else {
      setPassErrMessage("");
    }

    setPassword(value);
  };

  //Contact input field change handler
  const contactChange = (e) => {
    var value = e.target.value;

    debugger;
    //regex for validating phone number
    const regex = /^(\+\d{1,3}[- ]?)?\d{10}$/;

    //to check if the name field is empty if yes set required* if not set ""
    if (value === "") {
      setContactErrMessage("required*");
    } else if (!regex.test(value)) {
      console.log(value.length);
      setContactErrMessage("Please Enter a valid Number");
    } else {
      setContactErrMessage("");
    }

    setContactNumber(value);
  };

  const onsubmitHandler = () => {
    //check if any error message is there if yes stop code execution from submitting form
    if (
      emailErrMessage !== "" ||
      firstNameErrMessage !== "" ||
      lastNameErrMessage !== "" ||
      passwordErrMessage !== "" ||
      contactErrMessage !== ""
    ) {
      return;
    }

    //data to be sent to server
    const data = {
      email: email,
      first_name: firstname,
      last_name: lastname,
      password: password,
      contactNumber: contactNumber,
    };

    var url = props.baseURL + "/auth/signup";
    var method = "post";
    var headers = null;
    var params = null;
    debugger;

    loadData(url, method, data, headers, params)
      .then((res) => {
        console.log(res);
        if (res.status === 200) {
          setResponseMessage("Sign Up Successfully!");
        } else {
          console.log(res.status);
        }
      })
      .catch((err) => {
        setResponseMessage("Email already existed!");
      });
  };

  return (
    <Card className="signup-card">
      <CardHeader color="primary" title="Sign Up" />

      <CardContent>
        <FormControl>
          <InputLabel id="email-label" htmlFor="email">
            Email*
          </InputLabel>
          <Input
            id="email"
            type="text"
            value={email}
            placeholder="Please Enter Your Email"
            onChange={(e) => emailChange(e)}
          />
          <FormHelperText>
            <Typography style={{ color: "red" }}>{emailErrMessage}</Typography>
          </FormHelperText>
        </FormControl>
      </CardContent>

      <CardContent>
        <FormControl>
          <InputLabel id="firstname-label" htmlFor="firstname">
            First Name*
          </InputLabel>
          <Input
            id="name"
            type="text"
            value={firstname}
            placeholder="Enter First Name"
            onChange={(e) => firstnameChange(e)}
          />
          <FormHelperText>
            <Typography style={{ color: "red" }}>
              {firstNameErrMessage}
            </Typography>
          </FormHelperText>
        </FormControl>
      </CardContent>

      <CardContent>
        <FormControl>
          <InputLabel id="last_name-label" htmlFor="last_name">
            Last Name*
          </InputLabel>
          <Input
            id="last_name"
            type="text"
            value={lastname}
            placeholder="Please Enter Your Last Name"
            onChange={(e) => lastNameChange(e)}
          />
          <FormHelperText>
            <Typography style={{ color: "red" }}>
              {lastNameErrMessage}
            </Typography>
          </FormHelperText>
        </FormControl>
      </CardContent>

      <CardContent>
        <FormControl>
          <InputLabel id="contact-label" htmlFor="contact">
            Contact*
          </InputLabel>
          <Input
            id="contact"
            type="text"
            value={contactNumber}
            placeholder="Enter your Mobile Number"
            onChange={(e) => contactChange(e)}
          />
          <FormHelperText>
            <Typography style={{ color: "red" }}>
              {contactErrMessage}
            </Typography>
          </FormHelperText>
        </FormControl>
      </CardContent>

      <CardContent>
        <FormControl>
          <InputLabel id="password-label" htmlFor="password">
            Password*
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
            <Typography style={{ color: "red" }}>
              {passwordErrMessage}
            </Typography>
          </FormHelperText>
        </FormControl>
      </CardContent>

      <CardContent>
        <Typography>{responseMessage}</Typography>
      </CardContent>

      <CardContent>
        <Button
          variant="contained"
          color="primary"
          onClick={() => onsubmitHandler()}
        >
          <Typography>Submit</Typography>
        </Button>
      </CardContent>

      <CardContent>
        <Typography>Already have an account?</Typography>
        <Link to="/login" className="link">
          Login
        </Link>
      </CardContent>
    </Card>
  );
}

export default SignUpForm;
