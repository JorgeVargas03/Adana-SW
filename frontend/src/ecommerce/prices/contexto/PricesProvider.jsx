import React, { createContext, useContext, useEffect, useState } from "react";

//Importar APIS
import { getAllPrices, getPrice, insertPrice, updatePrice, deletePrice } from "../../../api/apis.js";

//Se crea el contexto
const PricesContext = createContext();

//Se crea la función para utilizar el contexto
export const usePricesContext = () => {
  const context = useContext(PricesContext);

  if (!context) {
    throw new Error("usePrice debe de estar dentro de un provider");
  }

  return context;
}

//Se define "el contenido" del contexto
export function PricesProvider({ children }) {
  const [prices, setPrices] = useState([]);
  const [priceSel, setPriceSel] = useState({ _id: null, precios: [], roles: [], promociones: [], negocios: [] });
  const [loadingTable, setLoadingTable] = useState(false);

  {/* ============ CARGA LOS DATOS LA PRIMERA VEZ QUE SE CARGA EL CONTEXTO ============ */ }
  useEffect(() => {
    refresh_prices();
  }, []);

  {/* ============ TABLA ALLPRICES ============ */ }
  const refresh_prices = async () => {
    setLoadingTable(true);
    try {
      const res = await getAllPrices();
      setPrices(res.data);
    } catch (error) {
      console.error(`Error al obtener los prices`, error);
    }
    setLoadingTable(false);
  };

  const actualizar_price_seleccionado = async (values) => {
    setLoadingTable(s => true);
    //Si values es null entonces si inicializa un objeto vacío
    //Para que no "truenen" las tablas de los subdocumentos
    if (!values) {
      setPriceSel({ _id: null, precios: [], roles: [], promociones: [], negocios: [] });
    } else {
      setPriceSel(values);
    }
    setLoadingTable(s => false);
  };

  /*****************************************/
  /*************** REFRESH ****************/
  /*****************************************/
  const refresh_price_seleccionado = async () => {
    setLoadingTable(s => true);
    //Si el id es nullo entonces se inicializa un objeto vacío
    //como en actualizar_price
    if (priceSel._id) {
      try {
        const res = await getPrice(priceSel._id);
        setPriceSel(res.data);
      } catch (error) {
        console.error(`ERROR al refrescar PRICE seleccionado`, error);
      }
    }
    setLoadingTable(s => false);
  };

  const insertar_nuevo_price = async (campos) => {
    setLoadingTable(s => true);
    const respuesta = await insertPrice(campos);
    setLoadingTable(s => false);
  }

  const actualizar_datos_price = async (values) => {
    setLoadingTable(s => true);
    await updatePrice(priceSel._id, values);
    setLoadingTable(s => false);
  }

  const eliminar_price_seleccionado = async () => {
    setLoadingTable(s => true);
    await deletePrice(priceSel._id);
    setLoadingTable(s => false);
  }
  return (
    <PricesContext.Provider value={{
      prices,
      priceSel,
      loadingTable,
      setPrices,
      setPriceSel,
      refresh_prices,
      actualizar_price_seleccionado,
      insertar_nuevo_price,
      refresh_price_seleccionado,
      actualizar_datos_price,
      eliminar_price_seleccionado,
    }}>
      {children}
    </PricesContext.Provider>
  );
}
