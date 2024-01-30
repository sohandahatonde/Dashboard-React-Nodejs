
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import "./SignUp.css"

const Login = () => {
    const [email,setEmail] = useState('')
    const [password,setPassword] = useState('')
    const navigate = useNavigate();
    useEffect(()=>{
       const auth = localStorage.getItem('user');
       if (auth) {
        navigate('/')
       }
    });
    const handleLogin= async()=>{
          console.warn(email,password);
          let result = await fetch('http://localhost:5000/login',{
             method:'post',
             body:JSON.stringify({email,password}),
             headers:{
              'content-Type':'application/json'
             }
          })
          result = await result.json();
          console.log(result);
          if(result.auth){
            localStorage.setItem('user',JSON.stringify(result.user));
            localStorage.setItem('token',JSON.stringify(result.auth));
            navigate('/')
          }else{
            alert("please Enter Correct Detail")
          }
    }
  return (
    <div>
        <div className="container pt-5">
        <div className=" d-flex justify-content-center align-items-center " >
          <div id="form-main">
            <form >

              <div className="mb-3">
                <label className="form-label">Email or phone number</label>
                <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" value={email} onChange={(e)=>setEmail(e.target.value)} />
              </div>

              <div className="mb-3 mt-4">
                <label className="form-label">Password (6+ Character)</label>
                <input type="password" className="form-control" id="exampleInputPassword1" value={password} onChange={(e)=>setPassword(e.target.value)}/>
              </div>

              <div className="mb-3">
                <div className="d-grid gap-2">
                  <button onClick={handleLogin}  className="btn btn-info mt-5" type="button">Login</button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div> 
    </div>
  )
}

export default Login
