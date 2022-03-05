//Este componente es el principal o nativo donde se colocan los Componentes Contenedores que se van a mostrar en base lo definido
//en los Componentes de Presentación

//In react-router-dom v6, "Switch" is replaced by routes "Routes". You need to update the import from
//https://stackoverflow.com/questions/63124161/attempted-import-error-switch-is-not-exported-from-react-router-dom
//import { BrowserRouter, Switch, Route } from "react-router-dom"; deprecate
import { BrowserRouter, Routes ,Route } from 'react-router-dom';
import './App.css';
import HomeContainer from "./containers/HomeContainer";
import ProductsContainer from './containers/ProductsContainer';
import 'bootstrap/dist/css/bootstrap.min.css';
import { EcommerceProvider } from './context/EcommerceContext';



function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <EcommerceProvider>
          <Routes>
            {/*<Route path="/" component={Home} /> CAMBIA A <Route path='/welcome' element={<Home/>} /> */}
            <Route exact path="/productos" element={<ProductsContainer />} /> {/* Debe ser exact (ruta exacta) para que no considere todo lo que se escribe como path luego de /productos*/}
            {/* ProductsContainer es un children que también viene por EcommerceProvider según el disertante */}
            <Route exact path="/carrito" element={<HomeContainer />} />
            {/* búsqueda va a tomar cualquier valor que coloquemos luego de la barra de la siguiente url localhost/productos/... */}
            <Route path="/productos/:busqueda" element={<ProductsContainer />} /> 
          </Routes>
        </EcommerceProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
