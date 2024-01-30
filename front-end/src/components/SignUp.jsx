import { useState ,useEffect} from "react"
import "./SignUp.css";
import {useNavigate} from 'react-router-dom'
 
const SignUp = () => {
    const [name,setName] = useState("");
    const [password,setPassword] = useState("")
    const [email,setEmail] = useState("")

  const navigate = useNavigate();
  useEffect(()=>{
    const auth = localStorage.getItem('user')
    if (auth) {
      navigate('/')
    }
  })

    const collectData = async () =>{
        console.warn(name,email,password);
        // ^ Integrate signUp
        let  result = await fetch('http://localhost:5000/register',{
          method:'post',
          body:JSON.stringify({name,email,password}),
          headers:{
            'content-Type':'application/json'
          },
        });
        result = await result.json()
        console.log(result);
        localStorage.setItem('user',JSON.stringify(result.result)); 
        localStorage.setItem('token',JSON.stringify(result.auth)); 
          navigate('/')
    }
  return (
    <div>
      <div>
      <div className="container pt-5">
        <div className=" d-flex justify-content-center align-items-center " >
          <div id="form-main">
            <form >

              <div className="mb-3">
                <label className="form-label">Name</label>
                <input type="text" className="form-control" aria-describedby="textHelp" value={name} onChange={(e)=>setName(e.target.value)} />
              </div>

              <div className="mb-3">
                <label className="form-label">Email or phone number</label>
                <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" value={email} onChange={(e)=>setEmail(e.target.value)} />
              </div>

              <div className="mb-3">
                <label className="form-label">Password (6+ Character)</label>
                <input type="password" className="form-control" id="exampleInputPassword1" value={password} onChange={(e)=>setPassword(e.target.value)} />
              </div>

              <div className="mb-3">
                <div className="d-grid gap-2">
                  <button onClick={collectData} className="btn btn-primary mt-3" type="button">SignUp</button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
    </div>
  )
}

export default SignUp
