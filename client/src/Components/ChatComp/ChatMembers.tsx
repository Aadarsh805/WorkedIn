import React from "react";
import styled from "styled-components";
import { GiCrown } from 'react-icons/gi'

const Section = styled.div`
  border: 1px solid red;
  /* min-height: calc(100vh - 3rem); */
  width: 25vw;
  padding-top: 1rem;
`;

const Member = styled.div`
  border: 1px solid red;
  display: flex;
  align-items: center;
  padding: 0.3rem 0.4rem;
  margin: 0 0.5rem 0.5rem;
  border-radius: 10px;

  svg{
    width: 30px;
  }

  img {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    margin-right: 0.5rem;
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

interface chat {
  selectedChat: chatObj;
}

const ChatMembers = ({ selectedChat }: chat) => {  
  
    return selectedChat.chatName === "one_On_one"  ? 
    null : (
      <Section>
        {
          selectedChat.users !== undefined && (selectedChat.users as unknown as any[]).map((user) => {
            return (
              <Member>
                <img src={user.photo} alt="" />
                <h4>{user.name}</h4>
                {
                  user._id === selectedChat.groupAdmin?._id ? <GiCrown/> : null
                }
              </Member>
            )
          })
        }
      </Section>
    );
};

export default ChatMembers;


// {(selectedChat.users as unknown as any[]).map(({_id,name,photo}: groupMemberProps, index) => {
//   return (
//     <Member key={index} >
//       <img src={photo} alt="memberPic" />
//       <h3>{name}</h3>
      
//     </Member>
//   );
// })}
