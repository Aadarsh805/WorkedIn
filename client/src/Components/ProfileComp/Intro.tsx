import React from 'react'
import styled from 'styled-components'
import Connect from './Connect'

const Section = styled.div`
border: 1px solid red;
margin-bottom: 1rem;
`

const Header = styled.header`
  
`

const Intro = () => {
  return (
    <Section>
      <Header>
        <img src="" alt="" />
        <h1>Garvit Varshney</h1>
        <h3>User Designation</h3>
        <Connect/>
      </Header>
    </Section>
  )
}

// Name | Designation | Socials | Photo

export default Intro