import React from "react";
import styled from "styled-components";

const Section = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;

  img {
    width: 2rem;
    height: 2rem;
    border-radius: 50%;
  }
`;
interface searchResultProps {
  _id: string;
  name: string;
  photo: string;
}

interface searchedUserProps {
  user: searchResultProps;
  onClickFunc: any;
}

const SearchedUser = ({ user, onClickFunc }: searchedUserProps) => {
  return (
    <Section onClick={() => onClickFunc(user)}>
      <img src={user.photo} alt="userImg" />
      <h5>{user.name}</h5>
    </Section>
  );
};

export default SearchedUser;
