import { useState, useEffect  } from "react";
import reactLogo from "./assets/react.svg";
import { invoke } from "@tauri-apps/api/tauri";
import "./App.css";

import SQLite from 'tauri-plugin-sqlite-api'
import { v4 as uuid } from 'uuid';

/** The path will be 'src-tauri/test.db', you can customize the path */


function App() {
  const [name, setName] = useState("");
  const [dni, setDni] = useState("");
  const [birthdate, setBirthdate] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

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
  
  //CREATE TABLE IF NOT EXISTS users (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT, dni TEXT, birthdate DATE, email TEXT, phone TEXT);


  async function dataLoader() {
    const dniRegex = /^[\d]{1,3}\.?[\d]{3,3}\.?[\d]{3,3}$/;
    const dateRegex = /^(0[1-9]|[1-2][0-9]|3[0-1])-(0[1-9]|1[0-2])-\d{4}$/;
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const argentinianPhoneRegex = /^(?:(?:00)?549?)?0?(?:11|[2368]\d)(?:(?=\d{0,2}15)\d{2})??\d{8}$/;
    if(name.length < 3){
      alert("Ingrese un nombre correcto");
      setName("");
    }
    if(!dniRegex.test(dni)){
      alert("Ingrese un DNI correcto");
      setDni("");
    }
    if(!dateRegex.test(birthdate)){
      alert("Ingrese fecha de nacimiento correcta");
      setBirthdate("");
    }
    if(!emailRegex.test(email)){
      alert("Ingrese un correo electronico correcto");
      setEmail("");
    }
    if(!argentinianPhoneRegex.test(phone)){
      alert("Ingrese un telefono correcto");
      setPhone("");
    }
    else{
      const db = await SQLite.open('../certificates.db');
      await db.execute('INSERT INTO users VALUES (?1, ?2, ?3, ?4, ?5, ?6)', [uuid(), name, dni,birthdate,email,phone ]);
      
      setName("");
      setBirthdate("");
      setDni("");
      setEmail("");
      setPhone("");
      const isClosed = await db.close();
    }
    
  }

  return (
    <div className="container">
      <h1>Carga de datos - Tongas APP!</h1>
      <form
        className="column"
        onSubmit={(e) => {
          e.preventDefault();
          dataLoader();
                  
        }}
      >
        <input
          id="name-input"
          onChange={(e) => setName(e.currentTarget.value)}
          placeholder="Ingrese nombre..."
          value={name}
        />
        <input
          id="dni-input"
          onChange={(e) => setDni(e.currentTarget.value)}
          placeholder="Ingrese DNI..."
          value={dni}
        />
        <input
          id="birthdate-input"
          onChange={(e) => setBirthdate(e.currentTarget.value)}
          placeholder="Ingrese fecha de nacimiento..."
          value={birthdate}
        />
        <input
          id="email-input"
          onChange={(e) => setEmail(e.currentTarget.value)}
          placeholder="Ingrese correo electronico..."
          value={email}
        />
        <input
          id="phone-input"
          onChange={(e) => setPhone(e.currentTarget.value)}
          placeholder="Ingrese telefono..."
          value={phone}
        />
        <button type="submit">Greet</button>
      </form>
    </div>
  );
}

export default App;
