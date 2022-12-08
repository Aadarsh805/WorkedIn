import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import AllChats from '../components/chatComp/AllChats'
import ChatMembers from '../components/chatComp/ChatMembers'
import ChatMessages from '../components/chatComp/ChatMessages'
import NoSelectedChat from '../components/chatComp/NoSelectedChat'

import Navbar from '../components/generalComp/Navbar'
import { userProps } from '../utils/GlobalContants'
import { getUserData } from '../utils/helperFunction'

const Section = styled.div`
    /* border: 1px solid red; */
    /* padding-top: 1rem; */
    box-sizing: border-box;
    min-height: calc(100vh - 2.5rem);
    display: flex;
    overflow-y: hidden;
    position: relative;
    z-index: 1;
    background-color: rgba(207,186,148,255);
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
  users?: Array<groupMemberProps>;
  _id?: string;
  contractId?: string;
  contractAprovedBy: Array<string>;
  contractApproved: Boolean
}

const Chats = () => {
  const [userData, setUserData] = useState<userProps>({});
  const [selectedChat, setSelectedChat] = useState<chatObj>();

    useEffect(() => {
        const user = getUserData();
        setUserData(user)
    }, [])

  return (
    <>
    <Navbar/>
    <Section>
          <AllChats user={userData} setSelectedChat={setSelectedChat} />
          {
            selectedChat ? null : <NoSelectedChat/>
          }
          {
            selectedChat && <ChatMessages user={userData} selectedChat={selectedChat} />
          }
          {
            selectedChat && <ChatMembers selectedChat={selectedChat} user={userData} />
          }
    </Section>
    </>
  )
}

export default Chats