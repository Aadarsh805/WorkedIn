import axios from "axios";
import React, { useRef, useState } from "react";
import { GrFormClose } from "react-icons/gr";
import styled from "styled-components";
import { BASE_URL, userEnd } from "../../utils/APIRoutes";
import { getHeaders } from "../../utils/helperFunction";
import { useOutsideAlerter } from "../../utils/OutsideAlerter";

const Section = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  width: 60vw;
  max-height: 60vh;
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
    font-size: 1.8rem;
    font-weight: 600;
    margin-bottom: 1.2rem;
  }

  h2 {
    color: #faf8f1;
    font-size: 1.2rem;
    font-weight: 600;
    margin-bottom: 0.2rem;
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

const SkillBadges = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin-bottom: 1rem;
  /* border: 1px solid red; */
`

const SkillBadge = styled.div`
  display: flex;
  align-items: center;
  box-sizing: border-box;
  border-radius: 20px;
  padding: 0.4rem 0.5rem;
  margin: 0rem 0.4rem 0.5rem;
  display: flex;
  align-items: center;
  background-repeat: no-repeat;
  background-size: 50px 50px;
  background-color: #faf8f1;

  h5 {
    font-size: 0.7rem;
    font-weight: 600;
  }

  div {
    display: flex;
    align-items: center;

    svg {
      margin-left: 0.4rem;
      border-radius: 50%;
      background-color: rgb(58, 66, 27);
      cursor: pointer;
      width: 1rem;
    }

    svg path {
      stroke: rgb(255, 255, 255);
    }
  } 
`;

const UpdateBtn = styled.div`
  margin-top: 2.5rem;
  display: flex;
  align-items: center;
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
  }
`;

interface skillModalProps {
  modalFunction: any;
  userSkills: Array<string>;
  userToken: string
}

const UpdateSkills = ({ modalFunction, userSkills, userToken }: skillModalProps) => {
  const wrapperRef = useRef<HTMLDivElement | null>(null);
  useOutsideAlerter(wrapperRef, modalFunction);

  const [skill, setSkill] = useState("");
  const [skillArr, setSkillArr] = useState<Array<string>>(userSkills);

  const skillHandler = (event: any) => {
    if (event.key === "Enter") {
      setSkillArr((skillArr) => [...skillArr, skill]);
      setSkill("");
    }
  };

  const updateSkillHandler = async () => {
    const { data } = await axios.patch(`${BASE_URL}${userEnd}me/skills`, {
      skills: skillArr
    }, {
      headers: getHeaders(userToken)
    })
    console.log(data);
    window.location.reload();    
  }

  return (
    <Section ref={wrapperRef}>
      <h1>Add Skills</h1>
      <SkillBadges>
      {skillArr.map((skill, index) => {
        return (
          <SkillBadge key={index}>
            <h5>{skill}</h5>
            <div>
              <GrFormClose />
            </div>
          </SkillBadge>
        );
      })}
      </SkillBadges>
      <input
        type="text"
        placeholder="Show your skills to other folks"
        value={skill}
        onChange={(e) => setSkill(e.target.value)}
        onKeyDown={skillHandler}
      />
      <UpdateBtn>
        <button onClick={updateSkillHandler} >Update Skills</button>
      </UpdateBtn>
    </Section>
  );
};

export default UpdateSkills;
