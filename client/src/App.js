import './App.css';
import React from 'react';
import FileUpload from './FileUpload/FileUpload';
import NavBar from './NavBar/Navbar'
import AboutUsCard from './AboutUs/AboutUsCard';


function App() {
  return (
    <>
    <div className="App">
      <NavBar/>
      <FileUpload/>
      <AboutUsCard/>
    </div>
    </>
  );
}

export default App;
