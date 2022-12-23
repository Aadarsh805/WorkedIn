import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import styled from "styled-components";
import { contractProps } from "../../../types/contractTypes";
import { getHeaders, getReadableTime } from "../../../utils/helperFunction";
import { BASE_URL, contractEnd } from "../../../utils/apiRoutes";
import { userProps } from "../../../types/userTypes";
import { useOutsideAlerter } from "../../../utils/outsideAlerter";

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

const ContractDates = styled.div`
  position: absolute;
  top: -0.8rem;
  right: 0rem;
  font-size: 1rem;
  font-weight: 400;
  color: #faf8f1;
`;

const Description = styled.p`
  /* border: 1px solid red; */
  /* margin: 0 auto; */
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

const Links = styled.div`
  /* border: 1px solid white; */
  margin-top: 1rem;
`;
const Link = styled.div`
  /* border: 1px solid white; */
  margin-bottom: 1rem;
  h2{
    margin-bottom: 0.25rem;
  }
  input {
    box-sizing: border-box;
    padding: 0.7rem 1rem;
    border-radius: 10px;
    outline: none;
    border: none;
    font-size: 1rem;
    font-weight: 500;
    width: 90%;
    background: #faf8f1;
    color: rgb(58, 66, 27);

    &::placeholder {
      color: rgb(58, 66, 27);
    }
  }
`;

interface updateSubmissionProps {
    contractId: string,
    user: userProps,
    clossEditSubmissionModal: any
}

const UpdateSubmission = ({contractId, user, clossEditSubmissionModal}: updateSubmissionProps) => {
    const [contract, setContract] = useState<contractProps>();
    const [githubLink, setGithubLink] = useState<string>('');
    const [liveLink, setLiveLink] = useState<string>("");

    const wrapperRef = useRef<HTMLDivElement | null>(null);
  useOutsideAlerter(wrapperRef, clossEditSubmissionModal);

    async function fetchContract() {
        const { data } = await axios.get(`${BASE_URL}${contractEnd}${contractId}`, {
          headers: getHeaders(user.token ?? ""),
        });
        console.log(data);
        const contractData = data.contract;
        setContract(contractData);
        setGithubLink(contractData.githubLink)
        setLiveLink(contractData.liveLink)
      }
    
      useEffect(() => {
        if (contractId) {
          fetchContract();
        }
      // eslint-disable-next-line react-hooks/exhaustive-deps
      }, []);

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
      <Links>
        <Link>
          <h2>Github Link</h2>
          <input
            type="url"
            placeholder="https://github.com/"
            value={githubLink}
            onChange={(e) => setGithubLink(e.target.value)}
            autoFocus
          />
        </Link>
        <Link>
          <h2>Deployed Version</h2>
          <input
            type="url"
            placeholder="https://example.com/"
            value={liveLink}
            onChange={(e) => setLiveLink(e.target.value)}
          />
        </Link>
      </Links>
    </Section>
  ) : <Section ref={wrapperRef}  >Loading...</Section>
}

export default UpdateSubmission