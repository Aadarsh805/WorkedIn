import React, { useEffect, useState } from "react";
import styled from "styled-components";
import {
  contractProps,
  localStorageUser, userProps,
} from "../utils/GlobalContants";

import Navbar from "../components/generalComp/Navbar";
import Intro from "../components/profileComp/Intro";
import NoSkill from "../components/profileComp/NoSkill";
import PastProjects from "../components/profileComp/PastProjects";
import Skills from "../components/profileComp/Skills";
import axios from "axios";
import { BASE_URL, userEnd } from "../utils/APIRoutes";
import { getHeaders } from "../utils/helperFunction";
import About from "../components/profileComp/About";
import ContractCard from "../components/contractComp/ContractCard";
import RecentUserActivity from "../components/profileComp/RecentUserActivity";

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
  /* display: flex; */
  padding-top: 1.5rem;
  padding-bottom: 0.5rem;
  /* padding: 1rem 2rem; */
  /* margin-bottom: 1.5rem; */
  /* width: 45vw; */
  width: 100%;
  background-color: #3a421b;
  border-radius: 10px;

  h1 {
    color: rgba(236, 227, 212, 255);
    font-size: 1.4rem;
    margin-bottom: 1.5rem;
    padding: 0 2rem;
  }
`;

const Profile = () => {
  const [localUser, setLocalUser] = useState<userProps>({});
  const [user, setUser] = useState<userProps>({});

  async function fetchUserData() {
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

  useEffect(() => {
    fetchUserData();
  }, []);

  useEffect(() => {
    console.log(localUser.token);
    if (Object.keys(localUser).length !== 0) {
      fetchMyDetails();
    }
  }, [localUser]);

  const showContract = (contract: contractProps) => {
    console.log("jhebfb");
  };

  return (
    user && (
      <>
        <Navbar />
        <Section>
          <UserDetails>
            <Intro user={user} />
            <About
              userAbout={user.about!}
              mail={user.email!}
              portfolio={user.personalWebsite!}
            />
            {user.skills?.length !== 0 ? (
              <Skills skillArr={user.skills} />
            ) : (
              <NoSkill />
            )}
            <MyProjects>
              <h1>My Past Projects</h1>
              {Object.keys(user).length !== 0 && (user.pastProjects as unknown as contractProps[]).map((project, index) => {
              return (
                <ContractCard key={index} contract={project} showContract={showContract} />
              );
            })}
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
