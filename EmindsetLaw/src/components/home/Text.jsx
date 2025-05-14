import React from 'react'

const Text = () => {

    const links = ['Cuando te juegas algo importante, no estás tranquilo. Sabes que un paso en falso puede salir caro.', 'En Emindset Law te entendemos. Sabemos lo que se siente. Por eso llegamos con soluciones antes de que aparezca el problema. Porque el peor conflicto es el que se podría haber evitado.', 'Y más vale un buen acuerdo que mil batallas. Porque tú no estás para perder ninguna.', 'No apagamos fuegos, los evitamos. Prevenir, ayudar y proteger: ese es nuestro verdadero oficio. Te cuidamos como si tu negocio fuera nuestro. Porque esto no va de leyes. Va de ti. Y de proteger lo que tanto te ha costado construir.'];

    return (
        <section className='flex flex-col justify-center items-start w-[90%] mx-auto mt-11'>
            <div>
                <h2 className="text-4xl font-light mb-1 fade-in">Misión</h2>
            </div>
            <div>
            {
              links.map((link, index) => (
                <>
                  <p
                    key={index}
                    className={`link-animate delay-${index * 200}ms text-lg text-black/70`}
                    style={{ animationDelay: `${index * 200}ms` }}
                  >
                    {link}
                  </p>
                  <div className='h-[.2px] bg-white/50 w-[100%]'></div>
                </>
              ))
            }
            </div>
        </section>
    )
}

export default Text
