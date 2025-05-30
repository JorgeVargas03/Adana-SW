import React, { useEffect, useState } from 'react';
import axios from 'axios';
const API_URL = import.meta.env.VITE_API_URL;
import {
  PieChart,
  BarChart,
  Bar,
  CartesianGrid,
  XAxis,
  YAxis,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
} from 'recharts';

const COLORS = ['#0088FE', '#FF69B4', '#8884d8'];
const ROLE_COLORS = ['#4CAF50', '#2196F3', '#FF5722'];

const RADIAN = Math.PI / 180;
const renderCustomizedLabel = ({
  cx,
  cy,
  midAngle,
  innerRadius,
  outerRadius,
  percent,
}) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text
      x={x}
      y={y}
      fill="white"
      textAnchor={x > cx ? 'start' : 'end'}
      dominantBaseline="central"
      className="text-sm"
    >
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  );
};

export default function Reports() {
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [genderData, setGenderData] = useState([]);
  const [roleData, setRoleData] = useState([]);
  const [availableMonths, setAvailableMonths] = useState([]);
  const [selectedMonth, setSelectedMonth] = useState('');
  const [clases, setClases] = useState([]);
  const [resumen, setResumen] = useState({
  totalUsuarios: 0,
  totalAlumnos: 0,
  totalHombres: 0,
  totalMujeres: 0,
  totalOtro: 0,
  totalClasesMes: 0,
});

useEffect(() => {
  const totalUsuarios = users.length;
  const totalAlumnos = users.filter(u => u.role?.toLowerCase() === 'cliente').length;

  const totalHombres = users.filter(u => u.gender?.toLowerCase() === 'hombre').length;
  const totalMujeres = users.filter(u => u.gender?.toLowerCase() === 'mujer').length;
  const totalOtro = users.filter(u => {
    const g = u.gender?.toLowerCase();
    return g !== 'hombre' && g !== 'mujer';
  }).length;

  // Filtrar clases del mes actual
  const [mesNombre, añoStr] = selectedMonth.split(' ');
  const mesIndex = new Date(`${mesNombre} 1, ${añoStr}`).getMonth() + 1;
  const mesStr = mesIndex.toString().padStart(2, '0');

  const clasesMes = clases.filter(clase => {
    const [año, mes] = clase.date.split('-');
    return parseInt(año) === parseInt(añoStr) && mes === mesStr;
  });

  setResumen({
    totalUsuarios,
    totalAlumnos,
    totalHombres,
    totalMujeres,
    totalOtro,
    totalClasesMes: clasesMes.length,
  });
}, [users, clases, selectedMonth]);

  useEffect(() => {
    const obtenerDatos = async () => {
      try {
        const resClases = await axios.get(`${API_URL}/adana-api/v1/classes/`);
        setClases(resClases.data);


        setClases(resClases.data);
      } catch (error) {
        console.error("Error al obtener datos:", error);
      }
    };

    obtenerDatos();

    const fetchUsers = async () => {
      try {
        const response = await axios.get(`${API_URL}/adana-api/v1/users`);
        const data = response.data;

        const formattedUsers = data.map(user => {
          const date = new Date(user.registeredAt);
          const mes = date.toLocaleString('es-MX', { month: 'long' });
          const año = date.getFullYear();
          return {
            id: user.id,
            role: user.role,
            status: user.status,
            gender: user.gender?.toLowerCase() || 'otro',
            registeredMonth: `${mes.charAt(0).toUpperCase() + mes.slice(1)} ${año}`,
          };
        });

        setUsers(formattedUsers);

        // Crear lista única de meses disponibles
        const monthsSet = new Set(formattedUsers.map(u => u.registeredMonth));
        const monthsArray = Array.from(monthsSet);
        monthsArray.sort((a, b) => {
          const [m1, y1] = a.split(' ');
          const [m2, y2] = b.split(' ');
          return new Date(`${m1} 1, ${y1}`) - new Date(`${m2} 1, ${y2}`);
        });

        setAvailableMonths(monthsArray);

        // Seleccionar el mes más reciente por defecto
        const latest = monthsArray[monthsArray.length - 1];
        setSelectedMonth(latest);
      } catch (error) {
        console.error('Error al cargar usuarios:', error);
      }

    };

    fetchUsers();
  }, []);

  // Convertir mes con nombre a número (ej. "Mayo 2025" → 4 y 2025)
const [nombreMes, año] = selectedMonth.split(' ');
const mesNumero = new Date(`${nombreMes} 1, ${año}`).getMonth(); // 0 = enero

// Crear array de 0 a 23 horas
const horasDelDia = Array.from({ length: 24 }, (_, i) => i);

// Filtrar clases por mes y año seleccionados
const clasesFiltradas = clases.filter(clase => {
  const [añoClase, mesClase, _] = clase.date.split('-'); // "2025-05-19" → ["2025", "05", "19"]
  return (
    parseInt(añoClase) === parseInt(año) &&
    parseInt(mesClase) === mesNumero + 1
  );
});

// Agrupar clases por hora
const clasesPorHora = horasDelDia.map(hora => {
  const cantidad = clasesFiltradas.filter(clase => {
    const [horaClase] = clase.time.split(':'); // "10:00" → ["10"]
    return parseInt(horaClase) === hora;
  }).length;

  return {
    hora: `${hora.toString().padStart(2, '0')}:00`,
    cantidad
  };
});
    //.filter(p => p.cantidad > 0);

  useEffect(() => {
    if (!selectedMonth) return;

    // Filtrar usuarios por el mes seleccionado
    const filtered = users.filter(u => u.registeredMonth === selectedMonth);
    setFilteredUsers(filtered);

    // Contar por género
    const counts = { hombre: 0, mujer: 0, otro: 0 };
    filtered.forEach(user => {
      if (user.gender === 'hombre') counts.hombre++;
      else if (user.gender === 'mujer') counts.mujer++;
      else counts.otro++;
    });

    const genderFormattedData = [
      { name: 'Hombres', value: counts.hombre },
      { name: 'Mujeres', value: counts.mujer },
      { name: 'Otro', value: counts.otro },
    ];

    setGenderData(genderFormattedData);

    const roleCounts = { cliente: 0, instructor: 0, administrador: 0 };
    filtered.forEach(user => {
      const role = user.role?.toLowerCase();
      if (role === 'cliente') roleCounts.cliente++;
      else if (role === 'instructor') roleCounts.instructor++;
      else if (role === 'administrador') roleCounts.administrador++;
    });

const roleFormattedData = [
  { name: 'Clientes', value: roleCounts.cliente },
  { name: 'Instructores', value: roleCounts.instructor },
  { name: 'Administradores', value: roleCounts.administrador },
].filter(item => item.value > 0); // Opcional: quitar roles con 0

setRoleData(roleFormattedData);
  }, [selectedMonth, users]);

  return (
    <section className="min-h-screen bg-bgcolor/80 p-6 md:p-10 font-sans">
      <h1 className="text-4xl font-bold text-[#4b4b4b] mb-8">Reportes</h1>

      {/* ComboBox de meses */}
      <div className="mb-6">
        <label htmlFor="monthSelect" className="block text-lg text-gray-700 mb-2">
          Selecciona un mes:
        </label>
        <select
          id="monthSelect"
          value={selectedMonth}
          onChange={(e) => setSelectedMonth(e.target.value)}
          className="w-full max-w-xs border-2 border-fontdef/50 rounded-lg p-2 text-fontdef bg-barcolor cursor-pointer"
        >
          {availableMonths.map((month) => (
            <option key={month} value={month}>
              {month}
            </option>
          ))}
        </select>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
{/* Gráfica de pagos por hora */}
<div className="bg-white rounded-2xl shadow-lg p-4 flex flex-col items-center">
      <h2 className="text-xl font-semibold mb-4">Alumnos por hora del día</h2>

      {/* Combo para seleccionar mes */}

      <div className="w-full h-80 bg-white p-4 rounded shadow">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={clasesPorHora}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="hora" />
            <YAxis allowDecimals={false} />
            <Tooltip />
            <Bar dataKey="cantidad" fill="#82ca9d" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 my-6">
  <div className="bg-white shadow-md rounded-lg p-4 text-center hover:transform hover:scale-105 transition-all duration-300">
    <h3 className="text-xl font-semibold">Usuarios registrados</h3>
    <p className="text-3xl">{resumen.totalUsuarios}</p>
  </div>

  <div className="bg-white shadow-md rounded-lg p-4 text-center hover:transform hover:scale-105 transition-all duration-300">
    <h3 className="text-xl font-semibold">Total de clientes</h3>
    <p className="text-3xl">{resumen.totalAlumnos}</p>
  </div>

  <div className="bg-white shadow-md rounded-lg p-4 text-center hover:transform hover:scale-105 transition-all duration-300">
    <h3 className="text-xl font-semibold">Clases este mes</h3>
    <p className="text-3xl">{resumen.totalClasesMes}</p>
  </div>

  <div className="bg-blue-100 shadow-md rounded-lg p-4 text-center hover:transform hover:scale-105 transition-all duration-300">
    <h3 className="text-xl font-semibold">Total de Hombres</h3>
    <p className="text-3xl">{resumen.totalHombres}</p>
  </div>

  <div className="bg-pink-100 shadow-md rounded-lg p-4 text-center hover:transform hover:scale-105 transition-all duration-300">
    <h3 className="text-xl font-semibold">Total de Mujeres</h3>
    <p className="text-3xl">{resumen.totalMujeres}</p>
  </div>

  <div className="bg-gray-200 shadow-md rounded-lg p-4 text-center hover:transform hover:scale-105 transition-all duration-300">
    <h3 className="text-xl font-semibold">Total Otros</h3>
    <p className="text-3xl">{resumen.totalOtro}</p>
  </div>
</div>

      {/* Gráfica de género */}
      <div className="bg-white rounded-2xl shadow-lg p-4 flex flex-col items-center">
        <h3 className="text-xl font-semibold text-gray-700 mb-4">
          Distribución por género en {selectedMonth}
        </h3>
        {filteredUsers.length === 0 ? (
          <p className="text-gray-500">No hay usuarios registrados este mes.</p>
        ) : (
          <div className="w-full h-64">
            <ResponsiveContainer>
              <PieChart>
                <Pie
                  data={genderData.filter(item => item.value > 0)}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={renderCustomizedLabel}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {genderData
                  .filter(item => item.value > 0)
                  .map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        )}
      </div>

    {/* Gráfica de roles */}
  <div className="bg-white rounded-2xl shadow-lg p-4 flex flex-col items-center">
  <h3 className="text-xl font-semibold text-gray-700 mb-4">Distribución por Rol</h3>
  <div className="w-full h-64">
    <ResponsiveContainer>
      <PieChart>
        <Pie
          data={roleData}
          cx="50%"
          cy="50%"
          labelLine={false}
          label={renderCustomizedLabel}
          outerRadius={80}
          fill="#8884d8"
          dataKey="value"
        >
          {roleData.map((entry, index) => (
            <Cell
              key={`cell-role-${index}`}
              fill={ROLE_COLORS[index % ROLE_COLORS.length]}
            />
          ))}
        </Pie>
        <Tooltip />
      </PieChart>
    </ResponsiveContainer>
  </div>
</div>
</div>
    </section>
  );
}
