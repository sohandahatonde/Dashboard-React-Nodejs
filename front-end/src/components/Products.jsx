import { useEffect, useState } from "react"
import {Link} from 'react-router-dom'
import"./Products.css";

const Products = () => {
    const [product,setProduct] = useState([]);

    useEffect(()=>{
      getProducts();
    },[])

    const getProducts = async ()=>{
      let result = await fetch('http://localhost:5000/products',{
        headers:{
          authorization :`bearer ${JSON.parse(localStorage.getItem('token'))}`
        }
      });
      result = await result.json();
      setProduct(result);
    }
  
    const deleteProduct=async (id) =>{
      let result =await fetch(`http://localhost:5000/product/${id}`,{
        method:"Delete",
        headers:{
          authorization :`bearer ${JSON.parse(localStorage.getItem('token'))}`
        }
      });
      result = await result.json
      if (result) {
        alert("record is deleted...!")
        getProducts();
      }
    }

    const searchHandle = async () =>{
      let key = event.target.value
      if (key) {
        let result = await fetch(`http://localhost:5000/search/${key}`,{
          headers:{
            authorization :`bearer ${JSON.parse(localStorage.getItem('token'))}`
          }
        });
        result = await result.json();
        if (result) {
          setProduct(result);
        }
      }else{
        getProducts();
      }
    }
  return (
    <>
    <div className="mt-3">
       <center> <h3>Product List</h3></center>
    </div>
    <div className="d-flex justify-content-center search-bar mt-4" >
      <input type="text" id='search-bar' placeholder="Search Product" onChange={searchHandle}/>
    </div>
<table className="container table caption-top mt-4">
  <thead>
    <tr>
      <th scope="col" className="table-column"><center>SR.NO</center></th>
      <th scope="col" className="table-column"><center>Name</center></th>
      <th scope="col" className="table-column"><center>Price</center></th>
      <th scope="col" className="table-column"><center>Category</center></th>
      <th scope="col" className="table-column"><center>Company</center></th>
      <th scope="col" className="table-column"><center>Opreation</center></th>
    </tr>
  </thead>
  <tbody>

   {
    product.length>0 ? product.map((item,index)=>
     <>
     <tr key={item._id}>
       <th className="table-column"><center>{index+1}</center></th>
       <td className="table-column"><center>{item.name}</center></td>
       <td className="table-column"><center>$ {item.price}</center></td>
       <td className="table-column"><center>{item.category}</center></td>
       <td className="table-column"><center>{item.company}</center></td>
       <td className="table-column">
        <center>
        <button  onClick={()=>deleteProduct(item._id)}>Delete</button>
        <Link to={"/update/" +item._id}><button className="ms-3">Update</button></Link>
        </center>
       </td>
     </tr>
     </>
   )
   :  <h2>No Record Found</h2>
   }
   
  </tbody>
</table>

    </>
  )
}

export default Products
