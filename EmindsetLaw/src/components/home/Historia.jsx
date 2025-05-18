import React from 'react'
import img from "../../assets/historia.jpeg";

const Historia = () => {

    return (
        <section className=''>
            <div className='scroll-img'>
                <img src={`${img}`} alt="" />
            </div>
            <div>
                <div className='flex flex-col w-[85%] mx-auto mb-10 mt-5'>
                    <h2 className='text-5xl font-light scroll-text-der mt-5'>
                        Historia
                    </h2>
                </div>
                <div className='flex flex-col gap-4 w-[85%] mx-auto'>
                    <h3 className='scroll-text-izq text-lg font-light text-black'>
                        Érase una vez Emindset Law. Una firma de abogados que nació en 2016, gracias a un equipo con una visión común: que el derecho podía ser más que normas, plazos y lenguaje inaccesible. Podía ser una herramienta útil, cercana y profundamente humana. Una forma real de acompañar y transformar vidas.
                    </h3>
                    <div className='flex flex-col gap-1 text-md text-black/60 font-light'>
                        <h4 className='scroll-text-der'>
                            Desde el inicio supimos que queríamos hacer las cosas de otra manera. No desde la frialdad del traje y el despacho, sino desde la escucha y el compromiso con las personas.
                        </h4>
                        <h4 className='scroll-text-izq'>
                            Y, para qué negarlo, llegar con un nuevo mindset no fue fácil. Romper con lo establecido siempre impone respeto.
                        </h4>
                        <h4 className='scroll-text-der'>
                            Pero con el tiempo, fue esa mirada humana y auténtica la que nos permitió marcar la diferencia y convertirnos en un referente del sector legal.
                        </h4>
                        <h4 className='scroll-text-izq'>
                            Siempre fieles a lo que nos mueve: ayudar y estar presente cuando más se nos necesita.
                        </h4>
                    </div>
                </div>
            </div>

        </section>
    )
}

export default Historia
