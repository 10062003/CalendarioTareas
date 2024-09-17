import { useState } from "react";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const closeMenu = () => {
    setIsOpen(false);
  };

  return (
    <>
      {/* Barra de navegación */}
      <nav className="bg-red-600">
        <div className="mr-auto ontainer px-5 py-4 flex items-center">
          <button
            onClick={toggleMenu}
            className="text-white text-2xl focus:outline-none"
          >
            &#9776; {/* Icono del menú */}
          </button>
          <div className="ml-auto text-white font-bold">Documentación</div>
        </div>
      </nav>

      {/* Fondo oscuro detrás del menú */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-[900]"
          onClick={closeMenu}
        ></div>
      )}

      {/* Menú lateral */}
      <div
        className={`fixed top-0 left-0 w-64 h-full bg-red-700 p-4 transition-transform duration-300 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } z-[1000]`}
      >
        <ul className="space-y-4 text-white">
          <li onClick={closeMenu}>Opción 1</li>
          <li onClick={closeMenu}>Opción 2</li>
          <li onClick={closeMenu}>Opción 3</li>
        </ul>
      </div>
    </>
  );
};

export default Navbar;
