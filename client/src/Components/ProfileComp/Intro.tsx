import React, { useEffect } from "react";
import styled from "styled-components";
import { Pen } from "../GeneralComp/SVG";
import Connect from "./Connect";
import Socials from "./Socials";

const Section = styled.div`
  /* border: 1px solid red; */
  margin-bottom: 1rem;
  margin: 0 1vw;
  margin-bottom: 2rem;
  z-index: 1;
`;

const Header = styled.header`
  /* border: 1px solid blue; */
  display: flex;
  align-items: center;
  justify-content: flex-start;
  position: relative;
  min-height: 12vw;
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
  min-height: 12vw;
  width: calc(100vw - 25vw);
  padding-left: 1.5vw;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;

  h1 {
    font-size: 2.5vw;
    /* margin-bottom: 1vw; */
    text-transform: capitalize;
    font-weight: 400;
  }
`;

const EditDetails = styled.div`
  position: absolute;
  right: 1vw;
  top: 1vw;
  z-index: 2;
  /* border: 1px solid red; */
  padding: 5px;
  border-radius: 4px;
  transition: all 0.2s linear;

  svg {
    fill: rgba(24, 49, 83, 255);
    width: 1.6vw;
  }

  &:hover {
    svg {
      fill: rgba(255, 255, 255, 255);
    }
    border-radius: 4px;
    background-color: rgba(24, 49, 83, 255);
    cursor: pointer;
  }
`;

const Designation = styled.h3`
  border: 1px solid red;
  width: 80%;
  font-size: 1.3vw;

  font-weight: 300;
`

interface userProps {
  name?: string;
  email?: string;
  connections?: Array<string>;
  pastProjects?: Array<string>;
  photo?: string;
  skills?: Array<string>;
  _id?: string;
  designation?: string;
  about?: string;
  discord?: string;
  linkedin?: string;
  github?: string;
  twitter?: string;
  personalWebsite?: string;
}

const Intro = (props: { userDetails: userProps }) => {
  return (
    <Section>
      <Header>
        <EditDetails>
          <Pen />
        </EditDetails>
        <ImageContainer>
          <img src={props.userDetails.photo} alt="userPic" />
        </ImageContainer>
        <DetailContainer>
          <h1>{props.userDetails.name}</h1>
          <Socials />
          <Designation>
          {props.userDetails.designation ? (
            props.userDetails.designation
            ) : (
              'Co-Founder Blockwee | Youtuber (1 lakh+ views) | Web3 Educator | I help Web3 brands in the field of Content Creation, Community building, Metaverse events, NFT creation, and Marketing🚀'
              )}
              </Designation>
        </DetailContainer>
      </Header>
      <Connect />
      <h3>About</h3>
    </Section>
  );
};

// Name | Description | Socials | Photo | About

export default Intro;
