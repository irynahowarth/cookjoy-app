import React from "react";
import ReactDOM from "react-dom/client";
import {  RouterProvider, 
          createBrowserRouter, 
          createRoutesFromElements, 
          Route} from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import Recipes, {loader as recipesLoader} from "./pages/Recipes";
import "./server"
import RecipeDetail, {loader as recipeDetailsLoader} from "./pages/RecipeDetail";
import Layout from "./components/Layout";
import Error from "./components/Error";
import Dashboard from "./pages/Create/Dashboard";
import Reviews from "./pages/Create/Reviews";
import CreateLayout from "./components/CreateLayout";
import CreateRecipes, {loader as createRecipesLoader} from "./pages/Create/CreateRecipes";
import CreateRecipeDetail, {loader as createRecipeDetailsLoader} from "./pages/Create/CreateRecipeDetail";
import CreateRecipeInfo from "./pages/Create/CreateRecipeInfo";
import CreateRecipeNotes from "./pages/Create/CreateRecipeNotes";
import CreateRecipePhotos from "./pages/Create/CreateRecipePhotos";
import PageNotFound from "./pages/PageNotFound";
import Login, {loader as loginloader} from "./pages/Login";
import {requireAuth} from "./utils"

const router = createBrowserRouter(createRoutesFromElements(
    <Route path="/" element={<Layout />}>
      <Route index element={<Home />}/>
      <Route path="about" element={<About />}/>
      <Route 
          path="recipes" 
          element={<Recipes />}
          loader={recipesLoader}
          errorElement={<Error/>}
      />
      <Route 
          path="recipes/:id" 
          element={<RecipeDetail />}
          loader={recipeDetailsLoader}
      />
      <Route 
          path="login" 
          element={<Login />} 
          loader={loginloader}
      />
  
      <Route path="create" element={<CreateLayout />} >
        <Route 
          index 
          element={<Dashboard />}  
          loader={async ()=> await requireAuth()}
        />
        <Route 
          path="reviews" 
          element={<Reviews />} 
          loader={async ()=> await requireAuth()}
        />
        <Route 
            path="recipes" 
            element={<CreateRecipes />} 
            loader={createRecipesLoader} 
        />
        <Route 
            path="recipes/:id" 
            element={<CreateRecipeDetail />}
            loader={createRecipeDetailsLoader}
        >
          <Route 
            index 
            element={<CreateRecipeInfo />}
            loader={async ()=> await requireAuth()}
          />
          <Route 
            path="notes" 
            element={<CreateRecipeNotes />} 
            loader={async ()=> await requireAuth()}
          />
          <Route 
            path="photos" 
            element={<CreateRecipePhotos />} 
            loader={async ()=> await requireAuth()}
          />
        </Route>
      </Route>
      <Route path="*" element={<PageNotFound/>}/>
  </Route>
));

function App() {
  return (
    <RouterProvider router={router}/>
  )
}

export default App
