import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import Recipes from "./pages/Recipes";
import "./server"
import RecipeDetail from "./pages/RecipeDetail";
import Layout from "./components/Layout";
import Dashboard from "./pages/Create/Dashboard";
import Reviews from "./pages/Create/Reviews";
import CreateLayout from "./components/CreateLayout";
import CreateRecipes from "./pages/Create/CreateRecipes";
import CreateRecipeDetail from "./pages/Create/CreateRecipeDetail";
import CreateRecipeInfo from "./pages/Create/CreateRecipeInfo";
import CreateRecipeNotes from "./pages/Create/CreateRecipeNotes";
import CreateRecipePhotos from "./pages/Create/CreateRecipePhotos";

function App() {
  return (
    <BrowserRouter>
      
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />}/>
          <Route path="about" element={<About />}/>
          <Route path="recipes" element={<Recipes />}/>
          <Route path="recipes/:id" element={<RecipeDetail />}/>
          
          <Route path="create" element={<CreateLayout />}>
            <Route index element={<Dashboard />} />
            <Route path="reviews" element={<Reviews />}/>
            <Route path="recipes" element={<CreateRecipes />} />
            <Route path="recipes/:id" element={<CreateRecipeDetail />}>
              <Route index element={<CreateRecipeInfo />}/>
              <Route path="notes" element={<CreateRecipeNotes />}/>
              <Route path="photos" element={<CreateRecipePhotos />}/>
            </Route>
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
