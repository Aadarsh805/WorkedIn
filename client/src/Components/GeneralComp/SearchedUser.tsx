import styled from "styled-components";
import { searchResultProps } from "../../types/searchTypes";

const Section = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;
  border: 1px solid black;
  margin: 0 auto 0.7rem ;
  background-color: #FAF8F1;
  padding: 0.5rem 0rem 0.5rem 1rem;
  box-sizing: border-box;
  width: 85%;
  overflow: hidden;
  border-radius: 6px;
  border: none;

  img {
    width: 2rem;
    height: 2rem;
    margin-right: 0.6rem;
    border-radius: 50%;
    -webkit-box-shadow: 0px 0px 5px 3px rgba(0, 0, 0, 0.22);
    -moz-box-shadow: 0px 0px 5px 3px rgba(0, 0, 0, 0.22);
    box-shadow: 0px 0px 5px 3px rgba(0, 0, 0, 0.22);
  }

  h4{
    font-size: 1rem;
    font-weight: 500;
    color:rgb(58, 66, 27);
  }
`;

interface searchedUserProps {
  user: searchResultProps;
  onClickFunc: any;
}

const SearchedUser = ({ user, onClickFunc }: searchedUserProps) => {
  return (
    <Section onClick={() => onClickFunc(user)}>
      <img src={user.photo} alt="userImg" />
      <h4>{user.name}</h4>
    </Section>
  );
};

export default SearchedUser;
