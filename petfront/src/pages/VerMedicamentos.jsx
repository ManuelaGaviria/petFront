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

function VerMedicamentos() {
    const { changeNombre, changeDescripcion, changeDosis } = useContext(GeneralContext)
    const [medicamentos, setMedicamentos] = useState([]);
    const [editModalOpen, setEditModalOpen] = useState(false);
    const [selectedMedicamento, setSelectedMedicamento] = useState(null);
    const [backgroundOpacity] = useState(0.5);

    useEffect(() => {
        listMedicamentos();
    }, []);

    const openEditModal = (medicamento) => {
        setSelectedMedicamento(medicamento);
        setEditModalOpen(true);
    };

    const handleCloseModal = () => {
        setEditModalOpen(false);
    };

    async function listMedicamentos() {
        try {
            const respuesta = await fetchGet("/medicamentos/listar");
            if (respuesta.exito) {
                setMedicamentos(respuesta.lista);
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
                text: 'Error al procesar la solicitud para listar los medicamentos',
                customClass: {
                    confirmButton: 'btn-color'
                },
                buttonsStyling: false
            });
        }
    }

    async function handleEdit(id) {
        console.log(id);
        const medicamentoToEdit = medicamentos.find(medicamento => medicamento.id === id);
        if (medicamentoToEdit) {
            openEditModal(medicamentoToEdit);
        } else {
            Swal.fire({
                icon: "error",
                title: "Error",
                text: 'Medicamento no encontrado',
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
            title: '¿Estás seguro de eliminar este medicamento?',
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
                const respuesta = await fetchBody('/medicamentos/eliminar', 'DELETE', { id: id });
                if (respuesta.exito) {
                    Swal.fire({
                        icon: "success",
                        title: "Medicamento eliminado con éxito!",
                        customClass: {
                            confirmButton: 'btn-color'
                        },
                        buttonsStyling: false
                    });
                    await listMedicamentos();
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
                    text: 'Error al procesar la solicitud para eliminar un medicamento',
                    customClass: {
                        confirmButton: 'btn-color'
                    },
                    buttonsStyling: false
                });
            }
        }
    }

    async function editMedicamento(id) {
        const nombre = document.getElementById('medicamentoNombre').value;
        const descripcion = document.getElementById('medicamentoDescripcion').value;
        const dosis = document.getElementById('medicamentoDosis').value;
        if (nombre === "" || descripcion === "" || dosis === "" ) {
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
                nombre: nombre,
                descripcion: descripcion,
                dosis: dosis
            }
            const respuesta = await fetchBody("/medicamentos/editar", "PUT", data);
            if (respuesta.exito) {
                Swal.fire({
                    icon: "success",
                    title: "Medicamento editado con éxito!",
                    customClass: {
                        confirmButton: 'btn-color'
                    },
                    buttonsStyling: false
                });
                handleCloseModal();
                await listMedicamentos();
            }
        }
    }
    return (
        <div>
            <h1 className='titulo'>Medicamentos</h1>
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
                                    <th style={{ width: '200px' }}>Nombre</th>
                                    <th style={{ width: '200px' }}>Descripción</th>
                                    <th style={{ width: '200px' }}>Dosis</th>
                                    <th style={{ width: '200px' }}>Acciones</th>
                                </tr>
                            </thead>
                            <tbody>
                                {medicamentos.map((medicamento) => (
                                    <tr key={medicamento.id}>
                                        <td>{medicamento.nombre}</td>
                                        <td>{medicamento.descripcion}</td>
                                        <td>{medicamento.dosis}</td>
                                        <td className='Actions'>
                                            <button className='btn-edit' onClick={() => handleEdit(medicamento.id)}><MdModeEdit /></button>
                                            <button className='btn-delete' onClick={() => handleDelete(medicamento.id)}><MdDelete /></button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    <ButtonLink destino="/medicamentos" clase="ButtonNavRegresar">Regresar</ButtonLink>
                </FullscreenCard>
                {editModalOpen && (
                    <>
                        <div
                            className="BackgroundOverlay"
                            style={{ opacity: backgroundOpacity }}
                        />
                        <ContenedorForms>
                            <h1 className='titulo'>Editar Medicamento</h1>
                            <div className="InputContainer">
                                <LabelInputEdit id="medicamentoNombre" texto="Nombre" eventoCambio={changeNombre} valorInicial={selectedMedicamento.nombre}></LabelInputEdit>
                                <LabelInputEdit id="medicamentoDescripcion" texto="Descripción" eventoCambio={changeDescripcion} valorInicial={selectedMedicamento.descripcion}></LabelInputEdit>
                                <LabelInputEdit id="medicamentoDosis" texto="Dosis" eventoCambio={changeDosis} valorInicial={selectedMedicamento.dosis}></LabelInputEdit>
                            </div>
                            <br />
                            <Button clase="ButtonNavEdit" eventoClick={() => editMedicamento(selectedMedicamento.id)}>Editar</Button>
                            <Button clase="ButtonNav" eventoClick={handleCloseModal}>Regresar</Button>
                        </ContenedorForms>
                    </>
                )}
            </motion.div>
        </div>

    )
}

export default VerMedicamentos