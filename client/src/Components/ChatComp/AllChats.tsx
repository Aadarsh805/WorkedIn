import React, { useState } from "react";
import styled from "styled-components";
import CreateChatModal from "./chatModals/CreateChatModal";
import { BsFillUnlockFill, BsFillLockFill } from 'react-icons/bs'
import { userProps } from "../../types/userProps";
import { chatObj } from "../../types/chatTypes";

const Section = styled.div`
  border-right: 2px solid rgba(137, 117, 88, 255);
  width: 16vw;
  height: calc(100vh - 2.5rem);
`;

const Chats = styled.div`
  /* border: 1px solid white; */
  box-sizing: border-box;
  padding-top: 1.3rem;
  overflow-y: auto;
  overflow-x: hidden;
  height: calc(100vh - 6.75rem);

  &::-webkit-scrollbar {
    width: 0.15rem;
    &-thumb {
      background-color: #fff;
      background-color: rgba(137, 117, 88, 255);
      width: 0.1rem;
      border-radius: 1rem;
    }
}
`

const Chat = styled.div`
  /* border: 1px solid red; */
  box-sizing: border-box;
  width: 90%;
  margin: 0.5rem auto;
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
    object-fit: cover;
    -webkit-box-shadow: 0px 0px 5px 3px rgba(0, 0, 0, 0.22);
    -moz-box-shadow: 0px 0px 5px 3px rgba(0, 0, 0, 0.22);
    box-shadow: 0px 0px 5px 3px rgba(0, 0, 0, 0.22);
  }

  h4 {
    font-size: 1rem;
    font-weight: 800;
    color: #3a421b;
    width: calc(14.4vw - 1.2rem - 40px - 1.15rem - 0.8rem);
    white-space: nowrap;
    overflow: hidden;
    /* border: 1px solid #000; */
  }
  
  svg{
    fill: #3a421b;
    margin-right: 0.15rem;
    width: 1rem;
    /* border: 1px solid #000; */
  }
  
  div{
    /* border: 1px solid #000; */
    overflow: hidden;
    /* height: 1rem; */
    white-space: nowrap;
    display: flex;
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: calc(14.4vw - 1.2rem - 40px);
  }

  &:first-child{
    margin-top: 0.5rem;
  }
`;

const GroupChatButton = styled.div`
  /* border: 1px solid red; */
  width: calc(16vw - 2rem);
  margin: 0.8rem auto 0;
  display: flex;
  align-items: center;

  /* position: absolute; */
  /* bottom: calc(1vh + 0.15rem); */

  button {
    border-radius: 4px;
    cursor: pointer;
    padding: 12px 24px;
    background-color: #735f32;
    box-sizing: border-box;
    font-size: 1rem;
    color: #fff;
    font-weight: 400;
    border: 2px solid rgba(236, 227, 212, 255);
    /* border: 2px solid #3a421b; */
    box-shadow: 3px 3px 0px rgba(236, 227, 212, 255);
    translate: -3px -3px;
    transition: all 0.15s ease-in;
    /* line-height: 0; */

    &:hover {
      translate: 0;
      box-shadow: 0 0 0;
    }
  }
`;

interface allChatProps {
  user: userProps;
  setSelectedChat: any;
  allChats: Array<chatObj>
}

const AllChats = ({ user, setSelectedChat, allChats }: allChatProps) => {

  const [isCreateChatModalOpen, setIsCreateChatModalOpen] = useState(false);

  const closeCreatChatModal = () => {
    console.log("Lol");
    setIsCreateChatModalOpen(false);
  };

  return (
    <Section>
      <Chats>
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
            <div>
            <h4>{chat.chatName}</h4>
            {
              chat.contractApproved ? <BsFillLockFill/> : <BsFillUnlockFill/>
            }
            </div>
          </Chat>
        );
      })}
      </Chats>
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
