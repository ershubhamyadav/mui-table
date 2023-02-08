import React, { useEffect } from "react";
import "./assets/css/style.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Header from "./Includes/Header";
import Home from "./Pages/Dashboard/Home";
// import Recipes from "./Pages/Recipes";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
// import RecipesDetails from "./Pages/RecipesDetails";
import Footer from "./Includes/Footer";
import GetQuote from "./Pages/GetQuote";
import AboutUs from "./Pages/Dashboard/AboutUs";
import PrivacyPolicy from "./Pages/Dashboard/PrivacyPolicy";
import ContactUs from "./Pages/ContactUs";
import TermsAndConditions from "./Pages/Dashboard/TermsAndConditions";
import ClientList from "./Pages/ClientList";
import { appLogID } from "./stringConstant";
import { CartList, SweetList, Register } from "./Pages";
import { ToastContainer } from "react-toastify";
import "./App.css";
import ContentWrapper from "./HOC/ContentWrapper";

function App() {
  useEffect(() => {
    if (localStorage.getItem(appLogID) != null) {
      localStorage.setItem(appLogID, JSON.stringify(Date.parse(new Date())));
    }
  }, []);
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={ContentWrapper(Home)} />

          <Route path="/get_quote" element={ContentWrapper(GetQuote)} />
          <Route path="/cart_list" element={ContentWrapper(CartList)} />
          <Route path="/about-us" element={ContentWrapper(AboutUs)} />
          <Route
            path="/privacy-policy"
            element={ContentWrapper(PrivacyPolicy)}
          />
          <Route
            path="/terms_and_conditions"
            element={ContentWrapper(TermsAndConditions)}
          />
          {/* <Route path="/" element={!user ? <Navigate to="/contact-us" replace /> : <Home />} /> */}

          <Route path="/contact-us" element={ContentWrapper(ContactUs)} />
          <Route path="/register" element={<Register />} />
          {/* admin---------------- */}
          <Route
            path="/pro_admin/client_list"
            element={ContentWrapper(ClientList)}
          />
          <Route path="/sweet_list" element={ContentWrapper(SweetList)} />
          <Route path="*" render={() => <Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
      <ToastContainer />
    </div>
  );
}

export default App;
