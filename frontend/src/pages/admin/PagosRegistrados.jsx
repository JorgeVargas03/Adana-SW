

const PagosRegistrados = () =>{
  const [search, setSearch] = useState("");
  const [roleFilter, setRoleFilter] = useState("Todos");
  const [genderFilter, setGenderFilter] = useState("Todos");
  const [selectedUser, setSelectedUser] = useState(null);
  const [users, setUsers] = useState([]);

  const panelRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (panelRef.current && !panelRef.current.contains(event.target)) {
        setSelectedUser(null);
      }
    }

    if (selectedUser) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [selectedUser]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get(`${API_URL}/adana-api/v1/users`);
        const data = response.data;

        const formattedUsers = data.map(user => ({
          id: user.id,
          name: `${user.name} ${user.lastname}`,
          email: user.email,
          role: user.role,
          status: user.status,
          profile_picture: user.profile_picture,
          phone: user.phone,
          gender: user.gender,
        }));

        setUsers(formattedUsers);
      } catch (error) {
        console.error("Error al cargar usuarios:", error);
      }
    };

    fetchUsers();
  }, []);

  const filteredUsers = users.filter(user => {
    const matchesName = user.name.toLowerCase().includes(search.toLowerCase());
    const matchesRole = roleFilter === "Todos" || user.role.toLowerCase() === roleFilter.toLowerCase();
    const matchesGender = genderFilter === "Todos" || user.gender?.toLowerCase() === genderFilter.toLowerCase();
    return matchesName && matchesRole && matchesGender;
  });

  return (
    <section className="bg-bgcolor min-h-screen">
      <div className="p-6 flex relative bg-bgcolor">
        <div className="flex-1 font-Outfit">
          <div className="mb-30" />
          <div className="flex items-center mb-10 gap-4 flex-wrap">
            <h1 className="text-2xl font-semibold text-fontdef">Pagos Registrados</h1>

            <select
              value={roleFilter}
              onChange={(e) => setRoleFilter(e.target.value)}
              className="border-2 border-fontdef/50 rounded-lg p-2 text-fontdef bg-barcolor cursor-pointer"
            >
              <option value="Todos">Todos los roles</option>
              <option value="administrador">Administrador</option>
              <option value="instructor">Instructor</option>
              <option value="cliente">Cliente</option>
            </select>

          </div>

          <ul role="list" className="divide-y divide-gray-100 bg-barcolor px-6 rounded-2xl">
            {filteredUsers.map((usuario) => (
              <li
                key={usuario.email}
                onClick={() => setSelectedUser(usuario)}
                className="flex justify-between gap-x-6 py-5 cursor-pointer hover:bg-gray-100 rounded-xl transition"
              >
                <div className="flex min-w-0 gap-x-4">
                  <img
                    alt=""
                    src={usuario.profile_picture || iconDefault}
                    className="size-12 flex-none rounded-full bg-gray-50"
                  />
                  <div className="min-w-0 flex-auto">
                    <p className="text-sm/6 font-semibold text-gray-900">{usuario.name}</p>
                    <p className="mt-1 truncate text-xs/5 text-gray-500">{usuario.email}</p>
                  </div>
                </div>
                <div className="hidden shrink-0 sm:flex sm:flex-col sm:items-end">
                  <p className="text-sm/6 text-gray-900 capitalize">{usuario.role}</p>
                  <p className="mt-1 text-xs/5 text-gray-500 uppercase">{usuario.status}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>


      </div>
    </section>
  );
}

export default PagosRegistrados;