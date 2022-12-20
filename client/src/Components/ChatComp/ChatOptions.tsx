import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import { AiOutlineDown, AiOutlineClose } from "react-icons/ai";
import { MdModeEdit } from "react-icons/md";
import { HiUserAdd } from "react-icons/hi";
import { useOutsideAlerter } from "../../utils/OutsideAlerter";
import { TfiWrite } from "react-icons/tfi";
import { BsFillFileEarmarkSpreadsheetFill } from "react-icons/bs";
import { IoIosMedal } from "react-icons/io";
import { GoTrashcan } from "react-icons/go";
import { RiGhostFill } from "react-icons/ri";
import { ImExit } from "react-icons/im";
import { RxCrumpledPaper } from "react-icons/rx";
import { chatObj } from "../../types/chatTypes";
import { userProps } from "../../types/userProps";

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
      svg.medal {
        fill: #fff;
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

    /* svg.medal {
      fill: #3a421b;
    } */

    h5 {
      color: #fff;
    }

    &:nth-last-child(1) {
      margin-bottom: 0;
    }
  }

  li.leave {
      svg {
        /* border: 1px solid blue; */
        width: 1.25rem;
        height: 1.1rem;
      }
  }

  li.contract {
    svg {
      /* margin-right: 0.1rem; */
      width: 1.6rem;
      height: 1rem;
    }
  }

  li.break{
    svg{
      fill: #fff;
      /* border: 1px solid red; */
      path{
        fill: #fff;
        /* stroke: red; */
        /* color: red; */
      }
    }

    &:hover{
      svg{
        path{
          fill: #3a421b;
        }
      }
    }
  }
`;

interface chat {
  selectedChat: chatObj;
  user: userProps;
  setupdateServer: React.Dispatch<React.SetStateAction<boolean>>;
  setUpdateContract: React.Dispatch<React.SetStateAction<boolean>>;
  setInvitePeople: React.Dispatch<React.SetStateAction<boolean>>;
  setReviewContract: React.Dispatch<React.SetStateAction<boolean>>;
  setDeleteContract: React.Dispatch<React.SetStateAction<boolean>>;
  setFinishContract: React.Dispatch<React.SetStateAction<boolean>>;
  setBreakContract: React.Dispatch<React.SetStateAction<boolean>>;
  updateServer: boolean;
  invitePeople: boolean;
  reviewContract: boolean;
  updateContract: boolean;
  deleteContract: boolean;
  finishContract: boolean;
  breakContract: boolean;
}

const ChatOptions = ({
  selectedChat,
  user,
  setupdateServer,
  setUpdateContract,
  setInvitePeople,
  setReviewContract,
  setDeleteContract,
  setFinishContract,
  setBreakContract,
  updateServer,
  updateContract,
  invitePeople,
  reviewContract,
  deleteContract,
  finishContract,
  breakContract
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
        selectedChat.contractBroken ? (
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
            </ul>
          </OptionsMenu>
        ) : selectedChat.contractSuccessful ? (
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
            </ul>
          </OptionsMenu>
        ) : selectedChat.contractFinishedApprovedBy.length !== 0 ? (
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
              <li
                className="contract"
                onClick={() => setUpdateContract(!updateContract)}
              >
                <h5>Update Due Date</h5>
                <TfiWrite />
              </li>
              <li
                className="medal"
                onClick={() => setFinishContract(!finishContract)}
              >
                <h5>Edit Submission</h5>
                <IoIosMedal />
              </li>
              <li onClick={() => alert("ghost")}>
                <h5>Ghost Spotted</h5>
                <RiGhostFill />
              </li>
            </ul>
          </OptionsMenu>
        ) : selectedChat.contractApproved ? (
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
              <li
                className="contract"
                onClick={() => setUpdateContract(!updateContract)}
              >
                <h5>Update Due Date</h5>
                <TfiWrite />
              </li>
              <li
                className="medal"
                onClick={() => setFinishContract(!finishContract)}
              >
                <h5>Finish Contract</h5>
                <IoIosMedal />
              </li>
              <li onClick={() => alert("ghost")}>
                <h5>Ghost Spotted</h5>
                <RiGhostFill />
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
              <li
                className="contract"
                onClick={() => setUpdateContract(!updateContract)}
              >
                <h5>Update Due Date</h5>
                <TfiWrite />
              </li>
              <li
                className="contract"
                onClick={() => setDeleteContract(!deleteContract)}
              >
                <h5>Delete Contract</h5>
                <GoTrashcan />
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
      ) : chatOptions && selectedChat.contractBroken ? (
        <OptionsMenu events={updateServer || invitePeople}>
          <ul>
            <li
              className="contract"
              onClick={() => setReviewContract(!reviewContract)}
            >
              <h5>Review Contract</h5>
              <BsFillFileEarmarkSpreadsheetFill />
            </li>
            <li className="leave" onClick={() => alert("Leave Group")}>
              <h5>Leave Group</h5>
              <ImExit />
            </li>
          </ul>
        </OptionsMenu> 
      ) : chatOptions && selectedChat.contractSuccessful ? (
        // non admin options
        <OptionsMenu events={updateServer || invitePeople}>
          <ul>
            <li
              className="contract"
              onClick={() => setReviewContract(!reviewContract)}
            >
              <h5>Review Contract</h5>
              <BsFillFileEarmarkSpreadsheetFill />
            </li>
            <li className="leave" onClick={() => alert("Leave Group")}>
              <h5>Leave Group</h5>
              <ImExit />
            </li>
          </ul>
        </OptionsMenu>
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
            <li className="break" onClick={() => setBreakContract(!breakContract)}>
              <h5>Break Contract</h5>
              <RxCrumpledPaper />
            </li>
            <li onClick={() => alert("ghost")}>
              <h5>Ghost Spotted</h5>
              <RiGhostFill />
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

// add contract break options
// --> submit git link
// ifcontract is broken, admin has to submit the work done so far