import axios from "axios";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Navbar from "../components/generalComp/Navbar";
import { BASE_URL, contractEnd } from "../utils/APIRoutes";
import { localStorageUser, userProps } from "../utils/GlobalContants";
import { getHeaders } from "../utils/helperFunction";

const Section = styled.div`
  padding: 1rem;
  margin-top: 2rem;
  border: 1px solid red;
`;

const Contract = styled.div`
  width: 100%;
  border: 1px solid red;

  img {
    width: 2rem;
    height: 2rem;
    border-radius: 50%;
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

const Contracts = () => {
  const [userData, setUserData] = useState<userProps>({});
  const [contracts, setContracts] = useState<Array<contractProps>>([]);

  useEffect(() => {
    async function fetchUserData() {
      const data = await JSON.parse(
        localStorage.getItem(localStorageUser) || "{}"
      );
      setUserData(data);
    }
    fetchUserData();
  }, []);

  async function fetchContracts() {
    const { data } = await axios.get(`${BASE_URL}${contractEnd}`, {
      headers: getHeaders(userData.token ?? ""),
    });
    console.log(data);
    setContracts(data.userContract);
  }

  useEffect(() => {
    console.log(userData);
    if (Object.keys(userData).length !== 0) {
      fetchContracts();
    }
  }, [userData]);

  const getReadableTime = (date: string) => {
    var readable = new Date(date);
    var m = readable.getMonth();
    var d = readable.getDay();
    var y = readable.getFullYear();

    var months = [
      "Jan",
      "Feb",
      "March",
      "April",
      "May",
      "June",
      "July",
      "Aug",
      "Sept",
      "Oct",
      "Nov",
      "Dec",
    ];
    var mlong = months[m];
    var fulldate = mlong + " " + d + ", " + y;
    return fulldate;
  };

  return (
    <>
      <Navbar />
      <Section>
        {contracts.map((contract, index) => {
          return (
            <Contract key={index}>
              <h2>{contract.contractName}</h2>
              <h5>Lead by {contract.lead.name}</h5>
              <h6>{contract.status}</h6>
              <p>{contract.projectDescription}</p>
              {contract.team.map((member) => {
                return <img src={member.member.photo} alt="memberImg" />;
              })}
              <h4>
                {getReadableTime(contract.startDate.slice(0,10))} -{" "}
                {getReadableTime(contract.dueDate.slice(0, 10))}
              </h4>
            </Contract>
          );
        })}
      </Section>
    </>
  );
};

export default Contracts;
