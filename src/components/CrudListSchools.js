import React from "react";
import { useEffect, useState } from "react";
import { Button, Card, CardContent, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

export default function CrudListSchools() {
  
  const [escuelas, setEscuelas] = useState([]);
  const navigate=useNavigate()
  const loadEscuelas = async () => {
    const response = await fetch("http://localhost:3000/crud-schools");
    const data = await response.json();
    setEscuelas(data);
  };

  const handleDelete = async (cod_escuela)=>{
    try {
      await fetch(`http://localhost:3000/crud-schools/${cod_escuela}`, {
      method:'DELETE',
    })
    setEscuelas(escuelas.filter(escuelas=>escuelas.cod_escuela !== cod_escuela))
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    loadEscuelas();
  }, []);

  return (
    <>
      <h1>CrudListSchools</h1>
      {escuelas.map((escuelas) => (
        <Card
        key={escuelas.cod_escuela}
          variant="elevation"
          style={{
            marginBottom: "1rem",
            backgroundColor: "#564e58",
            color: "aliceblue",
          }}
        >
          <CardContent
            style={{
              display: "grid",
              gridgap: "5px",
              justifyitems: "center",
              alignitems: "center",
              gridTemplateColumns: "repeat(3, 1fr)",
              gridTemplateRows: "repeat(2, 1fr)"
            }}
          >
            <Typography
              style={{
                gridColumn: "1 / 2",
                border: "1px solid #ddd",
                padding: "10px",
              }}
            >
              Codigo escuela: {escuelas.cod_escuela}
            </Typography>
            <Typography
              style={{
                gridColumn: "2/ 3",
                border: "1px solid #ddd",
                padding: "10px",
              }}
            >
              Nombre: {escuelas.nombre_escuela}
            </Typography>
            <Typography
              style={{
                gridColumn: "3 / 4",
                border: "1px solid #ddd",
                padding: "10px",
              }}
            >
              Fecha creacion: {escuelas.fecha_creacion.slice(0,10)}
            </Typography>

            <Button
              variant="contained"
              color="secondary"
              style={{
                gridColumn: "1 / 2",
                gridRow: "4 / 5",
                marginRight: "3rem",
                marginTop: ".9rem",
                justifySelf: "flex-start",
              }} onClick={()=>navigate(`/${escuelas.cod_escuela}/edit-schools`)}
            >
              Editar
            </Button>
            <Button
              variant="contained"
              color="warning"
              style={{
                gridColumn: "1 / 2",
                gridRow: "4 / 5",
                marginLeft: "auto",
                justifySelf: "flex-end",
                marginTop: ".9rem"}}
              onClick={()=> handleDelete(escuelas.cod_escuela)}
            >
              Eliminar
            </Button>
          </CardContent>
        </Card>
      ))}
    </>
  );
}
