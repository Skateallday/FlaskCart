import { NavLink } from "react-router-dom";
import cartAvo from "../assets/images/cart-avo.png";
import "./index.css";
import { useState } from "react";
import React from "react";

function Header() {
  const navLinks = [
    { to: "/", label: "Home" },
    { to: "/about", label: "About" },
    { to: "/recipes", label: "Recipes" },
    { to: "/shoppinglist", label: "Shopping List" },
  ];

  const [open, setOpen] = useState(false);

  return (
    <header className="relative bg-teal-600 w-full ">
      <a href="/">
        <img className="flaskcartlogo z-50" src={cartAvo} alt="Flask Cart Logo" />
      </a>
      <nav  aria-label="Main Navigation"
            className={`
                        md:flex md:static md:h-auto md:flex-row
                        md:py-5 md:gap-6 font-bold
                        fixed top-0 left-0 h-screen w-full
                        bg-teal-600 flex flex-col items-center justify-center gap-6
                        transition-transform duration-300
                        ${open ? "translate-x-0" : "-translate-x-full"}
                        md:translate-x-0
                    `}>

        {navLinks.map((link) => (
          <NavLink
            key={link.to}
            to={link.to}
            className={({ isActive }) =>
              `transition-colors hover:underline ${
                isActive ? "font-bold underline" : ""
              }`
            }
          >
            {link.label}
          </NavLink>
        ))}
      </nav>

        <button 
            className="md:hidden absolute top-5 right-5 z-50"
            onClick={() => setOpen(!open)}
        >{open ? "Close" : "Menu"}</button>
    </header>
  );
}

export default Header;
