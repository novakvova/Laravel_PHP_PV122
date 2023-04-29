import React from 'react';
import logo from './logo.svg';
import './App.css';
import HomePage from './components/home/HomePage';
import CategoryCreatePage from './components/category/create/CategoryCreatePage';
import { Route, Routes } from 'react-router-dom';
import DefaultLayout from './components/containers/default/DefaultLayout';

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<DefaultLayout/>}>
          <Route index element={<HomePage />} />
          <Route path="categories/create" element={<CategoryCreatePage />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
