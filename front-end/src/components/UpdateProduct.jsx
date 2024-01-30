import {useParams,useNavigate} from 'react-router-dom'
import { useEffect, useState } from "react"
const UpdateProduct = () => {
    const [name,setName]= useState("");
    const [price,setPrice]= useState("");
    const [category,setCategory]= useState("");
    const [company,setCompany]= useState("");
    const params = useParams();
    const navigate = useNavigate();
    // const [error,setError]=useState('')

   useEffect(()=>{
    getProductDetails();
   },[])
    
   const  getProductDetails = async ()=>{
    console.warn(params);
    let result = await fetch(`http://localhost:5000/product/${params.id}`,{
      headers:{
        authorization :`bearer ${JSON.parse(localStorage.getItem('token'))}`
      }
    })
    result = await result.json();
    setName(result.name);
    setPrice(result.price);
    setCategory(result.category);
    setCompany(result.company)
   }

    const UpdateProduct = async()=>{
        console.warn(name,price,category,company);
        let result = await fetch(`http://localhost:5000/product/${params.id}`,{
          method:"Put",
          body:JSON.stringify({name,price,category,company}),
          headers:{
            'Content-Type':'application/json',
            authorization :`bearer ${JSON.parse(localStorage.getItem('token'))}`
          }
        });
        result = await result.json();
        console.warn(result);
        navigate('/');

        }
  return (
    <>
    <div className="mt-5">
      <center><h1>Update Product</h1></center>
    </div>
    <div className="container pt-1">
        <div className=" d-flex justify-content-center align-items-center " >
          <div id="form-start">
            <form >

              <div className="mb-3">
                <input type="text" className="form-control"   placeholder="Enter Product Name" value={name} onChange={(e)=>{setName(e.target.value)}} />

              </div>

              <div className="mb-3">
                <input type="text" className="form-control"   placeholder="Enter Product Price" value={price} onChange={(e)=>{setPrice(e.target.value)}}  />

              </div>

              <div className="mb-3">
                <input type="text" className="form-control"  placeholder="Enter Product Category" value={category} onChange={(e)=>{setCategory(e.target.value)}} />

              </div>

              <div className="mb-3">
                <input type="text" className="form-control"  placeholder="Enter Product Company" value={company} onChange={(e)=>{setCompany(e.target.value)}} />

              </div>

              <div className="mb-3">
                <div className="d-grid gap-2">
                  <button onClick={UpdateProduct} className="btn btn-primary mt-3" id="product-button" type="button">Update Product</button>
                </div>
              </div>
            </form>

          </div>
        </div>
      </div>
    </>
  )
}

export default UpdateProduct
