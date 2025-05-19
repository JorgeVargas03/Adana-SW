import { useEffect, useState } from "react";
import axios from "axios";

const PagosRegistrados = () => {
  const [pagos, setPagos] = useState([]);
  const [usuarios, setUsuarios] = useState([]);
  const [mesActual, setMesActual] = useState(new Date().getMonth());
  const [minMonto, setMinMonto] = useState(100);

  useEffect(() => {
    const obtenerDatos = async () => {
      try {
        const [resPagos, resUsuarios] = await Promise.all([
          axios.get("http://localhost:3001/adana-api/v1/payments/admin/management"),
          axios.get("http://localhost:3001/adana-api/v1/users"),
        ]);

        setPagos(resPagos.data);
        setUsuarios(resUsuarios.data);
      } catch (error) {
        console.error("Error al obtener datos:", error);
      }
    };

    obtenerDatos();
  }, []);

  const meses = [
    "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
    "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"
  ];

  const mesesDisponibles = meses.slice(0, new Date().getMonth() + 1);

  const pagosFiltrados = pagos.filter((pago) => {
    const fecha = new Date(pago.date);
    return (
      fecha.getMonth() === mesActual &&
      pago.amount >= minMonto
    );
  });

  const obtenerFoto = (clientId) => {
    const usuario = usuarios.find((u) => u.id === clientId);
    return usuario?.profile_picture || null;
  };

  return (
    <section className="bg-bgcolor min-h-screen">
      <div className="p-6 flex relative bg-bgcolor">
        <div className="flex-1 font-Outfit">
          <div className="mb-8 pb-20" />
          <div className="flex items-center mb-10 gap-4 flex-wrap">
            <h1 className="text-2xl font-semibold text-fontdef">Pagos Registrados</h1>

            <select
              value={mesActual}
              onChange={(e) => setMesActual(parseInt(e.target.value))}
              className="p-2 rounded-lg bg-white border border-gray-300 text-fontdef cursor-pointer"
            >
              {mesesDisponibles.map((mes, index) => (
                <option key={index} value={index}>{mes}</option>
              ))}
            </select>

            <div className="flex items-center gap-2">
              <input
                type="range"
                min={100}
                max={1000}
                value={minMonto}
                onChange={(e) => setMinMonto(parseInt(e.target.value))}
                className="accent-accent1"
              />
              <span className="text-gray-700 text-sm">Min: ${minMonto}</span>
            </div>

            <a
              href="/reportes"
              className="ml-auto px-4 py-2 bg-accent2 text-white rounded-lg hover:bg-accent1 transition"
            >
              Reportes
            </a>
          </div>

          <ul role="list" className="divide-y divide-gray-100 bg-barcolor rounded-2xl">
            {pagosFiltrados.length === 0 ? (
              <li className="py-6 text-center">No hay pagos para este mes con ese monto.</li>
            ) : (
              pagosFiltrados.map((pago, index) => {
                const foto = obtenerFoto(pago.client_id);
                return (
                  <li
                    key={index}
                    className="flex justify-between gap-x-6 py-5 px-6 cursor-pointer hover:bg-gray-100 rounded-xl transition"
                  >
                    <div className="flex min-w-0 gap-x-4 items-center">
                      {foto ? (
                        <img
                          src={foto}
                          alt="Foto del usuario"
                          className="w-12 h-12 rounded-full object-cover"
                        />
                      ) : (
                        <div className="size-12 flex items-center justify-center rounded-full bg-gray-100 font-bold">
                          {pago.client_name.charAt(0)}
                        </div>
                      )}
                      <div className="min-w-0 flex-auto">
                        <p className="text-lg font-semibold text-fontdef">{pago.client_name}</p>
                        <p className="text-base text-gray-600">{pago.details}</p>
                        <p className="mt-1 text-sm text-gray-500">Monto: ${pago.amount}</p>
                      </div>
                    </div>
                    <div className="hidden shrink-0 sm:flex sm:flex-col sm:items-end">
                      <p className="text-base text-fontdef capitalize font-semibold">{pago.method}</p>
                      <p className="mt-1 text-sm text-gray-500">
                        {new Date(pago.date).toLocaleDateString()}
                      </p>
                    </div>
                  </li>
                );
              })
            )}
          </ul>
        </div>
      </div>
    </section>
  );
};

export default PagosRegistrados;
