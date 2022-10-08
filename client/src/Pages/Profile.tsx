import React from 'react'
import styled from 'styled-components'


import Navbar from '../Components/GeneralComp/Navbar'
import Intro from '../Components/ProfileComp/Intro'
import PastProjects from '../Components/ProfileComp/PastProjects'
import Skills from '../Components/ProfileComp/Skills'

const Section = styled.div`
border: 1px solid black;

margin: 1rem;
/* display: flex; */
`

const Profile = () => {
  return (
    <>
    <Navbar/>
    <Section>
      <Intro />
      <Skills/>
      <PastProjects/>
    </Section>
    </>
  )
}

// Intro
// Skills
// Past Projects

export default Profile