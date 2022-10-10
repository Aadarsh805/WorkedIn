import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { localStorageUser } from "../Components/GeneralComp/GlobalContants";

import Navbar from "../Components/GeneralComp/Navbar";
import Intro from "../Components/ProfileComp/Intro";
import PastProjects from "../Components/ProfileComp/PastProjects";
import Skills from "../Components/ProfileComp/Skills";

const Section = styled.div`
  border: 1px solid black;

  margin: 1rem;
  /* display: flex; */
`;

const Profile = () => {
  interface userProps {
      name?: string;
      email?: string;
      active?: boolean;
      connections?: Array<string>;
      pastProjects?: Array<string>;
      photo?: string;
      skills?: Array<string>;
      _id?: string;
  }

  const [user, setUser] = useState<userProps>({})
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchUserData() {
      const data = await JSON.parse(
        localStorage.getItem(localStorageUser) || "{}"
      );
      setUser(data);
    }
    fetchUserData();
    setLoading(!loading)
  }, []);

  useEffect(() => {
    console.log(loading);
    
  }, [loading])
  

  return (
    <>
      <Navbar />
      {!loading ? (
        <Section>
          <Intro userDetails={user} />
          <Skills />
          <PastProjects />
        </Section>
      ) : 
        <h1>Loading ...</h1>
      }
    </>
  );
};

// Intro
// Skills
// Past Projects

export default Profile;
