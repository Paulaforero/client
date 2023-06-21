import { BrowserRouter,Routes,Route } from "react-router-dom";
import CrudList from "./components/CrudList";
import CrudForm  from "./components/CrudForm";
import { Container } from "@mui/material";
import Navbar from "./components/Navbar";
import CrudListSchools from "./components/CrudListSchools";
import CrudFormSchools from "./components/CrudFormSchools";
export default function App() {
  return (
    <BrowserRouter>
    <Navbar/>
     <Container>
     <Routes>
        <Route path="/" element={<CrudList/>}/>
        <Route path="/schools" element={<CrudListSchools/>} />
        <Route path="/new-students" element={<CrudForm/>}/>
        <Route path="/new-schools" element={<CrudFormSchools/>}/>
        <Route path="/:id/edit-students" element={<CrudForm/>}/>
        <Route path="/:cod_escuela/edit-schools" element={<CrudFormSchools/>}/>
      </Routes>
     </Container>
    </BrowserRouter>
  )
}
