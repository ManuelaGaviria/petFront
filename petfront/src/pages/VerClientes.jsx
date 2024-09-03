import React, { useContext, useEffect, useState } from 'react'
import FullscreenCard from '../components/FullScreenCard'
import GeneralContext from '../Context/GeneralContext';
import { MdModeEdit } from "react-icons/md";
import { MdDelete } from "react-icons/md";
import Swal from 'sweetalert2';
import { motion } from 'framer-motion';
import ButtonLink from '../components/ButtonLink';
import { fetchBody, fetchGet } from '../utils/fetch';
import LabelInputEdit from '../components/LabelInputEdit';
import Button from '../components/Button';
import ContenedorForms from '../components/ContenedorForms';

function VerClientes() {
    const { changeNombre, changeApellido, changeDocumento, changeDireccion, changeTelefono } = useContext(GeneralContext)
    const [clientes, setClientes] = useState([]);
    const [editModalOpen, setEditModalOpen] = useState(false);
    const [selectedCliente, setSelectedCliente] = useState(null);
    const [backgroundOpacity] = useState(0.5);

    useEffect(() => {
        listClients();
    }, []);

    const openEditModal = (cliente) => {
        console.log("holi");
        console.log(cliente);
        setSelectedCliente(cliente);
        setEditModalOpen(true);
    };

    const handleCloseModal = () => {
        setEditModalOpen(false);
    };

    async function listClients() {
        try {
            const respuesta = await fetchGet("/clientes/listar");
            console.log(respuesta);
            if (respuesta.exito) {
                setClientes(respuesta.lista);
            } else {
                Swal.fire({
                    icon: "error",
                    title: "Error",
                    text: respuesta.error,
                    customClass: {
                        confirmButton: 'btn-color'
                    },
                    buttonsStyling: false
                });
            }
        } catch (error) {
            Swal.fire({
                icon: "error",
                title: "Error",
                text: 'Error al procesar la solicitud para listar los clientes',
                customClass: {
                    confirmButton: 'btn-color'
                },
                buttonsStyling: false
            });
        }
    }

    async function handleEdit(id) {
        console.log(id);
        const clienteToEdit = clientes.find(cliente => cliente.id === id);
        if (clienteToEdit) {
            openEditModal(clienteToEdit);
        } else {
            Swal.fire({
                icon: "error",
                title: "Error",
                text: 'Cliente no encontrado',
                customClass: {
                    confirmButton: 'btn-color'
                },
                buttonsStyling: false
            });
        }
    }

    async function handleDelete(id) {
        // Mostrar una alerta de confirmación antes de eliminar al estudiante
        const confirmacion = await Swal.fire({
            title: '¿Estás seguro de eliminar este cliente?',
            text: "Esta acción no se puede revertir",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Sí, eliminar',
            customClass: {
                confirmButton: 'btn-color',
                cancelButton: 'btn-color-cancel'
            },
            buttonsStyling: false
        });

        // Verificar si el usuario confirmó la eliminación
        if (confirmacion.isConfirmed) {
            try {
                console.log("holi id");
                console.log(id);
                const respuesta = await fetchBody('/clientes/eliminar', 'DELETE', { id: id });
                if (respuesta.exito) {
                    Swal.fire({
                        icon: "success",
                        title: "Cliente eliminado con éxito!",
                        customClass: {
                            confirmButton: 'btn-color'
                        },
                        buttonsStyling: false
                    });
                    await listClients();
                } else {
                    Swal.fire({
                        icon: "error",
                        title: "Error",
                        text: respuesta.error,
                        customClass: {
                            confirmButton: 'btn-color'
                        },
                        buttonsStyling: false
                    });
                }
            } catch (error) {
                Swal.fire({
                    icon: "error",
                    title: "Error",
                    text: 'Error al procesar la solicitud para eliminar un cliente',
                    customClass: {
                        confirmButton: 'btn-color'
                    },
                    buttonsStyling: false
                });
            }
        }
    }

    async function editCliente(id) {
        const cedula = document.getElementById('clienteCedula').value;
        const nombre = document.getElementById('clienteNombre').value;
        const apellido = document.getElementById('clienteApellido').value;
        const direccion = document.getElementById('clienteDireccion').value;
        const telefono = document.getElementById('clienteTelefono').value;
        if (nombre === "" || apellido === "" || cedula === "" || direccion === "" || telefono === "") {
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Ningún campo puede estar vacío",
                customClass: {
                    confirmButton: 'btn-color'
                },
                buttonsStyling: false
            });
        } else {
            const data = {
                id: id,
                cedula: cedula,
                nombre: nombre,
                apellidos: apellido,
                direccion: direccion,
                telefono: telefono
            }
            const respuesta = await fetchBody("/clientes/editar", "PUT", data);
            if (respuesta.exito) {
                Swal.fire({
                    icon: "success",
                    title: "Cliente editado con éxito!",
                    customClass: {
                        confirmButton: 'btn-color'
                    },
                    buttonsStyling: false
                });
                handleCloseModal();
                await listClients();
            }
        }
    }
    return (
        <div>
            <h1 className='titulo'>Clientes</h1>
            <motion.div
                className='ContainerFull'
                initial={{ opacity: 0, x: 1000 }} // Inicia desde la derecha
                animate={{ opacity: 1, x: 0 }} // Animación hacia la izquierda
                exit={{ opacity: 0, x: -1000 }} // Sale hacia la izquierda
                transition={{ duration: 1 }}>

                <FullscreenCard>
                    <div className='CenterTable'>
                        <table className='Table'>
                            <thead>
                                <tr>
                                    <th style={{ width: '200px' }}>Cedula</th>
                                    <th style={{ width: '200px' }}>Nombres</th>
                                    <th style={{ width: '200px' }}>Apellidos</th>
                                    <th style={{ width: '200px' }}>Direccion</th>
                                    <th style={{ width: '200px' }}>Telefono</th>
                                    <th style={{ width: '200px' }}>Acciones</th>
                                </tr>
                            </thead>
                            <tbody>
                                {clientes.map((cliente) => (
                                    <tr key={cliente.id}>
                                        <td>{cliente.cedula}</td>
                                        <td>{cliente.nombre}</td>
                                        <td>{cliente.apellidos}</td>
                                        <td>{cliente.direccion}</td>
                                        <td>{cliente.telefono}</td>
                                        <td className='Actions'>
                                            <button className='btn-edit' onClick={() => handleEdit(cliente.id)}><MdModeEdit /></button>
                                            <button className='btn-delete' onClick={() => handleDelete(cliente.id)}><MdDelete /></button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    <ButtonLink destino="/clientes" clase="ButtonNavRegresar">Regresar</ButtonLink>
                </FullscreenCard>
                {editModalOpen && (
                    <>
                        <div
                            className="BackgroundOverlay"
                            style={{ opacity: backgroundOpacity }}
                        />
                        <ContenedorForms>
                            <h1 className='titulo'>Editar Cliente</h1>
                            <div className="InputContainer">
                                <LabelInputEdit id="clienteCedula" texto="Cedula" eventoCambio={changeDocumento} valorInicial={selectedCliente.cedula}></LabelInputEdit>
                                <LabelInputEdit id="clienteNombre" texto="Nombre" eventoCambio={changeNombre} valorInicial={selectedCliente.nombre}></LabelInputEdit>
                                <LabelInputEdit id="clienteApellido" texto="Apellido" eventoCambio={changeApellido} valorInicial={selectedCliente.apellidos}></LabelInputEdit>
                                <LabelInputEdit id="clienteDireccion" texto="Direccion" eventoCambio={changeDireccion} valorInicial={selectedCliente.direccion}></LabelInputEdit>
                                <LabelInputEdit id="clienteTelefono" texto="Telefono" eventoCambio={changeTelefono} valorInicial={selectedCliente.telefono}></LabelInputEdit>
                            </div>
                            <br />
                            <Button clase="ButtonNavEdit" eventoClick={() => editCliente(selectedCliente.id)}>Editar</Button>
                            <Button clase="ButtonNav" eventoClick={handleCloseModal}>Regresar</Button>
                        </ContenedorForms>
                    </>
                )}
            </motion.div>
        </div>

    )
}

export default VerClientes