import React from "react";
import styled from "styled-components";
import { FaPencilAlt } from "react-icons/fa";
import { FiArrowUpRight } from "react-icons/fi";

const Section = styled.div`
  box-sizing: border-box;
  /* display: flex; */
  padding: 1rem 2rem;
  margin-bottom: 1.5rem;
  width: 100%;
  background-color: #3a421b;
  border-radius: 10px;

  h2 {
    color: rgba(236, 227, 212, 255);
    font-size: 1.4rem;
  }

  h4 {
    color: rgba(236, 227, 212, 255);
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
  userAbout: string;
  mail: string;
  portfolio: string;
}

const About = ({ userAbout, mail, portfolio }: aboutProps) => {
  const aboutSocialHandler = (social: string) => {
    navigator.clipboard.writeText(social)
  };

  return (
    <Section>
      <AboutSection>
        <Header>
          <h2>About</h2>
          <FaPencilAlt />
        </Header>
        <h4>{userAbout ? userAbout : "Tell us more about yourself"}</h4>
      </AboutSection>
      {portfolio ? (
        <AboutHandlers>
          <h2>Personal Website</h2>
          <div>
            <h4>{portfolio}</h4>
            <div
              onClick={() => aboutSocialHandler(portfolio)}
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
          <h4>{mail}</h4>
          <div
            onClick={() => aboutSocialHandler(mail)}
            style={{ color: "rgba(236, 227, 212, 255)" }}
          >
            <FiArrowUpRight />
          </div>
        </div>
      </AboutHandlers>
    </Section>
  );
};

export default About;