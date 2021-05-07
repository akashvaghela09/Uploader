import React from 'react';
import styles from  './App.module.css';
import { Header } from './Components/Header';
import { Allroutes } from './Routes/AllRoutes';

function App() {
  return (
    <div className={styles.App}>
      <Header />
      <Allroutes />
    </div>
  );
}

export default App;