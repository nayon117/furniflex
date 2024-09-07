import  { useState } from "react";
import {  FaUser, FaShoppingCart, FaBars } from "react-icons/fa";
import { Link } from "react-router-dom"; // If using react-router-dom for routing
import { navbarLinks } from "../constants";
import useCart from "../hooks/useCart";
import useAuth from "../hooks/useAuth";

const Navbar = () => {
  const cart = useCart(); // Access cart items from the hook
  const { user, logOut, signInWithGoogle } = useAuth(); // Get auth state and methods
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false); // State for mobile menu

  // Function to toggle the mobile menu
  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <nav className="fixed z-50 w-full bg-white shadow-md">
      <div className="flex items-center justify-between p-4 sm:px-12">
        {/* Logo */}
        <Link className="flex items-center gap-1" to="/">
          <p className="text-2xl font-semibold">FurniFlex</p>
        </Link>

        {/* Hamburger Icon for Mobile Menu */}
        <div className="lg:hidden">
          <button onClick={toggleMobileMenu}>
            <FaBars size={24} />
          </button>
        </div>

        {/* Links for Desktop */}
        <div className="hidden lg:flex gap-2">
          {navbarLinks.map((item) => (
            <Link
              key={item.route}
              to={item.route}
              className="flex items-center justify-start gap-4 bg-transparent md:p-2"
            >
              <p className="text-sm font-medium text-black">{item.label}</p>
            </Link>
          ))}
        </div>

        {/* Icons & Auth Section */}
        <div className="flex items-center">
         
           {/* Cart Icon with cart count */}
           <Link to="/cart" className="flex items-center ml-4">
            <FaShoppingCart size={20} />
            <p className="ml-1">({cart.cartItems.length})</p>
          </Link>

          {/* Auth Section */}
          {!user ? (
            <div className="mr-2 flex gap-2">
              <button
                onClick={signInWithGoogle}
                className="flex items-center gap-1"
              >
                <FaUser size={20} />
                <p className="text-sm font-medium">Sign In</p>
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <button onClick={logOut} className="flex items-center gap-1">
                <FaUser size={20} />
                <p className="text-sm font-medium">Sign Out</p>
              </button>
            </div>
          )}

       

        
        </div>
      </div>

      {/* Mobile Menu (Visible on small screens) */}
      {isMobileMenuOpen && (
        <div className="lg:hidden flex flex-col items-start gap-2 p-4">
         

          {navbarLinks.map((item) => (
            <Link
              key={item.route}
              to={item.route}
              className="flex items-center justify-start gap-4 p-2"
              onClick={() => setIsMobileMenuOpen(false)} // Close menu on click
            >
              <p className="text-sm font-medium text-black">{item.label}</p>
            </Link>
          ))}

          {/* Wishlist and Cart in Mobile Menu */}
          <div className="flex gap-4">
            <Link to="/cart" className="flex items-center">
              <FaShoppingCart size={20} />
              <p className="ml-1">({cart.cartItems.length})</p>
            </Link>
          </div>

          {/* Auth Section in Mobile Menu */}
          {!user ? (
            <button
              onClick={() => {
                signInWithGoogle();
                setIsMobileMenuOpen(false); // Close menu on click
              }}
              className="flex items-center gap-1 mt-2"
            >
              <FaUser size={20} />
              <p className="text-sm font-medium">Sign In</p>
            </button>
          ) : (
            <button
              onClick={() => {
                logOut();
                setIsMobileMenuOpen(false); // Close menu on click
              }}
              className="flex items-center gap-1 mt-2"
            >
              <FaUser size={20} />
              <p className="text-sm font-medium">Sign Out</p>
            </button>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
