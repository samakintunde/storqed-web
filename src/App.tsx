import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  useLocation,
} from "react-router-dom";

import Header from "./components/common/Header";
import ProductsRoute from "./routes/Products";
import ProductRoute from "./routes/Product";
import productsData from "./data/products";

import "antd/dist/antd.css";
import "./App.css";

function App() {
  return (
    <div className="App">
      <Router>
        <Header title="All Products" />
        <Switch>
          <Route path="/products" exact>
            <ProductsRoute />
          </Route>
          <Route path="/products/:id">
            <ProductRoute />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
