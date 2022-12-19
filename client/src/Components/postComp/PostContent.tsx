import React, { useEffect, useState } from "react";
import { BiCommentDetail, BiShareAlt } from "react-icons/bi";
import { FaRegThumbsUp } from "react-icons/fa";
import { HiDotsVertical } from "react-icons/hi";
import styled from "styled-components";
import { postProps } from "../../types/postProps";
import { userProps } from "../../types/userProps";
import { postEnd } from "../../utils/APIRoutes";
import { Comment, Share, ThumbsUp, ThumbsUp2 } from "../generalComp/SVG";
import PostModal from "./PostModal";

const AuthorDetails = styled.div`
  display: flex;
  margin-bottom: 1rem;
  padding-left: 0.5rem;
  /* border: 1px solid red; */

  img {
    width: 4vw;
    height: 4vw;
    border-radius: 50%;
    -webkit-box-shadow: 0px 0px 5px 3px rgba(0, 0, 0, 0.22);
    -moz-box-shadow: 0px 0px 5px 3px rgba(0, 0, 0, 0.22);
    box-shadow: 0px 0px 5px 3px rgba(0, 0, 0, 0.22);
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

  div {
    display: flex;
    align-items: center;
    justify-content: space-between;

    h3 {
      font-size: 1.2rem;
      margin-bottom: 0.1rem;
    }
  }

  h5 {
    /* border: 1px solid red; */
    text-align: left;
    width: 90%;
    white-space: nowrap;
    overflow: hidden;
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

  h4 {
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

  h5 {
    font-size: 0.8rem;

    span {
      font-weight: 500;
    }
  }

  div {
    /* border: 1px solid red; */
    display: flex;
    align-items: flex-end;

    h5 {
      line-height: 80%;
    }

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
  /* border: 1px solid red; */
  /* height: fit-content; */

  svg {
    /* border: 1px solid red; */
    width: 1.6rem;
    height: 1.4rem;
    cursor: pointer;
    /* padding: 4px; */
    /* border-radius: 10px; */
    /* fill: rgba(137,117,88,255); */
  }
`;

interface postContentProps {
  post: postProps;
  user: userProps;
  commentBoxHandler: any;
}

const PostContent = ({ post, user, commentBoxHandler }: postContentProps) => {
  const [isPostModalOpen, setIsPostModalOpen] = useState(false);

  const closePostModal = () => {
    setIsPostModalOpen(false);
  };

  const host = window.location.protocol + "//" + window.location.host;

  return post ? (
    <>
      <AuthorDetails>
        <img src={post.author.photo} alt="postAuthorImg" />
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
          <h5>{post.author.tagline !== "" ? post.author.tagline : "......"}</h5>
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
          <h5>{post.like.length}</h5>
        </div>
        <h5>
          {post.comments} <span>comments</span>
        </h5>
      </PostStats>
      <hr />
      <PostBottom>
        <div>
          <FaRegThumbsUp />
        </div>
        <div onClick={commentBoxHandler}>
          <BiCommentDetail />
        </div>
        <div
          onClick={() => {
            navigator.clipboard.writeText(`${host}/posts/${post._id}`);
          }}
        >
          <BiShareAlt />
        </div>
      </PostBottom>
    </>
  ) : null;
};

export default PostContent;
