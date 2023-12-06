import React from "react";
import { Logo, LogoutBtn } from "../index";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

/**
 *
 * Header will have
 *  1. A Logo
 *  2. NavBar -> Nav Items
 *  3. Logout button depending on the fact if the user is logged in or not
 */

// creating array outside funtional component

const Header = () => {
  return (
    <>
      {/* 1. Logo */}
      <Logo />
      <h1>Hi</h1>
      {/* 2. Navbar and Nav-Items */}

    </>
  );
};

export default Header;
