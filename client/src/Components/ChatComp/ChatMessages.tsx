import axios from "axios";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { BASE_URL, chatEnd } from "../../Utils/APIRoutes";
import { userProps } from "../../Utils/GlobalContants";
import { getHeaders } from "../../Utils/helperFunction";

import formatDistance from "date-fns/formatDistance";

const Section = styled.div`
  border: 1px solid blue;
  /* min-height: calc(100vh - 3rem); */
  width: 100%;
  position: relative;
`;

const Messages = styled.div`
  height: calc(97vh - 5rem);
  border: 1px solid purple;
  padding: 1rem;
`;

const Message = styled.div`
  border: 1px solid red;
  display: flex;
  align-items: center;
`;

const ImageContainer = styled.div`
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

    h4{
      margin-right: 0.6rem;
    }
  }
`;

const SendMessage = styled.div`
  position: absolute;
  bottom: 3vh;
  border: 1px solid red;
  height: 2rem;
  width: 100%;
  display: flex;
  align-items: center;

  input {
    height: 2rem;
    width: 100%;
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
  users?: groupMemberProps;
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

  return (
    <Section>
      <Messages>
        {messages.map((message) => {
          const date = formatDistance(new Date(message.createdAt), new Date());
          return (
            <Message>
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
        <input type="text" name="" id="" />
      </SendMessage>
    </Section>
  );
};

export default ChatMessages;
