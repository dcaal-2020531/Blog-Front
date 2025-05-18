import React from 'react';
import './home.css'
import { useNavigate } from 'react-router-dom';

export const HomePage = () => {
  const navigate = useNavigate();

  return (
    <div className="home-container">
      <h1>Bienvenido al Blog</h1>
      <button onClick={() => navigate('/feed')}>
        Comenzar a publicar
      </button>
    </div>
  );
};
