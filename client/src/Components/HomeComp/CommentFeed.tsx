import React, { useState } from "react";
import styled from "styled-components";
import { userProps } from "../../Utils/GlobalContants";
import { HiDotsVertical } from "react-icons/hi";
import CommentModal from "./CommentModal";

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
  userData: userProps
}

const CommentFeed = ({ comment, userData }: commentProps) => {
  const [isCommentModalOpen, setIsCommentModalOpen] = useState(false);
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
              {isCommentModalOpen ? <CommentModal commentId={comment._id} commentAuthorId={comment.user._id} userData={userData} /> : null}
            </CommentOptions>
          </AuthorName>
          <h4>{comment.user.tagline}</h4>
        </AboutAuthor>
      </CommentAuthor>
      {comment.comment}
    </Section>
  );
};

export default CommentFeed;
