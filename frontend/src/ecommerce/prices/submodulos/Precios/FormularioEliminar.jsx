import { Dialog, DialogContent, DialogTitle, TextField, DialogActions, Box, Alert, Button } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import CloseIcon from "@mui/icons-material/Close";
import SaveIcon from "@mui/icons-material/Save";

import { useState } from "react";

import { deletePrecio } from "../../../../api/apis.js";

import { usePricesContext } from "../../contexto/PricesProvider.jsx";

const FormularioEliminar = ({ mostrar, actualizarMostrar, precioSeleccionado }) => {
    const [mensajeErrorAlert, setMensajeErrorAlert] = useState("");
    const [mensajeExitoAlert, setMensajeExitoAlert] = useState("");
    const [Loading, setLoading] = useState(false);
    
    //COBF DE TODOS LOS CAMPOS
    const commonTextFieldProps = {
        fullWidth: true,
        margin: "dense",
        disabled: true
    }

    const { priceSel, refresh_price_seleccionado } = usePricesContext();

    /* ============ MÉTODO PARA ELIMINAR ============ */
    const eliminarPrecio = async (campos) => {
        setLoading(true);
        //LIMPIA
        setMensajeErrorAlert(null);
        setMensajeExitoAlert(null);
        try {
            await deletePrecio(priceSel._id, precioSeleccionado.IdPrecioOK);

            setMensajeExitoAlert("Precio eliminado correctamente");

            refresh_price_seleccionado();
        } catch (error) {
            setMensajeExitoAlert(null);
            setMensajeErrorAlert("NO se pudo eliminar el precio");
        }
        setLoading(false);
    }

    if (!priceSel._id || !precioSeleccionado.IdPrecioOK) {
        return (
            <Dialog open={mostrar} onClose={() => actualizarMostrar(false)} fullWidth>

                <DialogTitle style={{ textAlign: 'center' }}>
                    NO has seleccionado un registro de la tabla AllPrices! y/o de la tabla Precios!
                </DialogTitle>

                <DialogContent style={{ display: 'flex', justifyContent: 'center' }}>
                    <Button variant="contained" color="primary" onClick={() => actualizarMostrar(false)}>
                        Cerrar
                    </Button>
                </DialogContent>

            </Dialog>
        );
    }

    return (
        <Dialog open={mostrar} onClose={() => actualizarMostrar(false)} fullWidth>

            <DialogTitle style={{ textAlign: 'center' }}>
                ¿Estás seguro que deseas eliminar el siguiente registro?
            </DialogTitle>

            <DialogContent style={{ display: 'flex', flexDirection: 'column' }} dividers>
                {/* IdPrecioOK */}
                <TextField
                    label={"IdPrecioOK"}
                    value={precioSeleccionado.IdPrecioOK}
                    {...commonTextFieldProps}
                />

                {/* IdPresentaOK */}
                <TextField
                    label={"IdPresentaOK"}
                    value={precioSeleccionado.IdPresentaOK}
                    {...commonTextFieldProps}
                />

                {/* CostoIni */}
                <TextField
                    label={"CostoIni"}
                    value={precioSeleccionado.CostoIni}
                    {...commonTextFieldProps}
                />

                {/* CostoFin */}
                <TextField
                    label={"CostoFin"}
                    value={precioSeleccionado.CostoFin}
                    {...commonTextFieldProps}
                />

                {/* Precio */}
                <TextField
                    label={"Precio"}
                    value={precioSeleccionado.Precio}
                    {...commonTextFieldProps}
                />
            </DialogContent>

            <DialogActions
                sx={{ display: 'flex', flexDirection: 'row' }}
            >
                <Box m="auto">
                    {mensajeErrorAlert && (
                        <Alert severity="error">
                            <b>¡ERROR!</b> ─ {mensajeErrorAlert}
                        </Alert>
                    )}
                    {mensajeExitoAlert && (
                        <Alert severity="success">
                            <b>¡ÉXITO!</b> ─ {mensajeExitoAlert}
                        </Alert>
                    )}
                </Box>

                {/* ============ BOTÓN CERRAR ============ */}
                <LoadingButton
                    color="secondary"
                    loadingPosition="start"
                    startIcon={<CloseIcon />}
                    variant="outlined"
                    onClick={() => {
                        //LIMPIA LOS MENSAJES DE EXITO Y ERROR Y CIERRA EL FORMULARIO
                        actualizarMostrar(false);
                        setMensajeErrorAlert(null);
                        setMensajeExitoAlert(null);
                    }}
                >
                    <span>CERRAR</span>
                </LoadingButton>

                {/* ============ BOTÓN ELIMINAR ============ */}
                <LoadingButton
                    color="primary"
                    loadingPosition="start"
                    startIcon={<SaveIcon />}
                    variant="contained"
                    onClick={() => eliminarPrecio()}
                    disabled={!!mensajeExitoAlert}
                    loading={Loading}
                >

                    <span>ELIMINAR</span>
                </LoadingButton>
            </DialogActions>

        </Dialog>
    );
}

export default FormularioEliminar;