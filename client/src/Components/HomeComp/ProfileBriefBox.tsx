import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import { localStorageUser, userProps } from '../../utils/GlobalContants'

const Section = styled.div`
/* border: 1px solid red; */
width: 20vw;
margin-top: 2rem;
height: 50vh;
height: fit-content;
padding: 1rem 0;
background-color: #fff;
background-color: rgba(236,227,212,255);
border-radius: 12px;
display: flex;
flex-direction: column;
align-items: center;
-webkit-box-shadow: 6px 6px 0px 3px #3a421b;
-moz-box-shadow: 6px 6px 0px 3px #3a421b;
box-shadow: 6px 6px 0px 3px #3a421b; 

img{
  width: 4rem;
  height: 4rem;
  border-radius: 50%;
  /* margin: 1rem auto 0.7rem; */
  margin-bottom: 0.7rem;
  border: 1px solid white;
}
`

const ContractStats = styled.div`
  border: 1px solid #fff;
`

const ProfileBriefBox = () => {

  const [user, setUser] = useState<userProps>()

  useEffect(() => {
    async function fetchUserData() {
      const data = await JSON.parse(
        localStorage.getItem(localStorageUser) || "{}"
      );
      setUser(data);
    }
    fetchUserData();
  }, []);
  
  return (
    <Section>
      <img src={user?.photo} alt="" />
      <h3>{user?.name?.split(' ')[0]}</h3>
      <h3>🔥 4.3</h3>
      <ContractStats>
        <h4>🤝🏻 Successful Contracts</h4>
        <h4>📜 Total Contracts</h4>
        <h4>Popularity</h4>
      </ContractStats>
    </Section>
  )
}

export default ProfileBriefBox