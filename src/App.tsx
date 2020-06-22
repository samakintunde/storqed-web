import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  useRouteMatch,
} from "react-router-dom";

import Header from "./components/common/Header";
import ProductsRoute from "./routes/Products";
import ProductRoute from "./routes/Product";
import ProductEditRoute from "./routes/ProductEdit";

import "antd/dist/antd.css";
import "./App.css";
import HomeRoute from "./routes/Home";

function App() {
  return (
    <div className="App">
      <Router>
        <Header title="All Products" />
        <Switch>
          {/* <Route path="/products/:id/edit" exact>
            <ProductEditRoute />
          </Route> */}
          <Route path="/products/:id" exact>
            <ProductRoute />
          </Route>
          <Route path="/products" exact>
            <ProductsRoute />
          </Route>
          {/* <Route path="/" exact>
            <HomeRoute />
          </Route> */}
        </Switch>
      </Router>
    </div>
  );
}

export default App;
