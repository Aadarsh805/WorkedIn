import React from 'react'
import styled from 'styled-components'
import Navbar from '../Components/GeneralComp/Navbar'

const Section = styled.div`
    background-color: ${props => props.theme.grey};
    min-height: 100vh;
`

const Home = () => {
  return (
    <>
    <Navbar/>
    <Section>

    </Section>
    </>
  )
}

export default Home