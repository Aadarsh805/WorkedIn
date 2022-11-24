import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios'
import { localStorageUser } from '../Utils/GlobalContants';

const Section = styled.div`
height: 100vh;
display: flex;
align-items: center;
justify-content: center;

form{
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    border: 1px solid red;
}
`

const Login = () => {
    const navigate = useNavigate();

    interface userProps {
        email: string,
        password: string
    }
    const [user, setUser] = useState<userProps>()

    const handleChange = (e:React.ChangeEvent<HTMLInputElement>) => {
        setUser({...user, [e.target.name]: e.target.value } as userProps)
    }

    const handleSubmit = async (e : any) => {
        e.preventDefault()
        const {data} = await axios.post('http://localhost:5000/api/v1/users/login', {
            email: user?.email,
            password: user?.password 
        });
        console.log(data.user);
        if (data.status === 'success') {
            localStorage.setItem(localStorageUser, JSON.stringify(data.user))
            navigate('/')
        }
    }

    const handleForgetPassword = async (e : any) => {
        if (!user?.email) {
            console.log("Enter email");
            return
        }
        const {data} = await axios.post('http://localhost:5000/api/v1/users/forgotpassword', {
            email: user?.email
        })
        console.log(data);
    }

  return (
    <Section>
        <form onSubmit={handleSubmit}>
            <input type="email" name="email" placeholder='Email' value={user?.email} onChange={(e) => handleChange(e)} />
            <input type="password" name="password" placeholder='Password' value={user?.password} onChange={(e) => handleChange(e)} />
            <button type="submit">Login</button>
        </form>
            <button onClick={handleForgetPassword} >Forgot Password??</button>
    </Section>
  )
}

export default Login

// Error handling