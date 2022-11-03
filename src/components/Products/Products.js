import React, { useState } from "react";
import Header from "../../common/header/Header";
import { useEffect } from "react";
import { useHistory, useParams, useLocation, Link } from "react-router-dom";
import { Button, Card, CardContent, Typography } from "@material-ui/core";
//function for loading of resources
import loadData from "../../middleware/loadData";
import "./Products.css";

//creating a Home Component
function Products(props) {
  const history = useHistory();
  const location = useLocation();
  history.baseURL = props.baseURL;

  const [products, setProducts] = useState([]);

  //function to edit the product only admin access
  const editProduct = (productId) => {};

  //function for deliting the product only admin access
  const deleteProduct = (productId) => {};

  useEffect(() => {
    console.log(history);
    var url = props.baseURL + "/products" + history.location.search;
    //load all products from server
    loadData(url, "get", null, null, null)
      .then((response) => {
        console.log(response);
        setProducts(response.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  //whenever the search query changes load the data
  useEffect(() => {
    var url = props.baseURL + "/products" + history.location.search;
    //load all products from server
    loadData(url, "get", null, null, null)
      .then((response) => {
        console.log(response);
        setProducts(response.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [history.location.search]);

  const cardItem = {
    margin: "2% 1.5%",
    display: "flex",
    flexDirection: "column",
    width: "29%",
    alignItems: "center",
  };

  return (
    <div className="main-container">
      <Header
        baseURL={history.baseURL}
        setProducts={(products) => {
          setProducts(products);
        }}
      />
      <div className="content">
        {products.map((product) => (
          <Card id={`card-no-${product.productId}`} style={cardItem}>
            {window.sessionStorage.role === "admin" &&
              (() => {
                return (
                  <CardContent
                    style={{
                      width: "100%",
                      display: "flex",
                      justifyContent: "space-around",
                    }}
                  >
                    <Button
                      variant="contained"
                      style={{ backgroundColor: "grey" }}
                      onClick={() => {
                        editProduct(product.productId);
                      }}
                    >
                      Edit
                    </Button>
                    <Button
                      variant="contained"
                      style={{ backgroundColor: "red", color: "white" }}
                      onClick={() => {
                        deleteProduct(product.productId);
                      }}
                    >
                      Delete
                    </Button>
                  </CardContent>
                );
              })()}
            <CardContent>
              <img
                src={product.imageURL}
                alt={product.name}
                className="card-image"
              />
            </CardContent>
            <CardContent>
              <Typography>
                <em>{product.name}</em>
              </Typography>
            </CardContent>
            <CardContent>
              <Typography>{product.description}</Typography>
            </CardContent>
            <CardContent>
              <Typography>
                <em>Rs: {product.price}</em>
              </Typography>
            </CardContent>
            <CardContent>
              <Button
                component={Link}
                to={`/products/${product.productId}`}
                variant="contained"
                color="primary"
              >
                Buy
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}

export default Products;
