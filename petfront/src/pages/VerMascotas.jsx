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

function VerMascotas() {
    const { changeDocumento, changeNombre, changeRaza, changeEdad, changePeso } = useContext(GeneralContext)
    const [mascotas, setMascotas] = useState([]);
    const [editModalOpen, setEditModalOpen] = useState(false);
    const [selectedMascota, setSelectedMascota] = useState(null);
    const [backgroundOpacity] = useState(0.5);

    useEffect(() => {
        listMascotas();
    }, []);

    const openEditModal = (mascota) => {
        setSelectedMascota(mascota);
        setEditModalOpen(true);
    };

    const handleCloseModal = () => {
        setEditModalOpen(false);
    };

    async function listMascotas() {
        try {
            const respuesta = await fetchGet("/mascotas/listar");
            if (respuesta.exito) {
                setMascotas(respuesta.lista);
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
                text: 'Error al procesar la solicitud para listar las mascotas',
                customClass: {
                    confirmButton: 'btn-color'
                },
                buttonsStyling: false
            });
        }
    }

    async function handleEdit(id) {
        const mascotaToEdit = mascotas.find(mascota => mascota.id === id);
        if (mascotaToEdit) {
            openEditModal(mascotaToEdit);
        } else {
            Swal.fire({
                icon: "error",
                title: "Error",
                text: 'Mascota no encontrada',
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
            title: '¿Estás seguro de eliminar esta mascota?',
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
                const respuesta = await fetchBody('/mascota/eliminar', 'DELETE', { id: id });
                if (respuesta.exito) {
                    Swal.fire({
                        icon: "success",
                        title: "Mascota eliminada con éxito!",
                        customClass: {
                            confirmButton: 'btn-color'
                        },
                        buttonsStyling: false
                    });
                    await listMascotas();
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
                    text: 'Error al procesar la solicitud para eliminar una mascota',
                    customClass: {
                        confirmButton: 'btn-color'
                    },
                    buttonsStyling: false
                });
            }
        }
    }

    async function editMascota(id) {
        const identificacion = document.getElementById('mascotaIdentificacion').value;
        const nombre = document.getElementById('mascotaNombre').value;
        const raza = document.getElementById('mascotaRaza').value;
        const edad = document.getElementById('mascotaEdad').value;
        const peso = document.getElementById('mascotaPeso').value;
        if (identificacion === "" || nombre === "" || raza === "" || edad === "" || peso === "") {
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
                identificacion: identificacion,
                nombre: nombre,
                raza: raza,
                edad: edad,
                peso: peso
            }
            const respuesta = await fetchBody("/mascotas/editar", "PUT", data);
            if (respuesta.exito) {
                Swal.fire({
                    icon: "success",
                    title: "Mascota editada con éxito!",
                    customClass: {
                        confirmButton: 'btn-color'
                    },
                    buttonsStyling: false
                });
                handleCloseModal();
                await listMascotas();
            }
        }
    }
    return (
        <div>
            <h1 className='titulo'>Mascotas</h1>
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
                                    <th style={{ width: '200px' }}>Identificación</th>
                                    <th style={{ width: '200px' }}>Nombre</th>
                                    <th style={{ width: '200px' }}>Raza</th>
                                    <th style={{ width: '200px' }}>Edad</th>
                                    <th style={{ width: '200px' }}>Peso</th>
                                    <th style={{ width: '200px' }}>Medicamento</th>
                                    <th style={{ width: '200px' }}>Cliente</th>
                                    <th style={{ width: '200px' }}>Acciones</th>
                                </tr>
                            </thead>
                            <tbody>
                                {mascotas.map((mascota) => (
                                    <tr key={mascota.id}>
                                        <td>{mascota.identificacion}</td>
                                        <td>{mascota.nombre}</td>
                                        <td>{mascota.raza}</td>
                                        <td>{mascota.edad}</td>
                                        <td>{mascota.peso}</td>
                                        <td>{mascota.medicamento}</td>
                                        <td>{mascota.cliente}</td>
                                        <td className='Actions'>
                                            <button className='btn-edit' onClick={() => handleEdit(mascota.id)}><MdModeEdit /></button>
                                            <button className='btn-delete' onClick={() => handleDelete(mascota.id)}><MdDelete /></button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    <ButtonLink destino="/mascotas" clase="ButtonNavRegresar">Regresar</ButtonLink>
                </FullscreenCard>
                {editModalOpen && (
                    <>
                        <div
                            className="BackgroundOverlay"
                            style={{ opacity: backgroundOpacity }}
                        />
                        <ContenedorForms>
                            <h1 className='titulo'>Editar Mascota</h1>
                            <div className="InputContainer">
                                <LabelInputEdit id="mascotaIdentificacion" texto="Identificacion" eventoCambio={changeDocumento} valorInicial={selectedMascota.identificacion}></LabelInputEdit>
                                <LabelInputEdit id="mascotaNombre" texto="Nombre" eventoCambio={changeNombre} valorInicial={selectedMascota.nombre}></LabelInputEdit>
                                <LabelInputEdit id="mascotaRaza" texto="Raza" eventoCambio={changeRaza} valorInicial={selectedMascota.raza}></LabelInputEdit>
                                <LabelInputEdit id="mascotaEdad" texto="Edad" eventoCambio={changeEdad} valorInicial={selectedMascota.edad}></LabelInputEdit>
                                <LabelInputEdit id="mascotaPeso" texto="Peso" eventoCambio={changePeso} valorInicial={selectedMascota.peso}></LabelInputEdit>
                            </div>
                            <br />
                            <Button clase="ButtonNavEdit" eventoClick={() => editMascota(selectedMascota.id)}>Editar</Button>
                            <Button clase="ButtonNav" eventoClick={handleCloseModal}>Regresar</Button>
                        </ContenedorForms>
                    </>
                )}
            </motion.div>
        </div>

    )
}

export default VerMascotas