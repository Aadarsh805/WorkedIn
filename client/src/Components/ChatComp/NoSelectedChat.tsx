import React from 'react'
import styled from 'styled-components'

const Section = styled.div`
border: 1px solid red;
width: 84vw;
`

const SearchUser = styled.div`

`

const NoSelectedChat = () => {
  return (
    <Section>
        <SearchUser>
        <input type="text" name="" id="" />
        </SearchUser>
        
    </Section>
  )
}

export default NoSelectedChat