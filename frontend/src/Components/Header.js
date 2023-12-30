import React, { useState } from 'react'
import logo1 from "../images/logo1.png"
import { Link } from 'react-router-dom'
import { FaUserAstronaut } from "react-icons/fa";
import { IoCart } from "react-icons/io5";

export const Header = () => {

  const [showMenu,setShowMenu] = useState(false);
  const handleShowMenu = () =>{
    setShowMenu(state => !state)
  }
  return (
    <header className='fixed shadow-md w-full h-16 px-2 md:px-4 z-4'>
        <div className='flex items-center h-full justify-between'>

             <Link to={""}>
                 <div className='h-16 w-20'>
                    <img src={logo1} className='h-full'/>
                 </div>
             </Link>
             <div className='flex items-center gap-3 md:gap-7'>
               <nav className='flex gap-4 md:gap-4 text-base md:text-lg text-white'>
                   <Link to={''}>Home</Link>
                   <Link to={'menu'}>Menu</Link>
                   <Link to={'about'}>About</Link>
                   <Link to={'contact'}>Contact</Link>

               </nav>
               <div className='cart text-4xl text-slate-100'>
               <div className='absolute  text-white bg-blue-900 h-4 w-4 rounded-full m-0 p-0 text-sm text-center'>0</div>
                   <IoCart/>
                   
               </div>
               <div className='profile text-2xl text-slate-100' onClick={handleShowMenu}>
                 <div className='border-2 border-solid border-slate-100 p-1 rounded-full cursor-pointer'>
                 <FaUserAstronaut/>
                 </div> 

                 {
                  showMenu && (<div className='absolute right-2 bg-slate-500 shadow drop-shadow-md py-2 px-2 flex flex-col'>
                  <Link to = {"newproduct"} className='whitespace-nowrap cursor-pointer text-xl'>New Product</Link>
                  <Link to={"login"} className='whitespace-nowrap cursor-pointer text-xl'>Login</Link>
               </div>)
                 }
                                
              </div>
             </div>
        </div>
    </header>
  )
}
