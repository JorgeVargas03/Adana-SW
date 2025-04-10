import { Dialog, DialogContent, DialogTitle, DialogActions, Button } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import CloseIcon from "@mui/icons-material/Close";

import { usePricesContext } from "../../contexto/PricesProvider.jsx";

const FormPromoDetalles = ({ mostrar, actualizarForm, promoSelect }) => {
    const { priceSel } = usePricesContext();

    if (!priceSel._id || !promoSelect.IdPromocionOK) {
        return (
            <Dialog open={mostrar} onClose={() => actualizarForm(false)} fullWidth>

                <DialogTitle style={{ textAlign: 'center' }}>
                    NO has seleccionado un registro de la tabla AllPrices! y/o de la tabla Precios!
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
                Información del subdocumento promocion:
            </DialogTitle>

            <DialogContent>
                <pre>
                    {JSON.stringify(promoSelect, null, 2)}
                </pre>

            </DialogContent>

            <DialogActions
                sx={{ display: 'flex', justifyContent: 'center' }}
            >
                {/* ============ BOTÓN CERRAR ============ */}
                <LoadingButton
                    color="secondary"
                    loadingPosition="start"
                    startIcon={<CloseIcon />}
                    variant="outlined"
                    onClick={() => actualizarForm(false)}
                >
                    <span>CERRAR</span>
                </LoadingButton>
            </DialogActions>

        </Dialog>
    );
}

export default FormPromoDetalles;