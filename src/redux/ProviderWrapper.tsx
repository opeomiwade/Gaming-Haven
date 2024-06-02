"use client"
import { Provider } from "react-redux";
import store from "./store/redux-store";
import React from "react";

const ReduxProviderWrapper: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  return <Provider store={store}>{children}</Provider>;
};


export default ReduxProviderWrapper
