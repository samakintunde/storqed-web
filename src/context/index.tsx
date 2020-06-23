import React from "react";
import ProductsProvider from "./ProductsContext";

type ContextProvidersProps = {
  children: any;
};

const ContextProviders: React.FC<ContextProvidersProps> = (props) => {
  const { children } = props;

  return <ProductsProvider>{children}</ProductsProvider>;
};

export default ContextProviders;
