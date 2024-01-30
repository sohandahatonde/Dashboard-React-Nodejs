
import { useState } from "react"
import { useNavigate } from "react-router-dom";
import "./AddProduct.css"
const AddProduct = () => {
    const [name,setName]= useState("");
    const [price,setPrice]= useState("");
    const [category,setCategory]= useState("");
    const [company,setCompany]= useState("");
    const [error,setError]=useState('')
    const navigate = useNavigate();
    // ^^ add data inside the database

    const addProduct = async()=>{
      console.log( !name);
      if (!name || !price || !category || !company) {
        setError(true);
        return false;
      }
        
     console.warn(name,price,category,company);
     const userId = JSON.parse( localStorage.getItem('user'))._id
     let result =await fetch("http://localhost:5000/add-product",{
         method:'post',
         body:JSON.stringify({name,price,category,company,userId}),
         headers:{
            "content-Type":"application/json",
            authorization :`bearer ${JSON.parse(localStorage.getItem('token'))}`
         }
     });
     result = await result.json();
     console.log(result);
     navigate('/');
    }
  return (
    <>
    <div className="mt-5">
      <center><h1>Add Product</h1></center>
    </div>
    <div className="container pt-1">
        <div className=" d-flex justify-content-center align-items-center " >
          <div id="form-start">
            <form >

              <div className="mb-3">
                <input type="text" className="form-control"   placeholder="Enter Product Name" value={name} onChange={(e)=>{setName(e.target.value)}} />
                {error && !name && <span>Enter Valid Name</span>}
              </div>

              <div className="mb-3">
                <input type="text" className="form-control"   placeholder="Enter Product Price" value={price} onChange={(e)=>{setPrice(e.target.value)}}  />
                {error && !price && <span>Enter Valid price</span>}
              </div>

              <div className="mb-3">
                <input type="text" className="form-control"  placeholder="Enter Product Category" value={category} onChange={(e)=>{setCategory(e.target.value)}} />
                {error && !category && <span>Enter Valid category</span>}
              </div> 

              <div className="mb-3">
                <input type="text" className="form-control"  placeholder="Enter Product Company" value={company} onChange={(e)=>{setCompany(e.target.value)}} />
                {error && !company && <span>Enter Valid category</span>}
              </div>

              <div className="mb-3">
                <div className="d-grid gap-2">
                  <button onClick={addProduct} className="btn btn-primary mt-3" id="product-button" type="button">Add Product</button>
                </div>
              </div>
            </form>

          </div>
        </div>
      </div>
    </>
  )
}

export default AddProduct
