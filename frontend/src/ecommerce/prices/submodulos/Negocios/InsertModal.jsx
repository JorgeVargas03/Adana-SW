import { Dialog, DialogContent, DialogTitle, Typography, TextField, DialogActions, Box, Alert, Button } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import CloseIcon from "@mui/icons-material/Close";
import SaveIcon from "@mui/icons-material/Save";

import { useFormik } from "formik"; //Para crear el formulario
import * as Yup from "yup"; //Para validar los campos

import { useState, useEffect } from "react";

import { usePricesContext } from "../../contexto/PricesProvider.jsx";

import { insertNegocio } from "../../../../api/apis.js";

//Recibe dos parámetros
//una variables para saber si mostrar el formulario,
//y una función actualizar dicha variable
const InsertModal = ({ mostrar, actualizarMostrar }) => {
    const [mensajeErrorAlert, setMensajeErrorAlert] = useState("");
    const [mensajeExitoAlert, setMensajeExitoAlert] = useState("");
    const [Loading, setLoading] = useState(false);

    //Precio seleccionado del contexto
    const { priceSel } = usePricesContext();

    //Configuración de formik (el formulario)
    const formik = useFormik({
        initialValues: {
            IdNegocioOK: "",
            Nombre: "",
            Ubicacion: "",
        },
        validationSchema: Yup.object({
            IdNegocioOK: Yup.string().required("Campo requerido"),
            Nombre: Yup.string().required("Campo requerido"),
            Ubicacion: Yup.string().required("Campo requerido"),
        }),
        /* ============ CÓDIGO OnSubmit SI TODO ESTÁ BIEN ============ */
        onSubmit: async (valoresFormulario) => {
            setLoading(true);

            setMensajeErrorAlert(null);
            setMensajeExitoAlert(null);

            try {
                await insertNegocio(priceSel._id, valoresFormulario);
                setMensajeExitoAlert("Negocio creado y guardado correctamente");
            } catch (e) {
                setMensajeExitoAlert(null);
                setMensajeErrorAlert("No se pudo crear el negocio");
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



    {/* ============ Comprobar que se haya seleccionado un price ============ */ }
    if (!priceSel._id) { //Si priceSel._id es null retorna true y entra al if
        return (
            <Dialog open={mostrar} onClose={() => actualizarMostrar(false)} fullWidth>

                <DialogTitle style={{ textAlign: 'center' }}>
                    NO has seleccionado un registro de la tabla AllPrices!
                </DialogTitle>

                <DialogContent>
                    <Button variant="contained" color="primary" onClick={() => actualizarMostrar(false)}>
                        Cerrar
                    </Button>
                </DialogContent>

            </Dialog>
        );
    }


    return (
        <Dialog open={mostrar} fullWidth onClose={() => actualizarMostrar(false)} >
            {/* ============ HANDLE SUBMIT (click en boton actualizar)============ */}
            <form onSubmit={formik.handleSubmit}>

                <DialogTitle>
                    <Typography component="h6">
                        <strong>Insertar negocio nuevo</strong>
                    </Typography>
                </DialogTitle>

                <DialogContent
                    //CSS para el formulario (en forma de columna)
                    sx={{ display: 'flex', flexDirection: 'column' }}
                    dividers
                >
                    {/* ============ TEXTFIELDS PARA EL FORMULARIO ============ */}
                    {/* IdProdServOK */}
                    <TextField
                        id="IdNegocioOK"
                        label="IdNegocioOK"
                        value={formik.values.IdNegocioOK} //Usar el valor inicial definido al inicio
                        {...commonTextFieldProps} //usar las configuraciones de cada campo
                        error={formik.touched.IdNegocioOK && Boolean(formik.errors.IdNegocioOK)}//Mostrar error si se ha presionado en el campo y el valor no es válido
                        helperText={formik.touched.IdNegocioOK && formik.errors.IdNegocioOK}//Valor del mensaje de error, solo lo muestra al mismo tiempo que el anterior
                    />

                    {/* Nombre */}
                    <TextField
                        id="Nombre"
                        label="Nombre"
                        value={formik.values.Nombre}
                        {...commonTextFieldProps}
                        error={formik.touched.Nombre && Boolean(formik.errors.Nombre)}
                        helperText={formik.touched.Nombre && formik.errors.Nombre}
                    />

                    {/* Ubicacion */}
                    <TextField
                        id="Ubicacion"
                        label="Ubicacion"
                        value={formik.values.Ubicacion}
                        {...commonTextFieldProps}
                        error={formik.touched.Ubicacion && Boolean(formik.errors.Ubicacion)}
                        helperText={formik.touched.Ubicacion && formik.errors.Ubicacion}
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

export default InsertModal;