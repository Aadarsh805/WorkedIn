import axios from "axios";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { BASE_URL, chatEnd } from "../../utils/APIRoutes";
import { userProps } from "../../utils/GlobalContants";
import { getHeaders, getUserData } from "../../utils/helperFunction";
import CreateChatModal from "./CreateChatModal";

const Section = styled.div`
  border-right: 2px solid #3a421b;
  /* min-height: calc(100vh - 3rem); */
  width: 16vw;
  padding-top: 1.3rem;
`;

const Chat = styled.div`
  /* border: 1px solid red; */
  box-sizing: border-box;
  width: calc(16vw - 2rem);
  margin: 0.2rem 1rem;
  border-radius: 10px;
  padding: 0.5rem 0.2rem 0.5rem 0.5rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  /* background-color: #3a421b; */
  background-color: #fff;
  background-color: rgba(236,227,212,255);

  img {
    margin-right: 0.5rem;
    border-radius: 50%;
    width: 40px;
    height: 40px;
    border: 1px solid #fff;
  }

  h4 {
    font-size: 1rem;
    font-weight: 800;
    color: #fff;
    color: #3a421b;
  }
`;

const GroupChatButton = styled.div`
border: 1px solid red;
box-sizing: border-box;
  width: calc(16vw - 2rem);
  border: 1px solid red;
  margin: 0.2rem 1rem;
  border-radius: 10px;
  padding: 0.5rem 0.2rem 0.5rem 0.5rem;
  cursor: pointer;
  display: flex;
  align-items: center;

  position: absolute;
  bottom: 3vh;
`

interface allChatProps {
  user: userProps;
  setSelectedChat: any;
}

interface groupMemberProps {
  _id: string;
  name: string;
  photo: string;
}

interface chatsArr {
  chatName: string;
  contracted: Boolean;
  chatPhoto: string;
  createdAt: string;
  groupAdmin: {
    _id: string;
    name: string;
    photo: string;
  };
  isGroupChat: Boolean;
  users: groupMemberProps;
  _id: string;
}

const AllChats = ({ user, setSelectedChat }: allChatProps) => {

  const [allChats, setAllChats] = useState<Array<chatsArr>>([]);
  const [isCreateChatModalOpen, setIsCreateChatModalOpen] = useState(false)

  async function fetchUserChats() {
    const { data } = await axios.get(`${BASE_URL}${chatEnd}`, {
      headers: getHeaders(user.token ?? ""),
    });
    // console.log(data.chats);
    setAllChats(data.chats);
  }

  useEffect(() => {
    // console.log(user.token);
    if (user.token) {
      fetchUserChats();
    }
  }, [user.token]);

  const closeCreatChatModal = () => {
    console.log('Lol');
    setIsCreateChatModalOpen(false);
}

  return (
    <Section>
      {allChats.map((chat, index) => {
        if (chat.chatName === "one_On_one") {
          const chatUsers = chat.users;
          const filteredUser = (chatUsers as unknown as any[]).filter(
            (chatUser) => {
              return chatUser.name !== user.name;
            }
          );
          console.log(filteredUser[0].name);
          return (
            <Chat key={index} onClick={() => setSelectedChat(chat)}>
              <img src={filteredUser[0].photo} alt="" />
              <h4>{filteredUser[0].name}</h4>
            </Chat>
          );
        }

        return (
          <Chat key={index} onClick={() => setSelectedChat(chat)}>
            <img src={chat.chatPhoto} alt="" />
            <h4>{chat.chatName}</h4>
          </Chat>
        );
      })}
      <GroupChatButton >
        <button onClick={() => setIsCreateChatModalOpen(!isCreateChatModalOpen)} disabled={isCreateChatModalOpen ? true : undefined} >
        Creat Group Chat
        </button>
      </GroupChatButton>
      {
        isCreateChatModalOpen ? 
        <CreateChatModal user={user} closeCreatChatModal={closeCreatChatModal}/> : null
      }
    </Section>
  );
};

export default AllChats;
