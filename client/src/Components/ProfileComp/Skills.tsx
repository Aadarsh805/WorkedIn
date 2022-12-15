import React, { useEffect, useState } from "react";
import { FaPencilAlt } from "react-icons/fa";
import { GrFormClose } from "react-icons/gr";
import styled from "styled-components";
import UpdateSkills from "./UpdateSkills";

const Section = styled.div`
  /* border: 1px solid red; */
  box-sizing: border-box;
  /* display: flex; */
  padding: 1rem 2rem;
  margin-bottom: 1.5rem;
  /* width: 45vw; */
  width: 100%;
  background-color: #3a421b;
  border-radius: 10px;
`;

const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;

  h2 {
    color: rgba(236, 227, 212, 255);
    /* color: black; */
    font-size: 1.4rem;
    margin-bottom: 1rem;
    /* border: 1px solid red; */
  }

  svg {
    /* border: 1px solid white; */
    padding: 4px;
    width: 1.4rem;
    border-radius: 4px;
    height: 1.4rem;
    fill: rgba(236, 227, 212, 255);
    transition: all 0.15s linear;
    cursor: pointer;

    &:hover {
      background-color: rgba(236, 227, 212, 255);
      fill: #3a421b;
    }
  }
`;

const SkillBadges = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin-bottom: 1rem;
  /* border: 1px solid red; */
`;

const SkillBadge = styled.div`
  display: flex;
  align-items: center;
  box-sizing: border-box;
  border-radius: 25px;
  padding: 0.4rem 0.6rem;
  margin: 0rem 0.4rem 0.5rem;
  display: flex;
  align-items: center;
  background-repeat: no-repeat;
  background-size: 50px 50px;
  background-color: #faf8f1;

  h4 {
    font-size: 1rem;
    font-weight: 600;
  }

  div {
    display: flex;
    align-items: center;
  }
`;

interface skillProps {
  skillArr: Array<string>;
  userToken: string
}

const Skills = ({ skillArr, userToken }: skillProps) => {
  const [updateSkils, setUpdateSkils] = useState(false);

  const closeUpdateSkillHandler = () => {
    setUpdateSkils(false)
  }

  return (
    <Section>
      <Header>
        <h2>Skills</h2>
        <div onClick={() => setUpdateSkils(!updateSkils)}>
          <FaPencilAlt />
        </div>
      </Header>
      <SkillBadges>
        {skillArr &&
          skillArr.map((skill) => {
            return (
              <SkillBadge>
                <h4>{skill}</h4>
              </SkillBadge>
            );
          })}
      </SkillBadges>
      {
        updateSkils ? <UpdateSkills userToken={userToken} modalFunction={closeUpdateSkillHandler} userSkills={skillArr}  /> : null
      }
    </Section>
  );
};

export default Skills;
