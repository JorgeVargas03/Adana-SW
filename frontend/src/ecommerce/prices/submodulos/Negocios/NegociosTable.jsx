import { Stack, Tooltip, Box } from "@mui/material";
import { MaterialReactTable } from 'material-react-table';
import AddCircleIcon from "@mui/icons-material/AddCircle";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { IconButton } from "@mui/material";
import RefreshIcon from '@mui/icons-material/Refresh';

import { useState } from "react";


import { usePricesContext } from "../../contexto/PricesProvider.jsx";

//Importar formularios
import InsertModal from "./InsertModal.jsx";
import UpdateModal from "./UpdateModal.jsx";
import DeleteModal from "./DeleteModal.jsx";

const NegociosColumns = [
    {
        accessorKey: "IdNegocioOK",
        header: "Id Negocio",
        size: 30, //small column
    },
    {
        accessorKey: "Nombre",
        header: "Nombre",
        size: 30, //small column
    },
    {
        accessorKey: "Ubicacion",
        header: "Ubicacion",
        size: 150, //small column
    }
];

const NegociosTable = () => {
    const [negocioSel, actualizarNegocioSel] = useState([]);

    {/* ============ Variables para controlar a los formularios ============ */ }
    const [mostrarInsertar, actualizarMostrarInsertar] = useState(false);
    const [mostrarActualizar, actualizarMostrarActualizar] = useState(false);
    const [mostrarEliminar, actualizarMostrarEliminar] = useState(false);

    const {
        priceSel,
        loadingTable,
        refresh_price_seleccionado
    } = usePricesContext();

    return (
        <Box>
            <Box>
            <MaterialReactTable
                    //Definir datos y columnas
                    columns={NegociosColumns}
                    data={priceSel.negocios}
                    //Variable compartida por todos los que usen el contexto
                    //para definir si la tabla debe mostrar la animación de carga
                    state={{ isLoading: loadingTable }}
                    //Elegir solo un renglón
                    enableRowSelection
                    enableMultiRowSelection={false}
                    //Borrar mensaje de selección de renglones
                    positionToolbarAlertBanner="none"
                    //Ajustes visuales y barra de búsqueda
                    initialState={{ density: "compact", showGlobalFilter: true }}
                    enableColumnActions={false}
                    //No ocultar encabezados o pie de la tabla
                    //si hay muchos registros
                    enableStickyHeader
                    enableStickyFooter

                    /* ============ ACTUALIZAR PRECIO SELECCIONADO CON UN CLICK DEL CHECKBOX ============ */
                    muiSelectCheckboxProps={({ row }) => ({
                        onClick: (event) => {
                            actualizarNegocioSel(row.original);
                        }
                    })}

                    renderTopToolbarCustomActions={({ table }) => (
                        <>
                             {/* ------- BARRA DE ACCIONES ------ */}
                             <Stack direction="row" sx={{ m: 1 }}>
                                <Box>
                                    {/* ============ BOTÓN AGREGAR ============ */}
                                    <Tooltip title="Agregar">
                                        <IconButton onClick={() => actualizarMostrarInsertar(true)}>
                                            <AddCircleIcon />
                                        </IconButton>
                                    </Tooltip>
                                    {/* ============ BOTÓN EDITAR ============ */}
                                    <Tooltip title="Editar">
                                        <IconButton onClick={() => actualizarMostrarActualizar(true)}>
                                            <EditIcon />
                                        </IconButton>
                                    </Tooltip>
                                    {/* ============ BOTÓN ELIMINAR ============ */}
                                    <Tooltip title="Eliminar">
                                        <IconButton onClick={() => actualizarMostrarEliminar(true)}>
                                            <DeleteIcon />
                                        </IconButton>
                                    </Tooltip>
                                    {/* ============ BOTÓN REFRESCAR ============ */}
                                    <Tooltip title="Refrescar">
                                        <IconButton onClick={() => {
                                            refresh_price_seleccionado();
                                            //Obliga a que se refresque el formulario de actualizar
                                            actualizarNegocioSel(negocioSel);
                                        }}>
                                            <RefreshIcon />
                                        </IconButton>
                                    </Tooltip>
                                </Box>
                            </Stack>
                            {/* ------- BARRA DE ACCIONES FIN ------ */}
                        </>
                    )}
                />
            </Box>
            {/* ============ MODALES/FORMULARIOS ============ */}
        <InsertModal mostrar={mostrarInsertar} actualizarMostrar={actualizarMostrarInsertar} />
        <UpdateModal mostrar={mostrarActualizar} actualizarMostrar={actualizarMostrarActualizar} negocioSeleccionado={negocioSel} />
        <DeleteModal mostrar={mostrarEliminar} actualizarMostrar={actualizarMostrarEliminar} negocioSeleccionado={negocioSel} />
        </Box>
    );
};

export default NegociosTable;