/* eslint-disable react-hooks/exhaustive-deps */
import './App.css'
import { Route , Routes , Navigate , useLocation} from 'react-router-dom'
import Navbar from './components/Navbar.jsx'
import { useAuthStore, type AuthUser } from './store/useAuthStore.ts'
import Signup from './page/Signup.tsx'
import Login from "./page/Login.tsx"
import { useEffect } from 'react'
import CreatePost from './page/CreatePost.tsx'
import Home from './page/Home.tsx'
import LandingPage from './page/LandingPage.tsx'
import ProfilePage from './page/ProfilePage.tsx'


function App() {

  const location = useLocation();
  const hideNavbar = ["/login", "/register" , "/"]
  const shouldHideNavbar = hideNavbar.includes(location.pathname);
  const  { authUser , checkAuth } = useAuthStore() as { authUser: AuthUser; checkAuth: () => void };
  useEffect(() => {
    checkAuth();
  }, []);
  return (
   <div>
      {!shouldHideNavbar && <Navbar/>}
      <Routes>
        <Route path='/register' element={ !authUser ? <Signup/> : <Navigate to={"/posts"} /> }/>
        <Route path='/login' element={ !authUser ? <Login/> : <Navigate to={"/posts"} /> }/>
        <Route path='/' element={!authUser ? <LandingPage/> : <Navigate to={"/posts"}/>} />
        <Route path='/posts' element={<Home/> }/>
        <Route path='/profile' element={ authUser ? <ProfilePage/> : <Navigate to={"/login"} /> }/>
        <Route path='/create-post' element={ authUser ? <CreatePost/> : <Navigate to={"/login"} /> }/>
      </Routes>
   </div>
  )
}

export default App
