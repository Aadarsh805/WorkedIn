import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import styled, { keyframes } from "styled-components";
import { userProps } from "../../utils/GlobalContants";
import {
  Discord,
  Github,
  Linkedin,
  Portfolio,
  Twitter,
} from "../generalComp/SVG";

const animateSvg = keyframes`
    0%{
        rotate: calc(0);
    }
    25%{
        rotate: calc(90deg);
    }
    50%{
        rotate: calc(0);
    }
    75%{
        rotate: calc(-90deg);
    }
    100%{
        rotate: calc(0);
    }
`;

const Section = styled.div`
  border: 1px solid red;
  width: fit-content;
  margin-bottom: 1rem;

  svg {
    width: 2.2vw;
    height: 2.2vw;
    margin-right: 1.5rem;
    /* margin: 0 1vw; */
    border: 1px solid red;
    &:hover {
      animation: ${animateSvg} 1s linear;
      animation-iteration-count: 1;
    }
  }
`;

interface userSocials {
  discord?: string;
  github?: string;
  linkedin?: string;
  portfolio?: string;
  twitter?: string;
}

const Socials = (props: userSocials) => {
  const { discord, github, linkedin, portfolio, twitter } = props;
  const [socialArr, setSocialArr] = useState<[string, any][]>();

  useEffect(() => {
    if (Object.keys(props).length !== 0) {
      const newArr = Object.entries(props);
      console.log(socialArr);
      setSocialArr(newArr);
    }
  }, []);

  const llll = (social: string | undefined, ele: any) => {
    return social !== undefined ? (social !== "" ? ele : null) : null;
  };

  return (
    <Section>
      {github !== undefined ? (
        github !== "" ? (
          <Link to={github}>
            <Github />
          </Link>
        ) : null
      ) : null}
      {linkedin !== undefined ? (
        linkedin !== "" ? (
          <Link to={linkedin}>
            <Linkedin />
          </Link>
        ) : null
      ) : null}
      {discord !== undefined ? (
        discord !== "" ? (
          <Link to={discord}>
            <Discord />
          </Link>
        ) : null
      ) : null}
      {twitter !== undefined ? (
        twitter !== "" ? (
          <Link to={twitter}>
            <Twitter />
          </Link>
        ) : null
      ) : null}
      {portfolio !== undefined ? (
        portfolio !== "" ? (
          <Link to={portfolio}>
            <Portfolio />
          </Link>
        ) : null
      ) : null}
    </Section>
  );
};

export default Socials;
