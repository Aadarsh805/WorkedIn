import axios from "axios";
import React, { useRef } from "react";
import styled from "styled-components";
import { BASE_URL, contractEnd } from "../../utils/APIRoutes";
import { userProps } from "../../utils/GlobalContants";
import { getHeaders } from "../../utils/helperFunction";
import { useOutsideAlerter } from "../../utils/OutsideAlerter";
import ContractBody from "./ContractBody";

const Section = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  width: 60vw;
  height: 80vh;
  background-color: #735f32;
  transform: translate(-50%, -50%);
  overflow: auto;
  border-radius: 10px;

  box-sizing: border-box;
  padding: 2rem 2.5rem 2.5rem;

  &::-webkit-scrollbar {
    width: 0.4rem;
    /* background-color: #735f32; */
    /* border-radius: 10px; */
    &-thumb {
      background-color: #fff;
      width: 0.1rem;
      border-radius: 1rem;
    }
  }

  h2 {
    color: #faf8f1;
    font-size: 1.2rem;
    font-weight: 600;
  }
`;


const Buttons = styled.div`
  /* border: 1px solid red; */
  display: flex;
  align-items: center;
  justify-content: flex-end;
  /* justify-content: space-around; */
  margin-top: 3rem;

  button {
    border-radius: 4px;
    cursor: pointer;
    padding: 12px 24px;
    background-color: #735f32;
    box-sizing: border-box;
    font-size: 1rem;
    color: #fff;
    font-weight: 400;
    border: 2px solid rgba(236, 227, 212, 255);
    /* border: 2px solid #3a421b; */
    box-shadow: 3px 3px 0px rgba(236, 227, 212, 255);
    translate: -3px -3px;
    transition: all 0.15s ease-in;
    /* line-height: 0; */

    &:hover {
      translate: 0;
      box-shadow: 0 0 0;
    }

    &:first-child {
      margin-right: 2.5rem;
    }
  }
`;

interface member {
  name: string;
  _id: string;
  photo: string;
}

interface teamMember {
  approved: Boolean;
  denied: Boolean;
  finishedApproved: Boolean;
  member: member;
  responsibility: string;
  review: number;
  role: string;
}

interface contractProps {
  chatId: string;
  contractBroken: {
    reason: string | null,
    brokenBy: member
  };
  contractName: string;
  createdAt: string;
  dueDate: string;
  finishContractInitiated: boolean;
  githubLink: string;
  lead: member;
  liveLink: string;
  prevDueDates: [];
  projectDescription: string;
  projectImages: Array<string>;
  startDate: string;
  status: string;
  team: Array<teamMember>;
  _id: string;
}

interface contractModalProps {
  contract: contractProps;
  userData: userProps;
  closeContractModal: any
}


const ShowContract = ({ contract, userData, closeContractModal }: contractModalProps) => {

  const wrapperRef = useRef<HTMLDivElement | null>(null);
  useOutsideAlerter(wrapperRef, closeContractModal);

  const acceptContractHandler = async () => {
    const { data } = await axios.patch(
      `${BASE_URL}${contractEnd}${contract._id}/accept`,
      {
        chatId: contract.chatId,
      },
      {
        headers: getHeaders(userData.token ?? ""),
      }
    );
    console.log(data);
    window.location.reload();
  };

  const denyContractHandler = async () => {
    console.log(userData.token);

    const { data } = await axios.patch(
      `${BASE_URL}${contractEnd}${contract._id}/deny`,
      {},
      {
        headers: getHeaders(userData.token ?? ""),
      }
    );

    console.log(data);
    window.location.reload();
  };

  return (
    <Section >
      <ContractBody contract={contract} userData={userData} />
      {contract.team.filter((member) => {
        if (member.member._id === userData._id) {
          return member;
        } else return null;
      })[0].approved ? null : (
        <Buttons>
          <button onClick={acceptContractHandler}>Accept Contract</button>
          <button onClick={denyContractHandler}>Deny Contract</button>
        </Buttons>
      )}
      {
        contract.finishContractInitiated ? contract.team.filter((member) => {
          if (member.member._id === userData._id) {
            return member;
          } else return null;
        })[0].finishedApproved ? null : (
          <Buttons>
            <button onClick={() => alert('Accepted bitch')}>Finish Contract</button>
          </Buttons>
        ) : null
      }
    </Section>
  );
};

export default ShowContract;
