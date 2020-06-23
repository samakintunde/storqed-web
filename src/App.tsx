import React, { Suspense } from "react";
import { Switch, Route } from "react-router-dom";

import Header from "./components/common/Header";
import HomeRoute from "./routes/Home";
import ProductCreateRoute from "./routes/ProductCreate";
import ProductsRoute from "./routes/Products";
import ProductRoute from "./routes/Product";
import ProductEditRoute from "./routes/ProductEdit";

import "antd/dist/antd.css";
import "./App.css";

function App() {
  return (
    // Use of empty div to prevent flash of text just before i18n grabs the user locale from local storage
    <Suspense fallback={<div />}>
      <div className="App">
        <Header />
        <Switch>
          <Route path="/products/create">
            <ProductCreateRoute />
          </Route>
          <Route path="/products/:slug/edit" exact>
            <ProductEditRoute />
          </Route>
          <Route path="/products/:slug" exact>
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
    </Suspense>
  );
}

export default App;
