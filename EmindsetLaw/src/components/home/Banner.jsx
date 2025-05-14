import React from 'react'
import img from "../../assets/espacio2.JPG";
const Banner = () => {
  return (
    <section>
      {/* Sección con efecto Parallax */}
      <div
        className="h-[90vh] w-[95%] mx-auto bg-cover bg-center bg-fixed flex items-end justify-center text-white text-center px-4"
        style={{ backgroundImage: `url(${img})` }}
      >
        <div className='mb-5 flex flex-col justify-center items-center w-full'>
          <h2 className='w-[full] text-4xl font-light mb-1 fade-in'>Emindset Law</h2>
          <p className='text-gray-200'>Saber más</p>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" focusable="false" fill='#E5E7EB' width="20px" ><g color="rgb(255, 255, 255)" weight="light"><path d="M204.24,148.24l-72,72a6,6,0,0,1-8.48,0l-72-72a6,6,0,0,1,8.48-8.48L122,201.51V40a6,6,0,0,1,12,0V201.51l61.76-61.75a6,6,0,0,1,8.48,8.48Z"></path></g></svg>
        </div>
      </div>
    </section>
  )
}

export default Banner
