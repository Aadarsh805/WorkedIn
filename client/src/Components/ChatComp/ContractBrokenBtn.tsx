import React, { useState } from "react";
import styled from "styled-components";
import { chatObj } from "../../types/chatTypes";
import { userProps } from "../../types/userProps";
import SubmitBrokenWork from "../contractComp/contractModals/SubmitBrokenWork";

const Section = styled.div`
  margin-top: 0.35rem;
  display: flex;
  align-items: center;
  justify-content: center;

  button {
    cursor: pointer;
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

interface brokenContractProps {
  user: userProps;
  selectedChat: chatObj;
}

const ContractBrokenBtn = ({ user, selectedChat }: brokenContractProps) => {
  const [submitBrokenWork, setSubmitBrokenWork] = useState(false);

  const submitModalHandler = () => {
    setSubmitBrokenWork(!submitBrokenWork);
  };

  return (
    <>
      <Section>
        {user._id === selectedChat.groupAdmin?._id ? (
          <button onClick={submitModalHandler}>Submit Work</button>
        ) : (
          <button disabled>Broken</button>
        )}
      </Section>
      {submitBrokenWork ? <SubmitBrokenWork submitModalHandler={submitModalHandler} /> : null}
    </>
  );
};

export default ContractBrokenBtn;
