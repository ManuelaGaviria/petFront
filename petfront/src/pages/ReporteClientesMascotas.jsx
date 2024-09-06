import React, { useEffect, useState } from 'react';
import { fetchGet } from '../utils/fetch'; // Asumiendo que este es tu método para hacer el fetch
import Swal from 'sweetalert2';
import FullscreenCard from '../components/FullScreenCard';
import { motion } from 'framer-motion';
import ButtonLink from '../components/ButtonLink';

function ReporteClientesMascotas() {
    const [reporte, setReporte] = useState([]);

    // Obtener el reporte desde el backend
    useEffect(() => {
        const obtenerReporte = async () => {
            try {
                const respuesta = await fetchGet('/reporte/generarReporteClientesYMedicamentos');
                if (respuesta.exito) {
                    setReporte(respuesta.reporte);
                } else {
                    Swal.fire({
                        icon: 'error',
                        title: 'Error',
                        text: respuesta.error,
                        customClass: {
                            confirmButton: 'btn-color'
                        },
                        buttonsStyling: false
                    });
                }
            } catch (error) {
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: 'Error al procesar la solicitud para obtener el reporte',
                    customClass: {
                        confirmButton: 'btn-color'
                    },
                    buttonsStyling: false
                });
            }
        };

        obtenerReporte();
    }, []);

    return (
        <div>
            <h1 className="titulo">Reporte de Clientes y Mascotas</h1>
            <motion.div
                className='ContainerFull'
                initial={{ opacity: 0, x: 1000 }} // Inicia desde la derecha
                animate={{ opacity: 1, x: 0 }} // Animación hacia la izquierda
                exit={{ opacity: 0, x: -1000 }} // Sale hacia la izquierda
                transition={{ duration: 1 }}>

                <FullscreenCard>
                    <div className="CenterTable">
                        <table className="ReportTable">
                            <thead>
                                <tr>
                                    <th style={{ width: '200px' }}>Cliente</th>
                                    <th style={{ width: '200px' }}>Cédula</th>
                                    <th style={{ width: '200px' }}>Mascota</th>
                                    <th style={{ width: '200px' }}>Medicamento</th>
                                    <th style={{ width: '200px' }}>Dosis</th>
                                </tr>
                            </thead>
                            <tbody className="cliente-group">
                                {reporte.map((cliente, index) => (
                                    <React.Fragment key={index}>
                                        {cliente.mascotas.length === 0 ? (
                                            <tr>
                                                <td>{cliente.cliente}</td>
                                                <td>{cliente.cedula}</td>
                                                <td colSpan="3">No tiene mascotas</td>
                                            </tr>
                                        ) : (
                                            cliente.mascotas.map((mascota, idx) => (
                                                <tr key={idx}>
                                                    {idx === 0 ? (
                                                        <>
                                                            <td rowSpan={cliente.mascotas.length}>{cliente.cliente}</td>
                                                            <td rowSpan={cliente.mascotas.length}>{cliente.cedula}</td>
                                                        </>
                                                    ) : (
                                                        <>
                                                            
                                                        </>
                                                    )}
                                                    <td>{mascota.nombre}</td>
                                                    <td>{mascota.medicamento}</td>
                                                    <td>{mascota.dosis}</td>
                                                </tr>
                                            ))
                                        )}
                                    </React.Fragment>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    <ButtonLink destino="/" clase="ButtonNavRegresar">Regresar</ButtonLink>
                </FullscreenCard>
            </motion.div>
        </div>
    );
}

export default ReporteClientesMascotas;
