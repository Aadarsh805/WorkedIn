import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import AllChats from '../Components/ChatComp/AllChats'
import ChatMembers from '../Components/ChatComp/ChatMembers'
import ChatMessages from '../Components/ChatComp/ChatMessages'

import Navbar from '../Components/GeneralComp/Navbar'
import { userProps } from '../Utils/GlobalContants'
import { getUserData } from '../Utils/helperFunction'

const Section = styled.div`
    /* border: 1px solid red; */
    min-height: calc(100vh - 3rem);
    display: flex;
    overflow-y: hidden;
`

interface groupMemberProps {
  _id: string;
  name: string;
  photo: string;
}

interface chatObj {
  chatName?: string;
  contracted?: Boolean;
  chatPhoto?: string;
  createdAt?: string;
  groupAdmin?: {
    _id?: string;
    name?: string;
    photo?: string;
  };
  isGroupChat?: Boolean;
  users?: groupMemberProps;
  _id?: string;
}

interface chat {
  selectedChat: chatObj
}

const Chats = () => {
  const [userData, setUserData] = useState<userProps>({});
  const [selectedChat, setSelectedChat] = useState<chatObj>();

    useEffect(() => {
        const user = getUserData();
        setUserData(user)
    }, [])

    // useEffect(() => {
    //   console.log("Selected Chat :- " + JSON.stringify(selectedChat)); 
    // }, [selectedChat])
    

  return (
    <>
    <Navbar/>
    <Section>
          <AllChats user={userData} setSelectedChat={setSelectedChat} />
          {
            selectedChat && <ChatMessages user={userData} selectedChat={selectedChat} />
          }
          {
            selectedChat && <ChatMembers selectedChat={selectedChat} />
          }
    </Section>
    </>
  )
}

export default Chats