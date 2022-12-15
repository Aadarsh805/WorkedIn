import React from "react";
import { BsArrow90DegRight } from "react-icons/bs";
import styled from "styled-components";
import { months } from "../../utils/GlobalContants";
import StatusStrip from "./StatusStrip";

const Section = styled.div`
  position: relative;
  width: 80%;
  margin: 0 auto;
  margin-bottom: 1.5rem;
  padding: 1rem 2rem;
  box-sizing: border-box;
  border-radius: 10px;
  background-color: rgba(236, 227, 212, 255);
  overflow: hidden;
`;

const ContractName = styled.div`
  display: inline;
  position: relative;
  /* border: 1px solid white; */

  h2 {
    /* padding-top: 0.5rem; */
    display: inline;
    font-size: 1.7rem;
    margin-right: 0.6rem;
  }

  svg {
    /* border: 1px solid white; */
    position: absolute;
    top: 1.7rem;
    left: 0.25rem;
    transform: rotateX(180deg);
    width: 2rem;
    height: 2rem;
  }
`;

const ContractDates = styled.div`
  position: absolute;
  top: 1rem;
  right: 1rem;
  font-size: 0.8rem;
  font-weight: 600;
`;

const LeadBy = styled.div`
  display: inline;
  font-size: 0.8rem;
  font-weight: 500;
  /* border: 1px solid white; */

  h4 {
    margin-left: 0.2rem;
    /* border: 1px solid white; */
    display: inline;
    font-weight: 600;
    font-size: 1rem;
    text-decoration: underline;
    cursor: pointer;
  }
`;

const ContractBrief = styled.div`
  /* border: 1px solid red; */
  display: flex;
  margin-top: 0.8rem;

  p {
    width: 60%;
    text-indent: 2.75rem;
    line-height: 160%;
    font-size: 1rem;
    /* border-right: 2px solid rgba(137, 117, 88, 255); */
    /* border-bottom: 2px solid rgba(137, 117, 88, 255); */
    box-sizing: border-box;
    padding-right: 1rem;
    padding-bottom: 0.4rem;
  }
`;

const MemberPics = styled.div`
  /* border: 1px solid red; */
  width: 35%;
  box-sizing: border-box;
  /* padding: 0 1rem; */

  display: flex;
  flex-wrap: wrap;

  img {
    width: 3rem;
    height: 3rem;
    margin: 0 0.5rem 0.5rem;
    border-radius: 50%;
    object-fit: cover;
    -webkit-box-shadow: 0px 0px 5px 3px rgba(0, 0, 0, 0.22);
    -moz-box-shadow: 0px 0px 5px 3px rgba(0, 0, 0, 0.22);
    box-shadow: 0px 0px 5px 3px rgba(0, 0, 0, 0.22);
    cursor: pointer;

    &:first-child {
      margin-left: 0;
    }
  }
`;

const ShowContractButton = styled.div`
  /* border: 1px solid red; */
  /* position: absolute; */
  /* bottom: 1rem; */
  /* right: 1rem; */
  display: flex;
  margin-top: 0.5rem;
  /* align-items: flex-end; */
  justify-content: flex-end;

  button {
    border-radius: 4px;
    cursor: pointer;
    padding: 8px 16px;
    background-color: #735f32;
    /* background-color: rgba(236, 227, 212, 255); */
    box-sizing: border-box;
    font-size: 1rem;
    color: rgba(236, 227, 212, 255);
    /* color: #735f32; */
    font-weight: 500;
    border: 2px solid rgb(58, 66, 27);
    border: 2px solid #735f32;
    border: 2px solid #000;
    box-shadow: 3px 3px 0px #735f32;
    box-shadow: 3px 3px 0px #000;
    translate: -3px -3px;
    transition: all 0.15s ease-in;

    &:hover {
      translate: 0;
      box-shadow: 0 0 0;
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
  member: member;
  responsibility: string;
  review: number;
  role: string;
}

interface contractProps {
  chatId: string;
  contractName: string;
  createdAt: string;
  dueDate: string;
  lead: member;
  prevDueDates: [];
  projectDescription: string;
  startDate: string;
  status: string;
  team: Array<teamMember>;
  _id: string;
}

interface contractCardProps {
  contract: contractProps;
  showContract: any;
}

const ContractCard = ({ contract, showContract }: contractCardProps) => {
  const getReadableTime = (date: string) => {
    var readable = new Date(date);
    var m = readable.getMonth();
    var d = readable.getDay();
    var y = readable.getFullYear();

    var mlong = months[m];
    var fulldate = mlong + " " + d + ", " + y;
    return fulldate;
  };
  return (
    <Section>
      <ContractName>
        {/* <StatusStrip status={contract.status} /> */}
        <h2>{contract.contractName}</h2>
        <BsArrow90DegRight />
      </ContractName>
      <ContractDates>
        {getReadableTime(contract.startDate.slice(0, 10))} -{" "}
        {getReadableTime(contract.dueDate.slice(0, 10))}
      </ContractDates>
      <LeadBy>
        Lead by
        <h4>{contract.lead.name}</h4>
      </LeadBy>
      <ContractBrief>
        <p>
          {contract.projectDescription.slice(0, 300)}
          {contract.projectDescription.length > 300 ? "...." : null}
        </p>
        <MemberPics>
          {contract.team.map((member,index) => {
            return <img src={member.member.photo} alt="memberImg" key={index} />;
          })}
        </MemberPics>
      </ContractBrief>
      <ShowContractButton>
        <button onClick={() => showContract(contract)}>Show Contract</button>
      </ShowContractButton>
    </Section>
  );
};

export default ContractCard;
