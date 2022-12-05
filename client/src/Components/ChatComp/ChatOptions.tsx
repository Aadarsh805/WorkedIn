import React, { useState, useEffect, useRef } from "react";
import { AiOutlineDown, AiOutlineClose } from "react-icons/ai";
import { MdModeEdit } from "react-icons/md";
import styled from "styled-components";
import { InvitePeople } from "../../assets/InvitePeople";
import { HiUserAdd } from 'react-icons/hi'
import { useOutsideAlerter } from "../../utils/OutsideAlerter";

const Section = styled.div`
  border: 1px solid red;
  margin: 0 0.5rem 1rem;
  position: relative;
`;

const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 1.5rem;

  svg {
    margin-right: 0.5rem;
    cursor: pointer;
  }
`;

interface optionsProps {
  events: Boolean
}

const OptionsMenu = styled.div`
  position: absolute;
  top: 1.8rem;
  border: 1px solid red;
  background-color: #fff;
  width: 95%;
  /* right: -1px; */
  padding: 0.5rem 0.1rem;
  box-sizing: border-box;
  /* margin: 0 auto; */
  right: 2.5%;
  border-radius: 10px;
  pointer-events: ${(props:optionsProps) => props.events ? 'none' : 'auto'};

  li {
    cursor: pointer;
    list-style: none;
    /* border: 1px solid red; */
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 0.4rem;
    margin-bottom: 0.4rem;
    &:hover{
        background-color: antiquewhite;
    }

    svg {
      /* margin-right: 0.7rem */
      width: 1.6rem;
      padding: 0;
      margin: 0;
      height: 1.3rem;
      /* border: 1px solid red; */
    }

    &:nth-last-child(1) {
      margin-bottom: 0;
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
  contractId?: string;
  contractAprovedBy: Array<string>;
  contractApproved: Boolean
}

interface chat {
  selectedChat: chatObj,
  setupdateServer: React.Dispatch<React.SetStateAction<boolean>>,
  setInvitePeople: React.Dispatch<React.SetStateAction<boolean>>,
  updateServer: boolean,
  invitePeople: boolean
}

const ChatOptions = ({ selectedChat, setupdateServer, setInvitePeople, updateServer, invitePeople }: chat) => {
  const [chatOptions, setChatOptions] = useState(false);

  useEffect(() => {
    setChatOptions(false)
  }, [selectedChat])

  const closeChatOptions = () => {
    setChatOptions(false)
  }

  const wrapperRef = useRef<HTMLDivElement | null>(null);
  useOutsideAlerter(wrapperRef, closeChatOptions)
  
  return (
    <Section >
      <Header onClick={() => setChatOptions(!chatOptions)}>
        <h3>{selectedChat.chatName}</h3>
        {chatOptions ? <AiOutlineClose /> : <AiOutlineDown />}
      </Header>
      {chatOptions ? (
        <OptionsMenu events={updateServer || invitePeople} >
          <ul>
            <li onClick={() => setupdateServer(!updateServer)} >
              <h5>Update Server</h5>
              <MdModeEdit />
            </li>
            <li onClick={() => setInvitePeople(!invitePeople)} >
              <h5>Invite People</h5>
              <HiUserAdd />
            </li>
          </ul>
        </OptionsMenu>
      ) : null}
    </Section>
  );
};

export default ChatOptions;
