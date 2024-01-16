
import React, { useState } from 'react'
import signupicon from "../images/icons/signupicon.gif"
import {BiHide, BiShowAlt} from "react-icons/bi";
import { Link } from 'react-router-dom'
import {BsEmojiSmileUpsideDown} from 'react-icons/bs';

const Login = () => {
 
    //showpassword usestate and handling  
    const [showPassword,setShowPassword] = useState(false)
    const handleshowPassword = () => {
      setShowPassword(prevstate => !prevstate);
    }
  
    const [data,setData] = useState({
     
      email :"",
      password:""
    });
    //handle form datas
    const handleOnchange = (e) =>{
        const {name,value} = e.target
        setData((prev)=>{
          return{
            ...prev,
            [name]:value
          }
        })
        }
    
        //handle submit
        const handleSubmit = (e) =>{
             //extracting from data
             const {email,password} = data;
             if(email && password){
               
                  alert("success");
             }
             else{
              alert("please enter required fields");
             }
        }
  
  return (
    <div className='p-2 md:p-4'>

    <div className='w-full max-w-md bg-white m-auto flex items-center flex-col p-4 rounded-3xl'>
       {/*<h1 className='text-center text-2xl font-bold'>SignUp</h1>*/}
        <div className='w-20 overflow-hidden rounded-full drop-shadow-md shadow-lg flex items-center m-auto'>
             <img src={signupicon} className='w-full'/>
        </div>
        <form className='w-full py-3 flex flex-col ' onSubmit={handleSubmit}>
             
           
             <label htmlFor='email'>Email</label>
             <input type={'email'} id='email' name='email'value={data.email} onChange={handleOnchange}className='bg-slate-200 w-full px-2 py-1 rounded mt-2 mb-2  focus-within:outline-blue-900'/>
             
             <label htmlFor='password'>Password</label>
            <div className='flex px-2 py-1 bg-slate-200 rounded mt-2 mb-2 focus-within:outline focus-within:outline-blue-900'>
             <input type={showPassword?'text':'password'} id='password' name='password'value={data.password} onChange={handleOnchange}className='bg-slate-200 w-full rounded outline-none '/>
             <span className='flex text-xl cursor-pointer'onClick={handleshowPassword}>{showPassword ?<BiShowAlt/> : <BiHide />}</span>
            </div>
            <button className='bg-blue-400 hover:bg-blue-600 w-full max-w-[150px] mt-4 text-blue-100 cursor-pointer m-auto text-xl font-semibold py-1 rounded-full text-center font-mono '>
              Login</button> 
        </form>
        <p className='text-left text-sm'>Don't Have An Account ?<Link to={"/signup"} className='text-blue-500 underline'> Signup</Link></p>
    </div>
</div>
  )
}

export default Login