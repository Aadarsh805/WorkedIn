import React, { useState } from "react";
import { HiDotsVertical } from "react-icons/hi";
import styled from "styled-components";
import {
  Comment,
  Share,
  ThumbsUp,
  ThumbsUp2,
} from "../generalComp/SVG";
import { userProps } from "../../utils/GlobalContants";
import PostModal from "../postComp/PostModal";
import CommentBox from "./CommentBox";

const Section = styled.div`
  width: 100%;
  margin-bottom: 1rem;
  border-radius: 10px;
  padding-top: 1rem;
  padding-bottom: 0.5rem;
  background-color: rgba(236, 227, 212, 255);

  hr {
    width: 100%;
    margin-bottom: 0.5rem;
    border: none;
    height: 1px;
    background-color: grey;
  }
`;

const AuthorDetails = styled.div`
  display: flex;
  margin-bottom: 1rem;
  padding-left: 0.5rem;
  /* border: 1px solid red; */

  img {
    width: 4vw;
    height: 4vw;
    border-radius: 50%;
    -webkit-box-shadow: 0px 0px 5px 3px rgba(0,0,0,0.22);
-moz-box-shadow: 0px 0px 5px 3px rgba(0,0,0,0.22);
box-shadow: 0px 0px 5px 3px rgba(0,0,0,0.22);
  }
`;

const AuthorTopSection = styled.div`
  /* border: 1px solid red; */
  text-align: center;
  /* width: 100%; */
  padding-left: 0.8rem;
  width: 35vw;
  box-sizing: border-box;
  /* margin-top: 1rem; */
  
  div{
    display: flex;
    align-items: center;
    justify-content: space-between;
    /* border: 1px solid red; */

    h3{
      font-size: 1.2rem;
      margin-bottom: 0.1rem;
    }
  }

  h5{
    /* border: 1px solid red; */
    text-align: left;
    width: 100%;
    overflow: hidden;
    font-size: 0.8rem;
    font-weight: 500;
  }
`;

const PostOptions = styled.div`
  position: relative;
  right: 0.5rem;
  cursor: pointer;
`;

const Description = styled.div`
  font-size: 0.8rem;
  width: 100%;
  margin-bottom: 0.4rem;
  /* border: 1px solid red; */
  
  h4{
    /* border: 1px solid red; */
    margin: 0 2rem 0.5rem 1.5rem;
  }
`;

const ImageContainer = styled.div`
  width: 100%;
  max-height: 90vh;

  img {
    width: 100%;
    max-height: 90vh;
    object-fit: cover;
  }
`;

const PostStats = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 95%;
  margin: 0 auto 0.5rem;

  h5{
    font-size: 0.8rem;
  }
  
  div {
    display: flex;
    align-items: flex-end;

    svg {
      width: 1rem;
      margin-right: 0.2rem;
    }
  }
`;

const PostBottom = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-around;
  border: 1px solid red;

  svg {
    width: 20px;
    cursor: pointer;
    /* fill: blue; */
  }
`;

interface postProps {
  author: {
    name: string;
    photo: string;
    tagline: string;
    _id: string;
  };
  description: string;
  image: string;
  comments: number;
  like: Array<string>;
  _id: string;
  createdAt: string;
}

interface postFeedProps {
  user: userProps;
  post: postProps;
}

const PostFeed = ({ post, user }: postFeedProps) => {
  const [isCommentBoxOpen, setIsCommentBoxOpen] = useState(false);
  const totalLikes = post.like.length;

  const [isPostModalOpen, setIsPostModalOpen] = useState(false);

  const closePostModal = () => {
    setIsPostModalOpen(false);
  };

  let host = window.location.protocol + "//" + window.location.host;

  const str = "ewjhbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbnbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbcne"
  return (
    <Section>
      <AuthorDetails>
        <img src={post.author.photo} alt="" />
        <AuthorTopSection>
          <div>
            <h3>{post.author.name}</h3>
            <PostOptions onClick={() => setIsPostModalOpen(!isPostModalOpen)}>
              <HiDotsVertical />
              {isPostModalOpen ? (
                <PostModal
                  post={post}
                  user={user}
                  closePostModal={closePostModal}
                />
              ) : null}
            </PostOptions>
          </div>
          <h5>
            {post.author.tagline !== ""
              ? post.author.tagline
              : str.slice(0,50)}
          </h5>
        </AuthorTopSection>
      </AuthorDetails>
      <Description>
        <h4>{post.description}</h4>
        <ImageContainer>
          {post.image !== "" ? (
            <img src={post.image} alt="postImg" loading="lazy" />
          ) : null}
        </ImageContainer>
      </Description>
      <PostStats>
        <div>
          <ThumbsUp />
          <h5>{totalLikes}</h5>
        </div>
        <h5>{post.comments} comments</h5>
      </PostStats>
      <hr />
      <PostBottom>
        <ThumbsUp2 />
        <div onClick={() => setIsCommentBoxOpen(!isCommentBoxOpen)}>
          <Comment />
        </div>
        <div
          onClick={() => {
            navigator.clipboard.writeText(`${host}/posts/${post._id}`);
          }}
        >
          <Share />
        </div>
      </PostBottom>
      <CommentBox
        userData={user}
        isCommentBoxOpen={isCommentBoxOpen}
        postId={post._id}
      />
    </Section>
  );
};

export default PostFeed;

// comment -> true -> commentbox Open
