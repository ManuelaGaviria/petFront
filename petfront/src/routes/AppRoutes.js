import {Route,Routes, useLocation} from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import Principal from "../pages/Principal";

function AppRoutes() {
    const location = useLocation();
  return (
    <>
        <AnimatePresence mode='wait'>
            <Routes location={location} key={location.pathname}>
                <Route exact path="/" element={<Principal></Principal>}></Route>
                
            </Routes>
        </AnimatePresence>
    </>
    
  )
}

export default AppRoutes