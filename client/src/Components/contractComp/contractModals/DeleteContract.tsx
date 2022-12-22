import axios from "axios";
import React, { useRef } from "react";
import styled from "styled-components";
import { BASE_URL, contractEnd } from "../../../utils/APIRoutes";
import { getHeaders } from "../../../utils/helperFunction";
import { useOutsideAlerter } from "../../../utils/OutsideAlerter";

const Section = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  width: 50vw;
  height: 50vh;
  box-sizing: border-box;
  background-color: #735f32;
  transform: translate(-50%, -53.5%);
  border-radius: 10px;
  overflow-y: auto;

  box-sizing: border-box;
  padding: 2rem 2rem 1.5rem;

  &::-webkit-scrollbar {
    width: 0.4rem;
    &-thumb {
      background-color: #fff;
      width: 0.1rem;
      border-radius: 1rem;
    }
  }

  h1 {
    color: #faf8f1;
    font-size: 2rem;
    font-weight: 400;
    margin-bottom: 1rem;
}

p{
    /* border: 1px solid red; */
    width: 95%;
    color: #faf8f1;
    line-height: 150%;
}
`;

const Buttons = styled.div`
  /* border: 1px solid white; */
  margin-top: 4rem;
  display: flex;
  /* align-items: ; */
  justify-content: flex-end;

  button {
    border-radius: 4px;
    cursor: pointer;
    padding: 12px 44px;
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

    &:last-child {
      margin-left: 2.5rem;
    }
  }
`;

interface deleteContractProps {
    closeDeleteContractModal: any,
    contractId: string,
    userToken: string
}

const DeleteContract = ({closeDeleteContractModal, contractId, userToken} : deleteContractProps) => {

  const wrapperRef = useRef<HTMLDivElement | null>(null);
  useOutsideAlerter(wrapperRef, closeDeleteContractModal);

  const deleteContractHandler = async () => {
    const { data } = await axios.delete(`${BASE_URL}${contractEnd}${contractId}/delete`, {
      headers: getHeaders(userToken)
    })
    console.log(data);
  }

  return (
    <Section ref={wrapperRef} >
      <h1>Delete Contract</h1>
      <p>Are you sure you want to delete this contract ?? Once deleted you will loose this contract but you can create another one anytime. Also it wont be shown in your profile as the contract hasn't started.</p>
      <Buttons>
        <button onClick={deleteContractHandler} >Yes, Delete It</button>
        <button onClick={closeDeleteContractModal} >No, Go Back</button>
      </Buttons>
    </Section>
  );
};

export default DeleteContract;
