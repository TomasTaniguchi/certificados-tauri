import React, { useState, useEffect  } from "react";
import SQLite from 'tauri-plugin-sqlite-api'
import XLSX from 'xlsx';
import { save } from '@tauri-apps/api/dialog';
import { writeBinaryFile } from '@tauri-apps/api/fs';
import DataRow from "./DataRow";
import { Link } from "react-router-dom";


function DataTable() {  
    const [dbData, setDbData] = useState([]);

    const filters = [
      {name: "Excel Binary Workbook", extensions: ["xlsb"]},
      {name: "Excel Workbook", extensions: ["xlsx"]},
      {name: "Excel 97-2004 Workbook", extensions: ["xls"]},
      // ... other desired formats ...
    ];
    
    const excelExport = () =>{
      console.log("exportando")
      const wb = XLSX.utils.book_new();
      const ws = XLSX.utils.json_to_sheet(dbData.map(({id,...rest}) => ({...rest})));

      XLSX.utils.book_append_sheet(wb, ws, 'Certificados 1');
      XLSX.writeFile(wb, 'Datos_certificados.xlsx')
    }
    
    useEffect(() => {
        const loadData =  async ()=>{
          const db = await SQLite.open('../certificates.db').catch(console.e);
          const rows = await db.select('SELECT * FROM users');
          setDbData(rows)
          const isClosed = await db.close().catch(console.e)
        }
        loadData().catch(console.e)
        
      }, [dbData])
     

  return (
    <div>
      <h1>Consulta de datos</h1>
      <Link to="/">Ir a pantalla de carga.</Link>
      <div className="headerTable">        
        <button onClick={(e) => {
            excelExport();                  
          }}>Exportar a excel</button>
        </div>      
      {dbData.length > 0 ? dbData.map(x=> <DataRow {...{x, dbData, setDbData}} key={x.id}></DataRow>) : null}
    </div>
  )
}

export default DataTable