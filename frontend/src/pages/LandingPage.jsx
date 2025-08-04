import React from 'react';
import SplitText from '../components/wrappers/SplitText';
import Landingnavbar from '../components/LandingNavbar';
import HoverScale from '../components/wrappers/HoverScale';

const LandingPage = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gray-900 text-gray-100 font-sans">
      {/* Navbar */}
      {/* <header className="bg-gray-800 shadow w-full">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-indigo-400">CampusConnect</h1>

          <nav className="flex items-center gap-4 text-sm sm:text-base">
            <a href="#features" className="hover:text-indigo-300 transition">Features</a>
            <a href="#about" className="hover:text-indigo-300 transition">About</a>
            <a
              href="/login"
              className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg shadow transition"
            >
              Login
            </a>
          </nav>
        </div>
      </header> */}

      <Landingnavbar />


      {/* Hero Section */}
      <section className="flex-grow flex items-center justify-center text-center px-6 py-12">
        <div className="max-w-lg">

          {/* Main Text */}
          {/* <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-6 leading-snug">
            Connect, Collaborate, Communicate.
          </h2> */}
          <SplitText
            text="Connect, Collaborate, Communicate."
            className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-6 leading-snug"
            delay={30}
            duration={0.6}
            // ease="power3.out"
            // splitType="chars"
            from={{ opacity: 0, y: 40 }}
            to={{ opacity: 1, y: 0 }}
            threshold={0.1}
            // rootMargin="-100px"
            textAlign="center"
          />

          <p className="text-base sm:text-lg md:text-xl text-gray-300 mb-10">
            A central hub for students and faculty to post announcements, ask questions, and stay updated.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">

            <HoverScale>
              <a
                href="/register"
                className="px-6 py-3 bg-indigo-600 hover:bg-indigo-500 text-white font-medium rounded-lg transition shadow text-sm sm:text-base"
              >
                Get Started
              </a>
            </HoverScale>


            <HoverScale>
              <a
                href="#features"
                className="px-6 py-3 border border-gray-600 hover:border-indigo-400 hover:text-indigo-400 text-gray-300 rounded-lg transition text-sm sm:text-base"
              >
                Learn More
              </a>
            </HoverScale>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 py-4 text-center text-sm text-gray-400 border-t border-gray-700">
        © {new Date().getFullYear()} CampusConnect — Built with ❤️ by Team DBMS
      </footer>
    </div>
  );
};

export default LandingPage;
