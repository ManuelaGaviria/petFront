import React, { useEffect, useState } from 'react';
import { fetchGet } from '../utils/fetch'; // Asumiendo que este es tu método para hacer el fetch
import Swal from 'sweetalert2';
import { motion } from 'framer-motion';
import 'jspdf-autotable';

function XML() {
    const [xmlReporte, setXmlReporte] = useState('');
    
    function formatXML(xml) {
        const PADDING = '    '; // Usa 4 espacios para la indentación
        const reg = /(>)(<)(\/*)/g;
        let formatted = '';
        let pad = 0;
    
        // Reemplazar para insertar saltos de línea entre etiquetas de apertura y cierre
        xml = xml.replace(reg, '$1\n$2$3');
    
        // Procesar el XML para añadir indentación sin espacios innecesarios
        xml.split('\n').forEach((node) => {
            let indent = 0;
            if (node.match(/.+<\/\w[^>]*>$/)) {
                // Etiqueta de apertura y cierre en la misma línea, sin cambios en la indentación
                indent = 0;
            } else if (node.match(/^<\/\w/)) {
                // Etiqueta de cierre, reducir la indentación
                if (pad !== 0) {
                    pad -= 1;
                }
            } else if (node.match(/^<\w[^>]*[^\/]>.*$/)) {
                // Etiqueta de apertura, incrementar la indentación
                indent = 1;
            }
    
            // Añadir el nivel de indentación correcto
            formatted += PADDING.repeat(pad) + node.trim() + '\n';
            pad += indent;
        });
    
        return formatted.trim(); // Elimina espacios en blanco iniciales o finales
    }    
    
    // Obtener el reporte desde el backend
    useEffect(() => {
        const obtenerReporte = async () => {
            try {
                const responseXML = await fetchGet('/reporte/generarReporteClientesYMedicamentosXML');
                const xml = responseXML.xmlReporte;
                const formattedXML = formatXML(xml); // Formatear el XML
                setXmlReporte(formattedXML); // Guardar el XML formateado

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
            <h1 className="titulo">Reporte XML de Clientes, Medicamentos y Mascotas</h1>
            <motion.div
                className='ContainerFull'
                initial={{ opacity: 0, x: 1000 }} // Inicia desde la derecha
                animate={{ opacity: 1, x: 0 }} // Animación hacia la izquierda
                exit={{ opacity: 0, x: -1000 }} // Sale hacia la izquierda
                transition={{ duration: 1 }}>

   
                    <div className="xml-container">
                        <pre style={{ whiteSpace: 'pre-wrap', wordWrap: 'break-word' }}>
                            {xmlReporte}
                        </pre>
                    </div>
              
            </motion.div>
        </div>
    );
}

export default XML;
