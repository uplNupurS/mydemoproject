import React, { useEffect } from 'react';
import logo from './logo.svg';
import './App.css';
import  Header from './component/header/Header'
import Albumn from './component/albumn/Albumn';
import Hook from './container/Hook'

function App() {
  const { getImages } = Hook();

  return (
    <div>
      < Header />
      <Albumn/>
    </div>
  );
}

export default App;
