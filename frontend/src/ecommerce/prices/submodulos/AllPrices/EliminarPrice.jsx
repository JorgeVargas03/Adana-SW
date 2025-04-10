import { Dialog, DialogContent, DialogTitle, Typography, TextField, DialogActions, Box, Alert, Button } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import CloseIcon from "@mui/icons-material/Close";
import SaveIcon from "@mui/icons-material/Save";

import { useState } from "react";

import { usePricesContext } from "../../contexto/PricesProvider.jsx";

const EliminarPrice = ({ show, setShow }) => {
    const [mensajeErrorAlert, setMensajeErrorAlert] = useState("");
    const [mensajeExitoAlert, setMensajeExitoAlert] = useState("");
    const [Loading, setLoading] = useState(false);

    const commonTextFieldProps = {
        fullWidth: true,
        margin: "dense",
        disabled: true
    }

    const { eliminar_price_seleccionado, priceSel, actualizar_price_seleccionado, refresh_prices } = usePricesContext();

    /* ============ MÉTODO PARA ELIMINAR ============ */
    const eliminarPrecio = async (campos) => {
        setLoading(true);
        setMensajeErrorAlert(null);
        setMensajeExitoAlert(null);
        try {
            await eliminar_price_seleccionado();
            setMensajeExitoAlert("Price eliminado correctamente");
            actualizar_price_seleccionado(null);
            refresh_prices();
        } catch (error) {
            setMensajeExitoAlert(null);
            setMensajeErrorAlert("NO se pudo eliminar el price");
            console.error(`ERROR al ELIMINAR PRECIO`, error);
        }
        setLoading(false);
    }

    if (!priceSel._id && !mensajeExitoAlert) {
        return (
            <Dialog open={show} onClose={() => setShow(false)} fullWidth>

                <DialogTitle style={{ textAlign: 'center' }}>
                    NO has seleccionado un registro de la tabla!
                </DialogTitle>

                <DialogContent style={{ display: 'flex', justifyContent: 'center' }}>
                    <Button variant="contained" color="primary" onClick={() => setShow(false)}>
                        Cerrar
                    </Button>
                </DialogContent>

            </Dialog>
        );
    }

    return (
        <Dialog open={show} onClose={() => setShow(false)} fullWidth>

            <DialogTitle style={{ textAlign: 'center' }}>
                ¿Estás seguro que deseas eliminar el siguiente registro?
            </DialogTitle>

            <DialogContent style={{ display: 'flex', flexDirection: 'column' }} dividers>
                {/* IdInstitutoOK */}
                <TextField
                    label={"IdInstitutoOK"}
                    value={priceSel.IdInstitutoOK}
                    {...commonTextFieldProps}
                />

                {/* IdListaOK */}
                <TextField
                    label={"IdListaOK"}
                    value={priceSel.IdListaOK}
                    {...commonTextFieldProps}
                />

                {/* IdListaBK */}
                <TextField
                    label={"IdListaBK"}
                    value={priceSel.IdListaBK}
                    {...commonTextFieldProps}
                />

                {/* DesLista */}
                <TextField
                    label={"DesLista"}
                    value={priceSel.IdListaBK}
                    {...commonTextFieldProps}
                />

                {/* FechaExpiraIni */}
                <TextField
                    label={"FechaExpiraIni"}
                    value={priceSel.FechaExpiraIni}
                    {...commonTextFieldProps}
                />

                {/* FechaExpiraFin */}
                <TextField
                    label={"FechaExpiraFin"}
                    value={priceSel.FechaExpiraFin}
                    {...commonTextFieldProps}
                />

                {/* IdTipoListaOK */}
                <TextField
                    label={"IdTipoListaOK"}
                    value={priceSel.IdTipoListaOK}
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
                        setShow(false);
                        setMensajeErrorAlert(null);
                        setMensajeExitoAlert(null);
                    }}
                >
                    <span>CERRAR</span>
                </LoadingButton>

                {/* ============ BOTÓN ACTUALIZAR ============ */}
                <LoadingButton
                    color="primary"
                    loadingPosition="start"
                    startIcon={<SaveIcon />}
                    variant="contained"
                    onClick={() => eliminarPrecio()}
                    disabled={!!mensajeExitoAlert}
                    loading={Loading}
                >

                    <span>Eliminar</span>
                </LoadingButton>
            </DialogActions>

        </Dialog>
    );
}

export default EliminarPrice;