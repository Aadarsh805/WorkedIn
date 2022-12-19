import axios from "axios";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { chatObj } from "../../types/chatTypes";
import { userProps } from "../../types/userProps";
import { BASE_URL, chatEnd } from "../../utils/APIRoutes";
import { getHeaders } from "../../utils/helperFunction";

const Section = styled.div`
  /* border: 1px solid white; */
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

interface contractApprovalProps {
  selectedChat: chatObj;
  user: userProps;
}

const ContractApproval = ({ selectedChat, user }: contractApprovalProps) => {
  const totalMembers = (selectedChat.users as unknown as any[]).length;
  const membersApproved = selectedChat.contractAprovedBy.length;
  const percentApproval = (membersApproved / totalMembers) * 100;

  const finaliseContractHandler = async () => {
    if (user._id !== selectedChat.groupAdmin?._id) {
      return;
    }
    const { data } = await axios.patch(
      `${BASE_URL}${chatEnd}${selectedChat._id}/finalisecontract`,
      {},
      {
        headers: getHeaders(user.token ?? ""),
      }
    );
    console.log(data);
  };

  return (
    <Section>
      {user._id === selectedChat.groupAdmin?._id ? (
        <button
          disabled={percentApproval !== 100}
          onClick={
            percentApproval !== 100 ? undefined : finaliseContractHandler
          }
        >
          {percentApproval !== 100
            ? `${Math.round(percentApproval)}% Approved`
            : "Finalise Contract"}
        </button>
      ) : (
        <button disabled>{Math.round(percentApproval)}% Approved</button>
      )}
    </Section>
  );
};

export default ContractApproval;
