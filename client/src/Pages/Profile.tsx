import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { localStorageUser } from "../Components/GeneralComp/GlobalContants";

import Navbar from "../Components/GeneralComp/Navbar";
import Intro from "../Components/ProfileComp/Intro";
import NoSkill from "../Components/ProfileComp/NoSkill";
import PastProjects from "../Components/ProfileComp/PastProjects";
import Skills from "../Components/ProfileComp/Skills";

const Section = styled.div`
  border: 1px solid black;
  margin: 1vw;
  /* display: flex; */
`;

const Profile = () => {
  interface userProps {
      name?: string;
      email?: string;
      connections?: Array<string>;
      pastProjects?: Array<string>;
      photo?: string;
      skills?: Array<string>;
      _id?: string;
      designation?: string;
      about?: string
      discord?: string;
      linkedin?: string;
      github?: string;
      twitter?: string;
      personalWebsite?: string;
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

  // API --> for the user --> if Profile --> /me , if other user --> getUser

  useEffect(() => {
    console.log(loading);
    
  }, [loading])
  

  return (
    <>
      <Navbar />
      {!loading ? (
        <Section>
          <Intro userDetails={user} />
          {
            user.skills?.length !== 0 ? 
            <Skills skillArr={user.skills} /> : 
            <NoSkill/>
          }
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
