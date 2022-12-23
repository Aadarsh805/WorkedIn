import React, { useState } from "react";
import styled from "styled-components";
import { HiDotsVertical } from "react-icons/hi";
import CommentModal from "./CommentModal";
import axios from "axios";
import { BASE_URL, postEnd } from "../../utils/apiRoutes";
import { getHeaders } from "../../utils/helperFunction";
import { commentProps } from "../../types/commentTypes";
import { userProps } from "../../types/userTypes";

const Section = styled.div`
  width: 92.5%;
  padding: 0.4rem;
  margin: 0rem 0rem 1.2rem 1.2rem;
  box-sizing: border-box;
  /* border: 1px solid purple; */
  border-radius: 10px;
  -webkit-box-shadow: 0px 0px 5px 3px rgba(0, 0, 0, 0.22);
    -moz-box-shadow: 0px 0px 5px 3px rgba(0, 0, 0, 0.22);
    box-shadow: 0px 0px 5px 3px rgba(0, 0, 0, 0.22);
  /* background-color: #fff; */
`;

const CommentAuthor = styled.div`
  display: flex;
  /* align-items: center; */
  /* border: 1px solid yellow; */

  img {
    width: 2.5rem;
    height: 2.5rem;
    border-radius: 50%;
    object-fit: cover;
    margin-right: 0.6rem;
        -webkit-box-shadow: 0px 0px 5px 3px rgba(0, 0, 0, 0.22);
    -moz-box-shadow: 0px 0px 5px 3px rgba(0, 0, 0, 0.22);
    box-shadow: 0px 0px 5px 3px rgba(0, 0, 0, 0.22);
  }
`;

const AboutAuthor = styled.div`


h4{
  font-size: 0.8rem;
  font-weight: 600;
  width: 93.5%;
  overflow: hidden;
  white-space: nowrap;
  /* border: 1px solid red; */
}
`;

const AuthorName = styled.div`
/* border: 1px solid red; */
display: flex;
text-align: center;
align-items: center;
justify-content: space-between;
width: calc(37vw - 4rem);

h3{
  font-size: 1rem;
}

svg{
   /* border: 1px solid red; */
   /* margin-right: 0; */
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

const CommentContent = styled.div`
margin-top: 0.5rem;
padding-left: 0.5rem;
/* border: 1px solid blue; */
p{
  font-size: 0.9rem;
  line-height: 150%;
}

input{
width: 90%;
outline: none;
padding: 12px;
border-radius: 10px;
border: none;
}

`

interface commentFeedProps {
  comment: commentProps,
  userData: userProps,
  postId: string
}

const CommentFeed = ({ comment, userData, postId }: commentFeedProps) => {
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

  const closeCommentModal = () => {
    setIsCommentModalOpen(false)
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
              {isCommentModalOpen ? <CommentModal comment={comment} userData={userData} postId={postId} setUpdateComment={setUpdateComment} closeCommentModal={closeCommentModal}/> : null}
            </CommentOptions>
          </AuthorName>
          <h4>{comment.user.tagline !== '' ? comment.user.tagline : '...' }</h4>
        </AboutAuthor>
      </CommentAuthor>
      <CommentContent>
      {
        updateComment ?
        <form onSubmit={updateCommentHandler}>
         <input type="text" placeholder="Update your comment" value={commentContent} onChange={(e) => setCommentContent(e.target.value)} autoFocus/>
        </form>
        : <p>{commentContent}</p>
      }
      </CommentContent>
    </Section>
  );
};

export default CommentFeed;
