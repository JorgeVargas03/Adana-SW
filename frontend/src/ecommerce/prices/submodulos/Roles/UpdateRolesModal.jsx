import { Dialog, DialogContent, DialogTitle, Typography, TextField, DialogActions, Box, Alert, Button } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import CloseIcon from "@mui/icons-material/Close";
import SaveIcon from "@mui/icons-material/Save";

import { useFormik } from "formik"; //Para crear el formulario
import * as Yup from "yup"; //Para validar los campos

import { useState, useEffect } from "react";

import { usePricesContext } from "../../contexto/PricesProvider.jsx";

import { updateRol } from "../../../../api/apis.js";

const UpdateRolesModal = ({ mostrar, actualizarMostrar, RolSeleccionado }) => {
    const [mensajeErrorAlert, setMensajeErrorAlert] = useState("");
    const [mensajeExitoAlert, setMensajeExitoAlert] = useState("");
    const [Loading, setLoading] = useState(false);

    //Precio seleccionado del contexto
    const { priceSel, refresh_price_seleccionado } = usePricesContext();

    //Configuración de formik (el formulario)
    const formik = useFormik({
        initialValues: {
            IdRolOK: "",
            Tipo: "",
            Detalles: "",

        },
        validationSchema: Yup.object({
            IdRolOK: Yup.string().required("Campo requerido"),
            Tipo: Yup.string().required("Campo requerido"),
            Detalles: Yup.string().required("Campo requerido"),

        }),
        /* ============ CÓDIGO OnSubmit SI TODO ESTÁ BIEN ============ */
        onSubmit: async (valoresFormulario) => {
            setLoading(true);

            setMensajeErrorAlert(null);
            setMensajeExitoAlert(null);

            try {
                await updateRol(priceSel._id, RolSeleccionado.IdRolOK, valoresFormulario);
                setMensajeExitoAlert("ROL Actualizado y guardado correctamente");
                refresh_price_seleccionado();
            } catch (e) {
                setMensajeExitoAlert(null);
                setMensajeErrorAlert("No se pudo Actualizar el ROL");
            }
            setLoading(false);
        },
    });

    /* ============ configuraciones que se usan en cada campo de texto ============ */
    const commonTextFieldProps = {
        onChange: formik.handleChange, //Comprobar sus valores cuando cambie de valor
        fullWidth: true, //Que abarque todo el espacio a lo ancho
        margin: "dense", //Margen
        disabled: !!mensajeExitoAlert,//!!mensajeExitoAlert retorna falso si mensajeExitoAlert es null, undefined o 0
        //es decir, si mensajeExitoAlert es diferente de NULL entonces se deshabilita
    };

    {/* ============ ACTUALIZA LOS CAMPOS CADA QUE RolSeleccionado se modifica ============ */ }
    useEffect(() => {
        formik.setFieldValue("IdRolOK", RolSeleccionado.IdRolOK);
        formik.setFieldValue("Tipo", RolSeleccionado.Tipo);
        formik.setFieldValue("Detalles", RolSeleccionado.Detalles);

    }, [RolSeleccionado]);

    return (
        <Dialog open={mostrar} fullWidth onClose={() => actualizarMostrar(false)} >
            {/* ============ HANDLE SUBMIT (click en boton actualizar)============ */}
            <form onSubmit={formik.handleSubmit}>

                <DialogTitle>
                    <Typography component="h6">
                        <strong>Actualizar datos del ROL</strong>
                    </Typography>
                </DialogTitle>

                <DialogContent
                    //CSS para el formulario (en forma de columna)
                    sx={{ display: 'flex', flexDirection: 'column' }}
                    dividers
                >
                    {/* ============ TEXTFIELDS PARA EL FORMULARIO ============ */}
                    <TextField
                        id="IdRolOK"
                        label="IdRolOK"
                        value={formik.values.IdRolOK} //Usar el valor inicial definido al inicio
                        {...commonTextFieldProps} //usar las configuraciones de cada campo
                        error={formik.touched.IdRolOK && Boolean(formik.errors.IdRolOK)}//Mostrar error si se ha presionado en el campo y el valor no es válido
                        helperText={formik.touched.IdRolOK && formik.errors.IdRolOK}//Valor del mensaje de error, solo lo muestra al mismo tiempo que el anterior
                    />

                    <TextField
                        id="Tipo"
                        label="Tipo"
                        value={formik.values.Tipo}
                        {...commonTextFieldProps}
                        error={formik.touched.Tipo && Boolean(formik.errors.IdPresentaOK)}
                        helperText={formik.touched.Tipo && formik.errors.IdPresentaOK}
                    />

                    <TextField
                        id="Detalles"
                        label="Detalles"
                        value={formik.values.Detalles}
                        {...commonTextFieldProps}
                        error={formik.touched.Detalles && Boolean(formik.errors.Detalles)}
                        helperText={formik.touched.Detalles && formik.errors.Detalles}
                    />

                </DialogContent>
                {/* Alertas */}
                <DialogActions>
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
                            actualizarMostrar(false); //Deja de mostrar el formulario
                            //Se limpian los mensajes
                            setMensajeErrorAlert(null);
                            setMensajeExitoAlert(null);
                        }}
                    >
                        <span>CERRAR</span>
                    </LoadingButton>

                    {/* ============ BOTÓN Actualizar ============ */}
                    <LoadingButton
                        color="primary"
                        loadingPosition="start"
                        startIcon={<SaveIcon />}
                        variant="contained"
                        type="submit" //Como es de tipo submit no requiere un onClick, se va a handleSubmit
                        disabled={!!mensajeExitoAlert}//Si hay un mensaje de éxito entonces no lo puedo presionar de nuevo
                        loading={Loading}
                    >

                        <span>Actualizar</span>
                    </LoadingButton>
                </DialogActions>
            </form>
        </Dialog>
    );

}

export default UpdateRolesModal;