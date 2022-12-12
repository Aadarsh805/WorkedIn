import React from "react";
import styled from "styled-components";

const Section = styled.div`
  background-color: #faf8f1;
  border-radius: 10px;
  width: 90%;
  margin: 0 auto;
  /* margin: 1rem auto 0.5rem; */
  padding: 0.8rem 1rem;
  box-sizing: border-box;
`;

const MemberDetails = styled.div`
  /* border: 1px solid red; */
  display: flex;
  align-items: center;
  margin-bottom: 0.8rem;

  img {
    /* border: 1px solid red; */
    width: 3rem;
    height: 3rem;
    margin-right: 0.7rem;
    border-radius: 50%;
    -webkit-box-shadow: 0px 0px 5px 3px rgba(0, 0, 0, 0.22);
    -moz-box-shadow: 0px 0px 5px 3px rgba(0, 0, 0, 0.22);
    box-shadow: 0px 0px 5px 3px rgba(0, 0, 0, 0.22);
  }

  div {
    height: 3rem;
    display: flex;
    flex-direction: column;
    /* align-items: center; */
    justify-content: center;
    /* border: 1px solid red; */

    h2 {
      /* border: 1px solid red; */
      color: #000;
      font-size: 0.9rem;
      padding: 0;
      margin: 0;
      margin-bottom: 0.2rem;
      /* line-height: 0; */
      line-height: 100%;
    }

    h3 {
      /* border: 1px solid red; */
      font-size: 1rem;
      line-height: 100%;
    }
  }
`;

const MemberResponsibility = styled.p`
  /* border: 1px solid red; */
  background-color: rgb(58, 66, 27);
  line-height: 160%;
  color: #faf8f1;
  padding: 0.5rem;
  border-radius: 10px;
  font-size: 0.9rem;
  /* max-height: 8rem; */
  overflow-y: auto;

  &::-webkit-scrollbar {
    width: 0.3rem;
    &-thumb {
      background-color: #faf8f1;
      width: 0.1rem;
      border-radius: 1rem;
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

interface memberProps {
  currentUser: teamMember;
}

const TeamMemberCard = ({ currentUser }: memberProps) => {
  return (
    <Section>
      <MemberDetails>
        <img src={currentUser.member.photo} alt="" />
        <div>
          <h2>{currentUser.member.name}</h2>
          <h3>{currentUser.role}</h3>
        </div>
      </MemberDetails>
      <MemberResponsibility>{currentUser.responsibility}</MemberResponsibility>
    </Section>
  );
};

export default TeamMemberCard;
