import React, { Fragment, useEffect, useState } from "react";
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
import "./ModifyProduct.css";
import loadData from "../../middleware/loadData";
import { useHistory, useParams } from "react-router-dom";
import Header from "../../common/header/Header";

function ModifyProduct(props) {
  const history = useHistory();
  history.baseURL = props.baseURL;
  const { id } = useParams();

  const [deleteMessage, setDeleteMessage] = useState("");
  const [modifyMessage, setModifyMessage] = useState("");
  //make fields disabled
  const [inputDisabled, setinputDisabled] = useState(true);
  //enable the modify button after saving
  const [isModifyDisable, setIsModifyDisable] = useState(true);
  const [product, setProduct] = useState({});
  const [prodName, setProdName] = useState("");
  const [prodNameRequired, setProdNameRequired] = useState("");
  const [category, setCategory] = useState("");
  const [categogyRequired, setCategoryRequired] = useState("");
  const [manufacturer, setManufacturer] = useState("");
  const [manufactuerRequired, setManufacturerRequired] = useState("");
  const [price, setPrice] = useState(0);
  const [availableItems, setAvailableItems] = useState(0);
  const [imageURL, setImageURL] = useState("");
  const [description, setDescription] = useState("");

  const handleProdNameChange = (event) => {
    if (event.target.value === "") {
      setProdNameRequired("required!");
    } else {
      setProdNameRequired("");
    }

    setProdName(event.target.value);
  };

  const handleProdImageURLChange = (event) => {
    setImageURL(event.target.value);
  };

  const handleProdDescriptionChange = (event) => {
    setDescription(event.target.value);
  };

  const handleManufacturerChange = (event) => {
    if (event.target.value === "") {
      setManufacturerRequired("required");
    } else {
      setManufacturerRequired("");
    }

    setManufacturer(event.target.value);
  };

  const handlePriceChange = (event) => {
    setPrice(event.target.value);
  };

  const handleCategorychange = (event) => {
    if (event.target.value === "") {
      setCategoryRequired(event.target.value);
    } else {
      setCategoryRequired("");
    }

    setCategory(event.target.value);
  };

  const handleAvailableItemsChange = (event) => {
    setAvailableItems(event.target.value);
  };

  //handle save click
  const handleSaveClick = () => {
    setIsModifyDisable(false);
    setinputDisabled(true);
  };

  //handle edit click
  const handleEdit = () => {
    setIsModifyDisable(true);
    setinputDisabled(false);
  };

  //on modify button click
  const handleModifyProduct = () => {
    if (
      prodNameRequired !== "" ||
      manufactuerRequired !== "" ||
      categogyRequired !== ""
    ) {
      return;
    }

    //else put the data to server
    var data = {
      name: prodName,
      category: category,
      availableItems: availableItems,
      manufacturer: manufacturer,
      price: price,
      imageURL: imageURL,
      description: description,
    };

    //load the data
    loadData(
      `${history.baseURL}/products/${id}`,
      "put",
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
        if (response.status === 200) {
          setDeleteMessage("");
          setModifyMessage(`${prodName} modified successfully!`);
          setTimeout(() => {
            history.push("/products");
          }, 10000);
        }
      })
      .catch((err) => {
        console.log(err);
        if (err.status === 401) {
          alert("You are not authorized! Please login!");
          return;
        }
      });
  };

  //handle delete
  const handleDelete = () => {
    loadData(
      `${history.baseURL}/products/${id}`,
      "delete",
      null,
      {
        Authorization: `Bearer ${window.sessionStorage.getItem(
          "x-auth-token"
        )}`,
      },
      null
    )
      .then((response) => {
        console.log(response);
        setModifyMessage("");
        setDeleteMessage(`${prodName} deleted successfully!`);
        setTimeout(() => {
          history.push("/products");
        }, 10000);
      })
      .catch((err) => {
        setDeleteMessage("");
      });
  };

  useEffect(() => {
    loadData(`${history.baseURL}/products/${id}`, "get", null, null, null)
      .then((response) => {
        console.log(response);
        setProduct(response.data[0]);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  useEffect(() => {
    setProdName(product.name);
    setCategory(product.category);
    setPrice(product.price);
    setAvailableItems(product.availableItems);
    setImageURL(product.imageURL);
    setManufacturer(product.manufacturer);
    setDescription(product.description);
  }, [product]);

  return (
    <div className="main-container">
      <Header baseURL={props.baseURL} />
      <div className="content">
        <Card className="modify-card">
          <CardHeader color="primary" title={prodName} />
          {modifyMessage !== "" ||
            (deleteMessage !== "" &&
              (() => {
                return (
                  <CardContent>
                    <Typography variant="h6">
                      <em>
                        {modifyMessage !== "" ? modifyMessage : deleteMessage}
                      </em>
                    </Typography>
                  </CardContent>
                );
              })())}
          {deleteMessage === "" &&
            modifyMessage === "" &&
            (() => {
              return (
                <Fragment>
                  <CardContent className="card-content">
                    <FormControl className="form-control">
                      <InputLabel shrink={true} htmlFor="name">
                        Product Name
                      </InputLabel>
                      <Input
                        disabled={inputDisabled}
                        id="name"
                        value={prodName}
                        type="text"
                        onChange={(event) => handleProdNameChange(event)}
                        className="Input-style"
                      />
                      <FormHelperText>
                        <Typography style={{ color: "red" }}>
                          {prodNameRequired}
                        </Typography>
                      </FormHelperText>
                    </FormControl>
                  </CardContent>

                  <CardContent className="card-content">
                    <FormControl className="form-control">
                      <InputLabel shrink={true} htmlFor="category">
                        Category
                      </InputLabel>
                      <Input
                        disabled={inputDisabled}
                        id="category"
                        value={category}
                        type="text"
                        onChange={(event) => handleCategorychange(event)}
                      />
                      <FormHelperText>
                        <Typography style={{ color: "red" }}>
                          {categogyRequired}
                        </Typography>
                      </FormHelperText>
                    </FormControl>
                  </CardContent>

                  <CardContent className="card-content">
                    <FormControl className="form-control">
                      <InputLabel shrink={true} htmlFor="available-items">
                        Available items
                      </InputLabel>
                      <Input
                        disabled={inputDisabled}
                        id="available-items"
                        value={availableItems}
                        type="number"
                        min={0}
                        onChange={(event) => handleAvailableItemsChange(event)}
                      />
                    </FormControl>
                  </CardContent>

                  <CardContent className="card-content">
                    <FormControl className="form-control">
                      <InputLabel shrink={true} htmlFor="manufacturer">
                        Manufacturer
                      </InputLabel>
                      <Input
                        disabled={inputDisabled}
                        id="manufacturer"
                        type="text"
                        value={manufacturer}
                        onChange={(event) => handleManufacturerChange(event)}
                      />
                      <FormHelperText>
                        <Typography style={{ color: "red" }}>
                          {manufactuerRequired}
                        </Typography>
                      </FormHelperText>
                    </FormControl>
                  </CardContent>

                  <CardContent className="card-content">
                    <FormControl className="form-control">
                      <InputLabel shrink={true} htmlFor="">
                        Price
                      </InputLabel>
                      <Input
                        disabled={inputDisabled}
                        id="price"
                        type="number"
                        value={price}
                        min={0}
                        onChange={(event) => handlePriceChange(event)}
                      />
                    </FormControl>
                  </CardContent>

                  <CardContent className="card-content">
                    <FormControl className="form-control">
                      <InputLabel shrink={true} htmlFor="imageUrl">
                        Image URL
                      </InputLabel>
                      <Input
                        disabled={inputDisabled}
                        id="imageUrl"
                        type="text"
                        value={imageURL}
                        onChange={(event) => handleProdImageURLChange(event)}
                      />
                    </FormControl>
                  </CardContent>

                  <CardContent
                    className="card-content"
                    style={{ textAlign: "start", display: "block" }}
                  >
                    <InputLabel
                      htmlFor="description"
                      style={{ marginLeft: "10%" }}
                    >
                      Description
                    </InputLabel>
                  </CardContent>

                  <CardContent className="card-content">
                    <FormControl className="form-control">
                      <textarea
                        disabled={inputDisabled}
                        id="description"
                        type="text"
                        value={description}
                        onChange={(event) => handleProdDescriptionChange(event)}
                        style={{ height: "70px" }}
                      />
                    </FormControl>
                  </CardContent>
                  <CardContent className="card-content">
                    {inputDisabled === true
                      ? (() => {
                          return (
                            <Button
                              variant="contained"
                              color="primary"
                              onClick={handleEdit}
                            >
                              Edit
                            </Button>
                          );
                        })()
                      : (() => {
                          return (
                            <Button
                              variant="contained"
                              color="primary"
                              onClick={handleSaveClick}
                            >
                              Save
                            </Button>
                          );
                        })()}

                    <Button
                      disabled={isModifyDisable}
                      variant="contained"
                      onClick={handleModifyProduct}
                      style={{ backgroundColor: "green" }}
                    >
                      Modify
                    </Button>
                    <Button
                      variant="contained"
                      style={{ backgroundColor: "red" }}
                      onClick={handleDelete}
                    >
                      Delete
                    </Button>
                  </CardContent>
                </Fragment>
              );
            })()}
        </Card>
      </div>
    </div>
  );
}

export default ModifyProduct;
