import { Dialog, DialogContent, DialogTitle, Typography, TextField, DialogActions, Box, Alert } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import CloseIcon from "@mui/icons-material/Close";
import SaveIcon from "@mui/icons-material/Save";

import { useFormik } from "formik";
import * as Yup from "yup";

import { useState } from "react";

//Importar el contexto
import { usePricesContext } from "../../contexto/PricesProvider.jsx";

const AddPriceModal = ({ AddPriceShowModal, setAddPriceShowModal }) => {
    const [mensajeErrorAlert, setMensajeErrorAlert] = useState("");
    const [mensajeExitoAlert, setMensajeExitoAlert] = useState("");
    const [Loading, setLoading] = useState(false);

    //Utilizar funciones y variables del contexto
    const { insertar_nuevo_price, refresh_prices } = usePricesContext();

    const formik = useFormik({
        initialValues: {
            IdInstitutoOK: "",
            IdListaOK: "",
            IdListaBK: "",
            DesLista: "",
            FechaExpiraIni: "",
            FechaExpiraFin: "",
            IdTipoListaOK: "",
        },
        validationSchema: Yup.object({
            IdInstitutoOK: Yup.string().required("Campo requerido"),
            IdListaOK: Yup.string().required("Campo requerido"),
            IdListaBK: Yup.string().required("Campo requerido"),
            DesLista: Yup.string().required("Campo requerido"),
            FechaExpiraIni: Yup.date().required("Campo requerido"),
            FechaExpiraFin: Yup.date().required("Campo requerido"),
            IdTipoListaOK: Yup.string().required("Campo requerido"),
        }),
        onSubmit: async (values) => {
            setLoading(true);

            setMensajeErrorAlert(null);
            setMensajeExitoAlert(null);

            try {
                await insertar_nuevo_price(values);
                setMensajeExitoAlert("Price creado y guardado correctamente");
                refresh_prices();
            } catch (e) {
                setMensajeExitoAlert(null);
                setMensajeErrorAlert("No se pudo crear el price");
            }
            setLoading(false);
        },
    });

    const commonTextFieldProps = {
        onChange: formik.handleChange,
        onBlur: formik.handleBlur,
        fullWidth: true,
        margin: "dense",
        disabled: !!mensajeExitoAlert,
    };

    return (
        <Dialog
            open={AddPriceShowModal}
            onClose={() => setAddPriceShowModal(false)}
            fullWidth
        >
            <form onSubmit={formik.handleSubmit}>
                <DialogTitle>
                    <Typography component="h6">
                        <strong>Agregar Nuevo Precio</strong>
                    </Typography>
                </DialogTitle>
                <DialogContent
                    sx={{ display: 'flex', flexDirection: 'column' }}
                    dividers
                >
                    {/* FIC: Campos de captura o selección */}
                    <TextField
                        id="IdInstitutoOK"
                        label="IdInstitutoOK"
                        value={formik.values.IdInstitutoOK}
                        {...commonTextFieldProps}
                        error={formik.touched.IdInstitutoOK && Boolean(formik.errors.IdInstitutoOK)}
                        helperText={formik.touched.IdInstitutoOK && formik.errors.IdInstitutoOK}
                    />

                    <TextField
                        id="IdListaOK"
                        label="IdListaOK"
                        value={formik.values.IdListaOK}
                        {...commonTextFieldProps}
                        error={formik.touched.IdListaOK && Boolean(formik.errors.IdListaOK)}
                        helperText={formik.touched.IdListaOK && formik.errors.IdListaOK}
                    />

                    <TextField
                        id="IdListaBK"
                        label="IdListaBK"
                        value={formik.values.IdListaBK}
                        {...commonTextFieldProps}
                        error={formik.touched.IdListaBK && Boolean(formik.errors.IdListaBK)}
                        helperText={formik.touched.IdListaBK && formik.errors.IdListaBK}
                    />

                    <TextField
                        id="DesLista"
                        label="DesLista"
                        value={formik.values.DesLista}
                        {...commonTextFieldProps}
                        error={formik.touched.DesLista && Boolean(formik.errors.DesLista)}
                        helperText={formik.touched.DesLista && formik.errors.DesLista}
                    />

                    <TextField
                        id="FechaExpiraIni"
                        label="FechaExpiraIni"
                        value={formik.values.FechaExpiraIni}
                        {...commonTextFieldProps}
                        error={formik.touched.FechaExpiraIni && Boolean(formik.errors.FechaExpiraIni)}
                        helperText={formik.touched.FechaExpiraIni && formik.errors.FechaExpiraIni}
                    />

                    <TextField
                        id="FechaExpiraFin"
                        label="FechaExpiraFin"
                        value={formik.values.FechaExpiraFin}
                        {...commonTextFieldProps}
                        error={formik.touched.FechaExpiraFin && Boolean(formik.errors.FechaExpiraFin)}
                        helperText={formik.touched.FechaExpiraFin && formik.errors.FechaExpiraFin}
                    />

                    <TextField
                        id="IdTipoListaOK"
                        label="IdTipoListaOK"
                        value={formik.values.IdTipoListaOK}
                        {...commonTextFieldProps}
                        error={formik.touched.IdTipoListaOK && Boolean(formik.errors.IdTipoListaOK)}
                        helperText={formik.touched.IdTipoListaOK && formik.errors.IdTipoListaOK}
                    />
                </DialogContent>
                {/* FIC: Aqui van las acciones del usuario como son las alertas o botones */}
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

                    {/* FIC: Boton de Cerrar. */}
                    <LoadingButton
                        color="secondary"
                        loadingPosition="start"
                        startIcon={<CloseIcon />}
                        variant="outlined"
                        onClick={() => {
                            setAddPriceShowModal(false)
                            setMensajeErrorAlert(null);
                            setMensajeExitoAlert(null);
                            formik.resetForm();
                        }}
                    >
                        <span>CERRAR</span>
                    </LoadingButton>
                    {/* FIC: Boton de Guardar. */}
                    <LoadingButton
                        color="primary"
                        loadingPosition="start"
                        startIcon={<SaveIcon />}
                        variant="contained"
                        type="submit"
                        disabled={!!mensajeExitoAlert}
                        loading={Loading}
                    >

                        <span>GUARDAR</span>
                    </LoadingButton>
                </DialogActions>
            </form>
        </Dialog>
    );
};
export default AddPriceModal;