import React from 'react'
import styled from 'styled-components'

const Section = styled.div`
      display: flex;
  align-items: center;
  cursor: pointer;

  img{
    width: 2rem;
    height: 2rem;
    border-radius: 50%;
  }
`
interface searchResultProps {
    _id: string,
    name: string,
    photo: string
}

interface searchedUserProps {
    user: searchResultProps,
    selectedUsers: Array<searchResultProps>;
  setSelectedUsers: React.Dispatch<React.SetStateAction<searchResultProps[]>>;
}



const SearchedUser = ({user, selectedUsers, setSelectedUsers}: searchedUserProps) => {

    const handleGroup = (userToAdd: searchResultProps) => {
        if (selectedUsers.includes(userToAdd)) {
          return;
        }
    
        setSelectedUsers([...selectedUsers, userToAdd]);
      };
  return (
    <Section onClick={() => handleGroup(user)}>
        <img src={user.photo} alt="" />
        <h5>{user.name}</h5>
    </Section>
  )
}

export default SearchedUser