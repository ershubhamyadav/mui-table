import React, { useEffect } from "react";
import "./assets/css/style.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Header from "./Includes/Header";
import Home from "./Pages/Home";
// import Recipes from "./Pages/Recipes";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
// import RecipesDetails from "./Pages/RecipesDetails";
import Footer from "./Includes/Footer";
import GetQuote from "./Pages/GetQuote";
import AboutUs from "./Pages/AboutUs";
import PrivacyPolicy from "./Pages/PrivacyPolicy";
import ContactUs from "./Pages/ContactUs";
// import EditRecipe from "./Pages/EditRecipe";
import TermsAndConditions from "./Pages/TermsAndConditions";
import ClientList from "./Pages/ClientList";
import { appLogID } from "./stringConstant";
import CarttList from "./Pages/CarttList";

function App() {
  useEffect(() => {
    if (localStorage.getItem(appLogID) != null) {
      localStorage.setItem(appLogID, JSON.stringify(Date.parse(new Date())));
    }
  }, []);
  return (
    <div className="App">
      <BrowserRouter>
        <Header />
        <div style={{ marginTop: "80px" }}>
          <Routes>
            <Route path="/" element={<Home />} />

            <Route path="/pro_admin/client_list" element={<ClientList />} />
            <Route path="/get_quote" element={<GetQuote />} />
            <Route path="/cart_list" element={<CarttList />} />
            <Route path="/about-us" element={<AboutUs />} />
            <Route path="/privacy-policy" element={<PrivacyPolicy />} />
            <Route
              path="/terms_and_conditions"
              element={<TermsAndConditions />}
            />
            {/* <Route path="/" element={!user ? <Navigate to="/contact-us" replace /> : <Home />} /> */}

            <Route path="/contact-us" element={<ContactUs />} />
            <Route path="*" render={() => <Navigate to="/" replace />} />
          </Routes>
        </div>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
