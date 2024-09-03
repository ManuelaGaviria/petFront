function Select({titulo, opciones, eventoCambio}) {
    return (
      <div className="malla">
        <div className="columnaIzquierda">
            <label className="label">{titulo}</label>
        </div>
        <div className="columnaDerecha">
            <select className="select" onChange={eventoCambio}>
                <option className="opcion">Seleccione uno</option>
                {opciones.map((item) => (
                    <option value={item.nombre} key={item.id}>{item.nombre}</option>
                ))}
            </select>
        </div>
          
      </div>
    )
  }
  
  const vacio = () => {} 
  
  Select.defaultProps={
      titulo:"example",
      opciones:[
          {nombre: "example1", id: 0},
          {nombre: "example2", id: 1},
          {nombre: "example3", id: 2}
      ],
      eventoCambio:vacio
  }
  
  export default Select