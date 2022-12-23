import React, { useState } from "react";
import styled from "styled-components";
import CreateChatModal from "./chatModals/CreateChatModal";
import { BsFillUnlockFill, BsFillLockFill } from "react-icons/bs";
import { userProps } from "../../types/userTypes";
import { chatObj } from "../../types/chatTypes";
import { BrokenLock, BrokenLock2 } from "../generalComp/SVG";
import { MdOutlineDoneAll, MdRemoveDone } from "react-icons/md";
import { AiOutlineFileDone } from "react-icons/ai";
import { IoMdDoneAll } from "react-icons/io";

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
`;

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
  position: relative;

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
    width: calc(14.4vw - 3.15rem - 40px);
    white-space: nowrap;
    overflow: hidden;
    /* border: 1px solid #000; */
  }

  svg {
    fill: #3a421b;
    /* fill: #000; */
    margin-right: 0.15rem;
    width: 1rem;
    height: 1rem;
    transform: scale(1.25);
    /* border: 1px solid #000; */
  }

  div {
    /* overflow: hidden; */
    white-space: nowrap;
    display: flex;
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: calc(14.4vw - 1.2rem - 40px);
  }

  div.broken{
    /* border: 1px solid red; */
    position: absolute;
    width: 1.6rem;
    right: 0;
    /* margin: auto 0; */

    svg{
      /* border: 1px solid black; */
      transform: scale(2.5);
      width: 2rem;
    }
  }

  &:first-child {
    margin-top: 0.5rem;
  }
`;

const GroupChatButton = styled.div`
  /* border: 1px solid red; */
  width: 100%;
  margin: 0.8rem 0 0;
  
  display: flex;
  align-items: center;
  
  
  button {
    border-radius: 4px;
    margin: 0 auto;
    cursor: pointer;
    padding: 12px 24px;
    background-color: #735f32;
    box-sizing: border-box;
    font-size: 1rem;
    color: #fff;
    font-weight: 400;
    border: 2px solid rgba(236, 227, 212, 255);
    box-shadow: 3px 3px 0px rgba(236, 227, 212, 255);
    translate: -3px -3px;
    transition: all 0.15s ease-in;

    &:hover {
      translate: 0;
      box-shadow: 0 0 0;
    }
  }
`;

interface allChatProps {
  user: userProps;
  setSelectedChat: any;
  allChats: Array<chatObj>;
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
                {chat.contractBroken ? (
                  <div className="broken">
                  <BrokenLock />
                  </div>
                ) : chat.contractSuccessful ? <IoMdDoneAll/> : chat.contractApproved ? (
                  <BsFillLockFill />
                ) : (
                  <BsFillUnlockFill />
                )}
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
