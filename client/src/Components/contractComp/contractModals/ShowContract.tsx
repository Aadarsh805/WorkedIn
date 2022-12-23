import axios from "axios";
import React, { useRef } from "react";
import styled from "styled-components";
import { contractProps } from "../../../types/contractTypes";
import { userProps } from "../../../types/userTypes";
import { BASE_URL, contractEnd } from "../../../utils/apiRoutes";
import { getHeaders } from "../../../utils/helperFunction";
import { useOutsideAlerter } from "../../../utils/outsideAlerter";
import ContractBody from "../ContractBody";

const Section = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  width: 60vw;
  height: 95vh;
  background-color: #735f32;
  transform: translate(-50%, -50%);
  overflow: auto;
  border-radius: 10px;
  z-index: 2;
  /* pointer-events: none; */

  box-sizing: border-box;
  padding: 2.5rem 2.5rem 2.5rem;

  &::-webkit-scrollbar {
    width: 0.25rem;
    &-thumb {
      background-color: #fff;
      width: 0.1rem;
      border-radius: 1rem;
    }
  }
`;


const Buttons = styled.div`
  /* border: 1px solid red; */
  display: flex;
  align-items: center;
  justify-content: flex-end;
  margin-top: 3rem;

  button {
    /* pointer-events: all; */
    border-radius: 4px;
    cursor: pointer;
    padding: 12px 24px;
    background-color: #735f32;
    box-sizing: border-box;
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

    &:first-child {
      margin-right: 2.5rem;
    }
  }
`;

interface contractModalProps {
  contract: contractProps;
  userData: userProps;
  closeContractModal?: any
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

  const acceptFinishContractHandler = async () => {
    const { data } = await axios.patch(`${BASE_URL}${contractEnd}${contract._id}/finish/accept`, {
      chatId: contract.chatId
    }, {
      headers: getHeaders(userData.token ?? '')
    })
    console.log(data);
    window.location.reload();
  }

  return (
    <Section ref={wrapperRef} >
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
            <button onClick={acceptFinishContractHandler}>Finish Contract</button>
          </Buttons>
        ) : null
      }
    </Section>
  );
};

export default ShowContract;
