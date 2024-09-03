import { createContext, useState } from "react";

const GeneralContext = createContext()

export const GeneralProvider = ({children}) => {

    const [nombre, setNombre] = useState("")
    const changeNombre = (e) => {
        setNombre(e.target.value)
    }

    const [apellido, setApellido] = useState("")
    const changeApellido = (e) => {
        setApellido(e.target.value)
    }

    const [documento, setDocumento] = useState("")
    const changeDocumento = (e) => {
        setDocumento(e.target.value)
    }

    const [direccion, setDireccion] = useState("")
    const changeDireccion = (e) => {
        setDireccion(e.target.value)
    }

    const [telefono, setTelefono] = useState("")
    const changeTelefono = (e) => {
        setTelefono(e.target.value)
    }

    const [descripcion, setDescripcion] = useState("")
    const changeDescripcion = (e) => {
        setDescripcion(e.target.value)
    }

    const [dosis, setDosis] = useState("")
    const changeDosis = (e) => {
        setDosis(e.target.value)
    }

    const [raza, setRaza] = useState("")
    const changeRaza = (e) => {
        setRaza(e.target.value)
    }

    const [edad, setEdad] = useState("")
    const changeEdad = (e) => {
        setEdad(e.target.value)
    }

    const [peso, setPeso] = useState("")
    const changePeso = (e) => {
        setPeso(e.target.value)
    }

    return <GeneralContext.Provider value={{
        nombre,changeNombre, 
        apellido, changeApellido,
        documento, changeDocumento,
        direccion, changeDireccion,
        telefono, changeTelefono,
        descripcion, changeDescripcion,
        dosis, changeDosis,
        raza, changeRaza,
        edad, changeEdad,
        peso, changePeso
    }}>
        {children}
    </GeneralContext.Provider>
}

export default GeneralContext