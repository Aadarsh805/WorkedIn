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

import svg from '../../assets/icons8-twitter.json'

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
        rotate: calc(-180deg);
    }
    100%{
        rotate: calc(-360deg);
    }
`;

const Section = styled.div`
  /* width: fit-content; */
  display: flex;
  align-items: flex-end;
  /* justify-content: center; */
  /* margin-bottom: 0; */

  svg {
    width: 1.5rem;
    height: 1.5rem;
    margin: auto 0;
    margin-right: 1rem;
    fill: rgba(236,227,212,255);
    /* border: 1px solid red; */
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
  twitter?: string;
}

const Socials = (props: userSocials) => {
  const { discord, github, linkedin, twitter } = props;
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
        <Link to={github !== "" ? github : "#"}>
          <Github />
        </Link>
      ) : null}
      {linkedin !== undefined ? (
        <Link to={linkedin !== "" ? linkedin : "#"}>
          <Linkedin />
        </Link>
      ) : null}
      {discord !== undefined ? (
        <Link to={discord !== "" ? discord : "#"}>
          <Discord />
        </Link>
      ) : null}
      {twitter !== undefined ? (
        <Link to={twitter !== "" ? twitter : "#"}>
          <Twitter />
        </Link>
      ) : null}
      <svg/>
    </Section>
  );
};

export default Socials;
