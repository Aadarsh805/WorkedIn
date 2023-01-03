import React, { useState } from "react";
import styled from "styled-components";
import { FaPencilAlt } from "react-icons/fa";
import { FiArrowUpRight } from "react-icons/fi";
import UpdateAboutModal from "./profileModals/UpdateAboutModal";
import { userProps } from "../../types/userTypes";

const Section = styled.div`
  box-sizing: border-box;
  /* display: flex; */
  padding: 1rem 2rem;
  margin-bottom: 1.5rem;
  width: 100%;
  background-color: #3a421b;
  /* background-color: rgba(58, 66, 27, 0.5); */
  /* background-color: rgba(236, 227, 212, 255); */
  /* background-color: #5c4510; */
  border-radius: 10px;

  h2 {
    color: rgba(236, 227, 212, 255);
    /* color: black; */
    font-size: 1.4rem;
  }

  h4 {
    color: rgba(236, 227, 212, 255);
    /* color: black; */
    font-size: 1rem;
    font-weight: 300;
  }
`;

const AboutSection = styled.div`
  /* border: 1px solid red; */
  margin-bottom: 1rem;
`;

const Header = styled.div`
  /* margin-bottom: 0.6rem; */
  margin-bottom: calc(0.6rem - 4px);

  display: flex;
  align-items: center;
  justify-content: space-between;
  /* border: 1px solid white; */

  svg {
    /* border: 1px solid white; */
    padding: 4px;
    width: 1.4rem;
    border-radius: 4px;
    height: 1.4rem;
    fill: rgba(236, 227, 212, 255);
    transition: all 0.15s linear;
    cursor: pointer;

    &:hover {
      background-color: rgba(236, 227, 212, 255);
      fill: #3a421b;
    }
  }
`;

const AboutHandlers = styled.div`
  h2 {
    margin-bottom: calc(0.6rem - 4px);
  }

  div {
    display: flex;
    /* border: 1px solid white; */

    svg {
      /* border: 1px solid white; */
      margin-left: 0.6rem;
      width: 1.4rem;
      height: 1.4rem;
      transition: all 0.15s linear;
      cursor: pointer;
    }
  }
`;

interface aboutProps {
  user: userProps;
  localUser: userProps;
}

const About = ({ user, localUser }: aboutProps) => {
  const { about, email, personalWebsite } = user;
  const [updateAbout, setUpdateAbout] = useState(false);

  const firstname = user.name?.split(' ')[0];

  const aboutSocialHandler = (social: string) => {
    navigator.clipboard.writeText(social);
  };

  const closeUpdateAboutModal = () => {
    setUpdateAbout(false);
  };

  return (
    <Section>
      <AboutSection>
        <Header>
          <h2>About</h2>
          {user._id === localUser._id ? (
            <div onClick={() => setUpdateAbout(!updateAbout)}>
              <FaPencilAlt />
            </div>
          ) : null}
        </Header>
        <h4>{about ? about : user._id === localUser._id ? "Tell us more about yourself" : `${firstname} hasnt shared much about them`}</h4>
      </AboutSection>
      {user.personalWebsite ? (
        <AboutHandlers>
          <h2>Personal Website</h2>
          <div>
            <h4>{user.personalWebsite}</h4>
            <div
              onClick={() => aboutSocialHandler(personalWebsite!)}
              style={{ color: "rgba(236, 227, 212, 255)" }}
            >
              <FiArrowUpRight />
            </div>
          </div>
        </AboutHandlers>
      ) : null}
      <AboutHandlers>
        <h2>Email</h2>
        <div>
          <h4>{user.email}</h4>
          <div
            onClick={() => aboutSocialHandler(email!)}
            style={{ color: "rgba(236, 227, 212, 255)" }}
          >
            <FiArrowUpRight />
          </div>
        </div>
      </AboutHandlers>
      {updateAbout ? (
        <UpdateAboutModal
          userToken={localUser.token!}
          closeUpdateAboutModal={closeUpdateAboutModal}
          userAbout={about!}
          mail={email!}
        />
      ) : null}
    </Section>
  );
};

export default About;
