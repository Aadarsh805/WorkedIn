import axios from "axios";
import React from "react";
import styled from "styled-components";
import { BASE_URL, contractEnd } from "../../utils/APIRoutes";
import { userProps } from "../../utils/GlobalContants";
import { getHeaders } from "../../utils/helperFunction";

const Section = styled.div`
  border: 1px solid white;
  margin-top: 0.35rem;
  display: flex;
  align-items: center;
  justify-content: center;

  button {
    /* cursor: pointer; */
    width: 90%;
    border-radius: 4px;
    padding: 12px 0px;
    background-color: #735f32;
    box-sizing: border-box;
    display: flex;
    align-items: center;
    justify-content: center;
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
  contractFinishedApprovedBy: Array<string>;
}

interface contracFinishtApprovalProps {
  selectedChat: chatObj;
  user: userProps;
}

const FinishApprovalBtn = ({
  selectedChat,
  user,
}: contracFinishtApprovalProps) => {
  const totalMembers = (selectedChat.users as unknown as any[]).length;
  const membersApproved = selectedChat.contractFinishedApprovedBy.length;
  const percentApproval = (membersApproved / totalMembers) * 100;


  const submitContracthandler = async () => {
    const { data } = await axios.patch(`${BASE_URL}${contractEnd}${selectedChat.contractId}/finish/submit`, {}, {
        headers: getHeaders(user.token ?? '')
    });
    console.log(data);
  } 


  return (
    <Section>
      {user._id === selectedChat.groupAdmin?._id ? (
        <button
          disabled={percentApproval !== 100}
          onClick={
            percentApproval !== 100 ? undefined : submitContracthandler
          }
        >
          {percentApproval !== 100
            ? `${Math.round(percentApproval)}% Approval`
            : "Submit Contract"}
        </button>
      ) : (
        <button disabled>{Math.round(percentApproval)}% Approval</button>
      )}
    </Section>
  );
};

export default FinishApprovalBtn;
