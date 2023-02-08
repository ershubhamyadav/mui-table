import React from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const Toastify = ({ message, notify }) => {
  notify = () => toast(message);
  return CartList;
};

export default Toastify;
