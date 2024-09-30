// src/components/NavBar.js
import React from 'react';
import { Link } from 'react-router-dom';
import './NavBar.css';

const NavBar = () => {
  return (
    <nav>
      <ul>
        <li><Link to="/">Ana Sayfa</Link></li>
        <li><Link to="/login">Giriş Yap</Link></li>
        <li><Link to="/signup">Kayıt Ol</Link></li>
        <li><Link to="/profile">Profil</Link></li>
      </ul>
    </nav>
  );
};

export default NavBar;
