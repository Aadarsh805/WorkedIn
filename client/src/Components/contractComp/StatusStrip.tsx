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
  const [stripColor, setStripColor] = useState("#c9d849");
  switch (status) {
    case "delayed":
      setStripColor("#c9d849");
      break;
    case "completed":
      setStripColor("green");
      break;
    case "broken":
      setStripColor("red");
      break;
    default:
      break;
  }

  return <Section stripColor={stripColor}></Section>;
};

export default StatusStrip;
