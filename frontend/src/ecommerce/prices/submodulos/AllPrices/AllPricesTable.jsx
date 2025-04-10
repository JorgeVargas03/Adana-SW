import { useEffect, useState } from "react";
import { Dialog, Stack, Tooltip, darken, Box } from "@mui/material";
import { MaterialReactTable } from 'material-react-table';
import AddCircleIcon from "@mui/icons-material/AddCircle";
import EditIcon from "@mui/icons-material/Edit";
import InfoIcon from "@mui/icons-material/Info";
import DeleteIcon from "@mui/icons-material/Delete";
import RefreshIcon from '@mui/icons-material/Refresh';
import { IconButton } from "@mui/material";

import AddPriceModal from "./AddPriceModal.jsx";
import FormularioActualizar from "./FormularioActualizar.jsx";
import EliminarPrice from "./EliminarPrice.jsx";
import DetallesPrice from "./DetallesPrice.jsx";

import { usePricesContext } from "../../contexto/PricesProvider.jsx";

const PricesColumns = [
  {
    accessorKey: "IdInstitutoOK",
    header: "ID OK",
    size: 30, //small column
  },
  {
    accessorKey: "IdListaOK",
    header: "ID OK",
    size: 30, //small column
  },
  {
    accessorKey: "IdListaBK",
    header: "ID BK",
    size: 150, //small column
  },
  {
    accessorKey: "DesLista",
    header: "DES LISTA",
    size: 50, //small column
  },
  {
    accessorKey: "FechaExpiraIni",
    header: "FECHA INI",
    size: 30, //small column
  },
  {
    accessorKey: "FechaExpiraFin",
    header: "FECHA FIN",
    size: 150, //small column
  },
  {
    accessorKey: "IdTipoListaOK",
    header: "ID OK SUP",
    size: 30, //small column
  },
];

const AllPricesTable = () => {
  const [AddPriceShowModal, setAddPriceShowModal] = useState(false);
  const [showFormActualizar, setShowFormActualizar] = useState(false);
  const [showFormEliminar, setShowFormEliminar] = useState(false);
  const [showDetalles, setShowDetalles] = useState(false);

  const {
    prices,
    loadingTable,
    actualizar_price_seleccionado,
    refresh_prices,
  } = usePricesContext();

  return (
    <Box>
      <Box>
        <MaterialReactTable
          //Definir datos y columnas
          columns={PricesColumns}
          data={prices}
          state={{ isLoading: loadingTable }}
          initialState={{ density: "compact", showGlobalFilter: true }}
          enableColumnActions={false}
          enableStickyHeader
          enableStickyFooter
          //Elegir solo un renglón
          enableRowSelection
          enableMultiRowSelection={false}
          //Borrar mensaje de selección de renglones
          positionToolbarAlertBanner="none"
          /*SE ACTUALIZA priceSel CUANDO CLICKEO UN CHECKBOX*/
          muiSelectCheckboxProps={({ row }) => ({
            onClick: (event) => {
              actualizar_price_seleccionado(row.original);
            }
          })}
          renderTopToolbarCustomActions={({ table }) => (
            <>
              {/* ------- BARRA DE ACCIONES ------ */}
              <Stack direction="row" sx={{ m: 1 }}>
                <Box>
                  {/* ============ BOTÓN AGREGAR ============ */}
                  <Tooltip title="Agregar">
                    <IconButton onClick={() => setAddPriceShowModal(true)}>
                      <AddCircleIcon />
                    </IconButton>
                  </Tooltip>
                  {/* ============ BOTÓN EDITAR ============ */}
                  <Tooltip title="Editar">
                    <IconButton onClick={() => setShowFormActualizar(true)}>
                      <EditIcon />
                    </IconButton>
                  </Tooltip>
                  {/* ============ BOTÓN ELIMINAR ============ */}
                  <Tooltip title="Eliminar">
                    <IconButton onClick={() => setShowFormEliminar(true)}>
                      <DeleteIcon />
                    </IconButton>
                  </Tooltip>
                  {/* ============ BOTÓN DETALLES ============ */}
                  <Tooltip title="Detalles">
                    <IconButton onClick={() => setShowDetalles(true)}>
                      <InfoIcon />
                    </IconButton>
                  </Tooltip>
                  {/* ============ BOTÓN REFRESCAR ============ */}
                  <Tooltip title="Refrescar">
                    <IconButton onClick={() => {
                      refresh_prices();
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
      <AddPriceModal AddPriceShowModal={AddPriceShowModal} setAddPriceShowModal={setAddPriceShowModal} />
      <FormularioActualizar show={showFormActualizar} setShow={setShowFormActualizar} />
      <EliminarPrice show={showFormEliminar} setShow={setShowFormEliminar} />
      <DetallesPrice show={showDetalles} setShow={setShowDetalles} />
    </Box>
  );
};

export default AllPricesTable;