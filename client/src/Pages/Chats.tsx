import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import AllChats from '../Components/ChatComp/AllChats'
import ChatMembers from '../Components/ChatComp/ChatMembers'
import ChatMessages from '../Components/ChatComp/ChatMessages'

import Navbar from '../Components/GeneralComp/Navbar'
import { userProps } from '../Utils/GlobalContants'
import { getUserData } from '../Utils/helperFunction'

const Section = styled.div`
    border: 1px solid red;
    min-height: calc(100vh - 3rem);
    display: flex;
`

const Chats = () => {
  const [userData, setUserData] = useState<userProps>({})
    useEffect(() => {
        const user = getUserData();
        setUserData(user)

    }, [])

  return (
    <>
    <Navbar/>
    <Section>
          <AllChats user={userData} />
          <ChatMessages/>
          <ChatMembers/>
    </Section>
    </>
  )
}

export default Chats