import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { localStorageUser } from "../utils/globalContants";

import Navbar from "../components/generalComp/Navbar";
import Intro from "../components/profileComp/Intro";
import NoSkill from "../components/profileComp/NoSkill";
import Skills from "../components/profileComp/Skills";
import axios from "axios";
import { BASE_URL, userEnd } from "../utils/apiRoutes";
import { getHeaders } from "../utils/helperFunction";
import About from "../components/profileComp/About";
import ContractCard from "../components/contractComp/ContractCard";
import RecentUserActivity from "../components/profileComp/RecentUserActivity";
import { userProps } from "../types/userTypes";
import { contractProps } from "../types/contractTypes";
import ShowContract from "../components/contractComp/contractModals/ShowContract";
import { useLocation, useParams } from "react-router-dom";

const Section = styled.div`
  /* border: 5px solid black; */
  padding: 5rem 5vw 1rem;
  box-sizing: border-box;
  width: 100%;
  min-height: calc(100vh - 2.5rem);
  background-color: rgba(207, 186, 148, 255);
  display: flex;
  position: relative;
`;

const UserDetails = styled.div`
  /* border: 1px solid red; */
  width: 55vw;
  /* display: flex; */
`;

const MyProjects = styled.div`
  box-sizing: border-box;
  padding-top: 1.5rem;
  padding-bottom: 0.5rem;
  width: 100%;
  background-color: #3a421b;
  border-radius: 10px;
`;

const ProjectHeading = styled.h1`
  color: rgba(236, 227, 212, 255);
  font-size: 1.4rem;
  margin-bottom: 1.5rem;
  padding: 0 2rem;
`;

const Contracts = styled.div`
  /* border: 1px solid white; */
  display: flex;
  flex-direction: column-reverse;
`;

const Profile = () => {
  const [localUser, setLocalUser] = useState<userProps>({});
  const [user, setUser] = useState<userProps>({});
  const [userId, setUserId] = useState();

  const [isShowContractModalOpen, setIsShowContractModalOpen] = useState(false);
  const [clickedContract, setClickedContract] = useState<contractProps>();

  const params = useParams();
  const location = useLocation();

  useEffect(() => {
    console.log("Location ID :- " + location.state.id);
    setUserId(location.state.id)
  }, [])
  

  async function fetchLocalUserData() {
    const data = await JSON.parse(
      localStorage.getItem(localStorageUser) || "{}"
    );
    setLocalUser(data);
  }

  async function fetchMyDetails() {
    const { data } = await axios.get(`${BASE_URL}${userEnd}me`, {
      headers: getHeaders(localUser.token ?? ""),
    });
    console.log(data.data.data);
    const userData = data.data.data;
    setUser(userData);
  }

  async function fetchUserDetails() {
    const { data } = await axios.get(`${BASE_URL}${userEnd}${userId}`, {
      headers: getHeaders(localUser.token ?? '')
    })
    console.log(data.data.data);
    const userData = data.data.data;
    setUser(userData)
  }

  useEffect(() => {
    fetchLocalUserData();
    console.log(params.id);
  }, []);

  useEffect(() => {
    console.log("TYPE of PARAMID :- " + typeof userId);
    console.log("TYPE of LocalId :- " + typeof localUser._id);
    if (Object.keys(localUser).length !== 0 && userId) {
      if (userId !== localUser._id) {
        console.log('next');
        fetchUserDetails();
      } else {
        fetchMyDetails();
      }
    }
  }, [localUser, userId]);

  const showContract = (contract: contractProps) => {
    setIsShowContractModalOpen(!isShowContractModalOpen);
    setClickedContract(contract);
  };

  const closeContractModal = () => {
    setIsShowContractModalOpen(false);
  };

  return (
    user && (
      <>
        <Navbar />
        <Section>
          <UserDetails>
            <Intro user={user} userToken={localUser.token!} />
            <About
              userAbout={user.about!}
              userToken={localUser.token!}
              mail={user.email!}
              portfolio={user.personalWebsite!}
            />
            {user.skills?.length !== 0 ? (
              <Skills skillArr={user.skills!} userToken={localUser.token!} />
            ) : (
              <NoSkill userToken={localUser.token!} />
            )}
            <MyProjects>
              <ProjectHeading>My Past Projects</ProjectHeading>
              <Contracts>
                {Object.keys(user).length !== 0 &&
                  (user.pastProjects as unknown as contractProps[]).map(
                    (project, index) => {
                      return (
                        <ContractCard
                          key={index}
                          contract={project}
                          showContract={showContract}
                          descLength={100}
                        />
                      );
                    }
                  )}
              </Contracts>
              {clickedContract && isShowContractModalOpen ? (
                <ShowContract
                  contract={clickedContract}
                  userData={user}
                  closeContractModal={closeContractModal}
                />
              ) : null}
            </MyProjects>
          </UserDetails>
          <RecentUserActivity />
        </Section>
      </>
    )
  );
};

// Intro
// Skills
// Past Projects

export default Profile;
