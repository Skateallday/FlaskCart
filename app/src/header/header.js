import { NavLink } from "react-router-dom";
import { useState } from "react";

import cartAvo from "../assets/images/cart-avo.png";

function Header() {
  const [open, setOpen] = useState(false);

  const navLinks = [
    { to: "/", label: "Home" },
    { to: "/about", label: "About" },
    { to: "/recipes", label: "Recipes" },
    { to: "/inventory", label: "Inventory" },
    { to: "/shoppinglist", label: "Shopping List" },
  ];

  const closeMenu = () => {
    setOpen(false);
  };

  return (
    <header className="relative z-50 w-full bg-teal-700 shadow-md">
      <div className="flex w-full items-center justify-between px-5 py-3 md:px-10">
        
        {/* Logo / Wordmark */}
        <NavLink
          to="/"
          onClick={closeMenu}
          className="flex items-center gap-3"
          aria-label="FlaskCart home"
        >
          <img
            src={cartAvo}
            alt=""
            className="h-14 w-auto"
          />

          <span className="font-slab text-2xl font-bold text-white md:text-3xl">
            FlaskCart
          </span>
        </NavLink>

        {/* Desktop navigation */}
        <nav
          aria-label="Main navigation"
          className="hidden items-center gap-2 md:flex"
        >
          {navLinks.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              end={link.to === "/"}
              className={({ isActive }) =>
                [
                  "rounded-full px-4 py-2 text-sm font-semibold",
                  "transition-all duration-200",
                  "focus-visible:outline-none",
                  "focus-visible:ring-2",
                  "focus-visible:ring-white",
                  "focus-visible:ring-offset-2",
                  "focus-visible:ring-offset-teal-600",

                  isActive
                    ? "bg-white text-teal-800 shadow-sm"
                    : "text-white hover:bg-white/15",
                ].join(" ")
              }
            >
              {link.label}
            </NavLink>
          ))}
        </nav>

        {/* Mobile hamburger */}
        <button
          type="button"
          onClick={() => setOpen((current) => !current)}
          className="
            relative z-50 flex h-11 w-11
            flex-col items-center justify-center
            gap-[5px] rounded-lg
            text-white
            transition
            hover:bg-white/15
            focus-visible:outline-none
            focus-visible:ring-2
            focus-visible:ring-white
            md:hidden
          "
          aria-label={open ? "Close navigation menu" : "Open navigation menu"}
          aria-expanded={open}
          aria-controls="mobile-navigation"
        >
          <span
            className={`
              block h-0.5 w-6 bg-current
              transition-transform duration-300
              ${
                open
                  ? "translate-y-[7px] rotate-45"
                  : ""
              }
            `}
          />

          <span
            className={`
              block h-0.5 w-6 bg-current
              transition-opacity duration-300
              ${open ? "opacity-0" : "opacity-100"}
            `}
          />

          <span
            className={`
              block h-0.5 w-6 bg-current
              transition-transform duration-300
              ${
                open
                  ? "-translate-y-[7px] -rotate-45"
                  : ""
              }
            `}
          />
        </button>
      </div>

      {/* Mobile navigation */}
      <nav
        id="mobile-navigation"
        aria-label="Mobile navigation"
        className={`
          absolute left-0 top-full
          w-full overflow-hidden
          bg-teal-700 shadow-xl
          transition-all duration-300 ease-out
          md:hidden

          ${
            open
              ? "max-h-[500px] translate-y-0 opacity-100"
              : "pointer-events-none max-h-0 -translate-y-2 opacity-0"
          }
        `}
      >
        <div className="flex flex-col gap-2 px-5 py-5">
          {navLinks.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              end={link.to === "/"}
              onClick={closeMenu}
              className={({ isActive }) =>
                [
                  "rounded-xl px-4 py-3",
                  "font-semibold",
                  "transition-all duration-200",

                  isActive
                    ? "bg-white text-teal-800 shadow-sm"
                    : "text-white hover:bg-white/15",
                ].join(" ")
              }
            >
              {link.label}
            </NavLink>
          ))}
        </div>
      </nav>
    </header>
  );
}

export default Header;