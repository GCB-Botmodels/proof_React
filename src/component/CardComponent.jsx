//Esto es un componente de presentación que se encarga de mostrar datos que le mandan los contenedores

//Componentes de Presentanción: se limitan a mostrar datos y tienen poca o nula lógica asociada a manipulación
// del estado (stateless components).

const CardComponent = ({img, permalink, title, product, AgregarCarrito, SumarCarrito, precioA, precio}) => { 
//entre las llaves de esta línea están los props que se importan de ProductsContainer.jsx
//Son un patrón para compartir información entre un componente padre y un componente hijo, donde el componente padre setea atributos
// y los envía al componente hijo como un objeto. Es importante saber que esto trabaja de manera unilateral, es decir, que la 
//información solo se comparte desde el padre hacía el hijo y no al revés.

    return (
      <div>
        <img src={img} className="card-img-top" alt="Card cap" />
        <div className="card-body">
          <a
            href={permalink}
            target="_BLANK"
            className="card-title"
            style={{ color: "red" }}
          >
            {title}
          </a>
          <p className="card-text">{product}</p>
          <button
            className="btn btn-primary"
            onClick={(event) => {
              AgregarCarrito(event, title); //esto es un callback que le envía el event y title a la función AgregarCarrito que se 
                                            //encuentra definida en containers. La diferencia entre event y title, es que event es un
                                            //evento generado a partir de la interación del mouse con el tag button, mientras que 
                                            //title es un prop que está definido en el return de ProductsContainer.
              SumarCarrito(event, precioA);
            }}
          >
            {precio}
          </button>
        </div>
      </div>
    );
}

export default CardComponent;