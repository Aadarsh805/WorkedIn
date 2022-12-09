import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { localStorageUser, userProps } from "../utils/GlobalContants";

import Navbar from "../components/generalComp/Navbar";
import Intro from "../components/profileComp/Intro";
import NoSkill from "../components/profileComp/NoSkill";
import PastProjects from "../components/profileComp/PastProjects";
import Skills from "../components/profileComp/Skills";
import axios from "axios";
import { BASE_URL, userEnd } from "../utils/APIRoutes";
import { getHeaders } from "../utils/helperFunction";
import About from "../components/profileComp/About";

const Section = styled.div`
  border: 5px solid black;
  padding: 5rem 5vw 1rem;
  box-sizing: border-box;
  width: 100%;
  min-height: calc(100vh - 2.5rem);
  background-color: rgba(207, 186, 148, 255);
  display: flex;
`;

const UserContracts = styled.div`
  border: 1px solid red;
`;

const UserDetails = styled.div`
/* display: flex; */
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

  return (
    <>
      <Navbar />
      <Section>
        <UserDetails>
          <Intro user={user} />
          <About  />
        </UserDetails>
        <UserContracts></UserContracts>
        {/* {
            user.skills?.length !== 0 ? 
            <Skills skillArr={user.skills} /> : 
            <NoSkill/>
          } */}
      </Section>
    </>
  );
};

// Intro
// Skills
// Past Projects

export default Profile;
