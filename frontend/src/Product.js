import React, { useEffect, useState } from 'react'
import {NavLink} from 'react-router-dom';
const Product = () => {

  const [allproduct, setallproduct] = useState([]);

  useEffect(() => {
    getdata();
  }, []);

  const getdata = async () => {

    let result = await fetch('http://localhost:5500/products',  {
      headers:{
        authorization:`bearer ${JSON.parse(localStorage.getItem('token'))
      }`} });
    result = await result.json();
    setallproduct(result);
  }

  // delete single product
  const deleteProduct =async (id) => {
    let result = await fetch(`http://localhost:5500/product/${id}` ,
     { 
      method:'DELETE',
      headers:{
        authorization:`bearer ${JSON.parse(localStorage.getItem('token'))
      }`}
    });
    result = await result.json();
    if (result) {
      getdata();
    }
  }

  // search function

  const handlesearch = async (e) => {
let key =e.target.value;
if (key) {
  
let result = await fetch(`http://localhost:5500/search-product/${key}` , {
  headers:{
    authorization:`bearer ${JSON.parse(localStorage.getItem('token'))
  }`} } );
result = await result.json()
if(result){
  setallproduct(result)
}
} else {
  getdata()
}


  }


  return (
    <>
      <div className='product-list'>

        <h1>
          All Products
        </h1>
      
      {/* input for searching products */}

     
        <input type="text"
        placeholder='search product here '
         className='input-search'
         onChange={handlesearch}
        //  value=""
          />
      

        <table>
          <thead>
            <tr>
              <th>S.No</th>
              <th>Name</th>
              <th>Price</th>
              <th>Category</th>
              <th>Company</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>



            { allproduct.length > 0 ? allproduct.map((item, index) =>

              <tr key={item._id}>
                <td> {index + 1} </td>
                <td> {item.name} </td>
                <td> {item.price}$ </td>
                <td> {item.category} </td>
                <td>  {item.company} </td>
                <td className='actions_column'>


                  <button
                  onClick={ ()=>deleteProduct(item._id) } 
                    className='delete'>
                    Delete
                  </button>
                   <NavLink to={`/update/${item._id}`}>
                   <button
                    className='delete'>
                    Update
                  </button>
                   </NavLink>
                    
                </td>
              </tr>

            ) : 
            <h1 className='result'>No Result Found </h1>
          }

          </tbody>
        </table>


      </div>
    </>
  )
}

export default Product
