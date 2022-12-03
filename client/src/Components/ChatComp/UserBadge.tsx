import React from "react";
import { GrFormClose } from "react-icons/gr";
import styled from "styled-components";

interface userBadgeStylesProps {
  userImage?: string
}

const Section = styled.div`
  display: flex;
  align-items: center;
  box-sizing: border-box;

  border: 1px solid red;
  border-radius: 20px;
  padding: 0.4rem 0.5rem;
  margin: 0 0.4rem;
  display: flex;
  align-items: center;

  background-image: ${(props: userBadgeStylesProps) => `url(${props.userImage})`};

  background-repeat: no-repeat;
  background-size: 50px 50px;

  div {
    /* border: 1px solid red; */
    display: flex;
    align-items: center;
  }
  svg {
    margin-left: 0.4rem;
    border-radius: 50%;
    border: 1px solid blue;
    cursor: pointer;
    width: 1rem;
  }
`;

interface searchResultProps {
  _id: string;
  name: string;
  photo: string;
}

interface userBadgeProps {
  user: searchResultProps;
  onClickFunc: any
}

const UserBadge = ({
  user,
  onClickFunc
}: userBadgeProps) => {

  

  return (
      <Section userImage={user.photo} >
        <h5>{user.name}</h5>
        <div onClick={() => onClickFunc(user)}>
          <GrFormClose />
        </div>
      </Section>
  );
};

export default UserBadge;
