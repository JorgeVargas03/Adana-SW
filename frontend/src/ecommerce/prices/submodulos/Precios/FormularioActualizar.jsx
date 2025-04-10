import { Dialog, DialogContent, DialogTitle, Typography, TextField, DialogActions, Box, Alert, Button } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import CloseIcon from "@mui/icons-material/Close";
import SaveIcon from "@mui/icons-material/Save";

import { useFormik } from "formik"; //Para crear el formulario
import * as Yup from "yup"; //Para validar los campos

import { useState, useEffect } from "react";

import { usePricesContext } from "../../contexto/PricesProvider.jsx";

import { updatePrecio } from "../../../../api/apis.js";

//LO MISMO QUE INSERTAR PERO RECIBE UN NUEVO PARAMETRO (PRECIOSELECCIONADO)
const FormularioActualizar = ({ mostrar, actualizarMostrar, precioSeleccionado }) => {
    const [mensajeErrorAlert, setMensajeErrorAlert] = useState("");
    const [mensajeExitoAlert, setMensajeExitoAlert] = useState("");
    const [Loading, setLoading] = useState(false);

    //Precio seleccionado del contexto
    const { priceSel, refresh_price_seleccionado } = usePricesContext();

    //Configuración de formik (el formulario)
    const formik = useFormik({
        initialValues: {
            IdPrecioOK: "",
            IdPresentaOK: "",
            CostoIni: "",
            CostoFin: "",
            Precio: "",
        },
        validationSchema: Yup.object({
            IdPrecioOK: Yup.string().required("Campo requerido"),
            IdPresentaOK: Yup.string().required("Campo requerido"),
            CostoIni: Yup.number().required("Campo requerido"),
            CostoFin: Yup.number().required("Campo requerido"),
            Precio: Yup.number().required("Campo requerido"),
        }),
        /* ============ CÓDIGO OnSubmit SI TODO ESTÁ BIEN ============ */
        onSubmit: async (valoresFormulario) => {
            setLoading(true);

            //Limpia
            setMensajeErrorAlert(null);
            setMensajeExitoAlert(null);

            try {
                //Llamada a la API
                await updatePrecio(priceSel._id, precioSeleccionado.IdPrecioOK, valoresFormulario);

                setMensajeExitoAlert("Precio creado y guardado correctamente");

                refresh_price_seleccionado();
            } catch (e) {
                setMensajeExitoAlert(null);
                setMensajeErrorAlert("No se pudo crear el precio");
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

    {/* ============ ACTUALIZA LOS CAMPOS CADA QUE se selecciona un renglón de la tabla Precios ============ */ }
    useEffect(() => {
        formik.setFieldValue("IdPrecioOK", precioSeleccionado.IdPrecioOK);
        formik.setFieldValue("IdPresentaOK", precioSeleccionado.IdPresentaOK);
        formik.setFieldValue("CostoIni", precioSeleccionado.CostoIni);
        formik.setFieldValue("CostoFin", precioSeleccionado.CostoFin);
        formik.setFieldValue("Precio", precioSeleccionado.Precio);
    }, [precioSeleccionado]);

    {/* ============ Comprobar que se haya seleccionado un price y un precio ============ */ }
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
        <Dialog open={mostrar} fullWidth onClose={() => actualizarMostrar(false)} >
            {/* ============ HANDLE SUBMIT (click en boton actualizar)============ */}
            <form onSubmit={formik.handleSubmit}>

                <DialogTitle>
                    <Typography component="h6">
                        <strong>Actualizar datos del precio</strong>
                    </Typography>
                </DialogTitle>

                <DialogContent
                    //CSS para el formulario (en forma de columna)
                    sx={{ display: 'flex', flexDirection: 'column' }}
                    dividers
                >
                    {/* ============ TEXTFIELDS PARA EL FORMULARIO ============ */}
                    {/* IdPrecioOK */}
                    <TextField
                        id="IdPrecioOK"
                        label="IdPrecioOK"
                        value={formik.values.IdPrecioOK} //Usar el valor inicial definido al inicio
                        {...commonTextFieldProps} //usar las configuraciones de cada campo
                        error={formik.touched.IdPrecioOK && Boolean(formik.errors.IdPrecioOK)}//Mostrar error si se ha presionado en el campo y el valor no es válido
                        helperText={formik.touched.IdPrecioOK && formik.errors.IdPrecioOK}//Valor del mensaje de error, solo lo muestra al mismo tiempo que el anterior
                    />

                    {/* IdPresentaOK */}
                    <TextField
                        id="IdPresentaOK"
                        label="IdPresentaOK"
                        value={formik.values.IdPresentaOK}
                        {...commonTextFieldProps}
                        error={formik.touched.IdPresentaOK && Boolean(formik.errors.IdPresentaOK)}
                        helperText={formik.touched.IdPresentaOK && formik.errors.IdPresentaOK}
                    />

                    {/* CostoIni */}
                    <TextField
                        id="CostoIni"
                        label="CostoIni"
                        value={formik.values.CostoIni}
                        {...commonTextFieldProps}
                        error={formik.touched.CostoIni && Boolean(formik.errors.CostoIni)}
                        helperText={formik.touched.CostoIni && formik.errors.CostoIni}
                    />

                    {/* CostoFin */}
                    <TextField
                        id="CostoFin"
                        label="CostoFin"
                        value={formik.values.CostoFin}
                        {...commonTextFieldProps}
                        error={formik.touched.CostoFin && Boolean(formik.errors.CostoFin)}
                        helperText={formik.touched.CostoFin && formik.errors.CostoFin}
                    />

                    {/* Precio */}
                    <TextField
                        id="Precio"
                        label="Precio"
                        value={formik.values.Precio}
                        {...commonTextFieldProps}
                        error={formik.touched.Precio && Boolean(formik.errors.Precio)}
                        helperText={formik.touched.Precio && formik.errors.Precio}
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

export default FormularioActualizar;