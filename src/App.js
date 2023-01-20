import React from "react";
import "./assets/css/style.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Header from "./Includes/Header";
import Home from "./Pages/Home";
// import Recipes from "./Pages/Recipes";
import { BrowserRouter, Routes, Route } from "react-router-dom";
// import RecipesDetails from "./Pages/RecipesDetails";
import Footer from "./Includes/Footer";
import GetQuote from "./Pages/GetQuote";
import AboutUs from "./Pages/AboutUs";
import PrivacyPolicy from "./Pages/PrivacyPolicy";
import ContactUs from "./Pages/ContactUs";
// import EditRecipe from "./Pages/EditRecipe";
import TermsAndConditions from "./Pages/TermsAndConditions";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Header />
        <div style={{ marginTop: "80px" }}>
          <Routes>
            <Route path="/" element={<Home />} />
            {/* <Route path="recipes/:categoryTitle" element={<Recipes />} />
            <Route path="recipe-details/:userId" element={<RecipesDetails />} />
            <Route path="edit-recipe/:recipeId" element={<EditRecipe />} /> */}
            <Route path="get-quote" element={<GetQuote />} />
            <Route path="about-us" element={<AboutUs />} />
            <Route path="privacy-policy" element={<PrivacyPolicy />} />
            <Route
              path="terms_and_conditions"
              element={<TermsAndConditions />}
            />
            <Route path="contact-us" element={<ContactUs />} />
          </Routes>
        </div>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
