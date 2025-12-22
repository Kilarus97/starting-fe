import React, { useContext, useState } from "react";
import "../../styles/main.scss";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../AuthContext.jsx";

const AnimalsTable = ({ animals, onDelete, triggerRefresh }) => {
  const navigate = useNavigate();
  const { isAdmin } = useContext(AuthContext);




  return (
    <>
      <table className="books-table">
        <thead>
          <tr>
            <th>Naziv</th>
            <th>Vrsta</th>
            <th>Masa (KG)</th>
            {isAdmin && (
              <>
                <th>Izbriši</th>
                <th>Izmeni</th>
              </>
            )}
          </tr>
        </thead>
        <tbody>
          {animals.map((animal) => (
            <tr key={animal.id}>
              <td>{animal.name}</td>
              <td>{animal.species}</td>
              <td>{animal.mass}</td>
              {isAdmin && (
                <>
                  <td>
                    <button onClick={() =>{
                       onDelete(animal.id)
                       triggerRefresh()
                    }}>Izbriši</button>
                  </td>
                  <td>
                    <button onClick={() => navigate(`/edit-book/${book.id}`)}>Izmeni</button>
                  </td>
                </>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};

export default AnimalsTable;
