import React from 'react'
import premio1 from "../../assets/premio1.jpg";

const Premios = () => {
  return (
    <section>
      <div className="h-[200px] top-0 text-center">
        <h2 className="opacity-0 scroll-text-rec text-5xl font-light">Reconocimientos</h2>
      </div>
      <div className='mt-5'> 
        <div className='w-[85%] mx-auto'>
            <img src={`${premio1}`} alt="" />
        </div>
        <div className='w-[85%] mx-auto font-bold text-center'>
            <h3>Mejor Despacho en Derecho Mercantil de España 2025 (Premios De Ley)</h3>
        </div>
      </div>
    </section>
  )
}

export default Premios
