import { Dialog, DialogContent, DialogTitle, Typography, TextField, DialogActions, Box, Alert, Button } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import CloseIcon from "@mui/icons-material/Close";
import SaveIcon from "@mui/icons-material/Save";

import { useFormik } from "formik"; //Para crear el formulario
import * as Yup from "yup"; //Para validar los campos

import { useState, useEffect } from "react";

import { usePricesContext } from "../../contexto/PricesProvider.jsx";

import { insertPromocion } from "../../../../api/apis.js";

//Recibe dos parámetros
//una variables para saber si mostrar el formulario,
//y una función actualizar dicha variable
const FormPromoInsertar = ({ mostrar, actualizarForm }) => {
    const [mensajeErrorAlert, setMensajeErrorAlert] = useState("");
    const [mensajeExitoAlert, setMensajeExitoAlert] = useState("");
    const [Loading, setLoading] = useState(false);

    //Precio seleccionado del contexto
    const { priceSel } = usePricesContext();

    //Configuración de formik (el formulario)
    const formik = useFormik({
        initialValues: {
            IdPromocionOK: "",
            FechaIni: "",
            FechaExp: "",
            Producto: "",
            Detalles: "",
        },
        validationSchema: Yup.object({
            IdPromocionOK: Yup.string().required("Campo requerido"),
            FechaIni: Yup.date().required("Campo requerido"),
            FechaExp: Yup.date().required("Campo requerido"),
            Producto: Yup.string().required("Campo requerido"),
            Detalles: Yup.string().required("Campo requerido"),
        }),
        /* ============ CÓDIGO OnSubmit SI TODO ESTÁ BIEN ============ */
        onSubmit: async (valoresFormulario) => {
            setLoading(true);

            setMensajeErrorAlert(null);
            setMensajeExitoAlert(null);

            try {
                await insertPromocion(priceSel._id, valoresFormulario);
                setMensajeExitoAlert("Promocion creada y guardada correctamente");
            } catch (e) {
                setMensajeExitoAlert(null);
                setMensajeErrorAlert("No se pudo crear la promocion");
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



    //Comprobar seleccion de PriceSel
    if (!priceSel._id){
        return (
            <Dialog open={mostrar} onClose={() => actualizarForm(false)} fullWidth>

                <DialogTitle style={{ textAlign: 'center' }}>
                    NO has seleccionado un registro de la tabla AllPrices!
                </DialogTitle>

                <DialogContent>
                    <Button variant="contained" color="primary" onClick={() => actualizarForm(false)}>
                        Cerrar
                    </Button>
                </DialogContent>

            </Dialog>
        );
    }


    return (
        <Dialog open={mostrar} fullWidth onClose={() => actualizarForm(false)} >
            {/* ============ HANDLE SUBMIT (click en boton insertar)============ */}
            <form onSubmit={formik.handleSubmit}>

                <DialogTitle>
                    <Typography component="h6">
                        <strong>Insertar promocion nueva</strong>
                    </Typography>
                </DialogTitle>

                <DialogContent
                    //CSS para el formulario (en forma de columna)
                    sx={{ display: 'flex', flexDirection: 'column' }}
                    dividers
                >
                    {/* ============ TEXTFIELDS PARA EL FORMULARIO ============ */}
                    <TextField
                        id="IdPromocionOK"
                        label="IdPromocionOK"
                        value={formik.values.IdPromocionOK} //Usar el valor inicial definido al inicio
                        {...commonTextFieldProps} //usar las configuraciones de cada campo
                        error={formik.touched.IdPromocionOK && Boolean(formik.errors.IdPromocionOK)}//Mostrar error si se ha presionado en el campo y el valor no es válido
                        helperText={formik.touched.IdPromocionOK && formik.errors.IdPromocionOK}//Valor del mensaje de error, solo lo muestra al mismo tiempo que el anterior
                    />

                    <TextField
                        id="FechaIni"
                        label="FechaIni"
                        value={formik.values.FechaIni} //Usar el valor inicial definido al inicio
                        {...commonTextFieldProps} //usar las configuraciones de cada campo
                        error={formik.touched.FechaIni && Boolean(formik.errors.FechaIni)}//Mostrar error si se ha presionado en el campo y el valor no es válido
                        helperText={formik.touched.FechaIni && formik.errors.FechaIni}//Valor del mensaje de error, solo lo muestra al mismo tiempo que el anterior
                    />

                    <TextField
                        id="FechaExp"
                        label="FechaExp"
                        value={formik.values.FechaExp}
                        {...commonTextFieldProps}
                        error={formik.touched.FechaExp && Boolean(formik.errors.FechaExp)}
                        helperText={formik.touched.FechaExp && formik.errors.FechaExp}
                    />

                    <TextField
                        id="Producto"
                        label="Producto"
                        value={formik.values.Producto}
                        {...commonTextFieldProps}
                        error={formik.touched.Producto && Boolean(formik.errors.Producto)}
                        helperText={formik.touched.Producto && formik.errors.Producto}
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
                            actualizarForm(false); //Deja de mostrar el formulario
                            //Se limpian los mensajes
                            setMensajeErrorAlert(null);
                            setMensajeExitoAlert(null);

                            //Limpiar formulario
                            formik.resetForm();
                        }}
                    >
                        <span>CERRAR</span>
                    </LoadingButton>

                    {/* ============ BOTÓN INSERTAR ============ */}
                    <LoadingButton
                        color="primary"
                        loadingPosition="start"
                        startIcon={<SaveIcon />}
                        variant="contained"
                        type="submit" //Como es de tipo submit no requiere un onClick, se va a handleSubmit
                        disabled={!!mensajeExitoAlert}//Si hay un mensaje de éxito entonces no lo puedo presionar de nuevo
                        loading={Loading}
                    >

                        <span>Insertar</span>
                    </LoadingButton>
                </DialogActions>
            </form>
        </Dialog>
    );
}
export default FormPromoInsertar;