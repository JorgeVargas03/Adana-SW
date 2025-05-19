import { useEffect, useState, useRef } from "react";
import axios from "axios";

const PagosRegistrados = () => {
  const [pagos, setPagos] = useState([]);
  const [mesActual, setMesActual] = useState(new Date().getMonth());
  const [minMonto, setMinMonto] = useState(100);
  const panelRef = useRef(null);

  // Obtener pagos desde el backend
  useEffect(() => {
    const obtenerPagos = async () => {
      try {
        const response = await axios.get("http://localhost:3001/adana-api/v1/payments/admin/management");
        setPagos(response.data);
      } catch (error) {
        console.error("Error al obtener pagos:", error);
      }
    };
    obtenerPagos();
  }, []);

  // Lista de meses del año actual
  const meses = [
    "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
    "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"
  ];

  const mesActualDate = new Date();
  const mesesDisponibles = meses.slice(0, mesActualDate.getMonth() + 1);

  // Filtro de pagos
  const pagosFiltrados = pagos.filter((pago) => {
    const fecha = new Date(pago.date);
    const esDelMes = fecha.getMonth() === mesActual;
    const superaMontoMinimo = pago.amount >= minMonto;
    return esDelMes && superaMontoMinimo;
  });

  return (
    <section className="bg-bgcolor min-h-screen">
      <div className="p-6 flex relative bg-bgcolor">
        <div className="flex-1 font-Outfit">
          <div className="mb-8 pb-24" />
          <div className="flex items-center mb-10 gap-4 flex-wrap">
            <h1 className="text-2xl font-semibold text-fontdef">Pagos Registrados</h1>

            {/* ComboBox de Meses */}
            <select
              value={mesActual}
              onChange={(e) => setMesActual(parseInt(e.target.value))}
              className="p-2 rounded-lg bg-white border border-gray-300 text-fontdef"
            >
              {mesesDisponibles.map((mes, index) => (
                <option key={index} value={index}>{mes}</option>
              ))}
            </select>

            {/* Slider de monto mínimo */}
            <div className="flex items-center gap-2">
              <input
                type="range"
                min={100}
                max={1000}
                value={minMonto}
                onChange={(e) => setMinMonto(parseInt(e.target.value))}
                className="accent-accent1"
              />
              <span className="text-fontdeftext-sm">Min: ${minMonto}</span>
            </div>

            {/* Botón de navegación simulado */}
            <a
              href="/client/myreservation"
              className="ml-auto px-4 py-2 bg-accent2 text-white rounded-lg hover:bg-accent1"
            >
              Reportes
            </a>
          </div>

          {/* Lista de pagos */}
          <ul role="list" className="divide-y divide-gray-100 bg-barcolor rounded-2xl">
            {pagosFiltrados.length === 0 ? (
              <li className="py-6 text-center">No hay pagos para este mes con ese monto.</li>
            ) : (
              pagosFiltrados.map((pago, index) => (
                <li
                  key={index}
                  className="flex justify-between gap-x-6 py-5 px-6 cursor-pointer hover:bg-gray-100 rounded-xl transition"
                >
                  <div className="flex min-w-0 gap-x-4">
                    <div className="size-12 flex items-center justify-center rounded-full bg-gray-100 font-bold">
                      {pago.client_name.charAt(0)}
                    </div>
                    <div className="min-w-0 flex-auto">
                      <p className="text-sm font-semibold text-fontdef">{pago.client_name}</p>
                      <p className="text-xs text-gray-600">{pago.details}</p>
                      <p className="mt-1 text-xs text-gray-500">Monto: ${pago.amount}</p>
                    </div>
                  </div>
                  <div className="hidden shrink-0 sm:flex sm:flex-col sm:items-end">
                    <p className="text-sm text-gray-700 capitalize">{pago.method}</p>
                    <p className="mt-1 text-xs text-gray-500">{new Date(pago.date).toLocaleDateString()}</p>
                  </div>
                </li>
              ))
            )}
          </ul>
        </div>
      </div>
    </section>
  );
};

export default PagosRegistrados;
