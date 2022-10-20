import React from 'react'
import styled, { keyframes } from "styled-components";
import { Discord, Github, Linkedin, Portfolio, Twitter } from '../SVG';


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
`

const Section = styled.div`
border: 1px solid red;
width: fit-content;

svg{
  width: 2.2vw;
  height: 2.2vw;
  margin: 0 1vw;
  border: 1px solid red;
  &:hover{
    animation: ${animateSvg} 1s linear;
    animation-iteration-count: 1;
  }
}

/* svg{ */
    /* fill: blue; */
    /* rotate: calc(45deg); */
/* } */

`


const Socials = () => {
  return (
    <Section>
        <Linkedin/>
        <Github/>
        <Twitter/>
        <Portfolio/>
        <Discord/>
    </Section>
  )
}

export default Socials