import React, { useEffect } from "react";
import styled from "styled-components";
import { userProps } from "../../utils/GlobalContants";
import { Pen } from "../generalComp/SVG";
import Socials from "./Socials";

const Section = styled.div`
  /* border: 1px solid red; */
  /* margin-bottom: 1rem; */
  margin: 0 1vw;
  margin-bottom: 1rem;
  z-index: 1;
`;

const Header = styled.header`
  border: 1px solid blue;
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
  border: 2px solid green;
  min-height: 12vw;
  width: calc(100vw - 25vw);
  padding-left: 1.5vw;
  display: flex;
  flex-direction: column;
  /* align-items: flex-start; */
  /* justify-content: center; */

  h1 {
    font-size: 1.8rem;
    margin-top: 0.3vw;
    margin-bottom: 0.7vw;
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
`;

interface introProps {
  user: userProps;
}

const Intro = ({ user }: introProps) => {

  let socialProps;

  if (user !== undefined) {
  socialProps = {
      discord: user.discord,
      github: user.github,
      linkedin: user.linkedin,
      portfolio: user.personalWebsite,
      twitter: user.twitter,
    };
  }

  return (
    <Section>
      <Header>
        <EditDetails>
          <Pen />
        </EditDetails>
        <ImageContainer>
          <img src={user.photo} alt="userPic" />
        </ImageContainer>
        <DetailContainer>
          <h1>{user.name}</h1>
            <Socials {...socialProps}/>
          <Designation>
            {user.tagline ? user.tagline : "Your tagline ..."}
          </Designation>
        </DetailContainer>
      </Header>
    </Section>
  );
};

// Name | Description | Socials | Photo | About

export default Intro;
