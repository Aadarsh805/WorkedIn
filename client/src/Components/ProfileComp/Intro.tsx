import React, { useEffect } from "react";
import styled from "styled-components";
import Connect from "./Connect";
import Socials from "./Socials";

const Section = styled.div`
  border: 1px solid red;
  margin-bottom: 1rem;
  margin: 0 1vw;
  margin-bottom: 2rem;
`;

const Header = styled.header`
  border: 1px solid blue;
  display: flex;
  align-items: center;
  justify-content: flex-start;
`;

const ImageContainer = styled.div`
  position: relative;
  transition: all 0.2s linear;
  height: 12vw;
  border: 2px solid purple;
  img {
    width: 12vw;
    height: 12vw;
    border-radius: 50%;
    cursor: pointer;
    z-index: 1;
  }

  &:hover {
    &:after {
      border: 1px solid red;
      content: "View Photo";
      font-size: 15px;
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
    }
  }
`;

const DetailContainer = styled.div`
border: 1px solid red;
height: 12vw;
padding-left: 1.5vw;
display: flex;
flex-direction: column;
align-items: flex-start;
justify-content: center;

h1{
  font-size: 3vw;
  margin-bottom: 1vw;
  text-transform: capitalize;
  font-weight: 500;

}

`

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
        <ImageContainer>
          <img src={props.userDetails.photo} alt="userPic" />
        </ImageContainer>
        <DetailContainer>
        <h1>{props.userDetails.name}</h1>
        <Socials/>
        </DetailContainer>
      </Header>
      <h3>User Description</h3>
      <Connect />
      <h3>About</h3>
    </Section>
  );
};

// Name | Description | Socials | Photo | About

export default Intro;
