import axios from 'axios'
import React, { useState } from 'react'
import styled from 'styled-components'
import { BASE_URL, chatEnd, searchUserEnd } from '../../utils/APIRoutes'
import { userProps } from '../../utils/GlobalContants'
import { getHeaders } from '../../utils/helperFunction'
import SearchedUser from './SearchedUser'

const Section = styled.div`
/* border: 1px solid red; */
width: 84vw;
padding: 2rem;
box-sizing: border-box;
overflow: auto;

&::-webkit-scrollbar {
    width: 0.4rem;
    &-thumb {
      background-color: #fff;
      width: 0.1rem;
      border-radius: 1rem;
    }
}
`

const SearchUser = styled.div`
width: 100%;
/* border: 1px solid red; */
display: flex;
flex-direction: column;
align-items: center;
justify-content: center;
margin-bottom: 2rem;

input{
  width: 80%;
  /* margin: 0 auto;  */
  padding: 0.7rem 1rem;
  box-sizing: border-box;
  font-size: 1rem;
  font-weight: 500;
  outline: none;
  border: none;
  border-radius: 10px;
  color: rgb(58, 66, 27);
  background-color: #FAF8F1;

  ::placeholder{
      color: rgb(58, 66, 27);
    }
}
`

const SuggestedUsers = styled.div`
  /* border: 1px solid #fff; */
`

const Users = styled.div`
  display: grid;
  grid-template-columns: auto auto;
`

const Searches = styled.div`
  /* border: 1px solid white; */
  width: 80%;
  margin-top: 1.4rem;
  display: grid;
  grid-template-columns: auto auto;

`

interface searchResultProps {
  _id: string,
  name: string,
  photo: string
}

interface groupMemberProps {
  _id: string;
  name: string;
  photo: string;
}

interface chatObj {
  chatName?: string;
  contracted?: Boolean;
  chatPhoto?: string;
  createdAt?: string;
  groupAdmin?: {
    _id?: string;
    name?: string;
    photo?: string;
  };
  isGroupChat?: Boolean;
  users?: Array<groupMemberProps>;
  _id?: string;
  contractId?: string;
  contractAprovedBy: Array<string>;
  contractApproved: Boolean;
  contractSuccessful: boolean;
  contractFinishedApprovedBy: Array<string>
}

interface noSelectedChatProps {
  user: userProps,
  setAccessedChat: React.Dispatch<React.SetStateAction<chatObj | undefined>>,
  setSelectedChat: React.Dispatch<React.SetStateAction<chatObj | undefined>>,
  setAllChats:  React.Dispatch<React.SetStateAction<chatObj[]>>,
  allChats: Array<chatObj>
}

const NoSelectedChat = ({user, setAccessedChat, setSelectedChat, setAllChats, allChats}: noSelectedChatProps) => {

  const [searchResult, setSearchResult] = useState<Array<searchResultProps>>([]);


  const handleSearch = async (query: string) => {
    console.log(query === '');
    
    if (query === '') {
      setSearchResult([])  
      return;
    }

    const { data } = await axios.get(`${BASE_URL}${searchUserEnd}${query}`, {
      headers: getHeaders(user.token ?? '')
    })
    console.log(data);
    setSearchResult(data)
  }


  const accessChat = async (userToAccess: searchResultProps) => {

      const { data } = await axios.post(`${BASE_URL}${chatEnd}`, { 
        userId: userToAccess._id
       }, {
        headers: getHeaders(user.token ?? '')
      });

      console.log(data.chat);

      setAccessedChat(data.chat)
      setSelectedChat(data.chat)
      if (!allChats.find((chat) => chat._id === data.chat.id)) setAllChats([data.chat, ...allChats]);  
  };

  return (
    <Section>
        <SearchUser>
        <input type="text" placeholder='Search Users ...' onChange={(e) => handleSearch(e.target.value)} />
        <Searches>
          {
            searchResult.map((user,index) => {
              return <SearchedUser key={index} user={user} onClickFunc={accessChat} />
            })
          }
        </Searches>
        </SearchUser>
        <SuggestedUsers>
          <h2>Suggested Devs for you</h2>
          <h3>🛠️ API In Progress 🛠️</h3>
          <Users>
            
          </Users>
        </SuggestedUsers>
    </Section>
  )
}

export default NoSelectedChat