import axios from 'axios'
import React, { useState, useRef } from 'react'
import styled from 'styled-components'
import { BASE_URL, chatEnd, searchUserEnd } from '../../utils/APIRoutes'
import { userProps } from '../../utils/GlobalContants'
import { getHeaders } from '../../utils/helperFunction'
import UserBadge from './UserBadge'
import SearchedUser from './SearchedUser'
import { useOutsideAlerter } from '../../utils/OutsideAlerter';

const Section = styled.div`
position: absolute;
width: 50vw;
/* min-height: 55vh; */
max-height: 80vh;
transition: all 0.15s linear;
top: 50%;
left: 50%;
transform: translate(-50%, -55%);
z-index: 10;
border-radius: 10px;
padding: 1.5rem 2rem;
box-sizing: border-box;
background-color: #735F32;
overflow-y: auto;

&::-webkit-scrollbar {
    width: 0.4rem;
    &-thumb {
      background-color: #fff;
      width: 0.1rem;
      border-radius: 1rem;
    }
}

h2{
  color: #FAF8F1;
  font-size: 2rem;
  font-weight: 400;
}

p{
  /* border: 1px solid red; */
  color: #FAF8F1;
  margin-top: 0.35rem;
  margin-bottom: 1.4rem;
  line-height: 150%;
}

form{
  display: flex;
  flex-direction: column;

  input{
    padding: 0.7rem 1rem;
    border-radius: 10px;
    outline: none;
    border: none;
    margin-bottom: 0.5rem;
    font-size: 1rem;
    background: #FAF8F1;
    color: rgb(58, 66, 27);

    &::placeholder{
      color: rgb(58, 66, 27);
    }

    &:first-child{
      margin-bottom: 1rem;
    }
  }

  button{
    padding: 0.7rem 0;
    border-radius: 10px;
    border: none;
    font-size: 1.2rem;
    box-sizing: border-box;
    font-weight: 600;
    width: 80%;
    margin: 0 auto;
    cursor: pointer;
    background: #FAF8F1;
    color: rgb(58, 66, 27);
  }
}
`

const UserBadges = styled.div`
/* border: 1px solid white; */
display: flex;
flex-wrap: wrap;
width: 100%;
padding: 0 1rem;
margin: 0.5rem auto 0;
box-sizing: border-box;
`

const SearchedUsers = styled.div`
  padding: 0.4rem 1rem;
  box-sizing: border-box;

  display: grid;
  grid-template-columns: auto auto;
  margin: 0.7rem 0 1rem;
`

interface chatModalProps {
  user: userProps,
  closeCreatChatModal: any
}

interface searchResultProps {
  _id: string,
  name: string,
  photo: string
}

const CreateChatModal = (props: chatModalProps) => {
  const [chatName, setChatName] = useState('')
  const [searchResult, setSearchResult] = useState<Array<searchResultProps>>([]);
  const [selectedUsers, setSelectedUsers] = useState<Array<searchResultProps>>([])

  const wrapperRef = useRef<HTMLDivElement | null>(null);
  useOutsideAlerter(wrapperRef, props.closeCreatChatModal)

  const handleSearch = async (query: string) => {
    const { data } = await axios.get(`${BASE_URL}${searchUserEnd}${query}`, {
      headers: getHeaders(props.user.token ?? '')
    })
    // console.log(data);
    setSearchResult(data)
  }

  const handleDelete = (delUser: searchResultProps) => {
    setSelectedUsers(selectedUsers.filter((sel) => sel._id !== delUser._id));
  };

  const handleGroup = (userToAdd: searchResultProps) => {
    if (selectedUsers.includes(userToAdd)) {
      return;
    }

    setSelectedUsers([...selectedUsers, userToAdd]);
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault()
    if (!chatName || !selectedUsers) {
      return;
    }

    const { data } = await axios.post(`${BASE_URL}${chatEnd}group`, {
      chatName,
      users: JSON.stringify(selectedUsers.map(user => user._id))
    }, {
      headers: getHeaders(props.user.token ?? '')
    })

    console.log(data);
    window.location.reload();
  }

  return (
    <Section ref={wrapperRef} >
        <h2>Create Group Chat</h2>
        <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Amet qui accusantium, quibusdam quam neque magnam.</p>
        <form onSubmit={handleSubmit} >
            <input type="text" placeholder='Chat Name' value={chatName} onChange={(e) => setChatName(e.target.value)} />
            <input type="text" placeholder="Add members to group" onChange={(e) => handleSearch(e.target.value)} />
            <UserBadges>
            {
              selectedUsers.map((user,index) => {
                return (
                  <UserBadge key={index} user={user} onClickFunc={handleDelete} />
                ) 
              })
            }
            </UserBadges>
            <SearchedUsers>
            {
              searchResult.map((result) => {
                return (
                  <SearchedUser key={result._id} user={result} onClickFunc={handleGroup} />
                  )
                })
              }
            </SearchedUsers>
            <button type="submit">Create Group</button>
        </form>
    </Section>
  )
}

export default CreateChatModal