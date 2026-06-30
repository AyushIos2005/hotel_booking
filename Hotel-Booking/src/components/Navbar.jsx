import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { assets } from "../assets/assets";
import { useClerk, useUser, UserButton } from "@clerk/clerk-react";

// Custom Icon for UserButton Menu
const BookIcon = () => (
  <svg className="w-4 h-4 text-gray-700" aria-hidden="true" xmlns="http://www.w3.org" width="24" height="24" fill="none" viewBox="0 0 24 24">
    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 19V4a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1v13H7a2 2 0 0 0-2 2Zm0 0a2 2 0 0 0 2 2h12M9 3v14m7 0v4" />
  </svg>
);

const Navbar = () => {
  const [isScrolled, setIsScrolled] = React.useState(false);
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  const { openSignIn } = useClerk();
  const { user } = useUser();
  const navigate = useNavigate();

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Hotels", path: "/rooms" },
    { name: "Experience", path: "/" },
    { name: "About", path: "/" },
  ];

  // Scroll effect to change navbar background & text color
  React.useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 w-full flex items-center justify-between px-4 md:px-16 lg:px-24 xl:px-32 transition-all duration-500 z-50 ${
        isScrolled 
          ? "bg-white/80 shadow-md backdrop-blur-lg py-3 md:py-4" 
          : "py-4 md:py-6"
      }`}
    >
      {/* 1. Logo */}
    {/* 1. Logo */}
<Link to="/">
     
     <svg width="220" height="60" viewBox="0 0 220 60" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="gradPin" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#ff4d8d"/>
      <stop offset="100%" stop-color="#ff9f1c"/>
    </linearGradient>
    <linearGradient id="gradText" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#2563eb"/>
      <stop offset="100%" stop-color="#f97316"/>
    </linearGradient>
  </defs>

  {/* <!-- Location Pin --> */}
  <path d="M30 5C18 5 10 14 10 24c0 14 20 31 20 31s20-17 20-31C50 14 42 5 30 5z"
        fill="url(#gradPin)"/>

  {/* <!-- Hotel --> */}
  <rect x="23" y="18" width="14" height="16" rx="2" fill="#ffffff"/>
  <rect x="26" y="22" width="3" height="3" fill="#2563eb"/>
  <rect x="31" y="22" width="3" height="3" fill="#2563eb"/>
  <rect x="26" y="27" width="3" height="3" fill="#2563eb"/>
  <rect x="31" y="27" width="3" height="3" fill="#2563eb"/>

  {/* <!-- Text --> */}
  <text x="70" y="38" font-size="28" font-weight="700"
        font-family="Poppins, Arial, sans-serif"
        fill="url(#gradText)">
    QuickStay
  </text>
</svg>
   
</Link>


      {/* 2. Desktop Navigation Links */}
      <div className="hidden md:flex items-center gap-4 lg:gap-8">
        {navLinks.map((link, i) => (
          <Link 
            key={i} 
            to={link.path} 
            className={`group flex flex-col gap-0.5 font-medium transition-colors duration-300 ${
              isScrolled ? "text-gray-800 hover:text-gray-900" : "text-white hover:text-gray-200"
            }`}
          >
            {link.name}
            <div className={`h-0.5 w-0 group-hover:w-full transition-all duration-300 origin-left ${
              isScrolled ? "bg-gray-800" : "bg-white"
            }`} />
          </Link>
        ))}

        {user && (
          <button 
            onClick={() => navigate('/owner')} 
            className={`border px-4 py-1 text-sm font-light rounded-full transition-all duration-300 ${
              isScrolled 
                ? "border-gray-800 text-gray-800 hover:bg-gray-800 hover:text-white" 
                : "border-white text-white hover:bg-white hover:text-gray-800"
            }`}
          >
            Dashboard
          </button>
        )}
      </div>

      {/* 3. Desktop Auth & Search */}
      <div className="hidden md:flex items-center gap-4">
        <img
          src={assets.searchIcon}
          alt="search"
          className={`h-7 cursor-pointer transition-all duration-500 ${
            isScrolled ? "brightness-100" : "brightness-0 invert"
          }`}
        />

        {user ? (
          <UserButton afterSignOutUrl="/">
            <UserButton.MenuItems>
              <UserButton.Action 
                label="My Bookings" 
                labelIcon={<BookIcon />} 
                onClick={() => navigate('/my-bookings')} 
              />
            </UserButton.MenuItems>
          </UserButton>
        ) : (
          <button
            onClick={() => openSignIn()}
            className={`px-8 py-2.5 rounded-full ml-4 font-medium transition-all duration-500 shadow-lg ${
              isScrolled 
                ? "bg-black text-white hover:bg-gray-900" 
                : "bg-white text-black hover:bg-gray-100"
            }`}
          >
            Login
          </button>
        )}
      </div>

      {/* 4. Mobile Controls (Hamburger & Profile) */}
      <div className="flex items-center gap-4 md:hidden">
        {user && <UserButton afterSignOutUrl="/" />}
        
        <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="focus:outline-none">
          <svg 
            className={`h-7 w-7 transition-colors duration-300 ${
              isScrolled ? "text-gray-800" : "text-white"
            }`} 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="2" 
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16m-7 6h7" />
          </svg>
        </button>
      </div>

      {/* 5. Mobile Full-Screen Menu */}
      <div
        className={`fixed top-0 left-0 w-full h-screen bg-white text-gray-800 flex flex-col items-center justify-center gap-8 font-semibold text-xl transition-transform duration-500 z-[60] ${
          isMenuOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <button className="absolute top-6 right-8 text-3xl" onClick={() => setIsMenuOpen(false)}>
          &times;
        </button>

        {navLinks.map((link, i) => (
          <Link 
            key={i} 
            to={link.path} 
            onClick={() => setIsMenuOpen(false)} 
            className="hover:text-blue-600 transition-colors duration-300"
          >
            {link.name}
          </Link>
        ))}

        {user ? (
          <button 
            onClick={() => { navigate('/owner'); setIsMenuOpen(false); }} 
            className="bg-black text-white px-10 py-3 rounded-full hover:bg-gray-900 transition-all duration-300"
          >
            Go to Dashboard
          </button>
        ) : (
          <button
            onClick={() => { openSignIn(); setIsMenuOpen(false); }}
            className="bg-black text-white px-12 py-3 rounded-full hover:bg-gray-900 transition-all duration-300"
          >
            Login
          </button>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
