import React from "react";
import SplitText from "../components/wrappers/SplitText";
import Landingnavbar from "../components/LandingNavbar";
import HoverScale from "../components/wrappers/HoverScale";

const LandingPage = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-green-50 via-purple-100 to-white bg-opacity-60 backdrop-blur-md text-black font-sans">
      
      {/* Navbar */}
      <Landingnavbar />

      {/* Hero Section */}
      <section className="flex-grow flex flex-col items-center justify-center text-center px-6 py-20 max-w-4xl mx-auto">
        {/* Main Animated Text */}
        <>
  <SplitText
    text="Connect, Collaborate,"
    className="text-5xl md:text-5xl font-extrabold text-purple-700 mb-0 leading-tight"
    delay={30}
    duration={0.6}
    from={{ opacity: 0, y: 40 }}
    to={{ opacity: 1, y: 0 }}
    threshold={0.1}
    textAlign="center"
  />
  <SplitText
    text="Communicate."
    className="text-5xl md:text-5xl font-extrabold text-purple-700 mt-0 leading-tight"
    delay={30}
    duration={0.6}
    from={{ opacity: 0, y: 40 }}
    to={{ opacity: 1, y: 0 }}
    threshold={0.1}
    textAlign="center"
  />
</>



        <p className="text-lg md:text-xl text-gray-700 mb-12 max-w-xl">
          A central hub for students and faculty to post announcements, ask questions, and stay updated.
        </p>

        <div className="flex flex-col sm:flex-row gap-6 justify-center">
          <HoverScale>
            <a
              href="/register"
              className="px-8 py-3 bg-gradient-to-r border border-gray-900 from-green-100 to-purple-100 hover:from-green-200 hover:to-purple-200 text-gray-700 rounded-lg shadow-md transition font-semibold text-base"
            >
              Get Started
            </a>
          </HoverScale>

          <HoverScale>
            <a
              href="#features"
              className="px-8 py-3 bg-white bg-opacity-40 backdrop-blur-sm border border-purple-300 text-purple-700 hover:bg-opacity-60 hover:border-purple-400 rounded-lg shadow-sm transition font-semibold text-base"
            >
              Learn More
            </a>
          </HoverScale>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white bg-opacity-40 backdrop-blur-sm border-t border-purple-200 py-4 text-center text-sm text-purple-600">
        © {new Date().getFullYear()} CampusConnect — Built with ❤️ by Team DBMS
      </footer>
    </div>
  );
};

export default LandingPage;
