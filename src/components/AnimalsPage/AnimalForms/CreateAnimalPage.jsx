import React from "react";
import * as crudService from '../../../services/crudService.js';
import ContactHookForm from "./AnimalForm.jsx";
import { useNavigate } from "react-router-dom";

export default function CreateAnimalPage({  }) {
    const navigate = useNavigate();

    const handleCreate = async (animal) => {
      try {
        await crudService.createAnimal(animal);
        navigate("/animals");
      } catch (err) {
        const serverMessage = err.response?.data?.message || "Dodavanje nije uspelo.";
        alert(serverMessage);
      }
    };
    
  return (
    <div>
      <h2>Dodaj novu zivotinju</h2>
      <ContactHookForm
        onSubmitBook={(animal) => {
            console.log("Šaljem ka serveru:", animal);
            handleCreate(animal);
        }}
        onCancel={() => navigate("/animals  ")}
      />
    </div>
  );
}
