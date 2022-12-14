import React, { useState } from "react";
import styled from "styled-components";

interface stripStyleProps {
    stripColor: string
}

const Section = styled.div`
  position: absolute;
  top: -1.2rem;
  left: -3rem;
  background-color: ${(props : stripStyleProps) => props.stripColor};
  transform: rotate(-35deg);
  width: 5rem;
  height: 1rem;
`;
interface statusStripProps {
  status: string;
}

const StatusStrip = ({ status }: statusStripProps) => {

  const [stripColor, setStripColor] = useState("brown");

  const pickColor = () => {
    // let color;

    
  }

  return (<Section stripColor={stripColor}></Section>);
};

export default StatusStrip;
