import React, { useEffect, useState } from "react";
import "./ProductDetail.css";
import Header from "../../common/header/Header";
import { useParams, useHistory } from "react-router";
import { Link } from "react-router-dom";
import loadData from "../../middleware/loadData";
import { Button, FormControl, Typography, InputLabel } from "@material-ui/core";

const ProductDetail = (props) => {
  var { id } = useParams();
  const history = useHistory();
  history.baseURL = props.baseURL;

  const [product, setProduct] = useState({});
  const [quantity, setQuantity] = useState(1);

  const handleQuantityChange = (event) => {
    setQuantity(event.target.value);
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

  return (
    <div className="main-container">
      <Header baseURL={props.baseURL} />
      <div className="content">
        {/* we have three containers one for displaying image and the one for the details of the product 
                    and the other for quantity input fields and place Order botton  */}
        <div className="container image-container">
          <img src={product.imageURL} alt={product.name} className="image" />
        </div>
        <div className="container details-container">
          {/* Product Name
                         Manufacturer
                         Price
                         in stock or out of stock
                         available items
                         About product
                    */}

          <Typography variant="h4">{product.name}</Typography>
          <hr style={{ fontSize: "2px", width: "100%" }} />
          <Typography>
            <b>Manufacturer:</b> {product.manufacturer}
          </Typography>
          <Typography>M.R.P-{product.price}</Typography>
          {product.availableItems !== 0 &&
            (() => {
              return (
                <Typography style={{ color: "green" }}>
                  <b>In stock</b>
                </Typography>
              );
            })()}

          {product.availableItems === 0 &&
            (() => {
              return (
                <Typography style={{ color: "red-brown" }}>
                  <b>Out Of Stock</b>
                </Typography>
              );
            })()}
          <Typography>
            <b>Available Items:</b> {product.availableItems}
          </Typography>
          <hr style={{ fontSize: "2px", width: "100%" }} />
          <Typography variant="h6">
            <b>About this item</b>
          </Typography>
          <Typography variant="p">{product.description}</Typography>
        </div>
        <div class="container utils-container">
          <FormControl
            style={{
              flexDirection: "row",
              justifyContent: "space-evenly",
              marginBottom: "10%",
            }}
          >
            <label htmlFor="quantity">Quantity</label>
            <input
              type="number"
              id="quantity"
              value={quantity}
              min={1}
              max={product.availableItems}
              className="quantity-field"
              onChange={handleQuantityChange}
            />
          </FormControl>
          <Button
            component={Link}
            to={`/products/${product.productId}/order?quantity=${quantity}`}
            variant="contained"
            style={{ backgroundColor: "#ea5215" }}
          >
            Place order
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
