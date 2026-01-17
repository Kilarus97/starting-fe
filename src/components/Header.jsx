import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../AuthContext.jsx";
import "../styles/main.scss";

const Header = () => {
  const { isAdmin,isAuthenticated, logout } = useContext(AuthContext);

  return (
    <header className="header"> 
      <h1>Dobrodošli — Novosadski Zooloski Vrt</h1>
      <nav>
        <ul className="nav-list">
          <li><Link to="/">Početna</Link></li>
          <li><Link to="/animals">Animals</Link></li>
          {!isAdmin ? null : (
            <>
              <li><Link to="/create-animal">Add new Animal</Link></li>
            </>
          )}

          {!isAuthenticated ? (
            <>
              <li><Link to="/register">Register</Link></li>
              <li><Link to="/login">Login</Link></li>
            </>
          ) : (
            <li>
              <button onClick={logout} className="logout-btn">Logout</button>
            </li>
          )}
        </ul>
      </nav>
    </header>
  );
};

export default Header;
