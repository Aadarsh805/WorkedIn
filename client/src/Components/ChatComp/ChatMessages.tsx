import axios from "axios";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { BASE_URL, chatEnd } from "../../utils/APIRoutes";
import { userProps } from "../../utils/GlobalContants";
import { getHeaders } from "../../utils/helperFunction";

import formatDistance from "date-fns/formatDistance";

const Section = styled.div`
  /* border: 1px solid yellow; */
  height: calc(100vh - 2.5rem);
  /* width: 100%; */
  width: 68vw;
  position: relative;
  overflow: hidden;
  overflow-y: hidden;
`;

const Messages = styled.div`
  height: calc(99vh - 5.5rem);
  /* border: 1px solid purple; */
  padding: 1rem;
  box-sizing: border-box;
  overflow-y: auto;
`;

const Message = styled.div`
  border: 1px solid red;
  display: flex;
  /* align-items: center; */
  margin-bottom: 1rem;
`;

const ImageContainer = styled.div`
  margin-right: 0.7rem;
  img {
    border-radius: 50%;
    width: 2rem;
    height: 2rem;
    object-fit: contain;
  }
`;

const SenderDetails = styled.div`
  border: 1px solid red;

  div {
    display: flex;
    align-items: center;
    /* justify-content: center; */

    h4 {
      margin-right: 0.6rem;
    }
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
}

interface chatMessageProps {
  user: userProps;
  selectedChat: chatObj;
}

interface messageProps {
  chat: string;
  content: string;
  createdAt: string;
  sender: {
    name: string;
    photo: string;
    _id: string;
  };
  _id: string;
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
    <Section>
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
                  <h6>{date}</h6>
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
