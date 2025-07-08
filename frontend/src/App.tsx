/* eslint-disable react-hooks/exhaustive-deps */
import './App.css'
import { Route , Routes , Navigate } from 'react-router-dom'
import Navbar from './components/Navbar.jsx'
import { useAuthStore, type AuthUser } from './store/useAuthStore.ts'
import Signup from './page/Signup.tsx'
import Login from "./page/Login.tsx"
import { useEffect } from 'react'
import CreatePost from './page/CreatePost.tsx'
import Home from './page/Home.tsx'

function App() {

  const  { authUser , checkAuth } = useAuthStore() as { authUser: AuthUser; checkAuth: () => void };
  useEffect(() => {
    checkAuth();
  }, []);
  return (
   <div>
      <Navbar/>
      <Routes>
        <Route path='/register' element={ !authUser ? <Signup/> : <Navigate to={"/"} /> }/>
        <Route path='/login' element={ !authUser ? <Login/> : <Navigate to={"/"} /> }/>
        <Route path='/' element={<Home/> }/>
        <Route path='/' element={ !authUser ? <Login/> : <Navigate to={"/"} /> }/>
      </Routes>
   </div>
  )
}

export default App
