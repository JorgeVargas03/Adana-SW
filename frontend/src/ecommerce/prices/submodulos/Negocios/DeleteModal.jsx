import { Dialog, DialogContent, DialogTitle, TextField, DialogActions, Box, Alert, Button } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import CloseIcon from "@mui/icons-material/Close";
import SaveIcon from "@mui/icons-material/Save";

import { useState } from "react";

import { deleteNegocio} from "../../../../api/apis.js";

import { usePricesContext } from "../../contexto/PricesProvider.jsx";

const DeleteModal = ({ mostrar, actualizarMostrar, negocioSeleccionado }) => {
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
    const eliminarNegocio = async (campos) => {
        setLoading(true);
        setMensajeErrorAlert(null);
        setMensajeExitoAlert(null);
        try {
            await deleteNegocio(priceSel._id, negocioSeleccionado._id);
            setMensajeExitoAlert("Negocio eliminado correctamente");
        } catch (error) {
            setMensajeExitoAlert(null);
            setMensajeErrorAlert("NO se pudo eliminar el negocio");
            console.error(`ERROR al ELIMINAR NEGOCIO`, error);
        }
        setLoading(false);
    }

    if (!priceSel._id && !mensajeExitoAlert) {
        return (
            <Dialog open={mostrar} onClose={() => actualizarMostrar(false)} fullWidth>

                <DialogTitle style={{ textAlign: 'center' }}>
                    NO has seleccionado un registro de la tabla AllPrices! y/o de la tabla Negocios!
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
                {/* IdNegocioOK */}
                <TextField
                    label={"IdNegocioOK"}
                    value={negocioSeleccionado.IdNegocioOK}
                    {...commonTextFieldProps}
                />

                {/* Nombre */}
                <TextField
                    label={"Nombre"}
                    value={negocioSeleccionado.Nombre}
                    {...commonTextFieldProps}
                />

                {/* Ubicacion */}
                <TextField
                    label={"Ubicacion"}
                    value={negocioSeleccionado.Ubicacion}
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

                {/* ============ BOTÓN ACTUALIZAR ============ */}
                <LoadingButton
                    color="primary"
                    loadingPosition="start"
                    startIcon={<SaveIcon />}
                    variant="contained"
                    onClick={() => eliminarNegocio()}
                    disabled={!!mensajeExitoAlert}
                    loading={Loading}
                >

                    <span>ELIMINAR</span>
                </LoadingButton>
            </DialogActions>

        </Dialog>
    );
}

export default DeleteModal;