import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import About from './pages/About'
import Home from './pages/Home'
import Profile from './pages/Profile'
import SignIn from './pages/SignIn'
import SignUp from './pages/SignUp'
import Header from './components/Header'
import PrivateRoute from './components/PrivateRoute'
import CreateListing from './pages/CreateListing'
import UpdateListing from './pages/UpdateListing'
import Listing from './pages/Listing'
import Search from './pages/Search'
import Footer from './components/Footer'

function App() {
  
  return (
  <BrowserRouter>
  <Header />
  <Routes>
  <Route path="/" element={<Home />} />
    <Route path="/home" element={<Home />} />
    <Route path="/about" element={<About />} />
    <Route path='/listing/:listingId' element={<Listing />} />
    <Route path='/search' element={<Search />} />
    <Route element={<PrivateRoute />}>
      <Route path="/profile" element={<Profile />} />
      <Route path='/createlisting' element={<CreateListing />} />
      <Route path='/updatelisting/:listingId' element={<UpdateListing />} />
    </Route>
    <Route path="/signin" element={<SignIn />} />
    <Route path="/signup" element={<SignUp />} />
  </Routes>
  <Footer />
  </BrowserRouter>
  )
}

export default App
