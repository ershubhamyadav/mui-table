import React from "react";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import { updateSweet } from "../../firestoreService";
import { SweetForm } from "./SweetForm";

export function EditSweet() {
  const history = useLocation();
  const navigate = useNavigate();
  console.log("adsad", history.state);
  const submitEvent = (postData) => {
    updateSweet(postData.id, postData);
    navigate(-1);
  };
  const value = {
    sweet_name: history.state?.label,
    // stock:,
    // image:,
    // price:,
    ...history.state
  };
  return <SweetForm submitEvent={submitEvent} values={value} />;
}
