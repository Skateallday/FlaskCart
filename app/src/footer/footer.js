import "./index.css";

import { NavLink } from "react-router-dom";

import cartAvo from "../assets/images/cart-avo.png";

function Footer() {
  const navLinks = [
    { to: "/", label: "Home" },
    { to: "/about", label: "About" },
    { to: "/recipes", label: "Recipes" },
    { to: "/inventory", label: "Inventory" },
    { to: "/shoppinglist", label: "Shopping List" },
  ];

  return (
    <footer className="w-full bg-teal-700 text-white">
      <div className="flex flex-col items-center justify-between gap-8 px-6 py-8 md:flex-row md:px-10 lg:px-16">
        
        <div className="order-3 text-sm text-white/80 md:order-1">
          <p>
            Made with ❤️ by{" "}
            <a
              href="https://www.jamfish.co.uk"
              target="_blank"
              rel="noopener noreferrer"
              title="Jamfish Web Design and Development"
              className="font-semibold text-white transition hover:underline"
            >
              Jamfish
            </a>
          </p>
        </div>

        <nav aria-label="Footer navigation" className="order-2">
          <ul className="flex flex-wrap items-center justify-center gap-x-5 gap-y-3">
            {navLinks.map((link) => (
              <li key={link.to}>
                <NavLink
                  to={link.to}
                  end={link.to === "/"}
                  className={({ isActive }) =>
                    `rounded-full px-3 py-2 text-sm font-medium transition ${
                      isActive
                        ? "bg-white text-teal-800"
                        : "text-white/90 hover:bg-white/10 hover:text-white"
                    }`
                  }
                >
                  {link.label}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>

        <NavLink
          to="/"
          className="order-1 flex items-center gap-3 md:order-3"
          aria-label="FlaskCart home"
        >
          <img
            src={cartAvo}
            alt=""
            className="h-12 w-auto"
          />

          <span className="font-slab font-serif text-xl font-bold">
            FlaskCart
          </span>
        </NavLink>

      </div>
    </footer>
  );
}

export default Footer;