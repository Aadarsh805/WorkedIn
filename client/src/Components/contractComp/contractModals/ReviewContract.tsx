import axios from "axios";
import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import { contractProps } from "../../../types/contractTypes";
import { userProps } from "../../../types/userProps";
import { BASE_URL, contractEnd } from "../../../utils/APIRoutes";
import { getHeaders } from "../../../utils/helperFunction";
import { useOutsideAlerter } from "../../../utils/OutsideAlerter";
import ContractBody from "../ContractBody";

const Section = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  width: 60vw;
  height: 80vh;
  background-color: #735f32;
  transform: translate(-50%, -53.5%);
  overflow: auto;
  border-radius: 10px;

  box-sizing: border-box;
  padding: 2.5rem 2.5rem 2.5rem;

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

interface reviewContractProps {
  user: userProps;
  contractId?: string;
  closeReviewContractModal: any
}

const ReviewContract = ({ user, contractId, closeReviewContractModal }: reviewContractProps) => {

  const [contract, setContract] = useState<contractProps>();

  const wrapperRef = useRef<HTMLDivElement | null>(null);
  useOutsideAlerter(wrapperRef, closeReviewContractModal);

  async function fetchContract() {
    const { data } = await axios.get(`${BASE_URL}${contractEnd}${contractId}`, {
      headers: getHeaders(user.token ?? ""),
    });
    console.log(data);
    const contractData = data.contract;
    setContract(contractData);
  }

  useEffect(() => {
    if (contractId) {
      fetchContract();
    }
  }, []);

  return (
    <Section ref={wrapperRef} >
      {
        contract &&
      <ContractBody userData={user} contract={contract!} />
      }
    </Section>
  );
};

export default ReviewContract;
