import React from "react";
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import Recipes from "./pages/Recipes";
import "./server"
import RecipeDetail from "./pages/RecipeDetail";
import Layout from "./components/Layout";

function App() {
  return (
    <BrowserRouter>
      
      <Routes>
        <Route element={<Layout />}>
          <Route path='/' element={<Home />}/>
          <Route path='/about' element={<About />}/>
          <Route path='/recipes' element={<Recipes />}/>
          <Route path='/recipes/:id' element={<RecipeDetail />}/>
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
