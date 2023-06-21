import React from "react";
import { useEffect, useState } from "react";
import { Button, Card, CardContent, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

export default function CrudList() {
  
  const [estudiantes, setEstudiantes] = useState([]);
  const navigate=useNavigate()
  const loadEstudiantes = async () => {
    const response = await fetch("http://localhost:3000/crud-estudents");
    const data = await response.json();
    setEstudiantes(data);
  };

  const handleDelete = async (id)=>{
    try {
      await fetch(`http://localhost:3000/crud-estudents/${id}`, {
      method:'DELETE',
    })
    setEstudiantes(estudiantes.filter(estudiantes=>estudiantes.id_estudiante !== id))
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    loadEstudiantes();
  }, []);

  return (
    <>
      <h1>CrudListEstudents</h1>
      {estudiantes.map((estudiantes) => (
        <Card
        key={estudiantes.id_estudiante}
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
              gridTemplateRows: "repeat(4, 1fr)"
            }}
          >
            <Typography
              style={{
                gridColumn: "1 / 2",
                border: "1px solid #ddd",
                padding: "10px",
              }}
            >
              Nombre: {estudiantes.nombre}
            </Typography>
            <Typography
              style={{
                gridColumn: "2 / 3",
                border: "1px solid #ddd",
                padding: "10px",
              }}
            >
              Cedula: {estudiantes.cedula}
            </Typography>
            <Typography
              style={{
                gridColumn: "3 / 4",
                border: "1px solid #ddd",
                padding: "10px",
              }}
            >
              Escuela: {estudiantes.cod_escuela}
            </Typography>
            <Typography
              style={{
                gridColumn: "3 / 4",
                gridRow: "2 / 3",
                border: "1px solid #ddd",
                padding: "10px",
              }}
            >
              Telefono: {estudiantes.telefono}
            </Typography>
            <Typography
              style={{
                gridColumn: "1 / 2",
                gridRow: "2 / 3",
                border: "1px solid #ddd",
                padding: "10px",
              }}
            >
              Direccion: {estudiantes.direccion}
            </Typography>
            <Typography
              style={{
                gridColumn: "1 / 2",
                gridRow: "3 / 4",
                border: "1px solid #ddd",
                padding: "10px",
              }}
            >
              status: {estudiantes.status}
            </Typography>
            <Typography
              style={{
                gridColumn: "2 / 3",
                gridRow: "2 / 3",
                border: "1px solid #ddd",
                padding: "10px",
              }}
            >
              Fecha Nacimiento: {estudiantes.fecha_nacimiento.slice(0, 10)}
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
              }} onClick={()=>navigate(`/${estudiantes.id_estudiante}/edit-students`)}
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
              onClick={()=> handleDelete(estudiantes.id_estudiante)}
            >
              Eliminar
            </Button>
          </CardContent>
        </Card>
      ))}
    </>
  );
}
