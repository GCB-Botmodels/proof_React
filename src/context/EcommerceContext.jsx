import { createContext, useState } from "react";

export const EcommerceContext = createContext(); //Se crea el contexto y se lo exporta

export const EcommerceProvider = ({ children }) => {
  //Creamos el componente que se va a encargar del proveedor del Context creado y se lo exporta
  //Todos los componentes que pasemos en EcommerceProvider cuando lo llamemos se van a poner
  // dentro de <EcommerceContext.Provider> y se va a poder consumir todos los estados de
  //EcommerceProvider

  const [productsML, setProductsML] = useState([]);
  const [carrito, setCarrito] = useState([]);

  const [cambia, setCambia] = useState(productsML); //AGREGO

  async function fetchData(searchQuery) {
    const data = await fetch(
      `https://api.mercadolibre.com/sites/MLA/search?q=${searchQuery}`
    ); //https://api.mercadolibre.com/sites/MLA/search#options https://developers.mercadolibre.com.ar/es_ar/
    const response = await data.json();
    setProductsML(response.results); //esto actualiza todos los objetos devueltos por la API. Mediante response.results
    //puedo acceder a los atributos de cada objeto.
  }

  return (
    //Todos los consumidores/children pueden consumir el estado de productsML siempre que se le pase al proveedor como un value
    //En value le damos todos los elementos al proveedor que va a enviar a los children
    <EcommerceContext.Provider
      value={{
        productsML,
        fetchData,
        carrito,
        setCarrito,
        cambia,
        setCambia
      }}
    >
      {/* Va a retornar el componente proveedor de contexto */}
      {children}
      {/* componentes hijos que van a ser consumidores del proveedor */}
    </EcommerceContext.Provider>
  );
};;
