import axios from "axios";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { BASE_URL, chatEnd } from "../../utils/apiRoutes";
import { getHeaders } from "../../utils/helperFunction";

import formatDistance from "date-fns/formatDistance";
import { userProps } from "../../types/userTypes";
import { chatObj } from "../../types/chatTypes";
import { messageProps } from "../../types/messageTypes";

interface ChatMessageStylesProps {
  singleChat: boolean
}

const Section = styled.div`
  /* border: 1px solid yellow; */
  height: calc(100vh - 2.5rem);
  width: ${(props: ChatMessageStylesProps) => props.singleChat ? '84vw' : '68vw'};
  position: relative;
  overflow: hidden;
  overflow-y: hidden;
`;

const Messages = styled.div`
  /* border: 4px solid purple; */
  height: calc(99vh - 5.5rem);
  padding: 1rem;
  padding-top: 1.5rem;
  box-sizing: border-box;
  overflow-y: auto;

  &::-webkit-scrollbar {
    width: 0.25rem;
    &-thumb {
      background-color: #fff;
      /* background-color: rgba(236, 227, 212, 255); */
      width: 0.1rem;
      border-radius: 1rem;
    }
}
`;

const Message = styled.div`
  /* border: 1px solid red; */
  display: flex;
  width: 95%;
  /* align-items: center; */
  margin-bottom: 1.2rem;
`;

const ImageContainer = styled.div`
  margin-right: 0.7rem;
  /* border: 1px solid blue; */
  img {
    /* border: 1px solid red; */
    border-radius: 50%;
    width: 2.6rem;
    height: 2.6rem;
    object-fit: cover;
  }
`;

const SenderDetails = styled.div`
  /* border: 1px solid red; */
  
  div {
    /* border: 1px solid red; */
    display: flex;

    /* align-items: flex-end; */

    h4 {
      margin: 0;
      padding: 0;
      font-size: 1rem;
      line-height: 100%;
      margin-right: 0.7rem;
      /* border: 1px solid red; */
    }
    
    h6{
      display: flex;
      /* font-weight: 400; */
      line-height: 100%;
      align-items: flex-end;
      /* border: 1px solid red; */
    }
  }

  h5{
    /* border: 1px solid red; */
    margin-top: 0.2rem;
    /* color: ; */
    /* color: rgba(236, 227, 212, 255); */
    /* color:#735F32; */
    font-size: 0.8rem;
    font-weight: 500;
    line-height: 160%;
  }
`;

const SendMessage = styled.div`
  position: absolute;
  bottom: 1vh;
  height: 3rem;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  /* border: 1px solid red; */

  form {
    height: 3rem;
    /* border: 1px solid red; */
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;

    input {
      height: 2.7rem;
      width: 95%;
      border-radius: 10px;
      outline: none;
      border: none;
      padding: 0 1rem;
      box-sizing: border-box;
      background-color:#3a421b;
      color: #fff;
      color: rgba(236,227,212,255);;
      font-weight: 500;
      font-size: 1.2rem;
      
      &::placeholder{
        color: rgba(236,227,212, 0.8);
        font-weight: 300;
      }
    }
  }
`;

interface chatMessageProps {
  user: userProps;
  selectedChat: chatObj;
}

const ChatMessages = ({ user, selectedChat }: chatMessageProps) => {
  const [messages, setMessages] = useState<Array<messageProps>>([]);
  const [chatMessage, setChatMessage] = useState("");

  async function fetchChatMessages() {
    const { data } = await axios.get(
      `${BASE_URL}${chatEnd}${selectedChat._id}/messages`,
      {
        headers: getHeaders(user.token ?? ""),
      }
    );
    console.log(data.msgs);
    setMessages(data.msgs);
  }

  useEffect(() => {
    if (selectedChat !== undefined) {
      fetchChatMessages();
    }
  }, [selectedChat]);

  const postMessageHandler = async () => {
    const { data } = await axios.post(
      `${BASE_URL}${chatEnd}${selectedChat._id}/messages`,
      {
        chatMessage,
      },
      {
        headers: getHeaders(user.token ?? ""),
      }
    );
    console.log(data);
  };

  return (
    <Section singleChat={selectedChat.chatName === "one_On_one"} >
      <Messages>
        {messages.map((message) => {
          const date = formatDistance(new Date(message.createdAt), new Date());
          return (
            <Message key={message._id}>
              <ImageContainer>
                <img src={message.sender.photo} alt="" />
              </ImageContainer>
              <SenderDetails>
                <div>
                  <h4>{message.sender.name}</h4>
                  <h6>{date} ago</h6>
                </div>
                <h5>{message.content}</h5>
              </SenderDetails>
            </Message>
          );
        })}
      </Messages>
      <SendMessage>
        <form onSubmit={postMessageHandler}>
          <input
            type="text"
            value={chatMessage}
            onChange={(e) => setChatMessage(e.target.value)}
            placeholder="Message ......"
            autoFocus
          />
        </form>
      </SendMessage>
    </Section>
  );
};

export default ChatMessages;
