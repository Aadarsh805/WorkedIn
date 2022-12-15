import React, { useState } from "react";
import styled from "styled-components";
import { GrAddCircle } from "react-icons/gr";
import UpdateSkills from "./UpdateSkills";

const Section = styled.div`
  box-sizing: border-box;
  padding: 2rem 2rem 2rem;
  margin-bottom: 1.5rem;
  width: 100%;
  background-color: #3a421b;
  border-radius: 10px;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  h2 {
    color: rgba(236, 227, 212, 255);
    font-size: 1.4rem;
    /* font-weight: ; */
    margin-bottom: 0.5rem;
  }
`;

const AddSkill = styled.div`
  /* border: 1px solid red; */
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.25s linear;

  svg{
    padding: 5px;
    width: 2rem;
    height: 2rem;
  }

  svg path{
    stroke: rgba(236, 227, 212, 255);
  }
  
  &:hover{
    background-color: rgba(236, 227, 212, 255);
    cursor: pointer;

  svg path{
    stroke: #3a421b;
  }
  }
`;

interface noSkillProps {
  userToken: string
}

const NoSkill = ({userToken}: noSkillProps) => {

  const [updateSkillModal, setUpdateSkillModal] = useState(false);

  const closeUpdateSkillHandler = () => {
    setUpdateSkillModal(false)
  }

  return (
    <Section>
      <h2>Show your skills to people</h2>
      <AddSkill onClick={() => setUpdateSkillModal(!updateSkillModal)} >
        <GrAddCircle />
      </AddSkill>
      {
        updateSkillModal ? <UpdateSkills userToken={userToken} modalFunction={closeUpdateSkillHandler} userSkills={[]}  /> : null
      }
    </Section>
  );
};

export default NoSkill;
