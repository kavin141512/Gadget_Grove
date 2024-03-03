import React, { useState } from 'react'
import signupicon from "../images/icons/signupicon.gif"
import {BiHide,BiShowAlt} from "react-icons/bi";
import { Link,useNavigate } from 'react-router-dom'
import { ImagetoBase64 } from '../utility/ImagetoBase64';
function Signup() {
  const navigate = useNavigate();
//to handle profileimage uploading
  const handleuploadprofileimage=async (e) =>{
     
      const data = await ImagetoBase64(e.target.files[0])
      console.log(data)
      
      setData((prev)=>{
        return {
          ...prev,
          image : data
        }
      })
  }
  //showpassword usestate and handling  
  const [showPassword,setShowPassword] = useState(false)
  const handleshowPassword = () => {
    setShowPassword(prevstate => !prevstate);
  }
  //confirm password usestate and handling
  const [confirmPassword,setconfirmPassword] = useState(false)
  const handleconfirmPassword = () => {
    setconfirmPassword(prevstate => !prevstate);
  }

  const [data,setData] = useState({
    fname :"",
    lname :"",
    email :"",
    password :"",
    confirmpassword:"",
    image: ""
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
      console.log(process.env.REACT_APP_SERVER_DOMIN);
      //handle submit
      const handleSubmit = async(e) =>{
            e.preventDefault();
           //extracting from data
           const {fname,email,password,confirmpassword} = data;
           if(fname && email && password && confirmpassword){
              if(password == confirmpassword){
                //send to server
                const fetchData = await fetch('http://localhost:8080/signup',{
                  method:"POST",
                headers:{"content-type":"application/json"},
                body: JSON.stringify(data)
                })  

                const dataRes = await fetchData.json();
                console.log(dataRes);
                alert("success");
                // navigate("/login");
              }
              else{
                alert("check password and confirm password"); 
              }
           }
           else{
            alert("please enter required fields");
           }
      }
  return (
    <div className='p-2 md:p-4'>

        <div className='w-full max-w-md bg-white m-auto flex items-center flex-col p-4 rounded-3xl'>
           {/*<h1 className='text-center text-2xl font-bold'>SignUp</h1>*/}
            <div className='w-20 overflow-hidden rounded-full drop-shadow-md shadow-lg m-auto relative'>
                 <img src={ data.image? data.image: signupicon} className='w-full'/>

                 <label htmlFor="profileImage">
                 <div className='bg-slate-500 bg-opacity-50 text-center absolute bottom-0 h-1/3 w-full cursor-pointer'>
                  <p className='text-sm text-white p-1'>Upload</p>
                 </div>
                 <input type={"file"} id="profileImage" className="hidden" accept="image/*" onChange={handleuploadprofileimage}/>
                 </label> 
            </div>
            <form className='w-full py-3 flex flex-col ' onSubmit={handleSubmit}>
                 
                 <label htmlFor='firstName'>First Name</label>
                 <input type={'text'} id='fname' name='fname'  value={data.fname} onChange={handleOnchange} className='bg-slate-200 w-full px-2 py-1 rounded mt-2 mb-2 focus-within:outline-blue-900  ' />
                 
                 <label htmlFor='lastName'>Last Name</label>
                 <input type={'text'} id='lname' name='lname' value={data.lname} onChange={handleOnchange}className='bg-slate-200 w-full px-2 py-1 rounded mt-2 mb-2  focus-within:outline-blue-900' />
                 
                 <label htmlFor='email'>Email</label>
                 <input type={'email'} id='email' name='email'value={data.email} onChange={handleOnchange}className='bg-slate-200 w-full px-2 py-1 rounded mt-2 mb-2  focus-within:outline-blue-900'/>
                 
                 <label htmlFor='password'>Password</label>
                <div className='flex px-2 py-1 bg-slate-200 rounded mt-2 mb-2 focus-within:outline focus-within:outline-blue-900'>
                 <input type={showPassword?'text':'password'} id='password' name='password'value={data.password} onChange={handleOnchange}className='bg-slate-200 w-full rounded outline-none '/>
                 <span className='flex text-xl cursor-pointer'onClick={handleshowPassword}>{showPassword ?<BiShowAlt/> : <BiHide />}</span>
                </div>
                  
                <label htmlFor='password'>Confirm Password</label>
                <div className='flex px-2 py-1 bg-slate-200 rounded mt-2 mb-2 focus-within:outline focus-within:outline-blue-900'>
                 <input type={confirmPassword?'text':'password'} id='confirmpassword' name='confirmpassword'value={data.confirmPassword} onChange={handleOnchange}className='bg-slate-200 w-full rounded outline-none '/>
                 <span className='flex text-xl cursor-pointer'onClick={handleconfirmPassword}>{confirmPassword ?<BiShowAlt/> : <BiHide />}</span>
                </div>
                <button className='bg-blue-400 hover:bg-blue-600 w-full max-w-[150px] mt-4 text-blue-100 cursor-pointer m-auto text-xl font-semibold py-1 rounded-full text-center font-mono '>Sign Up</button>
            </form>
            <p className='text-left text-sm'>Already Have An Account ?<Link to={"/login"} className='text-blue-500 underline'> Login</Link></p>
        </div>
    </div>
  )
}

export default Signup