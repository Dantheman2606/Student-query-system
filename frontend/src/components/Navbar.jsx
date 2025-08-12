import { useState } from "react";

const Navbar = ({ onLogout }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="bg-[#1A2A44] px-6 py-4 flex justify-between items-center shadow-md shadow-black/30 relative">
      {/* Logo */}
      <h1 className="text-2xl font-bold text-indigo-400">
        <a href="/">CampusConnect</a>
      </h1>

      {/* Desktop Menu */}
     <div className="hidden lg:flex gap-4 items-center">
  <a
    href="/features"
    className="inline-flex items-center justify-center h-10 px-4 bg-indigo-600 hover:bg-indigo-700 rounded-md transition"
  >
    Features
  </a>
  <a
    href="/about"
    className="inline-flex items-center justify-center h-10 px-4 bg-gray-700 hover:bg-gray-600 rounded-md transition"
  >
    About
  </a>
  <button
    onClick={onLogout}
    className="inline-flex items-center justify-center h-10 px-4 bg-red-600 hover:bg-red-700 rounded-md transition"
  >
    Logout
  </button>
</div>




      {/* Mobile Hamburger Button */}
      <button
        className="lg:hidden flex flex-col gap-[4px] p-2"
        onClick={() => setIsMenuOpen(!isMenuOpen)}
      >
        <span className="block w-6 h-[2px] bg-white"></span>
        <span className="block w-6 h-[2px] bg-white"></span>
        <span className="block w-6 h-[2px] bg-white"></span>
      </button>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="absolute top-full right-0 mt-2 w-48 bg-[#1A2A44] shadow-lg rounded-md flex flex-col gap-2 p-4 lg:hidden z-50">
          <a
            href="/features"
            className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 rounded-md transition text-center"
            onClick={() => setIsMenuOpen(false)}
          >
            Features
          </a>
          <a
            href="/about"
            className="px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded-md transition text-center"
            onClick={() => setIsMenuOpen(false)}
          >
            About
          </a>
          <button
            onClick={() => {
              onLogout();
              setIsMenuOpen(false);
            }}
            className="px-4 py-2 bg-red-600 hover:bg-red-700 rounded-md transition text-center"
          >
            Logout
          </button>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
