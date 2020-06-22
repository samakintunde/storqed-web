import React from "react";
import { Switch, Route, useLocation } from "react-router-dom";

import Header from "./components/common/Header";
import ProductsRoute from "./routes/Products";
import ProductRoute from "./routes/Product";
import ProductEditRoute from "./routes/ProductEdit";

import "antd/dist/antd.css";
import "./App.css";
import HomeRoute from "./routes/Home";

function App() {
  const location = useLocation();

  // @ts-ignore
  let background = location.state && location.state.background;

  return (
    <div className="App">
      <Header title="All Products" />
      <Switch location={background || location}>
        <Route path="/products/:id/edit">
          <ProductEditRoute />
        </Route>
        <Route path="/products/:id" exact>
          <ProductRoute />
        </Route>
        <Route path="/products" exact>
          <ProductsRoute />
        </Route>
        <Route path="/" exact>
          <HomeRoute />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
