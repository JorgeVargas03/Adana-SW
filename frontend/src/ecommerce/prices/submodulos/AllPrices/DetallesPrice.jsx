import { Dialog, DialogContent, DialogTitle, DialogActions, Button } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import CloseIcon from "@mui/icons-material/Close";

import { usePricesContext } from "../../contexto/PricesProvider.jsx";

const DetallesPrice = ({ show, setShow }) => {
    const { priceSel } = usePricesContext();

    if (!priceSel._id) {
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
                Información del registro:
            </DialogTitle>

            <DialogContent>
                <pre>
                    {JSON.stringify(priceSel, null, 2)}
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
                    onClick={() => setShow(false)}
                >
                    <span>CERRAR</span>
                </LoadingButton>
            </DialogActions>

        </Dialog>
    );
}

export default DetallesPrice;