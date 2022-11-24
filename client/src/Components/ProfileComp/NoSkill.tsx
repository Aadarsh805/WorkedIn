import React from 'react'
import styled from 'styled-components'

const Section = styled.div`
margin: 0 1vw;
  margin-bottom: 1rem;
  border: 1px solid red;
  min-height: 7rem;
  /* z-index: 1; */
`

const NoSkill = () => {
  return (
    <Section>
      Show your skills to people
    </Section>
  )
}

export default NoSkill