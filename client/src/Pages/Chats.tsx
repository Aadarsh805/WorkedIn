import axios from 'axios'
import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import AllChats from '../components/chatComp/AllChats'
import ChatMembers from '../components/chatComp/ChatMembers'
import ChatMessages from '../components/chatComp/ChatMessages'
import NoSelectedChat from '../components/chatComp/NoSelectedChat'

import Navbar from '../components/generalComp/Navbar'
import { chatObj } from '../types/chatTypes'
import { userProps } from '../types/userProps'
import { BASE_URL, chatEnd } from '../utils/APIRoutes'
import { getHeaders, getUserData } from '../utils/helperFunction'

const Section = styled.div`
    box-sizing: border-box;
    min-height: calc(100vh - 2.5rem);
    display: flex;
    overflow-y: hidden;
    position: relative;
    z-index: 1;
    background-color: rgba(207,186,148,255);

    overflow-y: hidden;

    &::-webkit-scrollbar {
    display: none;
    width: 0;
}
`

const Chats = () => {
  const [userData, setUserData] = useState<userProps>({});
  const [allChats, setAllChats] = useState<chatObj[]>([]);
  const [selectedChat, setSelectedChat] = useState<chatObj>();
  // const [accessedChat, setAccessedChat] = useState<chatObj>()


    useEffect(() => {
        const user = getUserData();
        setUserData(user)
    }, [])

    async function fetchUserChats() {
      const { data } = await axios.get(`${BASE_URL}${chatEnd}`, {
        headers: getHeaders(userData.token ?? ""),
      });
      setAllChats(data.chats);
    }
  
    useEffect(() => {
      if (userData.token) {
        fetchUserChats();
      }
    }, [userData.token]);
    
  return (
    <>
    <Navbar/>
    <Section className='chats' >
          <AllChats user={userData} setSelectedChat={setSelectedChat} allChats={allChats!} />
          {
            selectedChat ? null : <NoSelectedChat user={userData} setSelectedChat={setSelectedChat} allChats={allChats} setAllChats={setAllChats} />
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