import React, { useState, useEffect  } from "react";
import SQLite from 'tauri-plugin-sqlite-api'
import { v4 as uuid } from 'uuid';
import { Link } from "react-router-dom";

const Form=()=> {
  const [name, setName] = useState("");
  const [dni, setDni] = useState("");
  const [birthdate, setBirthdate] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  const dataLoader = async()=> {
    const dniRegex = /^[\d]{1,3}\.?[\d]{3,3}\.?[\d]{3,3}$/;
    const dateRegex = /^(0[1-9]|[1-2][0-9]|3[0-1])-(0[1-9]|1[0-2])-\d{4}$/;
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const argentinianPhoneRegex = /^(?:(?:00)?549?)?0?(?:11|[2368]\d)(?:(?=\d{0,2}15)\d{2})??\d{8}$/;
    if(name.length < 3){
      alert("Ingrese un nombre correcto");
    }
    if(!dniRegex.test(dni)){
      alert("Ingrese un DNI correcto");
    }
    if(birthdate.length<10 || birthdate == ""){
      alert("Ingrese fecha de nacimiento correcta");
    }
    if(!emailRegex.test(email)){
      alert("Ingrese un correo electronico correcto");
    }
    if(!argentinianPhoneRegex.test(phone)){
      alert("Ingrese un telefono correcto");
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
    <div>
      <h1>Carga de datos</h1>
      <Link to="data">Ir a pantalla de datos.</Link>
    <form
        className="column"
        onSubmit={(e) => {
          e.preventDefault();
          dataLoader();
                  
        }}
      >
        <input
          className="card"
          id="name-input"
          onChange={(e) => setName(e.currentTarget.value)}
          placeholder="Ingrese nombre..."
          value={name}
        />
        <input
          className="card"
          id="dni-input"
          onChange={(e) => setDni(e.currentTarget.value)}
          placeholder="Ingrese DNI..."
          value={dni}
        />
        <input
          className="card"
          id="birthdate-input"
          type="date"
          onChange={(e) => {setBirthdate(e.currentTarget.value);}}
          placeholder="Ingrese fecha de nacimiento..."
          value={birthdate}
        />
        <input
          className="card"
          id="email-input"
          onChange={(e) => setEmail(e.currentTarget.value)}
          placeholder="Ingrese correo electronico..."
          value={email}
        />
        <input
          className="card"
          id="phone-input"
          onChange={(e) => setPhone(e.currentTarget.value)}
          placeholder="Ingrese telefono..."
          value={phone}
        />
        <button className="boton" type="submit">Cargar</button>
      </form>
      </div>
  )
}

export default Form