import axios from "axios";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { BASE_URL, chatEnd, searchUserEnd } from "../../utils/APIRoutes";
import { userProps } from "../../utils/GlobalContants";
import { getHeaders } from "../../utils/helperFunction";
import SearchedUser from "./SearchedUser";

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

// userbadges
// search
// searchUserReault
// add to group

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
}

interface manageMemberProps {
  selectedChat: chatObj;
  user: userProps;
}

interface searchResultProps {
  _id: string,
  name: string,
  photo: string
}

const ManageMembers = ({ selectedChat, user }: manageMemberProps) => {
    // const [search, setSearch] = useState('')
    const [searchResult, setSearchResult] = useState<Array<searchResultProps>>([]);

    // const [chatMembers, setChatMembers] = useState<Array<groupMemberProps> | undefined >(selectedChat.users)

    let chatMembers = selectedChat.users

    const [first, setfirst] = useState<groupMemberProps[] | undefined>(selectedChat.users)
    // const [chatMembers, setChatMembers] = useState<Array<groupMemberProps | undefined>>(selectedChat.users)    

    useEffect(() => {
      console.log("NEW MEMBERS :- " + first);
    }, [first])
    
    // useEffect(() => {
    //   setChatMembers(selectedChat.users)
    // }, [])
    
    const handleSearch = async (query: string) => {
        const { data } = await axios.get(`${BASE_URL}${searchUserEnd}${query}`, {
          headers: getHeaders(user.token ?? '')
        })
        setSearchResult(data)
    }

    const addToGroupHandler = async (userToAdd: groupMemberProps) => {

        if ((selectedChat.users as unknown as any[]).find(user => user._id === userToAdd._id)) {
          return;
        }

        if (selectedChat.groupAdmin?._id !== user._id) {
          return;
        }

        const { data } = await axios.patch(`${BASE_URL}${chatEnd}${selectedChat._id}/groupadd`, {
          userId: userToAdd._id
        }, {
          headers: getHeaders(user.token ?? '')
        })

        console.log(data);
        console.log(first);
    }

  return (
    <Section>
      <h1>{selectedChat.chatName}</h1>
      {/* user badges --> handleRemoveUser */}
      {
        (first as unknown as any[]).map((user) => {
            return (
                <h5>{user.name}</h5>
            )
        })
      }
      {/* input search */}
      <input type="text" placeholder="Add people" onChange={(e) => handleSearch(e.target.value)}  />
      {
        searchResult.map((result,index) => {
            return (
                <SearchedUser key={index} user={result} onClickFunc={addToGroupHandler} />
            )
        })
      }
    </Section>
  );
};

export default ManageMembers;
