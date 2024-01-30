import Footer from "./components/Footer";
import Navbar from "./components/Navbar"
import {BrowserRouter, Routes , Route} from 'react-router-dom';
import SignUp from "./components/SignUp";
import PrivateComponents from "./components/PrivateComponents";
import Login from "./components/Login";
import AddProduct from "./components/AddProduct";
import Products from "./components/Products";
import UpdateProduct from "./components/UpdateProduct";
const App = () => {
  return (
    <div>
      <BrowserRouter>
      <Navbar/>
      <Routes>
        
         <Route element={<PrivateComponents/>}>
        <Route path="/" element={<Products/>} />
        <Route path="/add" element={<AddProduct/>} />
        <Route path="/update/:id" element={<UpdateProduct/>} />
        <Route path="/logout" element={<h1>logout Product</h1>} />
        {/* <Route path="/profile" element={<h1>profile</h1>} /> */}
        </Route>

        <Route path="/SignUp" element={ <SignUp/>} />
        <Route path="/login" element={ <Login/>} />
       
       
      </Routes>
     </BrowserRouter>
     <Footer/>
    </div>
  )
}

export default App
