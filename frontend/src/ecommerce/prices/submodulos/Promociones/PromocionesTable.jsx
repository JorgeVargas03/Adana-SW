//APARTADO GRAFICO
import { useEffect, useState } from "react";
import { Dialog, Stack, Tooltip, darken, Box } from "@mui/material";
import { MaterialReactTable } from 'material-react-table';
import AddCircleIcon from "@mui/icons-material/AddCircle";
import EditIcon from "@mui/icons-material/Edit";
import InfoIcon from "@mui/icons-material/Info";
import DeleteIcon from "@mui/icons-material/Delete";
import RefreshIcon from '@mui/icons-material/Refresh';
import { IconButton } from "@mui/material";

//FORMULARIOS DE PROMOCIONES
import FormPromoInsertar from "./FormPromoInsertar.jsx";
import FormPromoActualizar from "./FormPromoActualizar.jsx";
import FormPromoBorrar from "./FormPromoBorrar.jsx";
import FormPromoDetalles from "./FormPromoDetalles.jsx";

//CONTEXTO
import { usePricesContext } from "../../contexto/PricesProvider.jsx";

const PromocionesColumns = [
    {
        accessorKey: "IdPromocionOK",
        header: "Id Promocion",
        size: 30, //small column
    },
    {
        accessorKey: "FechaIni",
        header: "Fecha inicio",
        size: 30, //small column
    },
    {
        accessorKey: "FechaExp",
        header: "Fecha fin",
        size: 30, //small column
    },
    {
        accessorKey: "Producto",
        header: "Producto",
        size: 150, //small column
    },
    {
        accessorKey: "Detalles",
        header: "Detalles",
        size: 150, //small column
    }
];

const PromocionesTable = () => {
    const [promocion, promo_select] = useState([]);

    const [FormInsertar, FormInsertarState] = useState(false);
    const [FormActualizar, FormActualizarState] = useState(false);
    const [FormBorrar, FormBorrarState] = useState(false);
    const [FormDetalles, FormDetalleState] = useState(false);
    const {
        priceSel,
        loadingTable,
        refresh_price_seleccionado
    } = usePricesContext();

    return (
        <Box>
            <Box>
                <MaterialReactTable
                    columns={PromocionesColumns}
                    data={priceSel.promociones}
                    state={{ isLoading: loadingTable }}
                    //Elegir solo un renglón
                    enableRowSelection
                    enableMultiRowSelection={false}
                    positionToolbarAlertBanner="none"
                    //Ajustes visuales y barra de búsqueda
                    initialState={{ density: "compact", showGlobalFilter: true }}
                    enableColumnActions={false}
                    enableStickyHeader
                    enableStickyFooter

                    /* ============ ACTUALIZAR PRECIO SELECCIONADO CON UN CLICK DEL CHECKBOX ============ */
                    muiSelectCheckboxProps={({ row }) => ({
                        onClick: (event) => {
                            promo_select(row.original);
                            console.log(promocion);
                        }
                    })}

                    renderTopToolbarCustomActions={({ table }) => (
                        <>
                            {/* ------- BARRA DE ACCIONES ------ */}
                            <Stack direction="row" sx={{ m: 1 }}>
                                <Box>
                                    {/* ============ BOTÓN AGREGAR ============ */}
                                    <Tooltip title="Agregar">
                                        <IconButton onClick={() => FormInsertarState(true)}>
                                            <AddCircleIcon />
                                        </IconButton>
                                    </Tooltip>
                                    {/* ============ BOTÓN EDITAR ============ */}
                                    <Tooltip title="Editar">
                                        <IconButton onClick={() => FormActualizarState(true)}>
                                            <EditIcon />
                                        </IconButton>
                                    </Tooltip>
                                    {/* ============ BOTÓN ELIMINAR ============ */}
                                    <Tooltip title="Eliminar">
                                        <IconButton onClick={() => FormBorrarState(true)}>
                                            <DeleteIcon />
                                        </IconButton>
                                    </Tooltip>
                                    {/* ============ BOTÓN DETALLES ============ */}
                                    <Tooltip title="Detalles">
                                        <IconButton onClick={() => FormDetalleState(true)}>
                                            <InfoIcon />
                                        </IconButton>
                                    </Tooltip>
                                    {/* ============ BOTÓN REFRESCAR ============ */}
                                    <Tooltip title="Refrescar">
                                        <IconButton onClick={() => {
                                            refresh_price_seleccionado();
                                            //Obliga a que se refresque el formulario de actualizar
                                            promo_select(promocion);
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
            <FormPromoInsertar mostrar={FormInsertar} actualizarForm={FormInsertarState} />
            <FormPromoActualizar mostrar={FormActualizar} actualizarForm={FormActualizarState} promoSelect={promocion} />
            <FormPromoBorrar mostrar={FormBorrar} actualizarForm={FormBorrarState} promoSelect={promocion} />
            <FormPromoDetalles mostrar={FormDetalles} actualizarForm={FormDetalleState} promoSelect={promocion} />
        </Box>
    );
};

export default PromocionesTable;