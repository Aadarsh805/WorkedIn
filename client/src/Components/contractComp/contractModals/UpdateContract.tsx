import axios from "axios";
import { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import { contractProps } from "../../../types/contractTypes";
import { userProps } from "../../../types/userProps";
import { BASE_URL, contractEnd } from "../../../utils/APIRoutes";
import { months } from "../../../utils/GlobalContants";
import { getHeaders, getReadableTime } from "../../../utils/helperFunction";
import { useOutsideAlerter } from "../../../utils/OutsideAlerter";

const Section = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  width: 60vw;
  height: 70vh;
  background-color: #735f32;
  transform: translate(-50%, -53%);
  overflow: auto;
  border-radius: 10px;

  box-sizing: border-box;
  padding: 2rem 2.5rem 2.5rem;

  &::-webkit-scrollbar {
    width: 0.4rem;
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

const Header = styled.div`
  /* border: 1px solid red; */
  position: relative;
  h1,
  h3,
  h4 {
    color: #faf8f1;
    display: inline;
  }

  h1 {
    font-weight: 300;
    margin-right: 0.6rem;
    text-transform: capitalize;
    font-size: 2rem;
  }

  h3 {
    font-weight: 300;
    text-decoration: underline;
    font-size: 1.2rem;
  }

  h4 {
    font-weight: 600;
    font-size: 0.9rem;
    margin-right: 0.2rem;
  }
`;

const Description = styled.p`
  /* border: 1px solid red; */
  padding: 1rem;
  border-radius: 8px;
  margin-top: 1rem;
  color: rgb(58, 66, 27);
  font-weight: 600;
  width: 95%;
  box-sizing: border-box;
  line-height: 160%;
  background-color: #faf8f1;
`;

const ContractDates = styled.div`
  position: absolute;
  top: -0.8rem;
  right: 0rem;
  font-size: 1rem;
  font-weight: 400;
  color: #faf8f1;
`;

const NewDueDate = styled.div`
  margin-top: 1.8rem;
  display: flex;
  align-items: center;

  h2{
    margin-right: 1rem;
  }

  input {
    border-radius: 8px;
    border: none;
    outline: none;
    padding: 0.5rem 0.5rem;
    background-color: #faf8f1;
  }
`;

const Reason = styled.div`
  margin-top: 1.8rem;

  textarea {
    margin-top: 1rem;
    padding: 0.7rem 1rem;
    border-radius: 8px;
    font-size: 1rem;
    font-weight: 600;
    height: 8rem;
    width: 95%;
    box-sizing: border-box;
    line-height: 160%;
    background-color: #faf8f1;
    color: rgb(58, 66, 27);
    resize: none;
    outline: none;
    border: none;

    &::placeholder {
        color: rgb(58, 66, 27);
      font-size: 1rem;
      font-weight: 500;
    }

    &::-webkit-scrollbar {
      width: 0.3rem;
      &-thumb {
        background-color: rgb(58, 66, 27);
        width: 0.1rem;
        border-radius: 1rem;
      }
    }
  }

`;

const UpdateBtn = styled.div`
    /* border: 1px solid red; */
    margin-top: 2.2rem;
    display: flex;
    align-items: center;
    justify-content: flex-end;

    button {
    /* width: 40%; */
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
  }
`


interface updateContractProps {
  contractId: string;
  user: userProps;
  closeUpdateContractModal: any
}

const UpdateContract = ({ contractId, user, closeUpdateContractModal }: updateContractProps) => {
  const [contract, setContract] = useState<contractProps>();
  const [newDueDate, setNewDueDate] = useState('');
  const [reason, setReason] = useState('');

  const wrapperRef = useRef<HTMLDivElement | null>(null);
  useOutsideAlerter(wrapperRef, closeUpdateContractModal);

  const fetchContract = async () => {
    const { data } = await axios.get(`${BASE_URL}${contractEnd}${contractId}`, {
      headers: getHeaders(user.token ?? ""),
    });
    console.log(data);
    const contractData = data.contract;
    setContract(contractData);
  };

  useEffect(() => {
    fetchContract();
  }, []);

  const updateContractHandler = async () => {
    const { data } = await axios.patch(`${BASE_URL}${contractEnd}${contractId}`, {
        newDueDate,
        reason
    }, {
        headers: getHeaders(user.token ?? '')
    })
    console.log(data);
    window.location.reload();
  }

  return contract ? (
    <Section ref={wrapperRef} >
      <Header>
        <h1>{contract.contractName}</h1>
        <h4>Created by</h4>
        <h3>{contract.lead.name}</h3>
        <ContractDates>
          {getReadableTime(contract.startDate.slice(0, 10))} -{" "}
          {getReadableTime(contract.dueDate.slice(0, 10))}
        </ContractDates>
      </Header>
      <Description>{contract.projectDescription}</Description>
      <NewDueDate>
        <h2>New Due Date :- </h2>
        <input type="date" value={newDueDate} onChange={(e) => setNewDueDate(e.target.value)}/>
      </NewDueDate>
      <Reason>
        <h2>Resong of Delaying Contract</h2>
        <textarea placeholder="Provide a reason for delaying this contract" value={reason} onChange={(e) => setReason(e.target.value)} />
      </Reason>
      <UpdateBtn>
        <button onClick={updateContractHandler} >Update Contract</button>
      </UpdateBtn>
    </Section>
  ) : (
    <Section ref={wrapperRef}>Loading...</Section>
  );
};

export default UpdateContract;
