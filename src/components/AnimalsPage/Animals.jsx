import React, { useContext } from "react";
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
            <th>Kavez</th>
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
            <tr
              key={animal.id}
              className={animal.cage ? "" : "no-cage"} // 🚨 ceo red pocrveni ako nema kavez
            >
              <td>{animal.name}</td>
              <td>{animal.species}</td>
              <td>{animal.mass}</td>
              <td>{animal.cage ? animal.cage.code : "Nije u kavezu"}</td>
              {isAdmin && (
                <>
                  <td>
                    <button
                      onClick={() => {
                        onDelete(animal.id);
                        triggerRefresh();
                      }}
                    >
                      Izbriši
                    </button>
                  </td>
                  <td>
                    <button onClick={() => navigate(`/edit-animal/${animal.id}`)}>
                      Izmeni
                    </button>
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
