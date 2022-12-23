import React, { useState } from "react";
import styled from "styled-components";
import CommentBox from "../commentComp/CommentBox";
import { userProps } from "../../types/userTypes";
import { postProps } from "../../types/postTypes";
import PostContent from "../postComp/PostContent";

const Section = styled.div`
  width: 100%;
  margin-bottom: 1rem;
  border-radius: 10px;
  padding-top: 1rem;
  padding-bottom: 0.2rem;
  background-color: rgba(236, 227, 212, 255);

  hr {
    width: 100%;
    margin-bottom: 0.4rem;
    border: none;
    height: 1px;
    background-color: grey;
  }
`;

interface postFeedProps {
  user: userProps;
  post: postProps;
}

const PostFeed = ({ post, user }: postFeedProps) => {
  const [isCommentBoxOpen, setIsCommentBoxOpen] = useState(false);

  const commentBoxHandler = () => {
    setIsCommentBoxOpen(!isCommentBoxOpen);
  };

  return (
    <>
      <Section>
        <PostContent
          user={user}
          post={post}
          commentBoxHandler={commentBoxHandler}
        />
        <CommentBox
          userData={user}
          isCommentBoxOpen={isCommentBoxOpen}
          postId={post._id}
        />
      </Section>
    </>
  );
};

export default PostFeed;
