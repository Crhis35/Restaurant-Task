import React from 'react';
import Routes from './Routes/Router';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const App = () => {
  return (
    <>
      <Routes />
      <ToastContainer />
    </>
  );
};

export default App;
