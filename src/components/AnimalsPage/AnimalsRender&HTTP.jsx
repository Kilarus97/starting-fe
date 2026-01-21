import React, { useState, useEffect, useContext } from "react";
import AnimalsTable from "./Animals.jsx";
import { AuthContext } from "../../AuthContext.jsx";
import * as crudService from "../../services/crudService.js";
import * as cageService from "../../services/cageService.jsx";

export default function BooksPage() {
    const { isAdmin } = useContext(AuthContext);
    const [animals, setAnimals] = useState([]);
    const [sortType, setSortType] = useState("NameAsc");
    const [species, setSpecies] = useState("");
    const [cageCode, setCageCode] = useState("");
    const [withoutCage, setWithoutCage] = useState(false);
    const [cages, setCages] = useState([]);
    const [error, setError] = useState(null);
    const [refresh, setRefresh] = useState(0);

    useEffect(() => { 
        crudService.getAllAnimals()
         .then(res => { 
            setAnimals(res || []); 
            console.log("Učitane životinje:", res);  
        });

        cageService.getAllCages()
        .then(res => setCages(res || []))
        .catch(err => console.error("Greška pri učitavanju životinja:", err)); 
    }, [refresh]);

    const handleSearch = (e) => {
        e.preventDefault();
        const payload = {
            species: species || null,
            cageCode: cageCode || null,
            FilterNonCaged: withoutCage || false,
            sortType: sortType || "NameAsc"
        };
        crudService.searchAnimals(payload)
        .then(res => setAnimals(res || []))
        .catch(err => console.error("Greška pri pretrazi:", err));
    };
      
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

    const resetFilters = () => {
        setSpecies("");
        setCageCode("");
        setWithoutCage(false);
        setSortType("NameAsc");
        setRefresh(prev => prev + 1);
    };

    return (
        <div>
            {isAdmin && (   // 🚨 uslovni render forme samo za admina
              <form onSubmit={handleSearch} className="book-search-form">
                <fieldset>
                  <legend>Filteri</legend>
                  <div className="form-grid">
                    <label>
                      Species:
                      <input type="text" value={species} onChange={e => setSpecies(e.target.value)} />
                    </label>

                    <label>
                      CageCode :
                      <select value={cageCode} onChange={e => setCageCode(e.target.value)}>
                        <option value="">-- Izaberi kavez --</option>
                        {cages.map(c => <option key={c.id} value={c.code}>{c.code}</option>)}
                      </select>
                    </label>

                    <label>
                      Prikaži životinje bez kaveza:
                      <input
                        type="checkbox"
                        checked={withoutCage}
                        onChange={e => setWithoutCage(e.target.checked)}
                      />
                    </label>

                    <label>
                      Sortiraj po:
                      <select value={sortType} onChange={e => setSortType(e.target.value)}>
                        <option value="NameAsc">Name (Ascending)</option>
                        <option value="NameDesc">Name (Descending)</option>
                        <option value="SpeciesAsc">Species (Ascending)</option>
                        <option value="SpeciesDesc">Species (Descending)</option>
                        <option value="CageAsc">Cage (Ascending)</option>
                        <option value="CageDesc">Cage (Descending)</option>
                      </select>
                    </label>
                  </div>
                </fieldset>

                <div className="form-actions">
                  <button type="submit">Pretraži</button>
                  <button type="button" onClick={resetFilters}>Resetuj</button>
                </div>
              </form>
            )}

            <h2>Životinje koje su trenutno u ponudi</h2>
            {error && <p className="error">{error}</p>}
            <AnimalsTable
              animals={animals}
              onDelete={deleteAnimals}
              triggerRefresh={() => setRefresh(prev => prev + 1)}
            />
        </div>
    );
}
