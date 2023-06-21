import { AppBar, Box, Button, Container, Toolbar, Typography } from "@mui/material";
import { Link,useNavigate, useLocation} from "react-router-dom";

export default function Navbar() {
const navigate = useNavigate()
const location = useLocation();

  const handleAddButtonClick = () => {
    if (location.pathname === "/") {
      navigate("/new-students");
    } else if (location.pathname === "/schools") {
      navigate("/new-schools");
    }
  };


  return (
    <Box sx={{ flexGrow:1}}>
        <AppBar position="static" color="transparent">
            <Container>
                <Toolbar>
                    <Typography sx={{ flexGrow:1}} variant="h6">
                        <Link to="/" style={{textDecoration:'none', color:'aliceblue'}}>
                            ESTUDIANTES
                        </Link>
                        </Typography>

                        <Typography sx={{flexGrow:3}} variant="h6">
                            <Link to="/schools" style={{textDecoration: 'none', color:'aliceblue'}}>
                                ESCUELAS
                                
                            </Link>
                        </Typography>

                        <Button variant="contained" color="secondary" size="medium" onClick={handleAddButtonClick}>
                            Agregar
                        </Button>
                </Toolbar>
            </Container>
        </AppBar>
    </Box>
  )
}

