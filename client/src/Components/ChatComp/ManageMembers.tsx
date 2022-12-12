import axios from "axios";
import React, { useEffect, useState, useRef } from "react";
import styled from "styled-components";
import { BASE_URL, chatEnd, searchUserEnd } from "../../utils/APIRoutes";
import { userProps } from "../../utils/GlobalContants";
import { getHeaders } from "../../utils/helperFunction";
import { useOutsideAlerter } from "../../utils/OutsideAlerter";
import SearchedUser from "./SearchedUser";
import UserBadge from "./UserBadge";

const Section = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  width: 50vw;
  /* height: 60vh; */
  max-height: 60vh;
  background-color: antiquewhite;
  transform: translate(-50%, -50%);
  transition: max-height 1s linear;
  display: flex;
  flex-direction: column;

  border-radius: 10px;
  padding: 1.5rem 2rem;
  box-sizing: border-box;
  background-color: #735f32;
  overflow-y: auto;

  &::-webkit-scrollbar {
    width: 0.4rem;
    &-thumb {
      background-color: #fff;
      width: 0.1rem;
      border-radius: 1rem;
    }
  }

  h2 {
    color: #faf8f1;
    font-size: 2rem;
    font-weight: 400;
    margin-bottom: 0.5rem;
  }

  input {
    width: 100%;
    box-sizing: border-box;
    padding: 0.7rem 1rem;
    border-radius: 10px;
    outline: none;
    border: none;
    margin-bottom: 0.5rem;
    font-size: 1rem;
    background: #faf8f1;
    color: rgb(58, 66, 27);

    &::placeholder {
      color: rgb(58, 66, 27);
    }

    &:first-child {
      margin-bottom: 1rem;
    }
  }
`;

const SearchedUsers = styled.div`
  /* padding: 0.4rem 1rem; */
  /* border: 1px solid white; */
  box-sizing: border-box;
  width: 100%;
  display: grid;
  grid-template-columns: auto auto;
  margin: 0.7rem 0 0rem;
`;

const UserBadges = styled.div`
  /* border: 1px solid white; */
  display: flex;
  flex-wrap: wrap;
  width: 100%;
  padding: 0 1rem;
  margin: 0.7rem auto 1rem;
  box-sizing: border-box;
`;

// userbadges
// search
// searchUserReault
// add to group
// remove from group

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
}

interface manageMemberProps {
  selectedChat: chatObj;
  user: userProps;
  closeInvitePeopleModal: any;
}

interface searchResultProps {
  _id: string;
  name: string;
  photo: string;
}

const ManageMembers = ({
  selectedChat,
  user,
  closeInvitePeopleModal,
}: manageMemberProps) => {

  const [searchResult, setSearchResult] = useState<Array<searchResultProps>>([]);

  const [chatUsers, setChatUsers] = useState<searchResultProps[]>(selectedChat.users!);

  const wrapperRef = useRef<HTMLDivElement | null>(null);
  useOutsideAlerter(wrapperRef, closeInvitePeopleModal);

  useEffect(() => {
    console.log(chatUsers);
  }, [chatUsers]);

  const handleSearch = async (query: string) => {
    const { data } = await axios.get(`${BASE_URL}${searchUserEnd}${query}`, {
      headers: getHeaders(user.token ?? ""),
    });
    setSearchResult(data);
  };

  const removeFromGroupHandler = async (userToRemove: searchResultProps) => {
    if (selectedChat.groupAdmin?._id !== user._id && userToRemove._id !== user._id) {
      return
    }

    const { data } = await axios.patch(
      `${BASE_URL}${chatEnd}${selectedChat._id}/groupremove`, {
        userId: userToRemove._id
      },
      {
        headers: getHeaders(user.token ?? '')
      }
    )

    console.log(data);
    setChatUsers(chatUsers => chatUsers.filter(user => user._id !== userToRemove._id))
    
  };

  const addToGroupHandler = async (userToAdd: searchResultProps) => {
    if (
      (selectedChat.users as unknown as any[]).find(
        (user) => user._id === userToAdd._id
      )
    ) {
      return;
    }

    if (selectedChat.groupAdmin?._id !== user._id) {
      return;
    }

    const { data } = await axios.patch(
      `${BASE_URL}${chatEnd}${selectedChat._id}/groupadd`,
      {
        userId: userToAdd._id,
      },
      {
        headers: getHeaders(user.token ?? ""),
      }
    );

    console.log(data);
    setChatUsers((current) => [...current, userToAdd]);
  };

  return (
    <Section ref={wrapperRef}>
      <h2>{selectedChat.chatName}</h2>
      <UserBadges>
        {chatUsers.map((user) => {
          return <UserBadge user={user} onClickFunc={removeFromGroupHandler} />;
        })}
      </UserBadges>
      <input
        type="text"
        placeholder="Add people"
        onChange={(e) => handleSearch(e.target.value)}
      />
      <SearchedUsers>
        {searchResult.map((result, index) => {
          return (
            <SearchedUser
              key={index}
              user={result}
              onClickFunc={addToGroupHandler}
            />
          );
        })}
      </SearchedUsers>
    </Section>
  );
};

export default ManageMembers;
