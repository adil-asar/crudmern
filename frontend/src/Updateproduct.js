import React, { useEffect, useState } from 'react'
import {useParams,useNavigate} from 'react-router-dom'

const Updateproduct = () => {

  const [product, setproduct] = useState({
    name: "",
    price: "",
    category: "",
    company: ""
    // error:false
  });

  const params  = useParams();
  const navigate = useNavigate();

  // useeffect hook for prefilled form

  useEffect(()=>{
    getproductdata()
  },[])

  // function  for fetching data from db

  const getproductdata = async () => {
  
    let res = await fetch(`http://localhost:5500/singleproduct/${params.id}` , {
      headers:{
        authorization:`bearer ${JSON.parse(localStorage.getItem('token'))
      }`} })
        res = await res.json();
        console.log(res)

        setproduct({
          name:res.name,
          price:res.price,
          category:res.category,
          company:res.company
        })

  }


  // handle input data
  const handleChange = (event) => {
    const { name, value } = event.target;
    setproduct((preval) => ({ ...preval, [name]: value }));
  }

  // handle product data

  const handleUpdate = async (event) => {

    event.preventDefault();
    
    let res = await fetch(`http://localhost:5500/update-product/${params.id}`, {
      method: "PUT",
      body: JSON.stringify({
        name: product.name,
        price: product.price,
        category: product.category,
        company: product.company,
      }),
      headers: {
        'Content-Type': 'application/json',
        authorization:`bearer ${JSON.parse(localStorage.getItem('token'))
      }`
      },
    });
       alert("data updated successfully");
       navigate('/')
    res =  await res.json();
    console.log(res)

   

  }



  return (
    <>

      <div className='addproduct'>
        <h1>
          Update Product Here
        </h1>

        <input
          type='text'
          name='name'
          className='input_product'
          onChange={handleChange}
          value={product.name}
          placeholder='Enter Product Name'
        />
       

        <input
          type='text'
          name='price'
          className='input_product'
          onChange={handleChange}
          value={product.price}
          placeholder='Enter Product Price'
        />
        

        <input
          type='text'
          name='category'
          className='input_product'
          onChange={handleChange}
          value={product.category}
          placeholder='Enter Product Category'
        />
        

        <input
          type='text'
          name='company'
          className='input_product'
          onChange={handleChange}
          value={product.company}
          placeholder='Enter Product Company'
        />
        

        <button
          onClick={handleUpdate}
          className='product_btn'>
          Update Product
        </button>

      </div>

    </>
  )
}

export default Updateproduct
