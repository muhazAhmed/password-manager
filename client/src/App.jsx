import {BrowserRouter, Routes, Route} from "react-router-dom"
import "./index.css"
import Navbar from "./layouts/Navbar/Navbar";
import Home from './pages/Main/Home/Home'
import Login from './pages/User/login/Login'
import Register from './pages/User/Register/Register'
import About from './pages/Main/About/About'
import ContactUs from './pages/Main/ContactUs/ContactUs'
import ProtectedRoute from './util/ProtectiveRoutes'
import Dashboard from './pages/Password/Dashboard/Dashboard'
import Profile from './components/Profile-model/Profile'
import ProVersion from "./pages/Main/ProVersion/ProVersion";
import PasswordGenerator from "./pages/Password/Generate/PasswordGenerator";

function App() {
  return (
    <div className="app">
     <BrowserRouter>
     <Navbar/>
      <Routes>
        <Route path='/' element={<Home/>} />
        <Route path='/user/login' element={<Login/>} />
        <Route path='/user/register' element={<Register/>} />
        <Route path='/about' element={<About/>} />
        <Route path='/contact' element={<ContactUs/>} />
        <Route path='/buy/subscription' element={<ProVersion/>} />

        {/* =======ProtectedRoute============ */}

        <Route path='/user/dashboard' element={<ProtectedRoute><Dashboard/></ProtectedRoute>} />
        <Route path='/user/pass-generate' element={<ProtectedRoute><PasswordGenerator/></ProtectedRoute>} />
        <Route path='/user/profile/:id/:userName' element={<ProtectedRoute><Profile/></ProtectedRoute>} />
        {/* <Route path='/user/settings/:id' element={<ProtectedRoute><Settings/></ProtectedRoute>} /> */}

        <Route path='*' element={<Home/>} />
      </Routes>
    </BrowserRouter>
    </div>
  )
}

export default App
