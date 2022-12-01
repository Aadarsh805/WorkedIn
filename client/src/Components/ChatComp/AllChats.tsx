import axios from "axios";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { BASE_URL, chatEnd } from "../../Utils/APIRoutes";
import { userProps } from "../../Utils/GlobalContants";
import { getHeaders, getUserData } from "../../Utils/helperFunction";
import CreateChatModal from "./CreateChatModal";

const Section = styled.div`
  border: 1px solid red;
  /* min-height: calc(100vh - 3rem); */
  width: 16vw;
  padding-top: 0.8rem;
  
`;

const Chat = styled.div`
  box-sizing: border-box;
  width: calc(16vw - 2rem);
  border: 1px solid red;
  margin: 0.2rem 1rem;
  border-radius: 10px;
  padding: 0.5rem 0.2rem 0.5rem 0.5rem;
  cursor: pointer;
  display: flex;
  align-items: center;

  img {
    margin-right: 0.5rem;
    border-radius: 50%;
    width: 40px;
    height: 40px;
  }

  h4 {
    font-size: 1rem;
    font-weight: 500;
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
  const [isChatModalOpen, setIsChatModalOpen] = useState(false)

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
      <GroupChatButton onClick={() => setIsChatModalOpen(!isChatModalOpen)}>
        Creat Group Chat
      </GroupChatButton>
      {
        isChatModalOpen ? 
        <CreateChatModal user={user} /> : null
      }
    </Section>
  );
};

export default AllChats;
