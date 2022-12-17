import axios from "axios";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { BASE_URL, postEnd } from "../../utils/APIRoutes";
import { userProps } from "../../utils/GlobalContants";
import { getHeaders } from "../../utils/helperFunction";

const Section = styled.div`
  margin: 1rem 0.6rem 2rem;
  border-radius: 12px;
  box-sizing: border-box;
  /* border: 1px solid blue; */
  
  form {
    display: flex;
    align-items: center;
  }
  
  img {
    /* border: 1px solid blue; */
    width: 3rem;
    height: 3rem;
    object-fit: cover;
    border-radius: 50%;
    -webkit-box-shadow: 0px 0px 5px 3px rgba(0, 0, 0, 0.22);
    -moz-box-shadow: 0px 0px 5px 3px rgba(0, 0, 0, 0.22);
    box-shadow: 0px 0px 5px 3px rgba(0, 0, 0, 0.22);
  }

  input {
    width: calc(40vw - 5rem);
    /* resize: none; */
    /* height: 4rem; */
    padding: 14px 12px;
    box-sizing: border-box;
    font-size: 1rem;
    border-radius: 12px;
    border: none;
    outline: none;
    margin-left: 0.5rem;
    -webkit-box-shadow: 0px 0px 5px 3px rgba(0, 0, 0, 0.22);
    -moz-box-shadow: 0px 0px 5px 3px rgba(0, 0, 0, 0.22);
    box-shadow: 0px 0px 5px 3px rgba(0, 0, 0, 0.22);
  
  }
`;

interface commentProps {
  postId: string;
  userData: userProps;
}

const CreateComment = (props: commentProps) => {
  const [comment, setComment] = useState("");

  const commentHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    const data = await axios.post(
      `${BASE_URL}${postEnd}${props.postId}/comment`,
      {
        comment,
      },
      {
        headers: getHeaders(props.userData.token ?? ""),
      }
    );

    console.log(data);
  };

  return (
    <Section>
      <form onSubmit={commentHandler}>
        <img src={props.userData.photo} alt="userImg" />
        <input type="text" placeholder="Share your thoughts on this post"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          autoFocus/>
      </form>
    </Section>
  );
};

export default CreateComment;
