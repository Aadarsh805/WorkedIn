import axios from "axios";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import NoContracts from "../components/contractComp/NoContracts";
import ShowContract from "../components/contractComp/ShowContract";
import Navbar from "../components/generalComp/Navbar";
import { BASE_URL, contractEnd } from "../utils/APIRoutes";
import { localStorageUser, months, userProps } from "../utils/GlobalContants";
import { getHeaders } from "../utils/helperFunction";
import { BsArrow90DegRight } from "react-icons/bs";

const Section = styled.div`
  padding: 1rem;
  padding-top: 4rem;
  box-sizing: border-box;
  position: relative;
  min-height: calc(100vh - 2.5rem);
  background-color: rgba(207, 186, 148, 255);
`;

const Contract = styled.div`
  position: relative;
  width: 80%;
  margin: 0 auto;
  margin-bottom: 1.5rem;
  padding: 1rem 2rem;
  box-sizing: border-box;
  border-radius: 10px;
  background-color: rgba(236, 227, 212, 255);
`;

const ContractName = styled.div`
  display: inline;
  position: relative;
  /* border: 1px solid white; */

  h2 {
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
  width: 40%;
  box-sizing: border-box;
  padding: 0 1rem;

  display: flex;
  flex-wrap: wrap;

  img {
    width: 2.5rem;
    height: 2.5rem;
    margin: 0 0.5rem 0.5rem;
    border-radius: 50%;
    -webkit-box-shadow: 0px 0px 5px 3px rgba(0, 0, 0, 0.22);
    -moz-box-shadow: 0px 0px 5px 3px rgba(0, 0, 0, 0.22);
    box-shadow: 0px 0px 5px 3px rgba(0, 0, 0, 0.22);
    cursor: pointer;
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
    padding: 12px 24px;
    background-color: #735F32;
    box-sizing: border-box;
    font-size: 1rem;
    color: #fff;
    font-weight: 400;
    border: 2px solid rgb(58, 66, 27);
    /* border: 2px solid #3a421b; */
    box-shadow: 3px 3px 0px rgb(58, 66, 27);
    translate: -3px -3px;
    transition: all 0.15s ease-in;
    /* line-height: 0; */

    &:hover {
      translate: 0;
      box-shadow: 0 0 0;
    }
  }
`

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
  const [isShowContractModalOpen, setIsShowContractModalOpen] = useState(false);

  const [clickedContract, setClickedContract] = useState<contractProps>();

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

    var mlong = months[m];
    var fulldate = mlong + " " + d + ", " + y;
    return fulldate;
  };

  const showContract = (contract: contractProps) => {
    setIsShowContractModalOpen(!isShowContractModalOpen);
    setClickedContract(contract);
  };

  return contracts.length === 0 ? (
    <NoContracts />
  ) : (
    <>
      <Navbar />
      <Section>
        {contracts.map((contract, index) => {
          return (
            <>
              <Contract key={index} >
                <ContractName>
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
                  <p>{contract.projectDescription}</p>
                  <MemberPics>
                    {contract.team.map((member) => {
                      return <img src={member.member.photo} alt="memberImg" />;
                    })}
                  </MemberPics>
                </ContractBrief>
                <ShowContractButton>
                <button onClick={() => showContract(contract)} >Show Contract</button>
                </ShowContractButton>
              </Contract>
              {clickedContract && isShowContractModalOpen ? (
                <ShowContract contract={clickedContract} userData={userData} />
              ) : null}
            </>
          );
        })}
      </Section>
    </>
  );
};

export default Contracts;