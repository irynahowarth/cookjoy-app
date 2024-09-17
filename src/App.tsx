import React from "react";
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import Recipes from "./pages/Recipes";
import "./server"

function App() {
  return (
    <BrowserRouter>
      <header>
        <h1><Link to='/'>CookJoy</Link></h1>
        <nav>
          <Link to="/about">About</Link>
          <Link to="/recipes">Recipes</Link>
        </nav>
      </header>
      <Routes>
        <Route path='/' element={<Home />}/>
        <Route path='/about' element={<About />}/>
        <Route path='/recipes' element={<Recipes />}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App
