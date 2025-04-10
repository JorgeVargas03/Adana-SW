import { Dialog, DialogContent, DialogTitle, TextField, DialogActions, Button } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import CloseIcon from "@mui/icons-material/Close";

import { usePricesContext } from "../../contexto/PricesProvider.jsx";

const FormularioDetalles = ({ mostrar, actualizarMostrar, precioSeleccionado }) => {    
    //COBF DE TODOS LOS CAMPOS
    const commonTextFieldProps = {
        fullWidth: true,
        margin: "dense",
        disabled: true
    }

    const { priceSel } = usePricesContext();

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
                Detalles
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
                {/* ============ BOTÓN CERRAR ============ */}
                <LoadingButton
                    color="secondary"
                    loadingPosition="start"
                    startIcon={<CloseIcon />}
                    variant="outlined"
                    onClick={() => actualizarMostrar(false)}
                >
                    <span>CERRAR</span>
                </LoadingButton>

            </DialogActions>

        </Dialog>
    );
}

export default FormularioDetalles;