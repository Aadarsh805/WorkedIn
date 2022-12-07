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

const Section = styled.div`
  /* border: 1px solid black; */
  /* margin: 1vw; */
  /* margin-top: 2rem; */
  /* display: flex; */
  padding-top: 2rem;
  margin: 0 1vw;
  `;

const ProfileContainer = styled.div`
/* background-color: ${props => props.theme.grey}; */
  width: 100%;
  min-height: calc(100vh - 3rem);
  color: ${props => props.theme.lightBlack};
`

const Profile = () => {

  const [localUser, setLocalUser] = useState<userProps>({})
  const [user, setUser] = useState<userProps>({})

  async function fetchUserData() {
    const data = await JSON.parse(
      localStorage.getItem(localStorageUser) || "{}"
    );      
    setLocalUser(data);
  }

  async function fetchMyDetails () {
    const {data} = await axios.get(`${BASE_URL}${userEnd}me`, {
      headers: getHeaders(localUser.token ?? '')
    })
    console.log(data.data.data);
    const userData = data.data.data
    setUser(userData)
  }

  useEffect(() => {
    fetchUserData();
  }, []);

  useEffect(() => {
    console.log(localUser.token);
    if (Object.keys(localUser).length !== 0) {
      fetchMyDetails()
    }
  }, [localUser])

  return (
    <>
      <Navbar />
      <ProfileContainer>
        <Section>
          <Intro user={user} />
          {
            user.skills?.length !== 0 ? 
            <Skills skillArr={user.skills} /> : 
            <NoSkill/>
          }
          <PastProjects />
        </Section>
        </ProfileContainer>
    </>
  );
};

// Intro
// Skills
// Past Projects

export default Profile;
