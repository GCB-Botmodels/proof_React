import { Link } from "react-router-dom";
import { useState } from "react";

const InfoBar = ({ cantidad, totalCompra, children, handleKeyUp }) => {
  
  
  return (
    <div className="bg-white py-4">
      <div> {/* El input se lo puse dentro de un div para que quede separado y colapce por el space lock quedando uno debajo de otro*/}
        {/* Con el onInput se va a capturar con la función handleKeyUp cada caracter que ingrese por el input*/}
        <input type="text" onInput={handleKeyUp} placeholder="Buscar por nombre" />
      </div>
      <Link to={"/productos"}>Ir a la Home</Link>
      <br />
      <h2 className="card-title">
        Cantidad Productos: {cantidad} Carrito Acumulado: $
        {parseFloat(totalCompra)}
      </h2>
      {children}
    </div>
  );
};

export default InfoBar;
