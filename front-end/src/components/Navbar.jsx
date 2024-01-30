
import { Link ,useNavigate } from "react-router-dom"
import "./Navbar.css"



const Navbar = () => {
  const auth = localStorage.getItem('user')
  const navigate = useNavigate();
  const logout = () =>{
   localStorage.clear();
   navigate('/SignUp')
  }
  return (
    <div>
       <nav className="navbar navbar-expand-lg bg-body-white mt-3 sticky-top" >
  <div className="container-fluid">
    <img src="https://images.squarespace-cdn.com/content/v1/5d232bdb4290a600018c284a/1562586360235-5PEA4QIUA03ZVB63PCCL/Dashboard+Technology+Logo+office.png" className="img-fluid" alt="" style={{height:"60px",width:"150px"}}/>
    {/* <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button> */}
    <div className="" >
      { auth ?
      <ul className="navbar-nav me-auto mb-2 mb-lg-0 me-lg-5" id="nav-first">
        <li className="nav-item ps-lg-5">
          <Link  className="nav-link  px-md-1 " aria-current="page" to="/">Products</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link px-md-1" to="/add">Add Product</Link>
        </li>
        <li className="nav-item px-md-1">
          <Link className="nav-link " aria-disabled="true" to="/update">Update Product</Link>
        </li>
        {/* <li className="nav-item px-md-1">
          <Link className="nav-link " aria-disabled="true" to="/profile">Profile</Link>
        </li> */}
        <li className="nav-item px-md-1">
          <Link onClick={logout} className="nav-link " aria-disabled="true" to="/SignUp">Logout</Link> 
          </li>
      </ul>
 :
       <ul className="navbar-nav me-auto mb-2 mb-lg-0 ms-lg-5" id="nav-log-sign ">
         <>
          <li className="nav-item px-md-1">
            <Link className="nav-link " aria-disabled="true" to="/SignUp">SignUp</Link>
            </li>
          <li className="nav-item px-md-1">
          <Link className="nav-link " aria-disabled="true" to="/login">login</Link>
        </li> 
        </>
       </ul>
}
    </div>
  </div>
</nav>
    </div>
  )
}
export default Navbar
