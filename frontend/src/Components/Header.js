import React, { useState } from 'react'
import logo2 from "../images/logo2.png"
import { Link } from 'react-router-dom'
import { FaUserAstronaut } from "react-icons/fa";
import { IoCart } from "react-icons/io5";

export const Header = () => {

  const [showMenu,setShowMenu] = useState(false);
  const handleShowMenu = () =>{
    setShowMenu(state => !state)
  }
  return (
    <header className='fixed shadow-lg w-full h-16 m-0 border-purple-950 border'>
        <div className='flex items-center h-full justify-between bg-gradient-to-r from-purple-900 to-pink-500 m-0 p-0'>

             <Link to={""}>
                 <div className='h-16 w-20'>
                    <img src={logo2} className='h-12 rounded-lg mt-3'/>
                 </div>
             </Link>
             <div className='flex items-center gap-9 md:gap-7 mx-2'>
               <nav className='flex gap-4 p-3 md:gap-4 text-base md:text-lg text-white'>
                   <div className='p-1 rounded-lg hover:bg-violet-950'><Link to={''}>Home</Link></div>
                   <div className='p-1 rounded-lg hover:bg-violet-950'><Link to={'menu'}>Menu</Link></div>
                   <div className='p-1 rounded-lg hover:bg-violet-950'><Link to={'about'}>About</Link></div>
                   <div className='p-1 rounded-lg hover:bg-violet-950'><Link to={'contact'}>Contact</Link></div>

               </nav>
               <div className='cart text-4xl text-slate-100 cursor-pointer' >
               <div className='absolute  text-white bg-cyan-900 h-4 w-4 rounded-full m-0 p-0 text-sm text-center'>0</div>
                   <IoCart/>
                   
               </div>
               <div className='profile text-2xl text-slate-100 ' onClick={handleShowMenu}>
                 <div className='border-2 border-solid border-slate-100 p-1 m-0 rounded-full cursor-pointer '>
                 <FaUserAstronaut/>
                 </div> 

                 {
                  showMenu && (<div className='absolute gap-2 right-2 rounded-2xl bg-violet-950 shadow drop-shadow-md py-3 px-3 flex flex-col'>
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
