import React from 'react';
import styles from  './App.module.css';
import { Allroutes } from './Routes/AllRoutes';

function App() {
  return (
    <div className={styles.App}>
      <Allroutes />
    </div>
  );
}

export default App;