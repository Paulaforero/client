import {
    Card,
    CardContent,
    Grid,
    TextField,
    Typography,
    Button,
    CircularProgress,
  } from "@mui/material";
  import {useState,useEffect} from "react";
  import { useNavigate,useParams} from "react-router-dom";
  
  export default function CrudFormSchools() {
      const [escuelas,setEscuelas]=useState({
            cod_escuela:"",
          nombre_escuela:"",
          fecha_creacion:"",
  });
      const [loading,setLoading] = useState(false)
      const [editing, setEditing] = useState(false)
      const navigate = useNavigate();
      const params = useParams();
      
  
  
      const handleSubmit = async (e)=>{
          e.preventDefault();
          setLoading(true)
          if (editing) {
             await fetch(`http://localhost:3000/crud-schools/${params.cod_escuela}`,{
              method:'PUT',
              body:JSON.stringify(escuelas),
              headers:{"Content-Type": "application/json"
          }
          }
              )
          }else{
              await fetch('http://localhost:3000/crud-schools',{
              method:"POST",
              body:JSON.stringify(escuelas),
              headers:{"Content-Type": "application/json"}
          });
          }
          setLoading(false)
          navigate('/schools')
          
      };
  
      const handleChange = e=>
          setEscuelas({...escuelas,[e.target.name]:e.target.value});
      
  
  
      const loadEscuelas = async (cod_escuela) =>{
         const res = await fetch(`http://localhost:3000/crud-schools/${cod_escuela}`)
         const data = await res.json()
         setEscuelas({
            cod_escuela:data.cod_escuela,
          nombre_escuela: data.nombre_escuela,
            fecha_creacion: data.fecha_creacion
         })
         setEditing(true);
      };
  
     useEffect(()=>{
          if (params.cod_escuela){
              loadEscuelas(params.cod_escuela);
          }
      },[params.cod_escuela]); 
  
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
                  label="codigo escuela"
                  color="secondary"
                  variant="outlined"
                  sx={{flexGrow:1, margin:".5rem .5rem", }}
                  onChange={handleChange}
                  name="cod_escuela"
                  value={escuelas.cod_escuela}
                  inputProps={{style:{color:"aliceblue"}}}
                  InputLabelProps={{style:{color:"aliceblue"}}}
                />
                <TextField
                  required
                  label="nombre escuela"
                  color="secondary"
                  variant="outlined"
                  sx={{flexGrow:1, margin:".5rem .5rem"}}
                  onChange={handleChange}
                  name="nombre_escuela"
                  value={escuelas.nombre_escuela}
                  inputProps={{style:{color:"aliceblue"}}}
                  InputLabelProps={{style:{color:"aliceblue"}}}
                />
  
                <TextField
                  required
                  label="Fecha creacion"
                  color="secondary"
                  variant="outlined"
                  sx={{margin:".5rem .5rem",flexGrow:0}}
                  onChange={handleChange}
                  name="fecha_creacion"
                  value={escuelas.fecha_creacion.slice(0,10)}
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
  