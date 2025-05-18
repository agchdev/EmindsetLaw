import React from 'react'
import { Button } from '@progress/kendo-react-buttons';
import { Zoom } from '@progress/kendo-react-animation';


const Mision = () => {

  const [index, setIndex] = React.useState(0);
  const [last, setLast] = React.useState(null);
  const links = ['Cuando te juegas algo importante, no estás tranquilo. Sabes que un paso en falso puede salir caro.', 'En Emindset Law te entendemos. Sabemos lo que se siente. Por eso llegamos con soluciones antes de que aparezca el problema. Porque el peor conflicto es el que se podría haber evitado.', 'Y más vale un buen acuerdo que mil batallas. Porque tú no estás para perder ninguna.', 'No apagamos fuegos, los evitamos. Prevenir, ayudar y proteger: ese es nuestro verdadero oficio. Te cuidamos como si tu negocio fuera nuestro. Porque esto no va de leyes. Va de ti. Y de proteger lo que tanto te ha costado construir.'];

  const onClick = () => {
    setIndex((index + 1) % links.length);
  };

  const selectMision = (index, element) => {
    setIndex(index);
    setLast(last?.classList.remove('bg-gray-400'));
    element.classList.add('bg-gray-400');
    setLast(element);
  };

  return (
    <section className='flex flex-col justify-start items-center w-[90%] h-[60vh] mx-auto mt-11'>
      <div className="h-[200px] top-0 text-center">
        <h2 className="scroll-text text-5xl font-light">Misión</h2>
      </div>
      <div className='overflow-hidden'>
        <div className='text-center'>
          <p
            onClick={onClick}
            className='link-animate text-lg text-black/70 h-[200px] flex justify-center items-center'
            key={index}
          >
            {links[index]}
          </p>
          <div className="flex justify-center items-center gap-3 mt-5">
            {[0, 1, 2, 3].map((i) => (
              <div
                key={i}
                className="cursor-pointer rounded-full bg-gray-200 w-3 h-3 flex justify-center items-center link-animate"
                onClick={(e) => selectMision(i, e.target)}
              ></div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default Mision
