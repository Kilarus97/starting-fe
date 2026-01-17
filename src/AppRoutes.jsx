import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./components/Home.jsx";
import AnimalsPage from "./components/AnimalsPage/AnimalsRender&HTTP.jsx";
import LoginPage from "./components/Login&Register/LoginForm.jsx";
import RegisterPage from "./components/Login&Register/RegisterForm.jsx";
import CreateAnimalPage from "./components/AnimalsPage/AnimalForms/CreateAnimalPage.jsx";
import EditAnimalPage from "./components/AnimalsPage/AnimalForms/EditAnimalPage.jsx";

const AppRoutes = () => {
    return (
      <Routes>
        <Route path="/home" element={<Home />} />
        <Route path="/animals" element={<AnimalsPage />} />
        <Route path="/create-animal" element={<CreateAnimalPage/>} />
        <Route path="/edit-animal/:id" element={<EditAnimalPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
      </Routes>
    );
  };
  
  export default AppRoutes;