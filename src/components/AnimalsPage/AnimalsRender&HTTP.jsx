import React, { useState, useEffect } from "react";
import AnimalsTable from "./Animals.jsx";
import * as crudService from "../../services/crudService.js";

export default function BooksPage() {
    const [animals, setAnimals] = useState([]);
    const [error, setError] = useState(null);

    const [refresh, setRefresh] = useState(0);


    useEffect(() => {
        crudService.getAllAnimals()
          .then(res => setAnimals(res || []))
          .catch(err => console.error("Greška pri učitavanju zivotinja:", err));
      }, [refresh]);
      
      const fetchBooks = async () => {
        try {
            const data = await crudService.getAllAnimals();
            setAnimals(data);
        } catch (error) {
            setError(`Greška pri učitavanju zivotinja: ${error}`);
            console.error(error);
        }
    };

    const deleteAnimals = async (id) => {
        try {
            await crudService.deleteAnimal(id);
            fetchBooks();
        } catch (error) {
            setError(`Greška pri brisanju zivotinje: ${error}`);
            console.error(error);
        }
    };

      



    return (
        <div>
            <h2>Zivotinje koje su trenutno u ponudi</h2>
            {error && <p className="error">{error}</p>}
            <AnimalsTable
            animals={animals}
            onDelete={deleteAnimals}
            triggerRefresh={() => setRefresh(prev => prev + 1)}
            />
        </div>
    );
}