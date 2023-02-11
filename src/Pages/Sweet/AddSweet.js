import React from "react";
import { useNavigate } from "react-router-dom";
import { addSweetItem } from "../../firestoreService";
import { SweetForm } from "./SweetForm";

export function AddSweet() {
  const navigate = useNavigate();
  const submitEvent = (postData) => {
    addSweetItem(postData);
    navigate(-1);
  };
  return <SweetForm submitEvent={submitEvent} />;
}
