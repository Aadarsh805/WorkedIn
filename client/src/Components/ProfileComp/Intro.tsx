import React, { useEffect, useState } from "react";
import { FaPencilAlt } from "react-icons/fa";
import styled from "styled-components";
import { userProps } from "../../types/userTypes";
import Socials from "./Socials";
import UpdateIntroModal from "./profileModals/UpdateIntroModal";

const Section = styled.div`
  /* border: 1px solid red; */
  box-sizing: border-box;
  display: flex;
  padding: 1.4rem 2rem;
  margin-bottom: 1.5rem;
  /* width: 45vw; */
  width: 100%;
  background-color: #3a421b;
  /* background-color: #faf8f1; */
  border-radius: 10px;
  /* position: relative; */
`;

const ImageContainer = styled.div`
  position: relative;
  transition: all 0.2s linear;
  /* border: 1px solid reds; */

  img {
    width: 9rem;
    height: 9rem;
    border-radius: 50%;
    object-fit: cover;
    cursor: pointer;
    z-index: 1;
    /* border: 2px solid grey; */
  }
`;

const DetailContainer = styled.div`
  /* border: 2px solid green; */
  width: 100%;
  height: auto;
  box-sizing: border-box;
  padding-left: 1.4rem;
  display: flex;
  flex-direction: column;
  /* padding-top: 0.2rem; */
  align-items: flex-start;
  justify-content: center;

  div.userDatils {
    display: flex;
    /* padding-top: 1.7rem; */
    /* border: 1px solid white; */
  }

  h1 {
    /* margin-top: 2.5rem; */
    font-size: 1.6rem;
    white-space: nowrap;
    overflow: hidden;
    /* margin-top: 0.3vw; */
    margin-right: 1rem;
    text-transform: capitalize;
    font-weight: 600;
    color: rgba(236, 227, 212, 255);
    /* color: #3a421b; */
  }
`;

const Designation = styled.h3`
  width: 95%;
  /* width: calc(55vw - 14rem); */
  height: auto;
  font-size: 1rem;
  font-weight: 300;
  color: rgba(236, 227, 212, 255);
  /* color: #3a421b; */
  margin-top: 0.4rem;
  /* border: 1px solid white; */
`;

const UpdateIntro = styled.div`
  /* border: 1px solid white; */
  svg {
    padding: 4px;
    width: 1.4rem;
    border-radius: 4px;
    height: 1.4rem;
    fill: rgba(236, 227, 212, 255);
    /* fill: #3a421b; */
    transition: all 0.15s linear;
    cursor: pointer;

    &:hover {
      background-color: rgba(236, 227, 212, 255);
      /* background-color: #3a421b; */
      fill: #3a421b;
      /* fill: rgba(236, 227, 212, 255); */
    }
  }
`;

interface introProps {
  user: userProps;
  userToken: string;
}

const Intro = ({ user, userToken }: introProps) => {
  const [updateIntro, setUpdateIntro] = useState(false);

  let socialProps;
  if (user !== undefined) {
    socialProps = {
      discord: user.discord,
      github: user.github,
      linkedin: user.linkedin,
      twitter: user.twitter,
      portfolio: user.personalWebsite,
    };
  }

  const closeUpdateIntroModal = () => {
    setUpdateIntro(false);
  };

  return (
    <Section>
      <ImageContainer>
        <img src={user.photo} alt="userPic" />
      </ImageContainer>
      <DetailContainer>
        <div className="userDatils">
          <h1>{user.name}</h1>
          <Socials {...socialProps} />
        </div>
        <Designation>
          {user.tagline ? user.tagline : "Your Tagline ..."}
        </Designation>
      </DetailContainer>
      <UpdateIntro onClick={() => setUpdateIntro(!updateIntro)}>
        <FaPencilAlt />
      </UpdateIntro>
      {updateIntro ? (
        <UpdateIntroModal
          user={user}
          userToken={userToken}
          closeUpdateIntroModal={closeUpdateIntroModal}
        />
      ) : null}
    </Section>
  );
};
// Name | Description | Socials | Photo | About

export default Intro;
