import { createContext, useState } from "react";

const GeneralContext = createContext()

export const GeneralProvider = ({children}) => {

    const [password, setPassword] = useState("")
    const changePassword = (e) => {
        setPassword(e.target.value)
    }

    const [confirmationPassword, setConfirmationPassword] = useState("")
    const changeConfirmationPassword = (e) => {
        setConfirmationPassword(e.target.value)
    }

    const [name, setName] = useState("")
    const changeName = (e) => {
        setName(e.target.value)
    }

    const [apellido, setApellido] = useState("")
    const changeApellido = (e) => {
        setApellido(e.target.value)
    }

    const [tipoDocumento, setTipoDocumento] = useState("")
    const changeTipoDocumento = (e) => {
        setTipoDocumento(e.target.value)
    }

    const [documento, setDocumento] = useState("")
    const changeDocumento = (e) => {
        setDocumento(e.target.value)
    }

    const [correo, setCorreo] = useState("")
    const changeCorreo = (e) => {
        setCorreo(e.target.value)
    }

    const [genero, setGenero] = useState("")
    const changeGenero = (e) => {
        setGenero(e.target.value)
    }

    const [nacimiento, setNacimiento] = useState("")
    const changeNacimiento = (e) => {
        setNacimiento(e.target.value)
    }

    const [niveles, setNiveles] = useState([])
    const changeNiveles = (e) => {
        setNiveles(e.target.value)
    }

    const [administrador, setAdministrador] = useState([])
    const changeAdministrador = (e) => {
        setAdministrador(e.target.value)
    }

    const [numero, setNumero] = useState([])
    const changeNumero = (e) => {
        setNumero(e.target.value)
    }

    const [descripcion, setDescripcion] = useState([])
    const changeDescripcion = (e) => {
        setDescripcion(e.target.value)
    }

    const [unidades, setUnidades] = useState([])
    const changeUnidades = (e) => {
        setUnidades(e.target.value)
    }

    const [pregunta, setPregunta] = useState([])
    const changePregunta = (e) => {
        setPregunta(e.target.value)
    }

    const [respuesta1, setRespuesta1] = useState([])
    const changeRespuesta1 = (e) => {
        setRespuesta1(e.target.value)
    }

    const [respuesta2, setRespuesta2] = useState([])
    const changeRespuesta2 = (e) => {
        setRespuesta2(e.target.value)
    }

    const [respuesta3, setRespuesta3] = useState([])
    const changeRespuesta3 = (e) => {
        setRespuesta3(e.target.value)
    }

    const [respuesta4, setRespuesta4] = useState([])
    const changeRespuesta4 = (e) => {
        setRespuesta4(e.target.value)
    }

    const [respuestaCorrecta, setRespuestaCorrecta] = useState([])
    const changeRespuestaCorrecta = (e) => {
        setRespuestaCorrecta(e.target.value)
    }

    return <GeneralContext.Provider value={{
        name,changeName, 
        apellido, changeApellido,
        tipoDocumento, changeTipoDocumento,
        documento, changeDocumento, 
        correo, changeCorreo, 
        genero, changeGenero,
        nacimiento, changeNacimiento, 
        password, changePassword,
        niveles, changeNiveles,
        confirmationPassword, changeConfirmationPassword,
        administrador, changeAdministrador,
        numero, changeNumero,
        descripcion, changeDescripcion,
        unidades, changeUnidades,
        pregunta, changePregunta,
        respuesta1, changeRespuesta1,
        respuesta2, changeRespuesta2,
        respuesta3, changeRespuesta3,
        respuesta4, changeRespuesta4,
        respuestaCorrecta, changeRespuestaCorrecta
    }}>
        {children}
    </GeneralContext.Provider>
}

export default GeneralContext