import axios from "axios";
import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import { chatObj, member } from "../../../types/chatTypes";
import { userProps } from "../../../types/userProps";
import { BASE_URL, contractEnd } from "../../../utils/APIRoutes";
import { getHeaders } from "../../../utils/helperFunction";
import { useOutsideAlerter } from "../../../utils/OutsideAlerter";

const Section = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  width: 60vw;
  height: 80vh;
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

  h2 {
    color: #faf8f1;
    font-size: 1.2rem;
    font-weight: 600;
  }
`;

const Heading = styled.div`
  /* border: 1px solid white; */

  h2,
  h4,
  h5 {
    display: inline;
    color: #faf8f1;
  }

  h2 {
    &:first-child {
      margin-right: 0.7rem;
    }
  }

  h5 {
    margin-right: 0.2rem;
    font-weight: 300;
  }

  h4 {
    font-weight: 500;
    text-decoration: underline;
    /* text-decoration-thickness 1.5px; */
  }
`;

const ProjectDetails = styled.div`
  /* border: 1px solid red; */

  input {
    padding: 0.7rem 1rem;
    border-radius: 10px;
    outline: none;
    border: none;
    width: 90%;
    margin: 0.6rem 0 1rem;
    font-size: 1rem;
    background: #faf8f1;
    color: rgb(58, 66, 27);
    box-sizing: border-box;

    &::placeholder {
      color: rgb(58, 66, 27);
    }
  }

  textarea {
    padding: 0.7rem 1rem;
    border-radius: 10px;
    outline: none;
    border: none;
    width: 90%;
    height: 8rem;
    margin: 0.6rem 0 0.5rem;
    font-size: 1rem;
    background: #faf8f1;
    color: rgb(58, 66, 27);
    resize: none;
    box-sizing: border-box;

    &::placeholder {
      font-size: 1rem;
      color: rgb(58, 66, 27);
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

const MemberRoles = styled.div`
  /* border: 1px solid red; */
  display: grid;
  grid-template-columns: auto auto;
  padding: 1rem 0;
`;

const MemberRole = styled.div`
  /* border: 1px solid red; */
  border-radius: 10px;
  margin: 0 auto;
  margin-bottom: 1.5rem;
  padding: 1rem;
  box-sizing: border-box;
  width: 90%;
  background-color: #faf8f1;

  div {
    display: flex;
    align-items: center;

    h4 {
      font-size: 1.2rem;
      font-weight: 600;
    }

    img {
      width: 3rem;
      height: 3rem;
      margin-right: 0.6rem;
      border-radius: 50%;
      object-fit: cover;
      -webkit-box-shadow: 0px 0px 5px 3px rgba(0, 0, 0, 0.22);
      -moz-box-shadow: 0px 0px 5px 3px rgba(0, 0, 0, 0.22);
      box-shadow: 0px 0px 5px 3px rgba(0, 0, 0, 0.22);
    }
  }

  input {
    padding: 0.7rem 1rem;
    border-radius: 10px;
    outline: none;
    border: none;
    width: 100%;
    margin: 0.6rem 0 0rem;
    font-size: 0.8rem;
    color: #faf8f1;
    background-color: rgb(58, 66, 27);
    box-sizing: border-box;

    &::placeholder {
      color: rgba(250, 248, 241, 0.7);
    }
  }

  textarea {
    padding: 0.7rem 1rem;
    border-radius: 10px;
    outline: none;
    border: none;
    width: 100%;
    box-sizing: border-box;
    height: 8rem;
    margin: 0.6rem 0 0rem;
    font-size: 0.8rem;
    color: #faf8f1;
    background-color: rgb(58, 66, 27);
    resize: none;

    &::placeholder {
      font-size: 0.8rem;
      color: rgba(250, 248, 241, 0.7);
      font-weight: 500;
    }

    &::-webkit-scrollbar {
      width: 0.3rem;
      &-thumb {
        background-color: #faf8f1;
        width: 0.1rem;
        border-radius: 1rem;
      }
    }
  }
`;

const ContractDates = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-around;
  margin-bottom: 0.5rem;

  input {
    border-radius: 8px;
    border: none;
    width: 45%;
    outline: none;
    padding: 0.5rem 0.5rem;
    /* display: flex; */
    /* align-items: center; */
    /* justify-content: center; */
    background-color: #faf8f1;
    /* color: rgb(58, 66, 27); */
  }
`;

const Date = styled.div`
  display: flex;
  /* border: 1px solid white; */
  width: 50%;
  align-items: center;

  h2{
    /* font-weight: 600; */
    margin-right: 1rem;
  }
`

const InitialiseButton = styled.div`
  /* border: 1px solid white; */
  display: flex;
  align-items: center;
  justify-content: center;

  button {
    width: 40%;
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
`;


interface contractModalProps {
  selectedChat: chatObj;
  user: userProps;
  closeContractModal: any;
}

interface memberRoleProps {
  id: number;
  member: string;
  role: string;
  responsibility: string;
  name: string;
  photo: string;
}

const CreateContract = ({
  selectedChat,
  user,
  closeContractModal,
}: contractModalProps) => {
  const [memberRoles, setMemberRoles] = useState<memberRoleProps[]>([]);
  const [contractName, setContractName] = useState("");
  const [projectDescription, setProjectDescription] = useState("");
  const [startDate, setStartDate] = useState("");
  const [dueDate, setDueDate] = useState("");

  const wrapperRef = useRef<HTMLDivElement | null>(null);
  useOutsideAlerter(wrapperRef, closeContractModal);

  useEffect(() => {
    console.log(selectedChat.users);

    (selectedChat.users as unknown as member[]).map((user, index) => {
      console.log(index);
      if (memberRoles.find((member) => member.member === user._id)) {
        return memberRoles;
      }
      return setMemberRoles([
        ...memberRoles,
        (memberRoles[index] = {
          id: index,
          member: user._id,
          role: "",
          responsibility: "",
          name: user.name,
          photo: user.photo,
        }),
      ]);
    });
  }, []);

  const handleRoleChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    let newArr = [...memberRoles];
    newArr[index].role = e.target.value;
    setMemberRoles(newArr);
  };

  const handleResponibilityChange = (
    e: React.ChangeEvent<HTMLTextAreaElement>,
    index: number
  ) => {
    let newArr = [...memberRoles];
    newArr[index].responsibility = e.target.value;
    setMemberRoles(newArr);
  };

  useEffect(() => {
    console.log(memberRoles);
  }, [memberRoles]);

  useEffect(() => {
    console.log(startDate);
  }, [startDate]);

  const initializeContractHandler = async (e: any) => {
    const { data } = await axios.post(
      `${BASE_URL}${contractEnd}`,
      {
        contractName,
        projectDescription,
        startDate,
        dueDate,
        team: memberRoles,
        chatId: selectedChat._id,
      },
      {
        headers: getHeaders(user.token ?? ""),
      }
    );
    console.log(data);
    window.location.reload();
  };

  return (
    <Section ref={wrapperRef}>
      <ProjectDetails>
        <Heading>
          <h2>Project Name</h2>
          <h5>Lead by</h5>
          <h4>{selectedChat.groupAdmin?.name}</h4>
        </Heading>
        <input
          type="text"
          placeholder="Your Project Name"
          value={contractName}
          onChange={(e) => setContractName(e.target.value)}
        />
        <h2>Project Description</h2>
        <textarea
          value={projectDescription}
          placeholder="Tell us about your project"
          onChange={(e) => setProjectDescription(e.target.value)}
        />
        <ContractDates>
        <Date>
          <h2>Start Date</h2>
          <input
            type="date"
            name="startDate"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
          />
        </Date>
        <Date>
          <h2>Due Date</h2>
          <input
            type="date"
            name="endDate"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
          />
        </Date>
      </ContractDates>
      </ProjectDetails>
      <h2>Team Members</h2>
      <MemberRoles>
        {memberRoles?.map((member, index) => {
          return (
            <MemberRole key={index}>
              <div>
                <img src={member.photo} alt="memberImg" />
                <h4>{member.name}</h4>
              </div>
              <input
                type="text"
                name="role"
                placeholder={`${member.name.split(" ")[0]}'s Role`}
                value={member.role}
                onChange={(e) => handleRoleChange(e, index)}
              />
              <textarea
                name="responsibility"
                placeholder={`${member.name.split(" ")[0]}'s Responibilities`}
                value={member.responsibility}
                onChange={(e) => handleResponibilityChange(e, index)}
              />
            </MemberRole>
          );
        })}
      </MemberRoles>
      
      <InitialiseButton>
        <button onClick={initializeContractHandler}>Initialize Contract</button>
      </InitialiseButton>
    </Section>
  );
};

export default CreateContract;