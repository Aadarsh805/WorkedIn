import React from 'react'
import styled from 'styled-components';
import { userProps } from '../../utils/GlobalContants';
import TeamMemberCard from './TeamMemberCard';


const Header = styled.div`
  /* border: 1px solid red; */
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

const MyRole = styled.div`
  /* border: 1px solid red; */
  margin: 1.5rem 0;

  h2 {
    color: #faf8f1;
    font-size: 1.2rem;
    font-weight: 600;
  }
`;

const MyCardContainer = styled.div`
  /* border: 1px solid red; */
  width: 50%;
  margin: 0.5rem auto 0.5rem;
`;

const TeamRoles = styled.div`
  h2 {
    margin-bottom: 1rem;
  }
`;

const TeamRolesContainer = styled.div`
  display: grid;
  grid-template-columns: auto auto;
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

interface contractBodyProps { 
    contract: contractProps;
  userData: userProps;
}

const ContractBody = ({contract, userData}: contractBodyProps) => {
    const currentUser = contract.team.find(
        (member) => member.member._id === userData._id
      );
  return (
    <>
    <Header>
        <h1>{contract.contractName}</h1>
        <h4>Created by</h4>
        <h3>{contract.lead.name}</h3>
      </Header>
      <Description>{contract.projectDescription}</Description>
      <MyRole>
        <h2>My Role :- </h2>
        <MyCardContainer>
          <TeamMemberCard currentUser={currentUser!} />
        </MyCardContainer>
      </MyRole>
      <TeamRoles>
        <h2>Team Member's Role :-</h2>
        <TeamRolesContainer>
          {contract.team
            .filter((member) => {
              if (member.member._id !== userData._id) {
                return member;
              } else return null;
            })
            .map((member) => {
              return <TeamMemberCard currentUser={member} />;
            })}
        </TeamRolesContainer>
      </TeamRoles>
    </>
  )
}

export default ContractBody