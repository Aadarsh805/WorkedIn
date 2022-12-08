import React from 'react'
import styled from 'styled-components'

const Section = styled.div`
border: 1px solid red;
width: 84vw;
padding: 2rem;
box-sizing: border-box;
`

const SearchUser = styled.div`
width: 100%;
/* border: 1px solid red; */
display: flex;
flex-direction: column;
align-items: center;
justify-content: center;
margin-bottom: 2rem;

input{
  width: 80%;
  /* margin: 0 auto;  */
  padding: 0.7rem 1rem;
  box-sizing: border-box;
  font-size: 1rem;
  font-weight: 500;
  outline: none;
  border: none;
  border-radius: 10px;
  color: rgb(58, 66, 27);
  background-color: #FAF8F1;

  ::placeholder{
      color: rgb(58, 66, 27);
    }
}
`

const SuggestedUsers = styled.div`
  border: 1px solid #fff;
`

const Users = styled.div`
  display: grid;
  grid-template-columns: auto auto;
`

const NoSelectedChat = () => {
  return (
    <Section>
        <SearchUser>
        <input type="text" placeholder='Search Users ...'/>
        </SearchUser>
        <SuggestedUsers>
          <h2>Suggested Devs for you</h2>
          <Users>
            
          </Users>
        </SuggestedUsers>
    </Section>
  )
}

export default NoSelectedChat