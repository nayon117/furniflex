import { useState } from "react";
import { FaUser, FaShoppingCart, FaBars } from "react-icons/fa";
import { Link } from "react-router-dom";
import { navbarLinks } from "../constants";
import useCart from "../hooks/useCart";
import useAuth from "../hooks/useAuth";

const Navbar = () => {
  const cart = useCart();
  const { user, logOut } = useAuth();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const placeholderAvatar =
    "https://ui-avatars.com/api/?name=User&background=random";

  return (
    <nav className="fixed z-50 w-full bg-white shadow-md">
      <div className="flex items-center justify-between p-4 sm:px-12">
        {/* Logo */}
        <Link className="flex items-center gap-1" to="/">
          <p className="text-2xl font-semibold flex items-center ">
            <img
              src="/F.png"
              alt="logo"
              className="bg-[#1E99F5] w-6 h-6 p-1 rounded-full mr-1"
            />
            Furni<span className="text-[#1E99F5]">Flex</span>
          </p>
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
              <p className="text-lg font-medium text-black">{item.label}</p>
            </Link>
          ))}
        </div>

        {/* Icons & Auth Section */}
        <div className="flex items-center">
          {/* Cart Icon with cart count */}
          <Link to="/cart" className="flex items-center mr-4">
            <FaShoppingCart size={20} />
            <p className="ml-1">({cart.cartItems.length})</p>
          </Link>

          {/* Auth Section */}
          {!user ? (
            // Display Sign In button when user is not logged in
            <div className="mr-2 flex gap-2">
              <Link to="/sign-in">
                <button className="flex items-center gap-1">
                  <FaUser size={20} />
                  <p className="text-sm font-medium">Sign In</p>
                </button>
              </Link>
            </div>
          ) : (
            // Display User Profile Picture and Dropdown when logged in
            <div className="relative">
              <button
                onClick={toggleDropdown}
                className="flex items-center gap-2"
              >
                <img
                  src={user.photoURL ? user.photoURL : placeholderAvatar}
                  alt="User Profile"
                  className="w-8 h-8 rounded-full"
                />
              </button>

              {/* Dropdown menu */}
              {isDropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white shadow-md rounded-md">
                  <button
                    onClick={logOut}
                    className="block w-full px-4 py-2 text-sm text-black hover:bg-gray-100"
                  >
                    Log Out
                  </button>
                </div>
              )}
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
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <p className="text-sm font-medium text-black">{item.label}</p>
            </Link>
          ))}

          {/* Cart in Mobile Menu */}
          <div className="flex gap-4">
            <Link to="/cart" className="flex items-center">
              <FaShoppingCart size={20} />
              <p className="ml-1">({cart.cartItems.length})</p>
            </Link>
          </div>

          {/* Auth Section in Mobile Menu */}
          {!user ? (
            <Link to="/sign-in">
              <button className="flex items-center gap-1 mt-2">
                <FaUser size={20} />
                <p className="text-sm font-medium">Sign In</p>
              </button>
            </Link>
          ) : (
            <button
              onClick={() => {
                logOut();
                setIsMobileMenuOpen(false); 
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
