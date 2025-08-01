import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useAuthStore } from "../store/useAuthStore";
import { Menu, X, LogOut, User, PlusCircle, BookCopy, Sparkles } from "lucide-react";
import type { AuthUser } from "../store/useAuthStore";

type AuthStore = {
  logout: () => void;
  authUser: AuthUser | null;
};

const Navbar = () => {
  const { logout, authUser } = useAuthStore() as AuthStore;
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  const toggleMenu = () => setMobileMenuOpen((prev) => !prev);
  const closeMenu = () => setMobileMenuOpen(false);

  return (
    <header className="bg-white shadow-sm border-b fixed top-0 left-0 w-full z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="text-2xl font-bold text-primary tracking-tight">
            <Logo />
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-6">
            {authUser ? (
              <>
              {!location.pathname.includes("/ai/suggestion") && (
                <Link to="/ai/suggestion" className="text-sm font-medium hover:text-primary flex items-center gap-1">
                  <Sparkles strokeWidth={1.2} className="w-6 h-6 animate-spin" />
                  Get AI Help
                </Link>
              )}
                {!location.pathname.includes("/posts") && (
                  <Link to="/posts" className="text-sm font-medium hover:text-primary flex items-center gap-1">
                    <BookCopy className="w-6 h-6" />
                    Blogs
                  </Link>
                )}
                {!location.pathname.includes("/create-post") && (
                  <Link to="/create-post" className="text-sm font-medium hover:text-primary flex items-center gap-1">
                    <PlusCircle className="w-6 h-6" />
                    Create
                  </Link>
                )}
                {!location.pathname.includes("/profile") && (
                <Link to="/profile" className="text-sm font-medium hover:text-primary flex items-center gap-1">
                  <User className="w-6 h-6" />
                  Profile
                </Link>
                )}
                <button onClick={logout} className="text-sm font-medium hover:text-red-500 flex items-center gap-1">
                  <LogOut className="w-6 h-6" />
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link to="/login" className="text-sm font-medium hover:text-primary">
                  Login
                </Link>
                <Link to="/register" className="text-sm font-medium hover:text-primary">
                  Register
                </Link>
              </>
            )}
          </div>

          {/* Mobile Hamburger */}
          <div className="md:hidden">
            <button onClick={toggleMenu}>
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white shadow-md border-t">
          <div className="px-4 py-4 space-y-3">
            {authUser ? (
              <>
                {!location.pathname.includes("/create-post") && (
                  <Link to="/create-post" onClick={closeMenu} className="block text-sm font-medium">
                    Create Post
                  </Link>
                )}
                {!location.pathname.includes("/posts") && (
                  <Link to="/posts" onClick={closeMenu} className="block text-sm font-medium">
                    Blogs
                  </Link>
                )}
                <Link to="/ai/suggestion" onClick={closeMenu} className="block text-sm font-medium">
                  Get AI Help
                </Link>
                <Link to="/profile" onClick={closeMenu} className="block text-sm font-medium">
                  Profile
                </Link>
                <button
                  onClick={() => {
                    logout();
                    closeMenu();
                  }}
                  className="block text-sm font-medium text-red-500"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link to="/login" onClick={closeMenu} className="block text-sm font-medium">
                  Login
                </Link>
                <Link to="/register" onClick={closeMenu} className="block text-sm font-medium">
                  Register
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;

export function Logo() {
  return (
    <h2 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0">
      Aradhana
    </h2>
  );
}
