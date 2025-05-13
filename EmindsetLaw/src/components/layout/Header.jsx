import React, { useEffect } from 'react'
import { useRef } from 'react'
import logo from '../../assets/logo.png';

const Header = () => {
  
  const menu = useRef(null)
  const menuMovil = useRef(null)

  const links = ['Quienes somos', 'Soluciones', 'Noticias', 'Contacto'];

  useEffect(() => {
    menu.current.classList.add('fade-in')
    console.log(menuMovil.current)
  }, [])

  const toggleMenu = () => {
    menuMovil.current.classList.toggle('hidden')
  }

  return (
    <>

      <header className='fixed '>
        {/* MOVIL */}
        <div className="flex justify-between items-center">
          <div className="hidden">
            <a href="">Quienes somos</a>
            <a href="">Soluciones</a>
          </div>
          <div
            ref={menu}
            className="w-[20%] m-auto relative"
            onClick={() => {
              toggleMenu()
              menuMovil.current.classList.add('menu')
            }}
          >
            <img className='absolute' onClick={(e) => e.target.classList.toggle('click-logo')} src={logo} alt="" />
            <img src={logo} alt="" />
          </div>
          <div className="hidden">
            <a href="">Noticias</a>
            <a href="">Contacto</a>
          </div>
        </div>
        <div
          ref={menuMovil}
          className='hidden'
        >
          <div className='flex flex-col text-center bg-[#1579a2] text-zinc-100 gap-5 pt-5 uppercase text-xl'>
            {
              links.map((link, index) => (
                <>
                  <a 
                    href=""
                    key={index}
                    className={`link-animate delay-${index * 200}ms px-3 flex justify-between`}
                    style={{ animationDelay: `${index * 200}ms` }}
                  >
                    <p href="">{link}</p>
                    <svg width={24} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" focusable="false" fill='white' ><g color="black, rgb(253, 251, 245))" weight="light"><path d="M220.24,132.24l-72,72a6,6,0,0,1-8.48-8.48L201.51,134H40a6,6,0,0,1,0-12H201.51L139.76,60.24a6,6,0,0,1,8.48-8.48l72,72A6,6,0,0,1,220.24,132.24Z"></path></g></svg>
                  </a>
                  <div className='h-[.2px] bg-white/50 w-[100%]'></div>
                </>
              ))
            }
          </div>
        </div>
      </header>
    </>
  )
}

export default Header
