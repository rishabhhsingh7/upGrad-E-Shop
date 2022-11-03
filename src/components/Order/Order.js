import React, { useState, useEffect, Fragment } from "react";
import Header from "../../common/header/Header";
import {
  Stepper,
  Step,
  StepLabel,
  Typography,
  Button,
  Card,
  CardContent,
  CardHeader,
  Select,
  InputLabel,
  MenuItem,
  FormControl,
  Input,
  FormHelperText,
} from "@material-ui/core";
import "./Order.css";
import loadData from "../../middleware/loadData";
import { useHistory, useParams } from "react-router";
import { Check } from "@material-ui/icons";

//the three steps in the stepper
const steps = ["Product Details", "Address Details", "Order Details"];

function Order(props) {
  //state to controlled the active steps default is 0
  const history = useHistory();
  const { id } = useParams();
  const [activeStep, setActiveStep] = useState(0);
  const [product, setProduct] = useState({});
  const [quantity, setQuantity] = useState(
    Number(history.location.search.split("=")[1])
  );
  const [addresses, setAddresses] = useState([]);
  const [selectedAddress, setSelectedAddress] = useState();
  const [name, setName] = useState("");
  const [nameRequired, setNameRequired] = useState("");
  const [street, setStreet] = useState("");
  const [streetRequired, setStreetRequired] = useState("");
  const [landmark, setLandmark] = useState("");
  const [city, setCity] = useState("");
  const [cityRequired, setCityRequired] = useState("");
  const [state, setState] = useState("");
  const [stateRequired, setStateRequired] = useState("");
  const [zipCode, setZipCode] = useState("");
  const [zipCodeRequired, setZipCodeRequired] = useState("");
  const [contactNumber, setContactNumber] = useState("");
  const [contactNumberRequired, setContactRequired] = useState("");
  const [SuccessfullMessage, setSuccessfullMessage] = useState("");

  const handleNameChange = (event) => {
    var value = event.target.value;
    if (value === "") {
      setNameRequired("required!");
    } else {
      setNameRequired("");
    }

    setName(value);
  };

  const handleStreetChange = (event) => {
    var value = event.target.value;
    if (value === "") {
      setStreetRequired("required!");
    } else {
      setStreetRequired("");
    }

    setStreet(value);
  };

  const handleLandmarkChange = (event) => {
    var value = event.target.value;

    setLandmark(value);
  };

  const handleCityChange = (event) => {
    var value = event.target.value;
    if (value === "") {
      setCityRequired("required!");
    } else {
      setCityRequired("");
    }

    setCity(value);
  };

  const handleStateChange = (event) => {
    var value = event.target.value;
    if (value === "") {
      setStateRequired("required!");
    } else {
      setStateRequired("");
    }

    setState(value);
  };

  const handleContactChange = (event) => {
    var value = event.target.value;
    const regex = /^(\+\d{1,3}[- ]?)?\d{10}$/;
    if (value === "") {
      setContactRequired("required!");
    } else if (!regex.test(value)) {
      setContactRequired("Enter a valid mobile number");
    } else {
      setContactRequired("");
    }

    setContactNumber(value);
  };

  const handleZipCodeChange = (event) => {
    var value = event.target.value;
    const regex = /^\d{6}$/;

    if (value === "") {
      setZipCodeRequired("required!");
    } else if (!regex.test(value)) {
      setZipCodeRequired("Enter a valid zip code!");
    } else {
      setZipCodeRequired("");
    }

    setZipCode(value);
  };

  //function to handle add adress to database
  const addAddress = () => {
    if (
      nameRequired !== "" ||
      streetRequired !== "" ||
      cityRequired !== "" ||
      stateRequired !== "" ||
      contactNumberRequired !== "" ||
      zipCodeRequired !== ""
    ) {
      return;
    }

    //else submit data to Db
    var data = {
      name: name,
      street: street,
      landmark: landmark,
      city: city,
      state: state,
      contactNumber: contactNumber,
      zipCode: zipCode,
    };

    loadData(
      `${history.baseURL}/address`,
      "post",
      data,
      {
        Authorization: `Bearer ${window.sessionStorage.getItem(
          "x-auth-token"
        )}`,
      },
      null
    )
      .then((response) => {
        console.log(response);
        setSelectedAddress(response.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  //function to handle the confirmation of order
  const handleConfirmOrder = () => {
    //odrder data to be sent to db
    var data = {
      userId: selectedAddress.user._id,
      addressId: selectedAddress._id,
      productId: product.productId,
      amount: product.price * quantity,
    };

    //send the data to server
    loadData(
      `${history.baseURL}/orders`,
      "post",
      data,
      {
        Authorization: `Bearer ${window.sessionStorage.getItem(
          "x-auth-token"
        )}`,
      },
      null
    )
      .then((response) => {
        if (response.status === 200) {
          setSuccessfullMessage("Order placed Successfully!");
          setTimeout(() => {
            history.push("/products");
          }, 6000);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  //function to handele the next step click
  const handleNext = () => {
    //if the step is the last step
    if (activeStep === steps.length - 1) {
      handleConfirmOrder();
    } else if (activeStep === 1) {
      //check if address had been selected or not
      if (selectedAddress === undefined) {
        alert("Please select shipping address!");
        return;
      }
    }

    //else move to next step
    setActiveStep(activeStep + 1);
  };

  //function to handle the back click
  const handleBack = () => {
    //decrement the active step index
    setActiveStep(activeStep - 1);
  };

  const setQuantityFn = (value) => {
    //change the quantity of product ordered
    setQuantity(value);
    history.push(`${history.location.pathname}?quantity=${value}`);
  };

  //load the data from the server
  useEffect(() => {
    //load the product data from the server
    loadData(`${history.baseURL}/products/${id}`, "get", null, null, null)
      .then((response) => {
        setProduct(response.data[0]);
      })
      .catch((err) => {
        console.log(err);
      });

    //get the address of the user
    loadData(
      `${history.baseURL}/address`,
      "get",
      null,
      {
        Authorization: `Bearer ${window.sessionStorage.getItem(
          "x-auth-token"
        )}`,
      },
      null
    )
      .then((response) => {
        setAddresses(response.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div className="main-container">
      <Header baseURL={props.baseURL} />
      <div className="Content">
        <div>
          <Stepper activeStep={activeStep} className="stepper">
            {steps.map((label, index) => {
              const stepProps = {};
              const labelProps = {};
              return (
                <Step key="label" {...stepProps}>
                  <StepLabel {...labelProps}>{label}</StepLabel>
                </Step>
              );
            })}
          </Stepper>
        </div>
        {
          //poduct detail component step 1

          activeStep === 0 &&
            (() => {
              return (
                <div className="step-content">
                  <div className="container image-container">
                    <img
                      src={product.imageURL}
                      alt={product.name}
                      className="image"
                    />
                  </div>
                  <div className="container details-container">
                    {/* product Name
                               Manufacturer
                               Price
                               in stock or out of stock
                               available items
                               About this item
                           */}

                    <Typography variant="h4">{product.name}</Typography>
                    <hr style={{ fontSize: "2px", width: "100%" }} />
                    <Typography>
                      <b>Manufacturer:</b> {product.manufacturer}
                    </Typography>
                    <Typography>M.R.P-{product.price}</Typography>
                    <div>
                      <label htmlFor="quantity-input">
                        <b>Quantity: </b>
                      </label>
                      <input
                        id="quantity-input"
                        value={quantity}
                        type="number"
                        placeholder="QtY"
                        className="quantity-input"
                        onChange={(event) => {
                          setQuantityFn(event.target.value);
                        }}
                        min={1}
                        max={product.availableItems}
                      />
                    </div>
                    <hr style={{ fontSize: "2px", width: "100%" }} />
                    <Typography variant="h6">
                      <b>About this item</b>
                    </Typography>
                    <Typography variant="p">{product.description}</Typography>
                  </div>
                </div>
              );
            })()
        }

        {
          //shipping address component step 2

          activeStep === 1 &&
            (() => {
              return (
                <div className="step-content" style={{ display: "block" }}>
                  <Card className="card">
                    {addresses.length !== 0
                      ? (() => {
                          return (
                            <CardContent>
                              <InputLabel id="select-address-label">
                                Select Shipping Address
                              </InputLabel>
                              <Select
                                labelId="select-address-label"
                                id="select-address"
                                value={selectedAddress}
                                onChange={(event) =>
                                  setSelectedAddress(event.target.value)
                                }
                                variant="outlined"
                                style={{ width: "90%" }}
                              >
                                {addresses.map((address) => (
                                  <MenuItem key={address._id} value={address}>
                                    {address.name +
                                      " " +
                                      address.street +
                                      " " +
                                      address.landmark +
                                      " " +
                                      address.city +
                                      " " +
                                      address.state +
                                      " Zip-code: " +
                                      address.zipCode +
                                      " contact:" +
                                      address.contactNumber}
                                  </MenuItem>
                                ))}
                              </Select>
                            </CardContent>
                          );
                        })()
                      : (() => {
                          return (
                            <Typography>
                              Please Add Shipping Address!
                            </Typography>
                          );
                        })()}
                  </Card>
                  <Card className="card">
                    <CardContent className="form-container">
                      <Typography>Add new shipping address</Typography>

                      <FormControl required className="form">
                        <InputLabel htmlFor="name">Enter Full Name</InputLabel>
                        <Input
                          id="name"
                          type="text"
                          value={name}
                          placeholder="Enter your Name"
                          onChange={handleNameChange}
                        />
                        <FormHelperText>
                          <Typography style={{ color: "red" }}>
                            {nameRequired}
                          </Typography>
                        </FormHelperText>
                      </FormControl>

                      <FormControl required>
                        <InputLabel htmlFor="street">Street</InputLabel>
                        <Input
                          id="street"
                          type="text"
                          value={street}
                          placeholder="Enter street"
                          onChange={handleStreetChange}
                        />
                        <FormHelperText>
                          <Typography style={{ color: "red" }}>
                            {streetRequired}
                          </Typography>
                        </FormHelperText>
                      </FormControl>

                      <FormControl>
                        <InputLabel htmlFor="landmark">Landmark</InputLabel>
                        <Input
                          id="landmark"
                          type="text"
                          value={landmark}
                          onChange={handleLandmarkChange}
                        />
                      </FormControl>

                      <FormControl>
                        <InputLabel htmlFor="city">City</InputLabel>
                        <Input
                          id="city"
                          type="text"
                          value={city}
                          onChange={handleCityChange}
                        />
                        <FormHelperText>
                          <Typography style={{ color: "red" }}>
                            {cityRequired}
                          </Typography>
                        </FormHelperText>
                      </FormControl>

                      <FormControl>
                        <InputLabel htmlFor="state">State</InputLabel>
                        <Input
                          id="state"
                          type="text"
                          value={state}
                          onChange={handleStateChange}
                        />
                        <FormHelperText>
                          <Typography style={{ color: "red" }}>
                            {stateRequired}
                          </Typography>
                        </FormHelperText>
                      </FormControl>

                      <FormControl>
                        <InputLabel htmlFor="contact">
                          Contact Number
                        </InputLabel>
                        <Input
                          id="contact"
                          type="text"
                          value={contactNumber}
                          onChange={handleContactChange}
                        />
                        <FormHelperText>
                          <Typography style={{ color: "red" }}>
                            {contactNumberRequired}
                          </Typography>
                        </FormHelperText>
                      </FormControl>

                      <FormControl>
                        <InputLabel htmlFor="zipCode">Zip Code</InputLabel>
                        <Input
                          id="zipCode"
                          type="text"
                          value={zipCode}
                          onChange={handleZipCodeChange}
                        />
                        <FormHelperText>
                          <Typography style={{ color: "red" }}>
                            {zipCodeRequired}
                          </Typography>
                        </FormHelperText>
                      </FormControl>
                    </CardContent>
                    <CardContent
                      style={{ justifyContent: "end", display: "flex" }}
                    >
                      <Button
                        variant="contained"
                        onClick={() => {
                          addAddress();
                        }}
                      >
                        Add Address
                      </Button>
                    </CardContent>
                  </Card>
                </div>
              );
            })()
        }

        {activeStep === 2 &&
          (() => {
            return (
              <div className="step-content">
                <div className="order-image-content">
                  <img
                    src={product.imageURL}
                    alt={product.name}
                    className="order-image"
                  />
                </div>
                <Card className="card order-card">
                  <CardHeader
                    style={{
                      fontSize: "bold",
                      display: "flex",
                      justifyContent: "center",
                    }}
                    title="Order summary"
                  />
                  <hr style={{ fontSize: "2px", width: "100%" }} />
                  <CardContent>
                    <Typography>
                      <b>Name:</b> {selectedAddress.name}
                    </Typography>
                  </CardContent>
                  <CardContent>
                    <Typography>
                      <b>Shipping address:</b>{" "}
                      {`${selectedAddress.street} ${selectedAddress.landmark} ${selectedAddress.state} ${selectedAddress.city} Zip-code-${selectedAddress.zipCode}`}
                    </Typography>
                  </CardContent>
                  <CardContent>
                    <Typography>
                      <b>Contact Number: </b>
                      {selectedAddress.contactNumber}
                    </Typography>
                  </CardContent>
                  <CardContent>
                    <Typography>
                      <b>Product:</b> {product.name}
                    </Typography>
                  </CardContent>
                  <CardContent>
                    <Typography>
                      <b>Manufacturer:</b> {product.manufacturer}
                    </Typography>
                  </CardContent>
                  <CardContent>
                    <Typography>
                      <b>Quantity:</b> {quantity}
                    </Typography>
                  </CardContent>
                  <CardContent>
                    <Typography>
                      <b>Price/item:</b> {product.price}
                    </Typography>
                  </CardContent>
                  <hr style={{ fontSize: "2px", width: "100%" }} />
                  <CardContent>
                    <Typography variant="h6">
                      <b>Total: M.R.P-</b> {quantity * product.price}
                    </Typography>
                  </CardContent>
                </Card>
              </div>
            );
          })()}
        {activeStep === steps.length &&
          (() => {
            return (
              <div className="success-container">
                <Card className="card">
                  <CardContent
                    style={{
                      display: "flex",
                      justifyContent: "Center",
                      alignItems: "center",
                      height: "30%",
                    }}
                  >
                    <Typography variant="h5">
                      <em>{SuccessfullMessage}</em>
                    </Typography>
                    <Check style={{ color: "green" }} />
                  </CardContent>
                </Card>
              </div>
            );
          })()}
        <Fragment>
          {activeStep !== steps.length &&
            (() => {
              return (
                <div className="stepper-control">
                  <Button
                    variant="contained"
                    onclick={handleBack}
                    disabled={activeStep === 0}
                    onClick={handleBack}
                  >
                    BAck
                  </Button>
                  <Button variant="contained" onClick={handleNext}>
                    {activeStep === steps.length - 1 ? "Confirm Order" : "Next"}
                  </Button>
                </div>
              );
            })()}
        </Fragment>
      </div>
    </div>
  );
}

export default Order;
