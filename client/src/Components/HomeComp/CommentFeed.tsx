import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import { userProps } from "../../utils/GlobalContants";
import { HiDotsVertical } from "react-icons/hi";
import CommentModal from "./CommentModal";
import axios from "axios";
import { BASE_URL, postEnd } from "../../utils/APIRoutes";
import { getHeaders } from "../../utils/helperFunction";

const Section = styled.div`
  /* display: flex; */
  /* width: 80%; */
  border: 1px solid purple;
  margin: 0.8rem 0rem 0.5rem 1rem;
`;

const CommentAuthor = styled.div`
  display: flex;
  border: 1px solid purple;

  img {
    width: 3.5vw;
  }
`;

const AboutAuthor = styled.div`

`;

const AuthorName = styled.div`
display: flex;
border: 1px solid red;
text-align: center;
/* width: 100%; */
align-items: center;
justify-content: space-between;
width: 35vw;

svg{
   border: 1px solid red;
}
`

const CommentOptions = styled.div`
  position: relative;
  right: 0.5rem;
  top: 2px;
  /* margin: auto 0; */
  cursor: pointer;
  svg {
    /* width: 3vw; */
  }
`;

const CommentContent = styled.div``

interface commentType {
  comment: string;
  createdAt: string;
  user: {
    name: string;
    photo: string;
    tagline: string;
    _id: string;
  };
  _id: string;
}

interface commentProps {
  comment: commentType,
  userData: userProps,
  postId: string
}

const CommentFeed = ({ comment, userData, postId }: commentProps) => {
  const [isCommentModalOpen, setIsCommentModalOpen] = useState(false);
  const [updateComment, setUpdateComment] = useState(false)
  const [commentContent, setCommentContent] = useState(comment.comment)

  const updateCommentHandler = async () => {
    const { data } = await axios.patch(`${BASE_URL}${postEnd}${postId}/comment/${comment._id}`, {
      comment: commentContent
    }, {
      headers: getHeaders(userData.token ?? '')
    })

    console.log(data);
  }
  
  return (
    <Section>
      <CommentAuthor>
        <img src={comment.user.photo} alt="" />
        <AboutAuthor>
          <AuthorName>
            <h3>{comment.user.name}</h3>
            <CommentOptions
              onClick={() => setIsCommentModalOpen(!isCommentModalOpen)}
            >
              <HiDotsVertical />
              {isCommentModalOpen ? <CommentModal comment={comment} userData={userData} postId={postId} setUpdateComment={setUpdateComment}/> : null}
            </CommentOptions>
          </AuthorName>
          <h4>{comment.user.tagline}</h4>
        </AboutAuthor>
      </CommentAuthor>
      <CommentContent>
      {
        updateComment ?
        <form onSubmit={updateCommentHandler}>
         <input type="text" value={commentContent} onChange={(e) => setCommentContent(e.target.value)} autoFocus/>
        </form>
        : <p>{commentContent}</p>
      }
      </CommentContent>
    </Section>
  );
};

export default CommentFeed;
