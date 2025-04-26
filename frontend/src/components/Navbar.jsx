import React from 'react';
import { NavLink } from 'react-router-dom';
import logo from '../assets/images/icon.png';
import { Disclosure } from '@headlessui/react';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';
import { useState, useEffect } from 'react';

const navigation = [
  { name: 'RESERVA', to: '/reservation' },
  { name: 'CONÓCENOS', to: '/' },
  { name: 'INSTRUCTORES', to: '/instructors' },
  { name: 'BIENESTAR', to: '/wellness' },
  { name: 'FAQs', to: '/faq' },
  { name: 'INGRESAR', to: '/signin' },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <Disclosure as="nav" className={`fixed top-0 left-0 w-full z-50 transition-colors duration-400 ${isScrolled ? 'bg-barcolor backdrop-blur-sm' : 'bg-transparent bg-gradient-to-b from-black/80 to-black/0'}`}>
      {({ open }) => (
        <>
          <div className="relative flex h-24 items-center justify-between px-10">
            {/* Mobile menu button */}
            <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
              <Disclosure.Button className={`inline-flex items-center justify-center rounded-md p-2 ${
                isScrolled 
                  ? 'text-gray-600 hover:bg-gray-100' 
                  : 'text-white hover:bg-white/20'
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
                <span className={`font-Outfit font-bold text-3xl ml-2 transition-colors duration-300 ${isScrolled ? 'text-fontdef' : 'text-barcolor'}`}>
                  Adana Pilates Studio
                </span>
              </div>
            </div>

            {/* Nav Links */}
            <div className="flex items-center gap-4">
              <div className="hidden sm:ml-10 sm:flex sm:gap-2">
                {navigation.map((item) => (
                  <NavLink
                    key={item.name}
                    to={item.to}
                    end={item.to === '/'}
                    className={({ isActive }) =>
                      classNames(
                        isActive
                          ? isScrolled
                            ? 'text-fontdef after:scale-x-100' 
                            : 'text-white after:scale-x-100'
                          : isScrolled
                            ? 'text-fontdef hover:text-fontdef/90' 
                            : 'text-white hover:text-white/90',
                        'relative px-3 py-2 text-sm font-medium transition-all duration-300',
                        'after:absolute after:bottom-0 after:left-0 after:w-full after:h-px',
                        'after:bg-current after:transition-transform after:duration-300',
                        'after:scale-x-0 hover:after:scale-x-100'
                      )
                    }
                  >
                    {item.name}
                  </NavLink>
                ))}
              </div>
            </div>
          </div>

          {/* Mobile Menu */}
          <Disclosure.Panel className="sm:hidden">
            <div className={`px-2 pb-3 pt-2 ${isScrolled ? 'bg-white' : 'bg-black/90'}`}>
              {navigation.map((item) => (
                <NavLink
                  key={item.name}
                  to={item.to}
                  end={item.to === '/'}
                  className={({ isActive }) =>
                    classNames(
                      isActive
                        ? 'bg-accent1 text-white'
                        : isScrolled 
                          ? 'text-gray-900 hover:bg-gray-100' 
                          : 'text-white hover:bg-white/20',
                      'block rounded-md px-3 py-2 text-base font-medium'
                    )
                  }
                >
                  {item.name}
                </NavLink>
              ))}
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  );
}