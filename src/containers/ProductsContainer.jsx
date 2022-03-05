import { useEffect, useState, useContext, createContext } from "react"; //NUEVO
import { useParams } from "react-router";
import CardComponent from "../component/CardComponent";
import InfoBar from "../component/InfoBar";
import { EcommerceContext } from "../context/EcommerceContext";


//Componentes de Contenedores que tienen como propósito encapsular a otros componentes y proporcionarles las propiedades que necesitan.
//Además se encargan de modificar el estado de la aplicación para que el usuario vea el cambio en los datos (por eso son también 
//llamados state components).La lógica debe estar en Container.
const ProductsContainer = () => {

  //Para poder consumir los datos del proveedor hay que usar el Hook useContext
  const { productsML, fetchData, carrito, setCarrito, cambia, setCambia } = useContext(EcommerceContext);
  
  //useParams utilizado para crear rutas dinámicas. Recibe del archivo App.jsx el parámetros búsqueda
  const { busqueda } = useParams();


  const [sumarC, setSumarC] = useState([0]);
  const [total, setTotal] = useState([0]);
  const [searchTerm, setSearchTerm] = useState();


  useEffect(() => {
    //este hook se va a ejecutar antes que los componentes se creen como por ejemplo CardComponent o InfoBar.
    //La información que se encuentra aquí se puede mostrar antes que cualquier vista.
    //Podemos utilizar el Hook de useEffect para poder controlar y saber que ciclo de vida tiene nuestro componente.
    fetchData(busqueda);
    return () => {
      console.log("Se esta por morir el comente");
    };
  }, [busqueda]); //[] es el segundo parámetro de useEffect conocido como filtro que sirve para actualizar el useEffect cada vez que
  //este cambie su valor. Si por ejemplo cada vez que actualize un prop su estado se va a volver a renderizar,
  //también puede ser un componente o un componente padre que cambie su estado. También sirve para cortar posibles bucles
  //infinitos producidos al usar la función de useState


  const AgregarCarrito = (event, name) => {  //se pasó a arrow functions porque necesitamos que sea ES6
    carrito.push(name);
    setCarrito([...carrito]); //...operators: la sintaxis de spread operator permite que los elementos de un array se 
    //expandan y de esta manera podemos añadir un array dentro de otro sin que el resultado sean arrays anidados,
    //sino un único array al que se han añadido nuevos valores.
  }
  

  function SumarCarrito(event, valor) {
    sumarC.push(valor);
    setSumarC([...sumarC]);
    //https://developer.mozilla.org/es/docs/Web/JavaScript/Reference/Global_Objects/Array/Reduce
    //El método reduce() ejecuta una función reductora sobre cada elemento de un array, devolviendo como resultado un único valor.
    //La función reductora recibe cuatro argumentos: 1-Acumulador (acc), 2-Valor Actual (cur), 3-Índice Actual (idx), 
    //4-Array (src). El valor devuelto de la función reductora se asigna al acumulador, cuyo valor se recuerda en cada 
    //iteración de la matriz y, en última instancia, se convierte en el valor final, único y resultante.
    const suma = sumarC.reduce((acumulador, numero) => {
      return acumulador + numero;
    });
    setTotal([suma]);
  }


  const handleKeyUp = (e) => {
    setSearchTerm(e.target.value); //sirve para resguardar el valor que se ingresó.
    //console.log(e.target.value); //acá se ve el ingreso actual
    //console.log(searchTerm); //acá se ve el ingreso anterior al actual

    const productsFilter = productsML.filter((element) => {
      //element son todos los vlores de productsML

      if (element.title.toUpperCase().match(e.target.value.toUpperCase())) {
        //todo lo que retorna true hace matching entre los objetos de productsML y el evento e, mientras que para los que retorna false del matching
        //devuelve false. Para los productos que devolvió true los filtra obteniendo solamente los objetos de productsML como productsFilter
        return true;
      }
      return false;
    }); //filtramos el listado de productos para lo cual se utiliza filter y luego .match para comprobar si un término es igual a otro.
    setCambia(productsFilter);
  };


    return (
      <div className="App row container bg-warning">
        <div className="bg-info">
          <InfoBar //Esto envía/exporta como props a InfoBar. Y nuevamente vuelve para ser exportado a App.jsx dentro de ProductsContainer
            cantidad={carrito.length}
            totalCompra={total}
            handleKeyUp={handleKeyUp}
          />
        </div>
        {/* si quiero utilizar código JS debo hacerlo entre llaves {} */}
        {cambia.map((element, index) => { //CAMBIO
          //componente consumidor de children del proveedor EcommerceContext, todo lo que viene desde la API de Mercado Libre
          //Esta línea me permite dar el formato a los números que viene de la API de Mercado Libre https://stackabuse.com/how-to-format-number-as-currency-string-in-javascript/
          let dollarUSLocale = Intl.NumberFormat("en-US", {
            style: "currency",
            currency: `${element.prices.prices[0].currency_id}`,
          });
          return (
            <span className="card col-4" key={index}>
              {/*Sin el span y la key me devuelve un error por consola */}
              <CardComponent //Esto envía/exporta como props a CardComponent. Y nuevamente vuelve para ser exportado a App.jsx.
                //Todo lo que se escriben aquí son props. Y cada element.key obtiene el valor de objeto guardado en products
                title={element.id}
                product={element.title}
                precio={dollarUSLocale.format(element.price)}
                precioA={element.price}
                img={element.thumbnail}
                permalink={element.permalink}
                AgregarCarrito={AgregarCarrito}
                SumarCarrito={SumarCarrito}
              />
            </span>
          );
        })}
      </div>
    );
  };



export default ProductsContainer;