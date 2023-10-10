import React, { useState ,useEffect} from 'react'
import { useNavigate } from 'react-router-dom';
const Signup = () => {


    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: ""
    });

   

  useEffect(() => {
    const auth = localStorage.getItem('newuser');
    if (auth) {
      navigate('/');
    }
  })


    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
       
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        let res = await fetch("http://localhost:5500/register", {
            method: "POST",
            body: JSON.stringify({
            name: formData.name,
            email: formData.email,
            password: formData.password
            }),
            headers: {
                'Content-Type': 'application/json',
               authorization:`bearer ${JSON.parse(localStorage.getItem('token'))}`
              },
        });
      
         res = await res.json();
        console.log(res);
        navigate('/');
        localStorage.setItem('newuser',JSON.stringify(res.result));
        localStorage.setItem("token",JSON.stringify(res.auth));
    
    };


    return (
        <>
            <div className="signup">
                <h1>
                    sign up here
                </h1>

                <input
                    type="text"
                    name='name'
                    autoComplete='off'
                    className='input_css'
                    value={formData.name}
                    onChange={handleChange}
                    placeholder='Enter Your Name'
                />
                <input
                    type="email"
                    name="email"
                    autoComplete='off'
                    className='input_css'
                    value={formData.email}
                    onChange={handleChange}
                    placeholder='Enter Your Mail'
                />
                <input
                    type="password"
                    name='password'
                    className='input_css'
                    value={formData.password}
                    onChange={handleChange}
                    placeholder='Enter Your Password'
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

export default Signup
