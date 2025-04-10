import { Dialog, DialogContent, DialogTitle, Typography, TextField, DialogActions, Box, Alert, Button } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import CloseIcon from "@mui/icons-material/Close";
import SaveIcon from "@mui/icons-material/Save";

import { useFormik } from "formik"; //Para crear el formulario
import * as Yup from "yup"; //Para validar los campos

import { useState, useEffect } from "react";

import { usePricesContext } from "../../contexto/PricesProvider.jsx";

const FormularioActualizar = ({ show, setShow }) => {
    const [mensajeErrorAlert, setMensajeErrorAlert] = useState("");
    const [mensajeExitoAlert, setMensajeExitoAlert] = useState("");
    const [Loading, setLoading] = useState(false);

    //Utilizar funciones y variables del contexto
    const { actualizar_datos_price, priceSel, refresh_prices } = usePricesContext();

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
        /* ============ CÓDIGO OnSubmit SI TODO ESTÁ BIEN ============ */
        onSubmit: async (values) => {
            setLoading(true);

            setMensajeErrorAlert(null);
            setMensajeExitoAlert(null);

            try {
                {/* ============ MÉTODO QUE LLAMA A LA API (ESTÁ EN EL CONTEXTO) ============ */ }
                await actualizar_datos_price(values);
                setMensajeExitoAlert("Price actualizado correctamente");
                refresh_prices();
            } catch (e) {
                setMensajeExitoAlert(null);
                setMensajeErrorAlert("No se pudo actualizar el price");
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

    {/* ============ ACTUALIZA LOS CAMPOS CADA QUE priceSel se modifica ============ */ }
    useEffect(() => {
        formik.setFieldValue("IdInstitutoOK", priceSel.IdInstitutoOK);
        formik.setFieldValue("IdListaOK", priceSel.IdListaOK);
        formik.setFieldValue("IdListaBK", priceSel.IdListaBK);
        formik.setFieldValue("DesLista", priceSel.DesLista);
        formik.setFieldValue("FechaExpiraIni", priceSel.FechaExpiraIni);
        formik.setFieldValue("FechaExpiraFin", priceSel.FechaExpiraFin);
        formik.setFieldValue("IdTipoListaOK", priceSel.IdTipoListaOK);
    }, [priceSel]);

    {/* ============ TIENE priceSel un _id válido? ============ */ }
    if (!priceSel._id && !!!mensajeExitoAlert) {
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
        <Dialog
            open={show}
            onClose={() => setShow(false)}
            fullWidth
        >
            {/* ============ HANDLE SUBMIT (click en boton actualizar)============ */}
            <form onSubmit={formik.handleSubmit}>

                <DialogTitle>
                    <Typography component="h6">
                        <strong>Actualizar price</strong>
                    </Typography>
                </DialogTitle>
                <DialogContent
                    sx={{ display: 'flex', flexDirection: 'column' }}
                    dividers
                >
                    {/* ============ TEXTFIELDS PARA EL FORMULARIO ============ */}
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
                        type="submit" //Como es de tipo submit no requiere un onClick, se va a handleSubmit
                        disabled={!!mensajeExitoAlert}
                        loading={Loading}
                    >

                        <span>Actualizar</span>
                    </LoadingButton>
                </DialogActions>
            </form>
        </Dialog>
    );
}
export default FormularioActualizar;