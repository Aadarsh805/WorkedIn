import axios from "axios";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { BASE_URL, chatEnd } from "../../utils/APIRoutes";
import { userProps } from "../../utils/GlobalContants";
import { getHeaders, getUserData } from "../../utils/helperFunction";
import CreateChatModal from "./CreateChatModal";

const Section = styled.div`
  border-right: 2px solid rgba(137, 117, 88, 255);
  width: 16vw;
  padding-top: 1.3rem;

  &::-webkit-scrollbar {
      width: 0.4rem;
      &-thumb {
        background-color: #fff;
        width: 0.1rem;
        border-radius: 1rem;
      }
  }
`;

const Chat = styled.div`
  /* border: 1px solid red; */
  box-sizing: border-box;
  width: calc(16vw - 2rem);
  margin: 0rem 1rem 0.5rem;
  border-radius: 10px;
  padding: 0.5rem 0.2rem 0.5rem 0.5rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  background-color: #fff;
  background-color: rgba(236, 227, 212, 255);

  img {
    margin-right: 0.5rem;
    border-radius: 50%;
    width: 40px;
    height: 40px;
    -webkit-box-shadow: 0px 0px 5px 3px rgba(0, 0, 0, 0.22);
    -moz-box-shadow: 0px 0px 5px 3px rgba(0, 0, 0, 0.22);
    box-shadow: 0px 0px 5px 3px rgba(0, 0, 0, 0.22);
  }

  h4 {
    font-size: 1rem;
    font-weight: 800;
    color: #3a421b;
  }

  &:first-child{
    margin-top: 0.5rem;
  }
`;

const GroupChatButton = styled.div`
  /* border: 1px solid red; */
  width: calc(16vw - 2rem);
  margin: 0rem 1rem;
  display: flex;
  align-items: center;

  position: absolute;
  bottom: calc(1vh + 0.15rem);

  button{
    box-sizing: border-box;
    cursor: pointer;
    border-radius: 10px;
    width: 100%;
    height: 100%;
    padding: 0.7rem 0;
    border: none;
    font-size: 1.1rem;
    background-color: rgba(137,117,88,255);
    color: #fff;
    font-weight: 500;
  }
`;

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
  const [isCreateChatModalOpen, setIsCreateChatModalOpen] = useState(false);

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
    console.log("Lol");
    setIsCreateChatModalOpen(false);
  };

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
      <GroupChatButton>
        <button
          onClick={() => setIsCreateChatModalOpen(!isCreateChatModalOpen)}
          disabled={isCreateChatModalOpen ? true : undefined}
        >
          Creat Group Chat
        </button>
      </GroupChatButton>
      {isCreateChatModalOpen ? (
        <CreateChatModal
          user={user}
          closeCreatChatModal={closeCreatChatModal}
        />
      ) : null}
    </Section>
  );
};

export default AllChats;
