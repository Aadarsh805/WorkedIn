import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import styled from 'styled-components'

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

    interface userProps {
        name: string,
        email: string,
        password: string,
        confirmPassword: string,
    }

    const [user, setUser] = useState<userProps>()

    const handleChange = (e:React.ChangeEvent<HTMLInputElement>) => {
        setUser({...user, [e.target.name]: e.target.value } as userProps)
    }

    const handleSubmit = (e : any) => {
        e.preventDefault()
        alert(JSON.stringify(user));
        // navigate('/')
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