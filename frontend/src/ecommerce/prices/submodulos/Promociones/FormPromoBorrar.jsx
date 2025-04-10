import { Dialog, DialogContent, DialogTitle, TextField, DialogActions, Box, Alert, Button } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import CloseIcon from "@mui/icons-material/Close";
import SaveIcon from "@mui/icons-material/Save";

import { useState } from "react";

import { deletePromocion } from "../../../../api/apis.js";

import { usePricesContext } from "../../contexto/PricesProvider.jsx";

const FormPromoBorrar = ({ mostrar, actualizarForm, promoSelect }) => {
    const [mensajeErrorAlert, setMensajeErrorAlert] = useState("");
    const [mensajeExitoAlert, setMensajeExitoAlert] = useState("");
    const [Loading, setLoading] = useState(false);

    const commonTextFieldProps = {
        fullWidth: true,
        margin: "dense",
        disabled: true
    }

    const { priceSel } = usePricesContext();

    /* ============ MÉTODO PARA ELIMINAR ============ */
    const eliminarPromo = async (campos) => {
        setLoading(true);
        setMensajeErrorAlert(null);
        setMensajeExitoAlert(null);
        try {
            await deletePromocion(priceSel._id, promoSelect.IdPromocionOK);
            setMensajeExitoAlert("Promocion eliminada correctamente");
        } catch (error) {
            setMensajeExitoAlert(null);
            setMensajeErrorAlert("NO se pudo eliminar la promocion");
            console.error(`ERROR al ELIMINAR LA PROMOCION`, error);
        }
        setLoading(false);
    }

    if (!priceSel._id && !mensajeExitoAlert) {
        return (
            <Dialog open={mostrar} onClose={() => actualizarForm(false)} fullWidth>

                <DialogTitle style={{ textAlign: 'center' }}>
                    NO has seleccionado un registro de la tabla AllPrices! y/o de la tabla Promociones!
                </DialogTitle>

                <DialogContent style={{ display: 'flex', justifyContent: 'center' }}>
                    <Button variant="contained" color="primary" onClick={() => actualizarForm(false)}>
                        Cerrar
                    </Button>
                </DialogContent>

            </Dialog>
        );
    }

    return (
        <Dialog open={mostrar} onClose={() => actualizarForm(false)} fullWidth>

            <DialogTitle style={{ textAlign: 'center' }}>
                ¿Estás seguro que deseas eliminar el siguiente registro?
            </DialogTitle>

            <DialogContent style={{ display: 'flex', flexDirection: 'column' }} dividers>
                {/* IdPromocionOK */}
                <TextField
                    label={"IdPromocionOK"}
                    value={promoSelect.IdPromocionOK}
                    {...commonTextFieldProps}
                />

                {/* FechaIni */}
                <TextField
                    label={"FechaIni"}
                    value={promoSelect.FechaIni}
                    {...commonTextFieldProps}
                />

                {/* FechaExp */}
                <TextField
                    label={"FechaExp"}
                    value={promoSelect.FechaExp}
                    {...commonTextFieldProps}
                />

                {/* Producto */}
                <TextField
                    label={"Producto"}
                    value={promoSelect.Producto}
                    {...commonTextFieldProps}
                />

                {/* Detalles */}
                <TextField
                    label={"Detalles"}
                    value={promoSelect.Detalles}
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
                        actualizarForm(false);
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
                    onClick={() => eliminarPromo()}
                    disabled={!!mensajeExitoAlert}
                    loading={Loading}
                >

                    <span>ELIMINAR</span>
                </LoadingButton>
            </DialogActions>

        </Dialog>
    );
}

export default FormPromoBorrar;