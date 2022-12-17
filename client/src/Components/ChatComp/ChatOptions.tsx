import React, { useState, useEffect, useRef } from "react";
import { AiOutlineDown, AiOutlineClose } from "react-icons/ai";
import { MdModeEdit } from "react-icons/md";
import styled from "styled-components";
import { HiUserAdd } from "react-icons/hi";
import { useOutsideAlerter } from "../../utils/OutsideAlerter";
import { userProps } from "../../utils/GlobalContants";
import { TfiWrite } from "react-icons/tfi";
import { BsFillFileEarmarkSpreadsheetFill } from "react-icons/bs";
import { IoIosMedal } from 'react-icons/io'

const Section = styled.div`
  border-bottom: 1px solid #3a421b;
  border-bottom: 2px solid rgba(137, 117, 88, 255);
  margin: 0.4rem 0rem 1rem;
  position: relative;
  padding: 0 0.5rem 0.4rem;
`;

const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 1.5rem;
  cursor: pointer;

  svg {
    margin-right: 1rem;
    cursor: pointer;
  }

  h3 {
    font-size: 1.3rem;
    font-weight: 800;
    color: #fff;
    color: #3a421b;
  }
`;

interface optionsProps {
  events: Boolean;
}

const OptionsMenu = styled.div`
  position: absolute;
  top: 1.8rem;

  /* border: 1px solid red; */
  background-color: #fff;
  background-color: #3a421b;
  width: 95%;
  /* right: -1px; */
  padding: 0.5rem 0rem;
  box-sizing: border-box;
  /* margin: 0 auto; */
  right: 2.5%;
  border-radius: 10px;
  pointer-events: ${(props: optionsProps) => (props.events ? "none" : "auto")};

  li {
    cursor: pointer;
    list-style: none;
    border-radius: 4px;
    /* border: 1px solid red; */
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 0.8rem;
    margin-bottom: 0.4rem;
    transition: all 0.15s linear;
    &:hover {
      background-color: antiquewhite;
      background-color: #fff;
      svg {
        fill: #3a421b;
      }
      h5 {
        color: #3a421b;
      }
    }

    svg {
      /* margin-right: 0.7rem */
      width: 1.6rem;
      padding: 0;
      margin: 0;
      height: 1.3rem;
      fill: #fff;
      /* border: 1px solid red; */
    }

    h5 {
      color: #fff;
    }

    &:nth-last-child(1) {
      margin-bottom: 0;
    }
  }

  li.contract {
    svg {
      /* margin-right: 0.1rem; */
      width: 1.6rem;
      height: 1rem;
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
  contractApproved: Boolean;
}

interface chat {
  selectedChat: chatObj;
  user: userProps;
  setupdateServer: React.Dispatch<React.SetStateAction<boolean>>;
  setUpdateContract: React.Dispatch<React.SetStateAction<boolean>>;
  setInvitePeople: React.Dispatch<React.SetStateAction<boolean>>;
  setReviewContract: React.Dispatch<React.SetStateAction<boolean>>;
  setFinishContract: React.Dispatch<React.SetStateAction<boolean>>;
  updateServer: boolean;
  invitePeople: boolean;
  reviewContract: boolean;
  updateContract: boolean;
  finishContract: boolean;
}

const ChatOptions = ({
  selectedChat,
  user,
  setupdateServer,
  setUpdateContract,
  setInvitePeople,
  setReviewContract,
  setFinishContract,
  updateServer,
  updateContract,
  invitePeople,
  reviewContract,
  finishContract
}: chat) => {
  const [chatOptions, setChatOptions] = useState(false);

  useEffect(() => {
    setChatOptions(false);
  }, [selectedChat]);

  const closeChatOptions = () => {
    setChatOptions(false);
  };

  const wrapperRef = useRef<HTMLDivElement | null>(null);
  useOutsideAlerter(wrapperRef, closeChatOptions);

  return (
    <Section>
      <Header onClick={() => setChatOptions(!chatOptions)}>
        <h3>{selectedChat.chatName}</h3>
        {selectedChat.groupAdmin?._id === user._id ? (
          chatOptions ? (
            <AiOutlineClose />
          ) : (
            <AiOutlineDown />
          )
        ) : selectedChat.contracted ? (
          chatOptions ? (
            <AiOutlineClose />
          ) : (
            <AiOutlineDown />
          )
        ) : null}
      </Header>
      {chatOptions && selectedChat.groupAdmin?._id === user._id ? (
        selectedChat.contractApproved ? (
          // contract is approved
          <OptionsMenu events={updateServer || invitePeople}>
            <ul>
              <li onClick={() => setupdateServer(!updateServer)}>
                <h5>Update Server</h5>
                <MdModeEdit />
              </li>
              <li
                className="contract"
                onClick={() => setReviewContract(!reviewContract)}
              >
                <h5>Review Contract</h5>
                <BsFillFileEarmarkSpreadsheetFill />
              </li>
              <li className="contract" onClick={() => setUpdateContract(!updateContract)}>
                <h5>Update Contract</h5>
                <TfiWrite />
              </li>
              <li className="contract" onClick={() => setFinishContract(!finishContract)}>
                <h5>Finish Contract</h5>
                <IoIosMedal />
              </li>
            </ul>
          </OptionsMenu>
        ) : selectedChat.contracted ? (
          // contract not approved but contracted
          <OptionsMenu events={updateServer || invitePeople}>
            <ul>
              <li onClick={() => setupdateServer(!updateServer)}>
                <h5>Update Server</h5>
                <MdModeEdit />
              </li>
              <li onClick={() => setInvitePeople(!invitePeople)}>
                <h5>Manage Members</h5>
                <HiUserAdd />
              </li>
              <li
                className="contract"
                onClick={() => setReviewContract(!reviewContract)}
              >
                <h5>Review Contract</h5>
                <BsFillFileEarmarkSpreadsheetFill />
              </li>
              <li className="contract" onClick={() => setUpdateContract(!updateContract)}>
                <h5>Update Contract</h5>
                <TfiWrite />
              </li>
              <li className="contract" onClick={() => setUpdateContract(!updateContract)}>
                <h5>Delete Contract</h5>
                <TfiWrite />
              </li>
            </ul>
          </OptionsMenu>
        ) : (
          // not contrated
          <OptionsMenu events={updateServer || invitePeople}>
            <ul>
              <li onClick={() => setupdateServer(!updateServer)}>
                <h5>Update Server</h5>
                <MdModeEdit />
              </li>
              <li onClick={() => setInvitePeople(!invitePeople)}>
                <h5>Manage Members</h5>
                <HiUserAdd />
              </li>
            </ul>
          </OptionsMenu>
        )
      ) : chatOptions && selectedChat.contractApproved ? (
        <OptionsMenu events={updateServer || invitePeople}>
          <ul>
            <li
              className="contract"
              onClick={() => setReviewContract(!reviewContract)}
            >
              <h5>Review Contract</h5>
              <BsFillFileEarmarkSpreadsheetFill />
            </li>
            <li
              className="contract"
              onClick={() => alert('Leave Group')}
            >
              <h5>Leave Contract</h5>
              <BsFillFileEarmarkSpreadsheetFill />
            </li>
          </ul>
        </OptionsMenu>
      ) : chatOptions && selectedChat.contracted ? (
        <OptionsMenu events={updateServer || invitePeople}>
          <ul>
            <li
              className="contract"
              onClick={() => setReviewContract(!reviewContract)}
            >
              <h5>Review Contract</h5>
              <BsFillFileEarmarkSpreadsheetFill />
            </li>
          </ul>
        </OptionsMenu>
      ) : null}
    </Section>
  );
};

export default ChatOptions;
