import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { GiCrown } from "react-icons/gi";
import { AiOutlineDown } from "react-icons/ai";
import ChatOptions from "./ChatOptions";
import { userProps } from "../../utils/GlobalContants";
import UpdateChatModal from "./UpdateChatModal";
import ManageMembers from "./ManageMembers";
import CreateContract from "../contractComp/CreateContract";
import ContractApproval from "../contractComp/ContractApproval";
import ReviewContract from "../contractComp/ReviewContract";
import UpdateContractModal from "../contractComp/UpdateContractModal";
import FinishContract from "../contractComp/FinishContract";
import DeleteContract from "../contractComp/DeleteContract";
import FinishApprovalBtn from "../contractComp/FinishApprovalBtn";
import BreakContract from "../contractComp/BreakContract";

const Section = styled.div`
  border-left: 2px solid rgba(137,117,88,255);
  width: 16vw;
  overflow: hidden;
  padding-top: 0.5rem;
`;

interface membersProps {
  divHeight: Boolean
}

const Members = styled.div`
  /* border: 1px solid white; */
  padding-top: 0.5rem;
  box-sizing: border-box;
  height: ${(props:membersProps) => props.divHeight ? 'calc(100vh - 3rem)' : 'calc(100vh - 7rem)' };
  overflow: auto;
`;

const Member = styled.div`
  /* border: 1px solid red; */
  display: flex;
  align-items: center;
  padding: 0.4rem 0.4rem;
  margin: 0 0.5rem 0.5rem;
  border-radius: 10px;
  background-color: rgba(236,227,212,255);
  svg {
    width: 30px;
  }

  img {
    width: 38px;
    height: 38px;
    border-radius: 50%;
    margin-right: 0.5rem;
    object-fit: cover;
    -webkit-box-shadow: 0px 0px 5px 3px rgba(0, 0, 0, 0.22);
    -moz-box-shadow: 0px 0px 5px 3px rgba(0, 0, 0, 0.22);
    box-shadow: 0px 0px 5px 3px rgba(0, 0, 0, 0.22);
  }

  h4{
    font-size: 1rem;
    font-weight: 800;
    color: #fff;
    color: #3a421b;
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
  contractSuccessful: boolean;
  contractFinishedApprovedBy: Array<string>
}



interface chat {
  selectedChat: chatObj;
  user: userProps;
}

const ChatMembers = ({ selectedChat, user }: chat) => {
  const [updateServer, setupdateServer] = useState(false)
  const [invitePeople, setInvitePeople] = useState(false)
  const [reviewContract, setReviewContract] = useState(false)
  const [updateContract, setUpdateContract] = useState(false)
  const [deleteContract, setDeleteContract] = useState(false)
  const [finishContract, setFinishContract] = useState(false)
  const [breakContract, setBreakContract] = useState(false)

  // leave group
  // break contracr
  // ghost spotted

  useEffect(() => {
    setupdateServer(false)
    setInvitePeople(false)
  }, [selectedChat])

  const closeUpdateServerModal = () => {    
    setupdateServer(false)
  }

  const closeInvitePeopleModal = () => {
    setInvitePeople(false)
  }

  const closeReviewContractModal = () => {
    setReviewContract(false)
  }

  const closeUpdateContractModal = () => {
    setUpdateContract(false)
  }

  const closeDeleteContractModal = () => {
    setDeleteContract(false)
  }

  const closeFinishContractModal = () => {
    setFinishContract(false)
  }

  const closeBreakContractModal = () => {
    setBreakContract(false)
  }
  

  return selectedChat.chatName === "one_On_one" ? null : 
    <Section>
      <Members divHeight={selectedChat.contractSuccessful ? true : (selectedChat.contractApproved && selectedChat.contractFinishedApprovedBy.length === 0 )} >
          <ChatOptions selectedChat={selectedChat} user={user} setUpdateContract={setUpdateContract} setupdateServer={setupdateServer} setInvitePeople={setInvitePeople} setReviewContract={setReviewContract} setDeleteContract={setDeleteContract} setFinishContract={setFinishContract} setBreakContract={setBreakContract} updateContract={updateContract} updateServer={updateServer} invitePeople={invitePeople} reviewContract={reviewContract} finishContract={finishContract} deleteContract={deleteContract} breakContract={breakContract} />
        {selectedChat.users !== undefined &&
          (selectedChat.users as unknown as any[]).map((user) => {
            return (
              <Member>
                <img src={user.photo} alt="" />
                <h4>{user.name}</h4>
                {user._id === selectedChat.groupAdmin?._id ? <GiCrown /> : null}
              </Member>
            );
          })}
      </Members>
      {
        selectedChat.contractSuccessful ? null : ( selectedChat.contractFinishedApprovedBy.length !== 0 ? <FinishApprovalBtn selectedChat={selectedChat} user={user} /> : null )
      }
      {
        selectedChat.contractApproved ? null : selectedChat.contracted ? <ContractApproval selectedChat={selectedChat} user={user} /> : 
        selectedChat.groupAdmin?._id === user._id ?
        <CreateContract selectedChat={selectedChat} user={user}/> : null
      }
      {
        updateServer ? <UpdateChatModal selectedChatId={selectedChat._id} selectedChatImage={selectedChat.chatPhoto} selectedChatName={selectedChat.chatName} userId={user._id} userToken={user.token} closeUpdateServerModal={closeUpdateServerModal} /> : null
      }
      {
        invitePeople ? <ManageMembers selectedChat={selectedChat} user={user} closeInvitePeopleModal={closeInvitePeopleModal} /> : null
      }
      {
        reviewContract ? <ReviewContract user={user} contractId={selectedChat.contractId} closeReviewContractModal={closeReviewContractModal} /> : null
      }
      {
        updateContract ? <UpdateContractModal user={user} contractId={selectedChat.contractId!} closeUpdateContractModal={closeUpdateContractModal} /> : null
      }
      {
        deleteContract ? <DeleteContract closeDeleteContractModal={closeDeleteContractModal} contractId={selectedChat.contractId!} userToken={user.token!} /> : null
      }
      {
        finishContract ? <FinishContract user={user} contractId={selectedChat.contractId!} closeFinishContractModal={closeFinishContractModal} /> : null
      }
      {
        breakContract ? <BreakContract user={user} contractId={selectedChat.contractId!} chatId={selectedChat._id!} closeBreakContractModal={closeBreakContractModal} /> : null
      }
    </Section>
};

export default ChatMembers;
