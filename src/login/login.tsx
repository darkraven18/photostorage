import React, { useState , useEffect } from "react";
import axios from "axios";
import tresspass from '../assets/tresspass.svg';
function login() {
  const [password, setPassword] = useState<string>("");
  const [popupmessage, setpopupmessage] = useState<string>("Checking...");
  const [popupvisible, setpopupvisible] = useState(false);
  useEffect(() => {
    if(window.sessionStorage.getItem('token')){
        axios.post('https://photo.ujjwaldevelops.com/api/login/token', { "token": window.sessionStorage.getItem('token') })
        .then(()=>{
            window.location.href=window.location.origin+'/home';
        })
        .catch(()=>{

        })
    }
  }, []);
  function login(){
    setpopupvisible(true);
    axios.post('https://photo.ujjwaldevelops.com/api/login/password', { "password": password })
    .then(response=>{
      setpopupmessage('Success!');
      window.location.href=window.location.origin+'/home';
      addtoken(response.data.token);
      setTimeout(()=>{
        setpopupvisible(false);
      },4000)
      console.log(response.data)
    })
    .catch(error=>{
      if(error.status==403){
        setpopupmessage('Unauthorized!');
        setTimeout(()=>{
          setpopupvisible(false);
          setpopupmessage('Checking...');
        },4000)
        setPassword('');
      }
      else{
        setpopupmessage('Unavailable!');
        setTimeout(()=>{
          setpopupvisible(false);
          setpopupmessage('Checking...');
        },4000)
      }
    })
    console.log("Input Value:", password);
  }
  function addtoken(token:string){
    window.sessionStorage.setItem('token',token);
  }
  function getBorderColor(){
    console.log(popupmessage=='Checking...'?'border-[#FFDF00]':popupmessage=='Success!'?'border-[#008000]':'border-[#FF0000]')
    return popupmessage=='Checking...'?'border-[#FFDF00]':popupmessage=='Success!'?'border-[#008000]':'border-[#FF0000]';
  }

  const handlePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };
  return (
    <div className="h-screen w-screen bg-[#594545] flex justify-center items-center">
      {popupvisible && (<div className={`fixed top-4 right-4 w-64 p-4 bg-[#FFF8EA] text-[#594545] border-l-8 ${getBorderColor()} shadow-lg rounded-lg z-50 transition-all ease-in-out duration-300`}>
          <b className="text-lg font-semibold font-[Cascadia_Code] text-left">{popupmessage}</b>
      </div>)}
      <div className="flex flex-col justify-center items-center h-[98%] w-[95%]">
        <div className="h-[15%] w-full bg-[#815B5B] rounded-t-4xl flex justify-center items-center text-[#FFF8EA] md:text-7xl text-5xl font-[Dancing_Script]">
          <b>Photo Storage</b>
        </div> 
        <div className="h-[85%] w-full bg-[#FFF8EA] rounded-b-4xl flex flex-col justify-center items-center gap-4">
          <img src={tresspass} alt="Tresspass" className="h-[50%]" />
          <label htmlFor="password" className='font-[Cascadia_Code] text-[#594545] text-3xl'><b>Password</b></label>
          <input value={password} onChange={handlePassword} id="password" placeholder="Enter your password" className='border-b-4 h-12 p-2 md:w-80 w-75 border-[#594545] text-center text-2xl text-[#594545] focus:outline-none' type='password'></input>
          <button className='font-[Cascadia_Code] cursor-pointer border-[#594545] rounded-xl pl-2 pr-2 text-xl border-4 text-[#594545] hover:text-[#FFF8EA] hover:bg-[#594545]' onClick={login}><b>GO</b></button>
        </div>
      </div>
    </div>
  )
}

export default login
