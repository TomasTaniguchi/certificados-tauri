import React from 'react'

function DataRow(props) {
    const {name, dni, birthdate, email, phone} = props;
    console.log(name)
  return (
    <div className="data">
    <div className="card">Nombre: {name}</div>
    <div className="card">DNI: {dni}</div>
    <div className="card">Fecha de Nac: {birthdate}</div>
    <div className="card">Email: {email}</div>
    <div className="card">TEL/CEL: {phone}</div>
    </div>
  )
}

export default DataRow