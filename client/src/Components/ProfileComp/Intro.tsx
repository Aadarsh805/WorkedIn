import React, { useEffect } from "react";
import styled from "styled-components";
import { userProps } from "../../utils/GlobalContants";
import { Pen } from "../generalComp/SVG";
import Socials from "./Socials";

const Section = styled.div`
  /* border: 1px solid red; */
  box-sizing: border-box;
  display: flex;
  padding: 1rem 2rem;
  margin-bottom: 1.5rem;
  width: 45vw;
  background-color: #3a421b;
  border-radius: 10px;
`;

const ImageContainer = styled.div`
  position: relative;
  transition: all 0.2s linear;
  /* border: 1px solid red; */

  img {
    width: 9rem;
    height: 9rem;
    border-radius: 50%;
    cursor: pointer;
    z-index: 1;
  }

  &:hover {
    &:after {
      width: 9rem;
      display: flex;
      align-items: center;
      justify-content: center;
      /* border: 1px solid red; */
      content: "View Photo";
      font-size: 15px;
      font-weight: 600;
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
    }
  }
`;

const DetailContainer = styled.div`
  /* border: 2px solid green; */
  width: 100%;
  height: auto;
  box-sizing: border-box;
  padding-left: 1rem;
  display: flex;
  flex-direction: column;
  /* padding-top: 0.2rem; */
  /* align-items: flex-start; */
  /* justify-content: center; */

  div.userDatils{
    display: flex;
    padding-top: 1.7rem;
    /* border: 1px solid white; */
  }

  h1 {
    /* margin-top: 2.5rem; */
    font-size: 2rem;
    /* margin-top: 0.3vw; */
    margin-right: 1rem;
    text-transform: capitalize;
    font-weight: 600;
    color: rgba(236,227,212,255);
  }
`;

const Designation = styled.h3`
  width: 100%;
  height: auto;
  font-size: 1rem;
  font-weight: 300;
  color: rgba(236,227,212,255);
  margin-top: 0.4rem;
  /* border: 1px solid white; */
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
      twitter: user.twitter,
    };
  }

  return (
    <Section>
      <ImageContainer>
        <img src={user.photo} alt="userPic" />
      </ImageContainer>
      <DetailContainer>
        <div className="userDatils" >
          <h1>{user.name}</h1>
          <Socials {...socialProps} />
        </div>
        <Designation>
          {/* {user.tagline ? user.tagline : "Your Tagline ..."} */}
          {user.tagline ? user.tagline : "Lorem ipsum dolor sit amet consectetur adipisicing elit. Explicabo maiores ab ducimus iste incidunt perferendis?"}
        </Designation>
      </DetailContainer>
    </Section>
  );
};
// Name | Description | Socials | Photo | About

export default Intro;