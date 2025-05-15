import React from 'react'
import { Button } from '@progress/kendo-react-buttons';
import { Zoom } from '@progress/kendo-react-animation';


const Mision = () => {

  const [index, setIndex] = React.useState(0);
  const links = ['Cuando te juegas algo importante, no estás tranquilo. Sabes que un paso en falso puede salir caro.', 'En Emindset Law te entendemos. Sabemos lo que se siente. Por eso llegamos con soluciones antes de que aparezca el problema. Porque el peor conflicto es el que se podría haber evitado.', 'Y más vale un buen acuerdo que mil batallas. Porque tú no estás para perder ninguna.', 'No apagamos fuegos, los evitamos. Prevenir, ayudar y proteger: ese es nuestro verdadero oficio. Te cuidamos como si tu negocio fuera nuestro. Porque esto no va de leyes. Va de ti. Y de proteger lo que tanto te ha costado construir.'];

  const onClick = () => {
    setIndex((index + 1) % links.length);
  };

  return (
    <section className='flex flex-col justify-center items-center w-[90%] h-[60vh] mx-auto mt-11'>
      <div>
        <h2 className="text-4xl font-light mb-1 fade-in">Misión</h2>
      </div>
      <div className='overflow-hidden'>
        <div className='text-center'>
          <p
            className={`link-animate text-lg text-black/70`}
          >
            {links[index]}
          </p>
          <div
            onClick={onClick}
            className='flex justify-center items-center gap-3 mt-5'
          >
            <div
              className='cursor-pointer rounded-full bg-gray-200 w-3 h-3 flex justify-center items-center'
            ></div>
            <div
              className='cursor-pointer rounded-full bg-gray-200 w-3 h-3 flex justify-center items-center'
            ></div>
            <div
              className='cursor-pointer rounded-full bg-gray-200 w-3 h-3 flex justify-center items-center'
            ></div>
            <div
              className='cursor-pointer rounded-full bg-gray-200 w-3 h-3 flex justify-center items-center'
            ></div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Mision
