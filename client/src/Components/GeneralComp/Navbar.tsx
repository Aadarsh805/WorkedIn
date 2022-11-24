import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const Section = styled.div`
  width: 100%;
  height: 3rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  /* background-color: ${props => props.theme.lightBlack}; */
  /* border: 1px solid red; */
`;

const Logo = styled.div`
  border: 1px solid black;
  margin-left: 4rem;
  display: flex;
  align-items: center;

`;

const Search = styled.div`
margin-left: 1rem;

input{
    /* border: none; */
    /* background-color: grey; */

    &:focus{
        outline: none;
        border: none;
    }
}
`;

const Menu = styled.ul`
list-style: none;
display: flex;
align-items: center;
justify-content: space-between;
margin-right: 4rem;
`;

const MenuItem = styled.li`
margin: 0 1rem;
`;

const Navbar = () => {
  return (
    <Section>
      <Logo>
        <h2>WorkedIn</h2>
        <Search>
            <input type="text" placeholder="Search" />
        </Search>
      </Logo>
      <Menu>
        <Link to="/">
          <MenuItem>Home</MenuItem>
        </Link>
        <Link to="/rooms">
          <MenuItem>Rooms</MenuItem>
        </Link>
        <Link to="/me">
          <MenuItem>Profile</MenuItem>
        </Link>
      </Menu>
    </Section>
  );
};

export default Navbar;

// Feed
// Profile
// Chat Section
