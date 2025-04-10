import { Stack, Tooltip, Box } from "@mui/material";
import { MaterialReactTable } from 'material-react-table';
import AddCircleIcon from "@mui/icons-material/AddCircle";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import RefreshIcon from '@mui/icons-material/Refresh';
import { IconButton } from "@mui/material";
import React, { useState } from "react";
import { usePricesContext } from "../../contexto/PricesProvider.jsx";

import AddRolesModal from "./AddRolesModal.jsx";
import UpdateRolesModal from "./UpdateRolesModal.jsx";
import DeleteRolesModal from "./DeleteRolesModal.jsx";

const RolesColumns = [
  {
    accessorKey: "IdRolOK",
    header: "ID Rol",
    size: 30, //small column
  },
  {
    accessorKey: "Tipo",
    header: "Tipo",
    size: 30, //small column
  },
  {
    accessorKey: "Detalles",
    header: "Detalles",
    size: 150, //small column
  }
];

const RolesTable = () => {
  const [rolSel, actualizarRolSel] = useState([]);

  const [AddRolesShowModal, setAddRolesShowModal] = useState(false);
  const [UpdateRolesShowModal, setUpdateRolesShowModal] = useState(false);
  const [DeleteRolesShowModal, setDeleteRolesShowModal] = useState(false);

  const {
    priceSel,
    loadingTable,
    refresh_price_seleccionado,
  } = usePricesContext();

  return (
    <Box>
    <Box>
        <MaterialReactTable
            //Definir datos y columnas
            columns={RolesColumns}
            data={priceSel.roles}
            //Variable compartida por todos los que usen el contexto
            //para definir si la tabla debe mostrar la animación de carga
            state={{ isLoading: loadingTable }}
            //Elegir solo un renglón
            enableRowSelection
            enableMultiRowSelection={false}
            //Borrar mensaje de selección de renglones
            positionToolbarAlertBanner="none"
            //Ajustes visuales y barra de búsqueda
            initialState={{ density: "compact", showGlobalFilter: true }}
            enableColumnActions={false}
            //No ocultar encabezados o pie de la tabla
            //si hay muchos registros
            enableStickyHeader
            enableStickyFooter

            /* ============ ACTUALIZAR PRECIO SELECCIONADO CON UN CLICK DEL CHECKBOX ============ */
            muiSelectCheckboxProps={({ row }) => ({
                onClick: (event) => {
                  actualizarRolSel(row.original);
                }
            })}

          renderTopToolbarCustomActions={({ table }) => (
            <>
              {/* ------- BARRA DE ACCIONES ------ */}
              <Stack direction="row" sx={{ m: 1 }}>
                <Box>
                  {/* ============ BOTÓN AGREGAR ============ */}
                  <Tooltip title="Agregar">
                    <IconButton onClick={() => setAddRolesShowModal(true)}>
                      <AddCircleIcon />
                    </IconButton>
                  </Tooltip>
                  {/* ============ BOTÓN EDITAR ============ */}
                  <Tooltip title="Editar">
                    <IconButton onClick={() => setUpdateRolesShowModal(true)}>
                      <EditIcon />
                    </IconButton>
                  </Tooltip>
                  {/* ============ BOTÓN ELIMINAR ============ */}
                  <Tooltip title="Eliminar">
                    <IconButton onClick={() => setDeleteRolesShowModal(true)}>
                      <DeleteIcon />
                    </IconButton>
                  </Tooltip>
                  {/* ============ BOTÓN REFRESCAR ============ */}
                  <Tooltip title="Refrescar">
                    <IconButton onClick={() => {
                      refresh_price_seleccionado();
                      //Obliga a que se refresque el formulario de actualizar
                      actualizarRolSel(rolSel);
                    }}>
                      <RefreshIcon />
                    </IconButton>
                  </Tooltip>
                </Box>
              </Stack>
              {/* ------- BARRA DE ACCIONES FIN ------ */}
            </>
          )}
        />
      </Box>
      {/* M O D A L E S */}
      <AddRolesModal mostrar={AddRolesShowModal} actualizarMostrar={setAddRolesShowModal} />
      <UpdateRolesModal mostrar={UpdateRolesShowModal} actualizarMostrar={setUpdateRolesShowModal} RolSeleccionado={rolSel} />
      <DeleteRolesModal mostrar={DeleteRolesShowModal} actualizarMostrar={setDeleteRolesShowModal} rolSeleccionado={rolSel} />
    </Box>   
  );
};

export default RolesTable;