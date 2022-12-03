import axios from "axios";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { BASE_URL, postEnd } from "../../utils/APIRoutes";
import { userProps } from "../../utils/GlobalContants";
import { getHeaders } from "../../utils/helperFunction";

const Section = styled.div`
  display: flex;
  align-items: center;
  margin-left: 1rem;
  /* justify-content: space-around; */

  img {
    width: 5vw;
    border-radius: 50%;
  }

  input {
    width: 30vw;
    padding: 10px;
    border-radius: 12px;
    /* border: none; */
    outline: none;
    margin-left: 1rem;
  }
`;

interface commentProps {
  postId: string;
  userData: userProps;
}

const CreateComment = (props: commentProps) => {
  const [comment, setComment] = useState("");

  const commentHandler = async (e: React.FormEvent<HTMLFormElement>) => {    
    const data = await axios.post(`${BASE_URL}${postEnd}${props.postId}/comment`, {
      comment
    }, {
      headers: getHeaders(props.userData.token ?? '')
    })

    console.log(data);
  };

  return (
    <Section>
      <form onSubmit={commentHandler}>
        <img src={props.userData.photo} alt="userImg" />
        <input
          type="text"
          placeholder="Share your thoughts on this post"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          autoFocus
        />
      </form>
    </Section>
  );
};

export default CreateComment;
