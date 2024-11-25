import React from "react";
import ReactDOM from "react-dom/client";
import {  RouterProvider, 
          createBrowserRouter, 
          createRoutesFromElements, 
          Route} from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import Recipes, {loader as recipesLoader} from "./pages/Recipes";
// import "./server"
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
import Login, {loader as loginLoader, action as loginAction} from "./pages/Login";
import {AuthProvider } from './context/auth'
import RequireAuth from "./RequireAuth";
import Signup, {action as signupAction} from "./pages/Signup";
import Profile, {action as profileUpdateAction} from "./pages/Profile";
import AddNewRecipe, {action as addRecipeAction} from "./pages/Create/AddNewRecipe";
import EditRecipe from './components/EditRecipe'
import {action as recipeAction} from './components/RecipeForm'
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
          loader={loginLoader}
          action={loginAction}
      />
      <Route 
        path="signup" 
        element={<Signup/>}
        action={signupAction}  
      />
      <Route 
        path="profile"
        element={<Profile/>}
        action={profileUpdateAction}
      />
      
  
      <Route path="create" element={
        <RequireAuth redirectTo="/login">
          <CreateLayout />  
        </RequireAuth>} >
        <Route 
          index 
          element={<Dashboard />}  
        />
        <Route 
          path="reviews" 
          element={<Reviews />} 
        />
         <Route 
          path="recipes/:id/edit" 
          element={<EditRecipe />} 
          action={recipeAction}
        />
         <Route 
          path="recipes/new" 
          element={<AddNewRecipe />} 
          action={recipeAction}
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
          />
          <Route 
            path="notes" 
            element={<CreateRecipeNotes />} 
          />
          <Route 
            path="photos" 
            element={<CreateRecipePhotos />} 
          />
        </Route>
      </Route>
      <Route path="*" element={<PageNotFound/>}/>
  </Route>
));

function App() {
  return (
    <AuthProvider>
      <RouterProvider router={router}/>
    </AuthProvider>
  )
}

export default App
