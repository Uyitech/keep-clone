import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import Trash from './components/Pages/Trash'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <Router>
        <Routes>
            <Route path="/" element={<App />} />
            {/* <Route path="Admin" element={<Admin />} /> */}
            <Route path="Trash" element={<Trash />} />
        </Routes>
    </Router>
);