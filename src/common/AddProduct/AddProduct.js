import {
  CardContent,
  Typography,
  Card,
  Input,
  InputLabel,
  FormControl,
  FormHelperText,
  Button,
  CardHeader,
} from "@material-ui/core";
import React, { Fragment, useState } from "react";
import { useHistory } from "react-router-dom";
import loadData from "../../middleware/loadData";
import "./AddProduct.css";
import Header from "../../common/header/Header";

function AddProduct(props) {
  const history = useHistory();
  history.baseURL = props.baseURL;

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
  const [showForm, setShowForm] = useState(true);
  const [successMessage, setSuccessMessage] = useState("");

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

  const handleAddProduct = () => {
    if (
      prodNameRequired !== "" ||
      categogyRequired !== "" ||
      manufactuerRequired !== ""
    ) {
      return;
    }

    //else post the data to server
    var data = {
      name: prodName,
      category: category,
      manufacturer: manufacturer,
      availableItems: availableItems,
      price: price,
      imageURL: imageURL,
      description: description,
    };

    loadData(
      `${history.baseURL}/products`,
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
        debugger;
        console.log(response);
        if (response.status === 200) {
          setProduct(response.data);
          setSuccessMessage(`${response.data.name} added successfully!`);
          setTimeout(() => {
            setShowForm(false);
          }, 3000);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleAddMore = () => {
    setProdName("");
    setProdNameRequired("");
    setCategory("");
    setCategoryRequired("");
    setManufacturer("");
    setManufacturerRequired("");
    setAvailableItems(0);
    setPrice(0);
    setImageURL("");
    setDescription("");
    setSuccessMessage("");
    setShowForm(true);
  };

  return (
    <div className="main-container">
      <Header baseURL={props.baseURL} />
      <div className="content">
        <Card className="card">
          <CardHeader color="primary" title="Add Product" />
          <hr />
          {successMessage !== "" &&
            (() => {
              return (
                <CardContent>
                  <Typography variant="h6">
                    <em>{successMessage}</em>
                  </Typography>
                </CardContent>
              );
            })()}
          {showForm &&
            (() => {
              return (
                <Fragment>
                  <CardContent className="card-content">
                    <FormControl className="form-control">
                      <InputLabel shrink={true} htmlFor="name">
                        Product Name
                      </InputLabel>
                      <Input
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
                      <InputLabel shrink={true} htmlFor="manufacturer">
                        Manufacturer
                      </InputLabel>
                      <Input
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
                      <InputLabel shrink={true} htmlFor="available-items">
                        Available items
                      </InputLabel>
                      <Input
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
                      <InputLabel shrink={true} htmlFor="">
                        Price
                      </InputLabel>
                      <Input
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
                        id="description"
                        type="text"
                        value={description}
                        onChange={(event) => handleProdDescriptionChange(event)}
                        style={{ height: "70px" }}
                      />
                    </FormControl>
                  </CardContent>
                  <CardContent className="card-content">
                    <Button
                      variant="contained"
                      style={{ color: "black" }}
                      onClick={handleAddProduct}
                    >
                      Add Product
                    </Button>
                  </CardContent>
                </Fragment>
              );
            })()}

          {!showForm &&
            (() => {
              return (
                <Fragment>
                  <CardContent>
                    <Typography>
                      <b>Name: </b>
                      {product.name}
                    </Typography>
                  </CardContent>
                  <CardContent>
                    <Typography>
                      <b>id: </b>
                      {product._id}
                    </Typography>
                  </CardContent>
                  <CardContent>
                    <Typography>
                      <b>Category: </b>
                      {product.category}
                    </Typography>
                  </CardContent>
                  <CardContent>
                    <Typography>
                      <b>:Manufacturer </b>
                      {product.manufacturer}
                    </Typography>
                  </CardContent>
                  <CardContent>
                    <Typography>
                      <b>Available items: </b>
                      {product.availableItems}
                    </Typography>
                  </CardContent>
                  <CardContent>
                    <Typography>
                      <b>Price: Rs </b>
                      {product.price}
                    </Typography>
                  </CardContent>
                  <CardContent>
                    <Typography>
                      <b>Image URl: </b>
                      {product.imageURL}
                    </Typography>
                  </CardContent>
                  <CardContent>
                    <Typography>
                      <b>Description: </b>
                      {product.description}
                    </Typography>
                  </CardContent>
                  <CardContent className="card-content">
                    <Button
                      variant="contained"
                      style={{ color: "lightgray" }}
                      onClick={handleAddMore}
                    >
                      Add Another
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

export default AddProduct;
