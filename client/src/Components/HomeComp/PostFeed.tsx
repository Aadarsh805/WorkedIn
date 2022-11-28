import React, { useEffect, useState } from "react";
import styled from "styled-components";
import {
  Comment,
  Share,
  ThumbsUp,
  ThumbsUp2,
} from "../../Components/GeneralComp/SVG";
import { BASE_URL, postEnd } from "../../Utils/APIRoutes";
import CommentBox from "./CommentBox";

const Section = styled.div`
  width: 100%;
  margin-top: 1rem;
  border: 1px solid blue;
  
  hr {
    width: 90%;
    margin: 0 auto;
  }
`;

const AuthorDetails = styled.div`
  display: flex;
  margin-bottom: 1rem;
  img {
    width: 5vw;
  }
`;

const Description = styled.div`
  font-size: 1rem;
  width: 90%;
  margin: 0 auto;
  /* margin-left: 10%; */
  /* margin-left: 2vw; */
  margin-bottom: 0.4rem;
  border: 1px solid red;
`;

const PostStats = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  border: 1px solid red;

  div {
    display: flex;

    svg {
      width: 1.2rem;
      fill: ${(props) => props.theme.lightBlack};
      /* fill: ${(props) => props.theme.green} */
      /* fill: blue; */
      /* background-color: red; */
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
    _id: string;
  };
  description: string;
  image: string;
  comments: number;
  like: Array<string>;
  _id: string;
  createdAt: string;
}

const PostFeed = (props: postProps) => {
  const [isCommentBoxOpen, setIsCommentBoxOpen] = useState(false)
  const totalLikes = props.like.length;

  const shareHandler = () => {
    // navigator.clipboard.writeText(`${BASE_URL}${postEnd}`)}
  };

  return (
    <Section>
      <AuthorDetails>
        <img src={props.author.photo} alt="" />
        <h3>{props.author.name}</h3>
        {/* <h5>{props.author}</h5> */}
      </AuthorDetails>
      <Description>
        <h4>{props.description}</h4>
        {props.image === undefined ? "hello" : null}
      </Description>
      <PostStats>
        <div>
          <ThumbsUp />
          <h4>{totalLikes}</h4>
        </div>
        <h4>{props.comments}</h4>
      </PostStats>
      <hr />
      <PostBottom>
        <ThumbsUp2 />
        <div onClick={() => setIsCommentBoxOpen(!isCommentBoxOpen)}>
        <Comment />
        </div>
        <div
          onClick={() => {
            navigator.clipboard.writeText(
              `${window.location.href}${postEnd}${props._id}`
            );
          }}
        >
          <Share />
        </div>
      </PostBottom>
      <CommentBox isCommentBoxOpen={isCommentBoxOpen} postId={props._id} />
    </Section>
  );
};

export default PostFeed;

// comment -> true -> commentbox Open
