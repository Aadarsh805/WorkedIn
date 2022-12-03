import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import { localStorageUser } from '../utils/GlobalContants';

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

const Register = () => {

    const navigate = useNavigate()

    interface newUserProps {
        name: string,
        email: string,
        password: string,
        confirmPassword: string,
    }

    const [user, setUser] = useState<newUserProps>()

    const handleChange = (e:React.ChangeEvent<HTMLInputElement>) => {
        setUser({...user, [e.target.name]: e.target.value } as newUserProps)
    }

    const handleSubmit = async (e : any) => {
        e.preventDefault()
        const {data} = await axios.post('http://localhost:5000/api/v1/users/signup', {
            name: user?.name,
            email: user?.email,
            password: user?.password,
            passwordConfirm: user?.confirmPassword
        })
        // console.log(data.status);
        // console.log(data.user);
        
        if (data.status === 'success') {
            data.user.token = data.token
            localStorage.setItem(localStorageUser, JSON.stringify(data.user))   
            navigate('/')
        }
    }

    // Verification
    // API Integ
    // JWT Token

  return (
    <Section>
        <form onSubmit={handleSubmit}>
            <input type="text" name="name" placeholder='Username' value={user?.name} onChange={(e) => handleChange(e)} />
            <input type="email" name="email" placeholder='Email' value={user?.email} onChange={(e) => handleChange(e)} />
            <input type="password" name="password" placeholder='Password' value={user?.password} onChange={(e) => handleChange(e)} />
            <input type="password" name="confirmPassword" placeholder='ConfirmPassword' value={user?.confirmPassword} onChange={(e) => handleChange(e)} />
            <button type="submit">Register</button>
        </form>
    </Section>
  )
}

export default Register