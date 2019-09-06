import React from 'react';
import classes from './App.module.css';
import Calculator from './containers/Calculator/Calculator';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';

function App() {
  return (
    <div className={classes.App}>
      <Header />
      <Calculator />
      <Footer />
    </div>
    
  );
}

export default App;
