import React from 'react'
import styled from 'styled-components';

const Section = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  width: 60vw;
  height: 70vh;
  background-color: antiquewhite;
  transform: translate(-50%, -50%);

  display: flex;
  flex-direction: column;
  /* justify-content: center; */
  align-items: center;
`;

const ManageMembers = () => {
  return (
    <Section>ManageMembers</Section>
  )
}

export default ManageMembers