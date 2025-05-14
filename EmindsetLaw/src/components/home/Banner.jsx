import React from 'react'
import img from "../../assets/espacio2.JPG";
const Banner = () => {
  return (
    <div 
      className="h-[100vh] w-[100%] mt-22 bg-cover bg-center "
      style={{ backgroundImage: `url(${img})` }}
    >

    </div>
  )
}

export default Banner
