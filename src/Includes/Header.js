import React, { useEffect, useState } from "react";
import { Dropdown, DropdownButton } from "react-bootstrap";

import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { Link } from "react-router-dom";
import Login from "../Pages/Auth/Login";

function Header() {
  const [, setOffset] = useState(0);
  const [, setCategory] = useState([]);
  const [recipe, setRecipe] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  const [show, setShow] = useState(false);
  const showDropdown = (e) => {
    setShow(!show);
  };
  // const hideDropdown = (e) => {
  //   setShow(false);
  // };

  useEffect(() => {
    const onScroll = () => setOffset(window.pageYOffset);
    // clean up code
    window.removeEventListener("scroll", onScroll);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const fetchCategoryData = async () => {
      try {
        const response = await fetch("/api/v1/category");
        const json = await response.json();
        setCategory(json.data);
      } catch (error) {
        //console.log("error", error);
      }
    };
    fetchCategoryData();

    const fetchRecipeData = async () => {
      try {
        const response = await fetch("/api/v1/recipes");
        const json = await response.json();
        setRecipe(json.data);
      } catch (error) {
        //console.log("error", error);
      }
    };
    fetchRecipeData();
  }, []);

  const search = (e) => setSearchQuery(e.target.value);
  console.log(searchQuery);
  return (
    <>
      <Navbar variant="dark" className="bg-theme" expand="lg">
        <Container>
          <Navbar.Brand as={Link} to="/">
            <img
              src="assets/images/vandeMishthan.png"
              alt="vandeMishthan"
              height="70px"
            />
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <div className="flex-grow-1 px-3 position-relative">
              <Dropdown
                show={show}
                onChange={showDropdown}
                // onMouseEnter={showDropdown}
                // onMouseLeave={hideDropdown}
                className="searchSection"
              >
                <Dropdown.Toggle
                  id="dropdown-button-dark-example1"
                  className="bg-transparent border-0 p-0"
                  variant="secondary"
                >
                  <input
                    className="form-control"
                    onChange={(event) => search(event)}
                    placeholder="Search..."
                  />
                </Dropdown.Toggle>
                {searchQuery !== "" ? (
                  <Dropdown.Menu variant="dark">
                    {recipe &&
                      recipe
                        .filter(
                          (j) =>
                            j?.name
                              .toLowerCase()
                              .includes(searchQuery.toLowerCase()) ||
                            j?.author_name
                              .toLowerCase()
                              .includes(searchQuery.toLowerCase()) ||
                            j?.recipe_categories?.category?.title
                              .toLowerCase()
                              .includes(searchQuery.toLowerCase())
                        )
                        .map((i, index) => {
                          return (
                            <Dropdown.Item
                              className="d-flex align-items-center"
                              as={Link}
                              to={`/recipe-details/${i.id}`}
                              key={index}
                            >
                              <div>
                                <img
                                  src={i.recipe_images?.image}
                                  height={35}
                                  width={35}
                                  style={{
                                    objectFit: "cover",
                                    borderRadius: 10
                                  }}
                                  alt="sweet"
                                />
                              </div>
                              <div className="ps-3 flex-grow-1">{i.name}</div>
                            </Dropdown.Item>
                          );
                        })}
                  </Dropdown.Menu>
                ) : (
                  <Dropdown.Menu variant="dark">
                    <div className="py-4 text-center">No Result Found</div>
                  </Dropdown.Menu>
                )}
              </Dropdown>
            </div>
            <Nav className="ms-auto">
              <Nav.Link as={Link} to="/" className="text-white px-2 fw-bold">
                Home
              </Nav.Link>
              <Nav.Link
                as={Link}
                to="/about-us"
                className="text-white px-2 fw-bold"
              >
                About Us
              </Nav.Link>
              <Nav.Link
                as={Link}
                to="/contact-us"
                className="text-white px-2 fw-bold"
              >
                Contact Us
              </Nav.Link>
              <DropdownButton
                id="login"
                title="Login"
                className="login-dropdown"
                drop="start"
              >
                <Login />
              </DropdownButton>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      {/* <Navbar
        variant="dark"
        bg="dark"
        className={offset <= 100 ? `secondNav` : `secondNav fixed-top`}
        expand="lg"
      >
        <Container>
          <Navbar.Toggle
            aria-controls="basic-navbar-nav"
            className="w-100 border-0"
          >
            Check All Categories
          </Navbar.Toggle>
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              {category &&
                category.map((item, index) => {
                  return (
                    <Nav.Link
                      as={Link}
                      to={`/recipes/${item.title
                        .toLowerCase()
                        .replace(" ", "-")}`}
                      className="text-white px-3 fw-bold"
                    >
                      {item.title}
                    </Nav.Link>
                  );
                })}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar> */}
    </>
  );
}

export default Header;
