import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';

const Login = () => {

    const [loginData, setloginData] = useState({
        email: "",
        password: ""
    });

    // useeffect for auth

    useEffect(()=>{

        const auth = localStorage.getItem('newuser');
        if (auth) {
            jump('/')
        }

    })

    // navigate

    const jump = useNavigate();

    // onchange function

    const handleChange = (event) => {
        const { name, value } = event.target;
        setloginData((prevFormData) => ({
            ...prevFormData, [name]: value
        }))
    }

    // submit function

    const handleSubmit = async (event) => {
        
        event.preventDefault(); 
     
        let res = await fetch("http://localhost:5500/login", {
            method: "POST",
            body: JSON.stringify({
              email: loginData.email,
              password:loginData.password ,
            }),
            headers: {
                'Content-Type': 'application/json',
                authorization:`bearer ${JSON.parse(localStorage.getItem('token'))}`
              }
          });

         res = await res.json();
          console.log(res);


          if (res.auth) {
            localStorage.setItem("newuser",JSON.stringify(res.user));
            localStorage.setItem("token",JSON.stringify(res.auth));
            jump("/");
          } else {
            alert('please enter correct info')
          }

    }


    return (
        <>

            <div className="signup">
                <h1>
                    sign in here
                </h1>

                <input
                    type="email"
                    name="email"
                    autoComplete='off'
                    className='input_css'
                    placeholder='Enter Your Mail'
                    value={loginData.email}
                    onChange={handleChange}
                />
                <input
                    type="password"
                    name='password'
                    className='input_css'
                    placeholder='Enter Your Password'
                    value={loginData.password}
                    onChange={handleChange}
                />

                <button
                    onClick={handleSubmit}
                    className='btn_css'>
                    Submit
                </button>

            </div>

        </>
    )
}

export default Login
