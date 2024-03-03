import React, { useState } from "react";
import signupicon from "../images/icons/signupicon.gif";
import { BiHide, BiShowAlt } from "react-icons/bi";
import { Link, Navigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  //showpassword usestate and handling
  const [showPassword, setShowPassword] = useState(false);
  const handleshowPassword = () => {
    setShowPassword((prevstate) => !prevstate);
  };

  const [data, setData] = useState({
    email: "",
    password: "",
  });
  //handle form datas
  const handleOnchange = (e) => {
    const { name, value } = e.target;
    setData((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  //handle submit
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission behavior
  
    // Extracting email and password from the state
    const { email, password } = data;
  
    if (email && password) {
      try {
        const fetchData = await fetch("http://localhost:8080/login", {
          method: "POST",
          headers: { "content-type": "application/json" },
          body: JSON.stringify(data),
        });
  
        const dataRes = await fetchData.json();
  
        if (dataRes.alert) {
          setTimeout(()=>{
            toast.success(dataRes.message);
          },1000)
          
          setTimeout(()=>{
            navigate("/");
          },2000);
          
         
        } else {
          toast.error(dataRes.message);
        }
      } catch (error) {
        console.error("Error during login:", error);
        toast.error("An error occurred. Please try again later.");
      }
    } else {
      toast.error("Please enter both email and password");
    }
  };
  return (
    <div className="p-2 md:p-4">
      <div className="bg-violet-950 bg-opacity-50 w-full max-w-md  m-auto flex items-center flex-col p-4 rounded-3xl">
        {/*<h1 className='text-center text-2xl font-bold'>SignUp</h1>*/}
        <div className="w-20 overflow-hidden rounded-full drop-shadow-md shadow-lg flex items-center m-auto">
          <img src={signupicon} className="w-full" />
        </div>
        <form className="w-full py-3 flex flex-col " onSubmit={handleSubmit}>
          <label htmlFor="email" className="text-white text-xl font-mono">
            Email
          </label>
          <input
            type={"email"}
            id="email"
            name="email"
            value={data.email}
            onChange={handleOnchange}
            className="bg-slate-200 w-full px-2 py-1 rounded mt-2 mb-2  focus-within:outline-blue-900"
          />

          <label htmlFor="password" className="text-white text-xl font-mono">
            Password
          </label>
          <div className="flex px-2 py-1 bg-slate-200 rounded mt-2 mb-2 focus-within:outline focus-within:outline-blue-900">
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              name="password"
              value={data.password}
              onChange={handleOnchange}
              className="bg-slate-200 w-full rounded outline-none "
            />
            <span
              className="flex text-xl cursor-pointer"
              onClick={handleshowPassword}
            >
              {showPassword ? <BiShowAlt /> : <BiHide />}
            </span>
          </div>
          <button className="bg-red-500 hover:bg-red-900 hover:text-white w-full max-w-[150px] mt-4 text-red-950 cursor-pointer m-auto text-xl font-semibold py-1 rounded-full text-center font-mono ">
            Login
          </button>
        </form>
        <p className="text-left text-white font-mono text-sl">
          Don't Have An Account ?
          <Link to={"/signup"} className="text-blue-500">
            {" "}
            Signup
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
