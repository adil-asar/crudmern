import React, { useState } from 'react'

const Addproduct = () => {

  const [product, setproduct] = useState({
    name: "",
    price: "",
    category: "",
    company: "",
    error:false
  });

  // handle input data
  const handleChange = (event) => {
    const { name, value } = event.target;
    setproduct((preval) => ({ ...preval, [name]: value }));
  }

  // handle product data

  const handleSubmit = async (event) => {

    event.preventDefault();
    // const userid = JSON.parse(localStorage.getItem('newuser'))._id;

    if (!product.name || !product.price || !product.category || !product.company ) {
      alert("please enter details");
      setproduct({error:true})
      return false;
    }


    let res = await fetch("http://localhost:5500/add-product", {
      method: "POST",
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

    let resJson = await res.json();
    console.log(resJson);


  }



  return (
    <>

      <div className='addproduct'>
        <h1>
          Add Product Here
        </h1>

        <input
          type='text'
          name='name'
          className='input_product'
          onChange={handleChange}
          value={product.name}
          placeholder='Enter Product Name'
          autoComplete='off'
        />
        { product.error && !product.name &&
        <p> Enter Valid name </p>
        }

        <input
          type='text'
          name='price'
          className='input_product'
          onChange={handleChange}
          value={product.price}
          autoComplete='off'
          placeholder='Enter Product Price'
        />
        { product.error && !product.price &&
        <p> Enter Valid Price </p>
        }
        <input
          type='text'
          name='category'
          className='input_product'
          autoComplete='off'
          onChange={handleChange}
          value={product.category}
          placeholder='Enter Product Category'
        />
         { product.error && !product.category &&
        <p> Enter Valid Category </p>
        }
        <input
          type='text'
          name='company'
          className='input_product'
          autoComplete='off'
          onChange={handleChange}
          value={product.company}
          placeholder='Enter Product Company'
        />
        { product.error && !product.company &&
        <p> Enter Valid Company </p>
        }

        <button
          onClick={handleSubmit}
          className='product_btn'>
          Add Product
        </button>

      </div>

    </>
  )
}

export default Addproduct
