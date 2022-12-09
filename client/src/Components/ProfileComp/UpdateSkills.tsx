import React, { useRef } from 'react'
import styled from "styled-components";
import { useOutsideAlerter } from '../../utils/OutsideAlerter';

const Section = styled.div`
    width: 50vw;
    height: 50vh;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: #fff;
`

interface skillModalProps {
    modalFunction: any
}

const UpdateSkills = ({modalFunction}: skillModalProps) => {
    const wrapperRef = useRef<HTMLDivElement | null>(null);
  useOutsideAlerter(wrapperRef, modalFunction)
  return (
    <Section ref={wrapperRef}>
        
    </Section>
  )
}

export default UpdateSkills