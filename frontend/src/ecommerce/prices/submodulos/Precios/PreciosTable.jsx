import { Stack, Tooltip, Box } from "@mui/material";
import { MaterialReactTable } from 'material-react-table';
import AddCircleIcon from "@mui/icons-material/AddCircle";
import EditIcon from "@mui/icons-material/Edit";
import InfoIcon from "@mui/icons-material/Info";
import DeleteIcon from "@mui/icons-material/Delete";
import RefreshIcon from '@mui/icons-material/Refresh';
import { IconButton } from "@mui/material";

import React, { useState } from "react";

import { usePricesContext } from "../../contexto/PricesProvider.jsx";

//Importar formularios
import FormularioInsertar from "./FormularioInsertar.jsx";
import FormularioActualizar from "../Precios/FormularioActualizar.jsx";
import FormularioEliminar from "./FormularioEliminar.jsx";
import FormularioDetalles from "./FormularioDetalles.jsx";

const columnasTabla = [
    {
        accessorKey: "IdPrecioOK",
        header: "ID Precio",
        size: 30, //small column
    },
    {
        accessorKey: "IdPresentaOK",
        header: "IdPresentaOK",
        size: 30, //small column
    },
    {
        accessorKey: "CostoIni",
        header: "Costo Inicial",
        size: 30, //small column
    },
    {
        accessorKey: "CostoFin",
        header: "Costo Final",
        size: 150, //small column
    },
    {
        accessorKey: "Precio",
        header: "Precio",
        size: 150, //small column
    }
];

const PreciosTable = () => {
    {/* ============ PRECIO SELECCIONADO CON EL CHECKBOX ============ */ }
    const [precioSel, actualizarPrecioSel] = useState([]);

    {/* ============ Variables para controlar a los formularios ============ */ }
    const [mostrarInsertar, actualizarMostrarInsertar] = useState(false);
    const [mostrarActualizar, actualizarMostrarActualizar] = useState(false);
    const [mostrarEliminar, actualizarMostrarEliminar] = useState(false);
    const [mostrarDetalles, actualizarMostrarDetalles] = useState(false);

    const {
        //VARIABLES
        priceSel,
        loadingTable,
        //METODO
        refresh_price_seleccionado
    } = usePricesContext();

    return (
        <Box>
            <Box>
                <MaterialReactTable
                //CONFIGURACIONES DE LA TABLA
                    //Definir datos y columnas
                    columns={columnasTabla}
                    data={priceSel.precios}
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

                    /* ============ CARGAR LOS DATOS DEL RENGLON AL DARLE CLICK ============ */
                    muiSelectCheckboxProps={({ row }) => ({
                        onClick: (event) => {
                            actualizarPrecioSel(row.original);
                        }
                    })}

                    renderTopToolbarCustomActions={({ table }) => (
                        <>
                            {/* ------- BARRA DE ACCIONES ------ */}
                            <Stack direction="row" sx={{ m: 1 }}>
                                <Box>
                                    {/* ============ BOTÓN AGREGAR ============ */}
                                    <Tooltip title="Agregar">
                                        {/* ACTUALIZA UNA VARIABLE PARA QUE MUESTRE EL FORMULARIO */}
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
                                    {/* ============ BOTÓN DETALLES ============ */}
                                    <Tooltip title="Detalles">
                                        <IconButton onClick={() => actualizarMostrarDetalles(true)}>
                                            <InfoIcon />
                                        </IconButton>
                                    </Tooltip>
                                    {/* ============ BOTÓN REFRESCAR ============ */}
                                    <Tooltip title="Refrescar">
                                        <IconButton onClick={() => {
                                            refresh_price_seleccionado();
                                            //Sirve para que FormularioActualizar modifique los datos de las cajas de texto
                                            actualizarPrecioSel(precioSel);
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
            <FormularioInsertar mostrar={mostrarInsertar} actualizarMostrar={actualizarMostrarInsertar} />
            <FormularioActualizar mostrar={mostrarActualizar} actualizarMostrar={actualizarMostrarActualizar} precioSeleccionado={precioSel} />
            <FormularioEliminar mostrar={mostrarEliminar} actualizarMostrar={actualizarMostrarEliminar} precioSeleccionado={precioSel} />
            <FormularioDetalles mostrar={mostrarDetalles} actualizarMostrar={actualizarMostrarDetalles} precioSeleccionado={precioSel} />
        </Box>
    );
};

export default PreciosTable;