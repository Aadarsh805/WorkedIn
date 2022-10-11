import React from 'react'
import styled from "styled-components";
import { Discord, Github, Linkedin, Portfolio, Twitter } from '../SVG';

const Section = styled.div`

svg{
  width: 20px;
  height: 20px;
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