import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

import Collections from './components/pages/Collections';
import ProductDetails from './components/pages/ProductDetails';


const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/collection/:collectionName" element={<Collections />} />
        <Route path="/product/:productName" element={<ProductDetails />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
