import {Route,Routes, useLocation} from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import Principal from "../pages/Principal";
import Clientes from "../pages/Clientes";
import Medicamentos from "../pages/Medicamentos";
import Mascotas from "../pages/Mascotas";
import VerClientes from "../pages/VerClientes";
import CrearClientes from "../pages/CrearClientes";
import VerMedicamentos from "../pages/VerMedicamentos";
import CrearMedicamentos from "../pages/CrearMedicamentos";
import VerMascotas from "../pages/VerMascotas";
import CrearMascotas from "../pages/CrearMascotas";
import ReporteClientesMascotas from "../pages/ReporteClientesMascotas";
import XML from "../pages/XML";

function AppRoutes() {
    const location = useLocation();
  return (
    <>
        <AnimatePresence mode='wait'>
            <Routes location={location} key={location.pathname}>
                <Route exact path="/" element={<Principal></Principal>}></Route>

                <Route exact path="/clientes" element={<Clientes></Clientes>}></Route>
                <Route exact path="/verClientes" element={<VerClientes></VerClientes>}></Route>
                <Route exact path="/crearClientes" element={<CrearClientes></CrearClientes>}></Route>

                <Route exact path="/medicamentos" element={<Medicamentos></Medicamentos>}></Route>
                <Route exact path="/verMedicamentos" element={<VerMedicamentos></VerMedicamentos>}></Route>
                <Route exact path="/crearMedicamentos" element={<CrearMedicamentos></CrearMedicamentos>}></Route>

                <Route exact path="/mascotas" element={<Mascotas></Mascotas>}></Route>
                <Route exact path="/verMascotas" element={<VerMascotas></VerMascotas>}></Route>
                <Route exact path="/crearMascotas" element={<CrearMascotas></CrearMascotas>}></Route>

                <Route exact path="/reporte" element={<ReporteClientesMascotas></ReporteClientesMascotas>}></Route>
                <Route exact path="/xml" element={<XML></XML>}></Route>

            </Routes>
        </AnimatePresence>
    </>
    
  )
}

export default AppRoutes