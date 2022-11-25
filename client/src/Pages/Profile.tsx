import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { localStorageUser, userProps } from "../Utils/GlobalContants";

import Navbar from "../Components/GeneralComp/Navbar";
import Intro from "../Components/ProfileComp/Intro";
import NoSkill from "../Components/ProfileComp/NoSkill";
import PastProjects from "../Components/ProfileComp/PastProjects";
import Skills from "../Components/ProfileComp/Skills";

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
  

  const [user, setUser] = useState<userProps>({})
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchUserData() {
      const data = await JSON.parse(
        localStorage.getItem(localStorageUser) || "{}"
      );
      console.log(data);
      
      setUser(data);
    }
    fetchUserData();
    setLoading(!loading)
  }, []);

  // API --> for the user --> if Profile --> /me , if other user --> getUser

  useEffect(() => {
    console.log(loading);
    
  }, [loading])
  

  return (
    <>
      <Navbar />
      {/* {!loading ? ( */}
      <ProfileContainer>
        <Section>
          <Intro userDetails={user} />
          {
            user.skills?.length !== 0 ? 
            <Skills skillArr={user.skills} /> : 
            <NoSkill/>
          }
          <PastProjects />
        </Section>
        </ProfileContainer>
      {/* ) :  */}
        {/* <h1>Loading ...</h1> */}
      {/* } */}
    </>
  );
};

// Intro
// Skills
// Past Projects

export default Profile;
