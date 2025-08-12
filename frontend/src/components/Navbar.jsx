// Navbar Component
const Navbar = ({ onLogout }) => {
  return (
    <nav className="bg-[#1A2A44] px-6 py-4 flex justify-between items-center shadow-md shadow-black/30">
      <h1 className="text-2xl font-bold text-indigo-400">
          <a href='/'>
            CampusConnect
            </a></h1>
      <div className="flex gap-4">
        <a
          href="/features"
          className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 rounded-md transition"
        >
          Features
        </a>
        <a
          href="/about"
          className="px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded-md transition"
        >
          About
        </a>
        
        <button
          onClick={onLogout}
          className="px-4 py-2 bg-red-600 hover:bg-red-700 rounded-md transition"
        >
          Logout
        </button>
      </div>
    </nav>
  );
};

export default Navbar;