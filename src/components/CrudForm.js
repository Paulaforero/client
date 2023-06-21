import {
  Card,
  CardContent,
  Grid,
  TextField,
  Typography,
  MenuItem,
  Button,
  CircularProgress,
} from "@mui/material";
import {useState,useEffect} from "react";
import { useNavigate,useParams} from "react-router-dom";

const currencies_status = [
  {
    value: "A",
    label: "Activo",
  },
  {
    value: "E",
    label: "Egresado",
  },
  {
    value: "R",
    label: "Retirado",
  },
  {
    value: "N",
    label: "No inscrito",
  },
];

export default function CrudForm() {
    const [estudiante,setEstudiante]=useState({
        nombre:"",
        cedula:"",
        telefono:"",
        fecha_nacimiento:"",
        direccion:"",
        status:"A",
        cod_escuela:"INGIF"
});
    const [loading,setLoading] = useState(false)
    const [editing, setEditing] = useState(false)
    const [escuelas,setEscuelas]= useState([]);
    const navigate = useNavigate();
    const params = useParams();
    

    const loadSchools=async () => {
      const schoolsList = await fetch ('http://localhost:3000/crud-schools')
      const dataSchools = await schoolsList.json()
      setEscuelas(dataSchools);
    }
    const handleSubmit = async (e)=>{
        e.preventDefault();
        setLoading(true)
        if (editing) {
           await fetch(`http://localhost:3000/crud-estudents/${params.id}`,{
            method:'PUT',
            body:JSON.stringify(estudiante),
            headers:{"Content-Type": "application/json"
        }
        }
            )
        }else{
            await fetch('http://localhost:3000/crud-estudents',{
            method:"POST",
            body:JSON.stringify(estudiante),
            headers:{"Content-Type": "application/json"}
        });
        }
        setLoading(false)
        navigate('/')
        
    };

    const handleChange = e=>
        setEstudiante({...estudiante,[e.target.name]:e.target.value});
    


    const loadEstudiantes = async (id) =>{
       const res = await fetch(`http://localhost:3000/crud-estudents/${id}`)
       const data = await res.json()
       setEstudiante({
        cedula: data.cedula,
        cod_escuela: data.cod_escuela,
        direccion: data.direccion,
        fecha_nacimiento: data.fecha_nacimiento,
        id_estudiante: data.id_estudiante,
        nombre:data.nombre,
        status: data.status,
        telefono: data.telefono
       })
       setEditing(true);
    };

   useEffect(()=>{
        if (params.id){
            loadEstudiantes(params.id);
        }
    },[params.id]); 

    useEffect(()=>{
      loadSchools();
    },[]) 

  return (
    <Grid
      container
      alignItems="center"
      justifyContent="center"
      direction="column"
    >
      <Grid item xs={3}>
        <Card sx={{ mt: 5 }} style={{backgroundColor:"#564e58", padding: "1rem"}}>
          <Typography variant="subtitle1" textAlign="center" color="aliceblue">Agregar</Typography>
          <CardContent>
            <form onSubmit={handleSubmit}>
                <div style={{ display:"flex",flexWrap:"wrap", justifyContent:"space-evenly"}}>
              <TextField
                required
                label="nombre"
                color="secondary"
                variant="outlined"
                sx={{flexGrow:1, margin:".5rem .5rem", }}
                onChange={handleChange}
                name="nombre"
                value={estudiante.nombre}
                inputProps={{style:{color:"aliceblue"}}}
                InputLabelProps={{style:{color:"aliceblue"}}}
              />
              <TextField
                required
                label="cedula"
                color="secondary"
                variant="outlined"
                sx={{flexGrow:1, margin:".5rem .5rem"}}
                onChange={handleChange}
                name="cedula"
                value={estudiante.cedula}
                inputProps={{style:{color:"aliceblue"}}}
                InputLabelProps={{style:{color:"aliceblue"}}}
              />
              <TextField
                id="outlined-select-currency"
                select
                label="Seleccione"
                defaultValue='INGIF'
                value={estudiante.cod_escuela}
                helperText="Ingrese la escuela"
                color="secondary"
                sx={{margin:".5rem .5rem", flexGrow:3}}
                onChange={handleChange}
                name="cod_escuela"
                FormHelperTextProps={{ style: { color: "aliceblue" } }}
                InputLabelProps={{style:{color:"aliceblue"}}}
                SelectProps={{ style: { color: "white" } }}
              >
                {escuelas.map((option) => (
                  <MenuItem key={option.cod_escuela} value={option.cod_escuela}>
                    {option.nombre_escuela}
                  </MenuItem>
                ))}
              </TextField>
              <TextField
                label="Telefono"
                color="secondary"
                variant="outlined"
                sx={{margin:".5rem .5rem",flexGrow:3}}
                onChange={handleChange}
                name="telefono"
                value={estudiante.telefono}
                inputProps={{style:{color:"aliceblue"}}}
                InputLabelProps={{style:{color:"aliceblue"}}}
              />
              
              <TextField
                id="outlined-select-currency"
                select
                label="Seleccione"
                defaultValue='A'
                value={estudiante.status}
                helperText="Ingrese el status"
                color="secondary"
                sx={{margin:".5rem .5rem",flexGrow:3}}
                onChange={handleChange}
                name="status"
                InputLabelProps={{style:{color:"aliceblue"}}}
                SelectProps={{ style: { color: "aliceblue" } }}
                FormHelperTextProps={{ style: { color: "aliceblue" } }}
              >
                {currencies_status.map((option) => (
                  <MenuItem key={option.value} value={option.value} >
                    {option.label}
                  </MenuItem>
                ))}
              </TextField>

              <TextField
                required
                label="Fecha nacimiento"
                color="secondary"
                variant="outlined"
                sx={{margin:".5rem .5rem",flexGrow:0}}
                onChange={handleChange}
                name="fecha_nacimiento"
                value={estudiante.fecha_nacimiento.slice(0, 10)}
                inputProps={{style:{color:"aliceblue"}}}
                InputLabelProps={{style:{color:"aliceblue"}}}
              />
              <TextField
                required
                label="Direccion"
                color="secondary"
                variant="outlined"
                multiline
                rows={3}
                onChange={handleChange}
                name="direccion"
               value={estudiante.direccion}
                sx={{margin:".5rem 0px",flexGrow:1}}
                inputProps={{style:{color:"aliceblue"}}}
                InputLabelProps={{style:{color:"aliceblue"}}}
              />
              </div>
                
            <Button variant= "contained" color="secondary" type="submit" style={{display: "block", margin:".5rem 0"}} disabled= {loading===true}>
              {loading ? <CircularProgress color="secondary" size={24}/>: 'Guardar'}
            </Button>
          
            </form>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
}
