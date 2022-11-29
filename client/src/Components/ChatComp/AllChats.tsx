import axios from "axios";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { BASE_URL, chatEnd } from "../../Utils/APIRoutes";
import { userProps } from "../../Utils/GlobalContants";
import { getHeaders, getUserData } from "../../Utils/helperFunction";

const Section = styled.div`
  border: 1px solid red;
  /* min-height: calc(100vh - 3rem); */
  width: 20vw;
`;

interface allChatProps {
  user: userProps;
}

interface groupMemberProps {
  _id: string;
  name: string;
  photo: string;
}

interface chatsArr {
  chatName: string;
  contracted: Boolean;
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

const AllChats = ({ user }: allChatProps) => {
  const [allChats, setAllChats] = useState<Array<chatsArr>>([]);

  async function fetchUserChats() {
    const { data } = await axios.get(`${BASE_URL}${chatEnd}`, {
      headers: getHeaders(user.token ?? ""),
    });
    // console.log(data.chats);
    setAllChats(data.chats);
  }

  useEffect(() => {
    console.log(user.token);
    if (user.token) {
      fetchUserChats();
    }
  }, [user.token]);

  return (
    <Section>
      {allChats.map((chat, index) => {
        if (chat.chatName === 'one_On_one') {
            const chatUsers = chat.users
            const filteredUser = (chatUsers as unknown as any[]).filter(chatUser => {
                return chatUser.name !== user.name
            })         
            console.log(filteredUser[0].name);
            return <h4>{filteredUser[0].name}</h4>
        }

        return <h4>{chat.chatName}</h4>
      })}
    </Section>
  );
};

export default AllChats;
