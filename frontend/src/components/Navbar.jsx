import { useState } from "react";

const Navbar = ({ onLogout }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav
  className="sticky top-0 z-50 bg-white/20 backdrop-blur-3xl px-6 py-4 flex justify-between items-center shadow-md shadow-purple-100/30 relative"
>
  {/* nav content */}
{/* </nav> */}


      {/* Logo */}
      <h1 className="text-2xl font-bold text-purple-500">
        <a href="/" className="hover:text-green-500 transition">CampusConnect</a>
      </h1>

      {/* Desktop Menu */}
      <div className="hidden lg:flex gap-4 items-center">
        <a
          href="/features"
          className="inline-flex items-center justify-center h-10 px-4 bg-white hover:bg-purple-50 text-purple-500 rounded-md transition"
        >
          Features
        </a>
        <a
          href="/about"
          className="inline-flex items-center justify-center h-10 px-4 bg-white hover:bg-purple-50 text-green-500 rounded-md transition"
        >
          About
        </a>
        <button
          onClick={onLogout}
          className="inline-flex items-center justify-center h-10 px-4 bg-red-50 hover:bg-red-100 text-red-600 rounded-md transition"
        >
          Logout
        </button>
      </div>

      {/* Mobile Hamburger Button */}
      <button
        className="lg:hidden flex flex-col gap-[4px] p-2"
        onClick={() => setIsMenuOpen(!isMenuOpen)}
      >
        <span className="block w-6 h-[2px] bg-purple-200"></span>
        <span className="block w-6 h-[2px] bg-purple-200"></span>
        <span className="block w-6 h-[2px] bg-purple-200"></span>
      </button>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="absolute top-full right-0 mt-2 w-48 bg-white shadow-lg rounded-md flex flex-col gap-2 p-4 lg:hidden z-50 border border-purple-100">
          <a
            href="/features"
            className="px-4 py-2 bg-white hover:bg-purple-50 rounded-md transition text-purple-500 text-center"
            onClick={() => setIsMenuOpen(false)}
          >
            Features
          </a>
          <a
            href="/about"
            className="px-4 py-2 bg-white hover:bg-purple-50 rounded-md transition text-green-500 text-center"
            onClick={() => setIsMenuOpen(false)}
          >
            About
          </a>
          <button
            onClick={() => {
              onLogout();
              setIsMenuOpen(false);
            }}
            className="px-4 py-2 bg-red-50 hover:bg-red-100 rounded-md transition text-red-600 text-center"
          >
            Logout
          </button>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
