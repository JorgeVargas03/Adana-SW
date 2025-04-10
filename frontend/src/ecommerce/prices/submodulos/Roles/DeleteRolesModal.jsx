import { Dialog, DialogContent, DialogTitle, TextField, DialogActions, Box, Alert, Button } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import CloseIcon from "@mui/icons-material/Close";
import SaveIcon from "@mui/icons-material/Save";

import { useState } from "react";

import { deleteRol } from "../../../../api/apis.js";

import { usePricesContext } from "../../contexto/PricesProvider.jsx";

const DeleteRolesModal = ({ mostrar, actualizarMostrar, rolSeleccionado }) => {
    const [mensajeErrorAlert, setMensajeErrorAlert] = useState("");
    const [mensajeExitoAlert, setMensajeExitoAlert] = useState("");
    const [Loading, setLoading] = useState(false);

    const commonTextFieldProps = {
        fullWidth: true,
        margin: "dense",
        disabled: true
    }

    const { priceSel, refresh_price_seleccionado } = usePricesContext();

    /* ============ MÉTODO PARA ELIMINAR ============ */
    const eliminarRol = async (campos) => {
        setLoading(true);
        setMensajeErrorAlert(null);
        setMensajeExitoAlert(null);
        try {
            await deleteRol(priceSel._id, rolSeleccionado.IdRolOK);
            setMensajeExitoAlert("ROL eliminado correctamente");
            refresh_price_seleccionado();
        } catch (error) {
            setMensajeExitoAlert(null);
            setMensajeErrorAlert("NO se pudo eliminar el ROL");
            console.error(`ERROR al ELIMINAR ROL`, error);
        }
        setLoading(false);
    }

    return (
        <Dialog open={mostrar} onClose={() => actualizarMostrar(false)} fullWidth>

            <DialogTitle style={{ textAlign: 'center' }}>
                ¿Estás seguro que deseas eliminar el siguiente registro?
            </DialogTitle>

            <DialogContent style={{ display: 'flex', flexDirection: 'column' }} dividers>
                <TextField
                    label={"IdRolOK"}
                    value={rolSeleccionado.IdRolOK}
                    {...commonTextFieldProps}
                />

                <TextField
                    label={"Tipo"}
                    value={rolSeleccionado.Tipo}
                    {...commonTextFieldProps}
                />

                <TextField
                    label={"Detalles"}
                    value={rolSeleccionado.Detalles}
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
                    onClick={() => eliminarRol()}
                    disabled={!!mensajeExitoAlert}
                    loading={Loading}
                >

                    <span>ELIMINAR</span>
                </LoadingButton>
            </DialogActions>

        </Dialog>
    );
}

export default DeleteRolesModal;