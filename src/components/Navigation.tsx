"use client";

import { signIn, signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";

const navigationItems = [
  { name: "Home", href: "/" },
  { name: "About", href: "/about" },
  {
    name: "Services",
    href: "/services",
    dropdown: [
      { name: "Web Development", href: "/services/web-development" },
      { name: "Mobile Apps", href: "/services/mobile-apps" },
      { name: "Enterprise Solutions", href: "/services/enterprise" },
      { name: "HIPAA Compliant Software", href: "/services/hipaa-compliant-software" },
      { name: "Healthcare Practice Management", href: "/services/healthcare-practice-management" },
      { name: "Security Solutions", href: "/services/security" },
      { name: "AI & Machine Learning", href: "/services/ai-machine-learning" },
      { name: "Tech Consulting", href: "/services/consulting" },
    ],
  },
  { name: "Case Studies", href: "/case-studies" },
  { name: "Resources", href: "/resources" },
  { name: "FAQ", href: "/faq" },
  { name: "Contact", href: "/contact" },
];

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [clickDropdown, setClickDropdown] = useState<string | null>(null);
  const pathname = usePathname();
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const { data: session, status } = useSession();

  const isActive = (href: string) => {
    if (href === "/") {
      return pathname === "/";
    }
    return pathname.startsWith(href);
  };

  const handleMouseEnter = (itemName: string) => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    setActiveDropdown(itemName);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setActiveDropdown(null);
    }, 300);
  };

  const handleClick = (itemName: string) => {
    if (clickDropdown === itemName) {
      setClickDropdown(null);
    } else {
      setClickDropdown(itemName);
    }
    setActiveDropdown(itemName);
  };

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  return (
    <nav className="fixed top-0 w-full z-50 bg-gray-900/95 backdrop-blur-sm border-b border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2 group">
            <div className="w-8 h-8 rounded-lg overflow-hidden">
              <img
                src="/images/softwarepros-logo.png"
                alt="SoftwarePros Logo"
                className="w-full h-full object-cover"
              />
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent group-hover:from-purple-400 group-hover:to-blue-400 transition-all duration-300">
              SoftwarePros
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            {navigationItems.map((item) => (
              <div
                key={item.name}
                className="relative group"
                onMouseEnter={() => item.dropdown && handleMouseEnter(item.name)}
                onMouseLeave={handleMouseLeave}
              >
                <Link
                  href={item.href}
                  className={`flex items-center gap-1 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
                    isActive(item.href)
                      ? "bg-gradient-to-r from-purple-600 to-blue-600 text-white shadow-lg"
                      : "text-gray-300 hover:text-white hover:bg-gray-800"
                  }`}
                  onClick={(e) => {
                    if (item.dropdown) {
                      e.preventDefault();
                      handleClick(item.name);
                    }
                  }}
                >
                  {item.name}
                  {item.dropdown && (
                    <svg
                      className={`w-4 h-4 transition-transform duration-200 ${
                        activeDropdown === item.name || clickDropdown === item.name
                          ? "rotate-180"
                          : ""
                      }`}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      aria-label="Menu toggle"
                    >
                      <title>Menu toggle</title>
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  )}
                </Link>

                {/* Dropdown Menu */}
                {item.dropdown && (activeDropdown === item.name || clickDropdown === item.name) && (
                  <div
                    className={`absolute top-full left-0 mt-1 w-64 bg-gray-800/95 backdrop-blur-sm border border-gray-700 rounded-lg shadow-2xl z-[9999] transition-all duration-200 ${
                      activeDropdown === item.name || clickDropdown === item.name
                        ? "opacity-100 translate-y-0"
                        : "opacity-0 -translate-y-2 pointer-events-none"
                    }`}
                    onMouseEnter={() => handleMouseEnter(item.name)}
                    onMouseLeave={handleMouseLeave}
                  >
                    <div className="py-2">
                      {item.dropdown.map((dropdownItem) => (
                        <Link
                          key={dropdownItem.name}
                          href={dropdownItem.href}
                          className="block px-4 py-3 text-sm text-gray-300 hover:text-white hover:bg-gray-700/50 transition-all duration-200"
                          onClick={() => setActiveDropdown(null)}
                        >
                          {dropdownItem.name}
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}

            {/* Auth Section */}
            <div className="ml-4 border-l border-gray-700 pl-4">
              {status === "loading" ? (
                <div className="w-8 h-8 rounded-full bg-gray-700 animate-pulse" />
              ) : session ? (
                <div className="flex items-center space-x-3">
                  {session.user?.role === "admin" && (
                    <Link
                      href="/admin/dashboard"
                      className="px-3 py-1.5 text-sm font-medium text-purple-400 hover:text-purple-300 transition-colors duration-200"
                    >
                      Admin
                    </Link>
                  )}
                  {(session.user?.role === "client" || session.user?.role === "user") && (
                    <Link
                      href="/portal"
                      className="px-3 py-1.5 text-sm font-medium text-blue-400 hover:text-blue-300 transition-colors duration-200"
                    >
                      Dashboard
                    </Link>
                  )}
                  <div className="flex items-center space-x-2">
                    <div className="text-sm text-gray-300">
                      {session.user?.name || session.user?.email}
                    </div>
                    <button
                      onClick={() => signOut({ callbackUrl: "/" })}
                      className="px-3 py-1.5 text-sm font-medium text-red-400 hover:text-red-300 transition-colors duration-200"
                    >
                      Sign Out
                    </button>
                  </div>
                </div>
              ) : (
                <div className="flex items-center space-x-3">
                  <Link
                    href="/auth/signin"
                    className="px-3 py-1.5 text-sm font-medium text-gray-300 hover:text-white transition-colors duration-200"
                  >
                    Sign In
                  </Link>
                  <Link
                    href="/auth/register"
                    className="px-4 py-1.5 text-sm font-medium bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-lg hover:from-purple-700 hover:to-blue-700 transition-all duration-200 shadow-lg"
                  >
                    Get Started
                  </Link>
                </div>
              )}
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              type="button"
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-lg text-gray-400 hover:text-white hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-purple-500"
            >
              <span className="sr-only">Open main menu</span>
              {!isOpen ? (
                <svg
                  className="block h-6 w-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  role="img"
                  aria-label="Open menu"
                >
                  <title>Open menu</title>
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              ) : (
                <svg
                  className="block h-6 w-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  role="img"
                  aria-label="Close menu"
                >
                  <title>Close menu</title>
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 bg-gray-900 border-t border-gray-800">
            {navigationItems.map((item) => (
              <div key={item.name}>
                <Link
                  href={item.href}
                  className={`block px-3 py-2 rounded-lg text-base font-medium transition-all duration-300 ${
                    isActive(item.href)
                      ? "bg-gradient-to-r from-purple-600 to-blue-600 text-white"
                      : "text-gray-300 hover:text-white hover:bg-gray-800"
                  }`}
                  onClick={() => setIsOpen(false)}
                >
                  {item.name}
                </Link>
                {item.dropdown && (
                  <div className="ml-4 mt-1 space-y-1">
                    {item.dropdown.map((dropdownItem) => (
                      <Link
                        key={dropdownItem.name}
                        href={dropdownItem.href}
                        className="block px-3 py-2 text-sm text-gray-400 hover:text-white hover:bg-gray-800 rounded-lg transition-colors duration-200"
                        onClick={() => setIsOpen(false)}
                      >
                        {dropdownItem.name}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}

            {/* Mobile Auth Section */}
            <div className="mt-4 pt-4 border-t border-gray-800">
              {status === "loading" ? (
                <div className="px-3 py-2 text-gray-400">Loading...</div>
              ) : session ? (
                <div className="space-y-1">
                  <div className="px-3 py-2 text-sm text-gray-300">
                    Welcome, {session.user?.name || session.user?.email}
                  </div>
                  {session.user?.role === "admin" && (
                    <Link
                      href="/admin/dashboard"
                      className="block px-3 py-2 text-base font-medium text-purple-400 hover:text-purple-300 hover:bg-gray-800 rounded-lg transition-all duration-200"
                      onClick={() => setIsOpen(false)}
                    >
                      Admin Dashboard
                    </Link>
                  )}
                  {(session.user?.role === "client" || session.user?.role === "user") && (
                    <Link
                      href="/portal"
                      className="block px-3 py-2 text-base font-medium text-blue-400 hover:text-blue-300 hover:bg-gray-800 rounded-lg transition-all duration-200"
                      onClick={() => setIsOpen(false)}
                    >
                      Dashboard
                    </Link>
                  )}
                  <button
                    onClick={() => {
                      signOut({ callbackUrl: "/" });
                      setIsOpen(false);
                    }}
                    className="w-full text-left px-3 py-2 text-base font-medium text-red-400 hover:text-red-300 hover:bg-gray-800 rounded-lg transition-all duration-200"
                  >
                    Sign Out
                  </button>
                </div>
              ) : (
                <div className="space-y-1">
                  <Link
                    href="/auth/signin"
                    className="block px-3 py-2 text-base font-medium text-gray-300 hover:text-white hover:bg-gray-800 rounded-lg transition-all duration-200"
                    onClick={() => setIsOpen(false)}
                  >
                    Sign In
                  </Link>
                  <Link
                    href="/auth/register"
                    className="block px-3 py-2 text-base font-medium bg-gradient-to-r from-purple-600 to-blue-600 text-white hover:from-purple-700 hover:to-blue-700 rounded-lg transition-all duration-200"
                    onClick={() => setIsOpen(false)}
                  >
                    Get Started
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
