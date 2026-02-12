// import { StrictMode } from 'react'
import React from 'react';
import { createRoot } from 'react-dom/client';
import './Component/Users/user.css';
import App from './App.jsx';
import './index.css'
import Example from './Example.jsx';


createRoot(document.getElementById('root')).render(
  // <StrictMode>
    <Example/>
  // </StrictMode>,
)
