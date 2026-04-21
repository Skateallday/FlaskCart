import "./index.css"
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
    <footer className="footer bg-teal-600 text-black text-center p-4 mt-8 flex flex-row justify-between items-center">
        <div className="footer-content">
            <p>Made with ❤️ by <a target="_blank" rel="noopener noreferrer" title="Jamfish Web Design and Development"href="https://www.jamfish.co.uk">Jamfish</a></p>
        </div>
        <div className="quicklinks flex flex-col">
            <ul>
                        {navLinks.map((link) => (
                          <NavLink
                            key={link.to}
                            to={link.to}
                            className={({ isActive }) =>
                              `transition-colors hover:underline px-2 ${
                                isActive ? "font-bold underline" : ""
                              }`
                            }
                          > 
                            {link.label}
                          </NavLink>
                        ))}
            </ul>
        </div>
        <div>
            <a href="/">
                    <img className="flaskcartlogo" src={cartAvo} alt="Flask Cart Logo" />
                  </a>
        </div>
    </footer>
    );
}

export default Footer;