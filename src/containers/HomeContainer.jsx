import { useContext, useEffect } from "react";
import { EcommerceContext } from "../context/EcommerceContext";

//CUANDO AGREGO UN PRODUCTO AL CARRITO SE DEBERÍA ACTUALIZAR carrito EN ESTE Container y visualizarse en localhost:3000/carrito
const HomeContainer = () => { const { carrito } = useContext(EcommerceContext);
    return <h1> Hola!! Tenés {carrito} productos en tu carrito </h1>;
}

export default HomeContainer;
