/* eslint-disable react-hooks/exhaustive-deps */
import "./App.css";
import { Route, Routes, Navigate, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar.jsx";
import { useAuthStore, type AuthUser } from "./store/useAuthStore.ts";
import Signup from "./page/Signup.tsx";
import Login from "./page/Login.tsx";
import { useEffect } from "react";
import CreatePost from "./page/CreatePost.tsx";
import Home from "./page/Home.tsx";
import LandingPage from "./page/LandingPage.tsx";
import ProfilePage from "./page/ProfilePage.tsx";
import PostDetails from "./page/PostDetails.tsx";
import { Loader } from "lucide-react";

function App() {
  const location = useLocation();
  const hideNavbar = ["/login", "/register", "/"];
  const shouldHideNavbar = hideNavbar.includes(location.pathname);
  const { authUser, checkAuth, isCheckingAuth } = useAuthStore() as {
    authUser: AuthUser;
    isCheckingAuth: boolean;
    checkAuth: () => void;
  };

  useEffect(() => {
      checkAuth();
  }, [checkAuth]);

  if (isCheckingAuth && !authUser) {
    return (
      <div className="flex justify-center items-center h-screen" >
        <Loader className="size-10 animate-spin" /> 
      </div>
    );
  }

  return (
    <div>
      {!shouldHideNavbar && <Navbar />}
      <Routes>
        {/* for signup page */}
        <Route
          path="/register"
          element={!authUser ? <Signup /> : <Navigate to={"/posts"} />}
        />
        {/* for login page */}
        <Route
          path="/login"
          element={!authUser ? <Login /> : <Navigate to={"/posts"} />}
        />
        {/* for landing page page */}
        <Route
          path="/"
          element={!authUser ? <LandingPage /> : <Navigate to={"/posts"} />}
        />
        {/* for posts page (basically home page) */}
        <Route path="/posts" element={<Home />} />
        {/* for user profile page */}
        <Route
          path="/profile"
          element={
            isCheckingAuth ? (
              <div className="text-white">Loading...</div>
            ) : authUser ? (
              <ProfilePage />
            ) : (
              <Navigate to={"/login"} />
            )
          }
        />
        {/* for creating post page */}
        <Route
          path="/create-post"
          element={authUser ? <CreatePost /> : <Navigate to={"/login"} />}
        />
        {/* for post detailed view page */}
        <Route path="/detailedPost/:id" element={<PostDetails />} />
      </Routes>
    </div>
  );
}

export default App;
