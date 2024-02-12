import React, { useState, useEffect  } from "react";
import SQLite from 'tauri-plugin-sqlite-api'
import DataRow from "./DataRow";
import { Link } from "react-router-dom";


function DataTable() {  
    const [dbData, setDbData] = useState([]);
    useEffect(() => {
        const loadData =  async ()=>{
          const db = await SQLite.open('../certificates.db');
          const rows = await db.select('SELECT * FROM users');
          setDbData(rows)
        }
        loadData().catch(console.e)
        
      }, [])
    
      if(dbData.length > 1){
        dbData.map(d=>{console.log(d)})
      }  

  return (
    <div>
      <h1>Consulta de datos</h1>
      <Link to="/">Ir a pantalla de carga.</Link>
      {dbData.length > 1 ? dbData.map(x=> <DataRow {...x}></DataRow>) : null}
    </div>
  )
}

export default DataTable