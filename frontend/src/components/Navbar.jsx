import React, { useState, useEffect, useRef } from 'react';
import { isTokenValid, removeToken } from '../utils/auth';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import logo from '../assets/images/icon.png';
import { Disclosure } from '@headlessui/react';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';
import { toast } from 'react-toastify';

const baseNavigation = [
  { name: 'RESERVA', to: '/reservation' },
  { name: 'CONÓCENOS', to: '/' },
  { name: 'INSTRUCTORES', to: '/instructors' },
  { name: 'BIENESTAR', to: '/wellness' },
  { name: 'FAQs', to: '/faq' },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [hasToken, setHasToken] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [profilePicture, setProfilePicture] = useState("");
  const [userRole, setUserRole] = useState(null);

  const location = useLocation();
  const navigate = useNavigate();
  const dropdownRef = useRef(null);

  const isTransparentRoute = ['/', '/instructors'].includes(location.pathname);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100);
    };
  
    const handleStorageChange = () => {
      validateToken();
  
      let userData = localStorage.getItem('user');
  
      if (!userData) {
        setProfilePicture(null);
        return;
      }
  
      try {
        const user = JSON.parse(userData);
        if (user && user.profile_picture) {
          setProfilePicture(user.profile_picture);
        } else {
          setProfilePicture(null);
        }
        if (user && user.role) {
          setUserRole(user.role); // 👈 Aquí establecemos el rol
        } else {
          setUserRole(null);
        }
      } catch (error) {
        console.error('Error al parsear los datos del usuario:', error);
        setProfilePicture(null);
      }
    };
  
    window.addEventListener('scroll', handleScroll);
    window.addEventListener('storage', handleStorageChange); // para otras pestañas
    window.addEventListener('profilePictureUpdated', handleStorageChange); // para esta pestaña
  
    validateToken();
    handleStorageChange();
  
    document.addEventListener('mousedown', handleClickOutside);
  
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('profilePictureUpdated', handleStorageChange);
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);
  


  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setDropdownOpen(false);
    }
  };

  const handleSignOut = () => {
    toast.info("Sesion cerrada con éxito, hasta luego!");
    removeToken();
    localStorage.removeItem('user');
    console.log("Token eliminado");
    setHasToken(false);
    setDropdownOpen(false);
    setUserRole(null);
    navigate('/signin');
  };

  const validateToken = () => {
    setHasToken(isTokenValid());
    if (isTokenValid() == false){
      setUserRole(null);
    }
  };

  const getNavigation = () => [...baseNavigation];

  const toProfile = () => {
    navigate('/myprofile');
  }

  console.log(userRole)
  
  //Return para instructores
  if(userRole === 'instructor'){
    return(
      <Disclosure as="nav" className={`fixed top-0 left-0 w-full z-50 transition-colors duration-400 ${(isTransparentRoute && !isScrolled)
        ? 'bg-transparent bg-gradient-to-b from-black/80 to-black/0'
        : 'bg-barcolor backdrop-blur-sm'
        }`}>
        {({ open }) => (
          <>
            <div className="relative flex h-24 items-center justify-between px-10">
              {/* Mobile menu button */}
              <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                <Disclosure.Button className={`inline-flex items-center justify-center rounded-md p-2 ${(isTransparentRoute && !isScrolled)
                  ? 'text-white hover:bg-white/20'
                  : 'text-gray-600 hover:bg-gray-100'
                  }`}>
                  <span className="sr-only">Open main menu</span>
                  {open ? (
                    <XMarkIcon className="h-6 w-6" />
                  ) : (
                    <Bars3Icon className="h-6 w-6" />
                  )}
                </Disclosure.Button>
              </div>
  
              {/* Logo */}
              <div className="flex flex-1 items-center sm:items-stretch justify-start">
                <div className="flex shrink-0 items-center justify-start">
                  <img src={logo} alt="Adana Logo" className="h-8 w-auto" />
                  <span className={`font-Outfit font-bold text-3xl ml-2 transition-colors duration-300 ${(isTransparentRoute && !isScrolled)
                    ? 'text-barcolor'
                    : 'text-fontdef'
                    }`}>
                    Adana Pilates Estudio - Instructor
                  </span>
                </div>
              </div>

              <div className="relative ml-3" ref={dropdownRef}>
                    <div>
                      <button
                        type="button"
                        onClick={() => setDropdownOpen(!dropdownOpen)}
                        className={`relative flex rounded-full text-sm focus:ring-2 focus:ring-offset-2 focus:outline-none cursor-pointer ${(isTransparentRoute && !isScrolled)
                          ? 'focus:ring-white focus:ring-offset-gray-800'
                          : 'focus:ring-gray-800 focus:ring-offset-gray-100'
                          }`}
                        id="user-menu-button"
                        aria-expanded="false"
                        aria-haspopup="true"
                      >

                        <span className="absolute -inset-1.5"></span>
                        <span className="sr-only">Open user menu</span>
                        <img
                          className="size-8 rounded-full cursor-pointer"
                          src={profilePicture || logo}
                          alt="User profile"
                        />
                      </button>
                    </div>

                    {/* Dropdown */}
                    {dropdownOpen && (
                      <div
                        onMouseLeave={() => setDropdownOpen(false)}
                        className="font-Outfit absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-barcolor py-1 shadow-lg ring-1 ring-black/5 transform transition ease-out duration-200 scale-95 opacity-0 animate-fadeIn"
                        role="menu"
                        aria-orientation="vertical"
                        aria-labelledby="user-menu-button"
                        tabIndex="-1"
                      >
                        <a
                          onClick={toProfile}
                          className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer"
                          role="menuitem"
                          tabIndex="-1"
                        >
                          Tu Perfil
                        </a>

                        <button
                          onClick={handleSignOut}
                          className="w-full text-left block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer"
                          role="menuitem"
                          tabIndex="-1"
                        >
                          Cerrar sesión
                        </button>
                      </div>
                    )}
                  </div>
              </div>
              </>
              )}
    </Disclosure>
    );
  }
  //Return para administradores
  if(userRole === 'administrador'){
    return(
      <Disclosure as="nav" className={`fixed top-0 left-0 w-full z-50 transition-colors duration-400 ${(isTransparentRoute && !isScrolled)
        ? 'bg-transparent bg-gradient-to-b from-black/80 to-black/0'
        : 'bg-barcolor backdrop-blur-sm'
        }`}>
        {({ open }) => (
          <>
            <div className="relative flex h-24 items-center justify-between px-10">
              {/* Mobile menu button */}
              <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                <Disclosure.Button className={`inline-flex items-center justify-center rounded-md p-2 ${(isTransparentRoute && !isScrolled)
                  ? 'text-white hover:bg-white/20'
                  : 'text-gray-600 hover:bg-gray-100'
                  }`}>
                  <span className="sr-only">Open main menu</span>
                  {open ? (
                    <XMarkIcon className="h-6 w-6" />
                  ) : (
                    <Bars3Icon className="h-6 w-6" />
                  )}
                </Disclosure.Button>
              </div>
  
              {/* Logo */}
              <div className="flex flex-1 items-center sm:items-stretch justify-start">
                <div className="flex shrink-0 items-center justify-start">
                  <img src={logo} alt="Adana Logo" className="h-8 w-auto" />
                  <span className={`font-Outfit font-bold text-3xl ml-2 transition-colors duration-300 ${(isTransparentRoute && !isScrolled)
                    ? 'text-barcolor'
                    : 'text-fontdef'
                    }`}>
                    Adana Pilates Estudio - Administrador
                  </span>
                </div>
              </div>

              <div className="relative ml-3" ref={dropdownRef}>
                    <div>
                      <button
                        type="button"
                        onClick={() => setDropdownOpen(!dropdownOpen)}
                        className={`relative flex rounded-full text-sm focus:ring-2 focus:ring-offset-2 focus:outline-none cursor-pointer ${(isTransparentRoute && !isScrolled)
                          ? 'focus:ring-white focus:ring-offset-gray-800'
                          : 'focus:ring-gray-800 focus:ring-offset-gray-100'
                          }`}
                        id="user-menu-button"
                        aria-expanded="false"
                        aria-haspopup="true"
                      >

                        <span className="absolute -inset-1.5"></span>
                        <span className="sr-only">Open user menu</span>
                        <img
                          className="size-8 rounded-full cursor-pointer"
                          src={profilePicture || logo}
                          alt="User profile"
                        />
                      </button>
                    </div>

                    {/* Dropdown */}
                    {dropdownOpen && (
                      <div
                        onMouseLeave={() => setDropdownOpen(false)}
                        className="font-Outfit absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-barcolor py-1 shadow-lg ring-1 ring-black/5 transform transition ease-out duration-200 scale-95 opacity-0 animate-fadeIn"
                        role="menu"
                        aria-orientation="vertical"
                        aria-labelledby="user-menu-button"
                        tabIndex="-1"
                      >
                        <a
                          onClick={toProfile}
                          className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer"
                          role="menuitem"
                          tabIndex="-1"
                        >
                          Tu Perfil
                        </a>

                        <button
                          onClick={handleSignOut}
                          className="w-full text-left block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer"
                          role="menuitem"
                          tabIndex="-1"
                        >
                          Cerrar sesión
                        </button>
                      </div>
                    )}
                  </div>
              </div>
              </>
              )}
    </Disclosure>
    );
  }
  //Return por defecto para Clientes
  return (
    <Disclosure as="nav" className={`fixed top-0 left-0 w-full z-50 transition-colors duration-400 ${(isTransparentRoute && !isScrolled)
      ? 'bg-transparent bg-gradient-to-b from-black/80 to-black/0'
      : 'bg-barcolor backdrop-blur-sm'
      }`}>
      {({ open }) => (
        <>
          <div className="relative flex h-24 items-center justify-between px-10">
            {/* Mobile menu button */}
            <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
              <Disclosure.Button className={`inline-flex items-center justify-center rounded-md p-2 ${(isTransparentRoute && !isScrolled)
                ? 'text-white hover:bg-white/20'
                : 'text-gray-600 hover:bg-gray-100'
                }`}>
                <span className="sr-only">Open main menu</span>
                {open ? (
                  <XMarkIcon className="h-6 w-6" />
                ) : (
                  <Bars3Icon className="h-6 w-6" />
                )}
              </Disclosure.Button>
            </div>

            {/* Logo */}
            <div className="flex flex-1 items-center sm:items-stretch justify-start">
              <div className="flex shrink-0 items-center justify-start">
                <img src={logo} alt="Adana Logo" className="h-8 w-auto" />
                <span className={`font-Outfit font-bold text-3xl ml-2 transition-colors duration-300 ${(isTransparentRoute && !isScrolled)
                  ? 'text-barcolor'
                  : 'text-fontdef'
                  }`}>
                  Adana Pilates Estudio
                </span>
              </div>
            </div>

            {/* Nav Links */}
            <div className="flex items-center gap-4">
              <div className="hidden sm:ml-10 sm:flex sm:gap-2">
                {getNavigation().map((item) => (
                  <NavLink
                    key={item.name}
                    to={item.to}
                    end={item.to === '/'}
                    className={({ isActive }) =>
                      classNames(
                        isActive
                          ? 'after:scale-x-100'
                          : 'after:scale-x-0 hover:after:scale-x-100',
                        (isTransparentRoute && !isScrolled)
                          ? isActive
                            ? 'text-white'
                            : 'text-white hover:text-white/90'
                          : isActive
                            ? 'text-fontdef'
                            : 'text-fontdef hover:text-fontdef/90',
                        'relative px-3 py-2 text-sm font-medium transition-all duration-300',
                        'after:absolute after:bottom-0 after:left-0 after:w-full after:h-px',
                        'after:bg-current after:transition-transform after:duration-300'
                      )
                    }
                  >
                    {item.name}
                  </NavLink>
                ))}

                {/* Avatar or Login */}
                {hasToken ? (
                  <div className="relative ml-3" ref={dropdownRef}>
                    <div>
                      <button
                        type="button"
                        onClick={() => setDropdownOpen(!dropdownOpen)}
                        className={`relative flex rounded-full text-sm focus:ring-2 focus:ring-offset-2 focus:outline-none cursor-pointer ${(isTransparentRoute && !isScrolled)
                          ? 'focus:ring-white focus:ring-offset-gray-800'
                          : 'focus:ring-gray-800 focus:ring-offset-gray-100'
                          }`}
                        id="user-menu-button"
                        aria-expanded="false"
                        aria-haspopup="true"
                      >

                        <span className="absolute -inset-1.5"></span>
                        <span className="sr-only">Open user menu</span>
                        <img
                          className="size-8 rounded-full cursor-pointer"
                          src={profilePicture || logo}
                          alt="User profile"
                        />
                      </button>
                    </div>

                    {/* Dropdown */}
                    {dropdownOpen && (
                      <div
                        onMouseLeave={() => setDropdownOpen(false)}
                        className="font-Outfit absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-barcolor py-1 shadow-lg ring-1 ring-black/5 transform transition ease-out duration-200 scale-95 opacity-0 animate-fadeIn"
                        role="menu"
                        aria-orientation="vertical"
                        aria-labelledby="user-menu-button"
                        tabIndex="-1"
                      >
                        <a
                          onClick={toProfile}
                          className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer"
                          role="menuitem"
                          tabIndex="-1"
                        >
                          Tu Perfil
                        </a>

                        <button
                          onClick={handleSignOut}
                          className="w-full text-left block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer"
                          role="menuitem"
                          tabIndex="-1"
                        >
                          Cerrar sesión
                        </button>
                      </div>
                    )}
                  </div>
                ) : (
                  <NavLink
                    to="/signin"
                    className={({ isActive }) =>
                      classNames(
                        isActive
                          ? 'after:scale-x-100'
                          : 'after:scale-x-0 hover:after:scale-x-100',
                        (isTransparentRoute && !isScrolled)
                          ? isActive
                            ? 'text-white'
                            : 'text-white hover:text-white/90'
                          : isActive
                            ? 'text-fontdef'
                            : 'text-fontdef hover:text-fontdef/90',
                        'relative px-3 py-2 text-sm font-medium transition-all duration-300',
                        'after:absolute after:bottom-0 after:left-0 after:w-full after:h-px',
                        'after:bg-current after:transition-transform after:duration-300'
                      )
                    }
                  >
                    INGRESAR
                  </NavLink>
                )}
              </div>
            </div>
          </div>

          {/* Mobile Menu */}
          <Disclosure.Panel className="sm:hidden">
            <div className={`px-2 pb-3 pt-2 ${(isTransparentRoute && !isScrolled)
              ? 'bg-black/90'
              : 'bg-white'
              }`}>
              {getNavigation().map((item) => (
                <NavLink
                  key={item.name}
                  to={item.to}
                  end={item.to === '/'}
                  className={({ isActive }) =>
                    classNames(
                      isActive
                        ? 'bg-accent1 text-white'
                        : (isTransparentRoute && !isScrolled)
                          ? 'text-white hover:bg-white/20'
                          : 'text-gray-900 hover:bg-gray-100',
                      'block rounded-md px-3 py-2 text-base font-medium'
                    )
                  }
                >
                  {item.name}
                </NavLink>
              ))}
              {hasToken ? (
                <div className="px-3 py-2 flex items-center">
                  <img
                    className="size-8 rounded-full mr-3"
                    src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                    alt="User profile"
                  />
                  <span className="text-base font-medium">Mi Perfil</span>
                </div>
              ) : (
                <NavLink
                  to="/signin"
                  className={({ isActive }) =>
                    classNames(
                      isActive
                        ? 'bg-accent1 text-white'
                        : (isTransparentRoute && !isScrolled)
                          ? 'text-white hover:bg-white/20'
                          : 'text-gray-900 hover:bg-gray-100',
                      'block rounded-md px-3 py-2 text-base font-medium'
                    )
                  }
                >
                  INGRESAR
                </NavLink>
              )}
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  );
}
