import React, { useEffect } from "react";
import styled from "styled-components";
import { localStorageUser } from "../GeneralComp/GlobalContants";
import Connect from "./Connect";

const Section = styled.div`
  border: 1px solid red;
  margin-bottom: 1rem;
`;

const Header = styled.header``;

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

const Intro = (props: { userDetails: userProps }) => {  
  return (
    <Section>
      <Header>
        <img src={props.userDetails.photo} alt="" />
        <h1>{props.userDetails.name}</h1>
        <h3>User Designation</h3>
        <Connect />
      </Header>
    </Section>
  );
};

// Name | Designation | Socials | Photo

export default Intro;
