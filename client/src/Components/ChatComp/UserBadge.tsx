import React from "react";
import { GrFormClose } from "react-icons/gr";
import styled from "styled-components";
import { searchResultProps } from "../../types/searchTypes";

const Section = styled.div`
  display: flex;
  align-items: center;
  box-sizing: border-box;
  border-radius: 20px;
  padding: 0.4rem 0.5rem;
  margin: 0rem 0.4rem 0.5rem;
  display: flex;
  align-items: center;
  background-repeat: no-repeat;
  background-size: 50px 50px;
  background-color: #FAF8F1;

  h5{
    font-size: 0.7rem;
    font-weight: 600;
  }

  div {
    display: flex;
    align-items: center;

    svg {
    margin-left: 0.4rem;
    border-radius: 50%;
    background-color: rgb(58, 66, 27);
    cursor: pointer;
    width: 1rem;
  }
  
  svg path{
    stroke: rgb(255, 255, 255);
  }
  }
`;
interface userBadgeProps {
  user: searchResultProps;
  onClickFunc: any
}

const UserBadge = ({
  user,
  onClickFunc
}: userBadgeProps) => {

  

  return (
      <Section>
        <h5>{user.name}</h5>
        <div onClick={() => onClickFunc(user)}>
          <GrFormClose />
        </div>
      </Section>
  );
};

export default UserBadge;
