import React, { useEffect, useState } from "react";
import * as cageService from "../../../services/cageService.jsx";
import * as crudService from "../../../services/crudService.js";
import ContactHookForm from "./AnimalForm.jsx";
import { useNavigate } from "react-router-dom";

export default function CreateAnimalPage() {
  const navigate = useNavigate();
  const [cageData, setCageData] = useState([]);

  useEffect(() => {
    const fetchCages = async () => {
      try {
        const response = await cageService.getAllCages();
        setCageData(response || []);
        console.log("Učitani kavezi:", response);
      } catch (err) {
        console.error("Greška pri dobavljanju kaveza:", err);
      }
    };

    fetchCages();
  }, []);

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
      <h2>Dodaj novu životinju</h2>
      <ContactHookForm
        cages={cageData}
        onSubmitBook={(animal) => {
          console.log("Šaljem ka serveru:", animal);
          handleCreate(animal);
        }}
        onCancel={() => navigate("/animals")}
      />
    </div>
  );
}
