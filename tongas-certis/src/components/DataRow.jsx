import React from 'react'
import SQLite from 'tauri-plugin-sqlite-api'

function DataRow(props) {
    const {id,name, dni, birthdate, email, phone} = props.x;
    const {dbData, setDbData} = props
    //console.log(props.dbData)
    const deleteRow = async (id)=>{
      setDbData(dbData.filter(x => !x.id == id))
      const db = await SQLite.open('../certificates.db').catch(console.e);
      await db.execute('DELETE FROM users WHERE id = (?1)', [id]);
      const isClosed = await db.close().catch(console.e)
    };

  return (
    <div className="data">
    <div className="card">Nombre: {name}</div>
    <div className="card">DNI: {dni}</div>
    <div className="card">Fecha de Nac: {birthdate}</div>
    <div className="card">Email: {email}</div>
    <div className="card">TEL/CEL: {phone}</div>
    <button onClick={(e) => {
          deleteRow(id);                  
        }}>Borrar</button>
    </div>
  )
}

export default DataRow