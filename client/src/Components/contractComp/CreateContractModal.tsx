import axios from "axios";
import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import { BASE_URL, contractEnd } from "../../utils/APIRoutes";
import { userProps } from "../../utils/GlobalContants";
import { getHeaders } from "../../utils/helperFunction";
import { useOutsideAlerter } from "../../utils/OutsideAlerter";

const Section = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  width: 60vw;
  height: 90vh;
  background-color: aliceblue;
  border: 1px solid red;
  transform: translate(-50%, -50%);
  overflow: auto;

  box-sizing: border-box;
  padding: 2rem 1.5rem;
`;

const TeamLead = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 2rem;

  img {
    width: 3rem;
    height: 3rem;
  }

  div {
    display: flex;
    flex-direction: column;
  }
`;

const MemberRoles = styled.div`
  border: 1px solid red;
  display: grid;
  grid-template-columns: auto auto;
`;

const MemberRole = styled.div`
  border: 1px solid red;

  div {
    display: flex;
  }
  img {
    width: 3rem;
    height: 3rem;
  }
`;

const ContractDates = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-around;
`;

interface groupMemberProps {
  _id: string;
  name: string;
  photo: string;
}

interface chatObj {
  chatName?: string;
  contracted?: Boolean;
  chatPhoto?: string;
  createdAt?: string;
  groupAdmin?: {
    _id?: string;
    name?: string;
    photo?: string;
  };
  isGroupChat?: Boolean;
  users?: Array<groupMemberProps>;
  _id?: string;
  contractId?: string;
  contractAprovedBy: Array<string>;
  contractApproved: Boolean;
}

interface contractModalProps {
  selectedChat: chatObj;
  user: userProps;
  closeContractModal: any
}

interface memberRolesProps {
  id: number;
  member: string;
  role: string;
  responsibility: string;
  name: string;
  photo: string;
}

const CreateContractModal = ({ selectedChat, user, closeContractModal }: contractModalProps) => {
  const [memberRoles, setMemberRoles] = useState<memberRolesProps[]>([]);
  const [contractName, setContractName] = useState("");
  const [projectDescription, setProjectDescription] = useState("");
  const [startDate, setStartDate] = useState("");
  const [dueDate, setDueDate] = useState("");

  const wrapperRef = useRef<HTMLDivElement | null>(null);
  useOutsideAlerter(wrapperRef, closeContractModal)

  useEffect(() => {
    console.log(selectedChat.users);

    (selectedChat.users as unknown as groupMemberProps[]).map((user, index) => {
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
    e.preventDefault();

    const { data } = await axios.post(
      `${BASE_URL}${contractEnd}`,
      {
        contractName,
        projectDescription,
        startDate,
        dueDate,
        team: memberRoles,
        chatId: selectedChat._id
      },
      {
        headers: getHeaders(user.token ?? ""),
      }
    );
    console.log(data);
  };

  return (
    <Section ref={wrapperRef}>
      <TeamLead>
        <img src={selectedChat.groupAdmin?.photo} alt="groupAdmin" />
        <div>
          <h3>{selectedChat.groupAdmin?.name}</h3>
          <h5>Team Lead</h5>
        </div>
      </TeamLead>
      <input
        type="text"
        value={contractName}
        onChange={(e) => setContractName(e.target.value)}
      />
      <textarea
        value={projectDescription}
        onChange={(e) => setProjectDescription(e.target.value)}
      />
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
                id=""
                value={member.role}
                onChange={(e) => handleRoleChange(e, index)}
              />
              <textarea
                name="responsibility"
                value={member.responsibility}
                onChange={(e) => handleResponibilityChange(e, index)}
              />
            </MemberRole>
          );
        })}
      </MemberRoles>
      <ContractDates>
        <input
          type="date"
          name="startDate"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
        />
        <input
          type="date"
          name="endDate"
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
        />
      </ContractDates>
      <button onClick={initializeContractHandler}>Initialize Contract</button>
    </Section>
  );
};

export default CreateContractModal;
