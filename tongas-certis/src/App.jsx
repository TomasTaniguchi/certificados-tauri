import { useState, useEffect  } from "react";
import reactLogo from "./assets/react.svg";
import { invoke } from "@tauri-apps/api/tauri";
import Form from "./components/Form";
import DataTable from "./components/DataTable";
import "./App.css";
import SQLite from 'tauri-plugin-sqlite-api'
import { Routes, Route } from "react-router-dom"

/** The path will be 'src-tauri/test.db', you can customize the path */


function App() {

  useEffect(() => {
    const dbStarter = async () => {
      const db = await SQLite.open('../certificates.db');
      await db.execute(`
        CREATE TABLE IF NOT EXISTS users (id BLOB PRIMARY KEY, name TEXT, dni TEXT, birthdate DATE, email TEXT, phone TEXT);
      `);
    }
    dbStarter()
      .catch(console.error);
  }, [])

  return (
    <div className="container"> 
      <h1>Tongas APP!</h1>
      <div>
      <Routes>
        <Route path="/" element={ <Form /> } />
        <Route path="data" element={ <DataTable /> } />
      </Routes>
    </div>      
    </div>
    
  );
}

export default App;
