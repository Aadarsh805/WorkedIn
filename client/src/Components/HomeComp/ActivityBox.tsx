import React from 'react'
import styled from 'styled-components'

const Section = styled.div`
width: 20vw;
margin-top: 2rem;
height: 50vh;
/* height: fit-content; */
background-color: rgba(236,227,212,255);
border-radius: 12px;
display: flex;
flex-direction: column;
align-items: center;
-webkit-box-shadow: 6px 6px 0px 3px #3a421b;
-moz-box-shadow: 6px 6px 0px 3px #3a421b;
box-shadow: 6px 6px 0px 3px #3a421b; 
`

const ActivityBox = () => {
  return (
    <Section>ActivityBox</Section>
  )
}

export default ActivityBox