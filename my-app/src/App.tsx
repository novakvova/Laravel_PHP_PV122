import React from 'react';
import logo from './logo.svg';
import './App.css';
import HomePage from './components/home/HomePage';
import DefaultHeader from './components/containers/default/DefaultHeader';
import CategoryCreatePage from './components/category/create/CategoryCreatePage';

function App() {
  return (
    <>
      <DefaultHeader />
      <HomePage />
      <CategoryCreatePage />
    </>
  );
}

export default App;
