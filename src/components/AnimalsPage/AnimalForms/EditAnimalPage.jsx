import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import ContactHookForm from "./AnimalForm.jsx";
import * as crudService from '../../../services/crudService.js';
import * as cageService from '../../../services/cageService.jsx';


export default function EditAnimalPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [animalData, setAnimalData] = useState(null);
  const [cageData, setCageData] = useState(null);

  useEffect(() => {
    const fetchAnimal = async () => {
      try {
        const response = await crudService.getAnimalById(id);
        setAnimalData(response);
      } catch (err) {
        console.error("Greška pri dobavljanju zivotinje:", err);
      }
    };

    const fetchCages = async () => {
      try {
        const response = await cageService.getAllCages();
        setCageData(response);
      } catch (err) {
        console.error("Greška pri dobavljanju zivotinje:", err);
      }
    };
        
    fetchCages();
    fetchAnimal();
  }, [id]);

  const handleUpdate = async (updatedBook) => {
    try {
      await crudService.updateAnimal(updatedBook)
      navigate("/animals");
    } catch (err) {
      const serverMessage = err.response?.data?.message || "Greška na serveru.";
      alert(`Izmena nije uspela: ${serverMessage}`);
    }
  };

  if (!animalData) return <p>Učitavanje...</p>;

  return (
    <div>
      <h2>Izmeni Zivotinju</h2>
      <ContactHookForm
        cages={cageData}
        initialData={animalData}
        onSubmitBook ={handleUpdate}
        onCancel={() => navigate("/animals")}
      />
    </div>
  );
}
