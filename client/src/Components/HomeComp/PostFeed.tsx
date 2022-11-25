import React from "react";
import styled from "styled-components";

const Section = styled.div`
width: 100%;
margin-top: 1rem;
border: 1px solid blue;

hr{
  width: 90%;
  margin: 0 auto;
}
`

const AuthorDetails = styled.div`
display: flex;
margin-bottom: 1rem;
  img{
    width: 5vw;
  }
`

const Description = styled.div`
font-size: 1rem;
width: 90%;
margin: 0 auto;
/* margin-left: 10%; */
/* margin-left: 2vw; */
margin-bottom: 0.4rem;
border: 1px solid red;
`

const PostStats = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`

const PostBottom = styled.div`
  
`

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
}

const PostFeed = (props: postProps) => {
  // console.log(props.image);
  console.log("LIKE :- " + props.like);
  
  // const totalLikes = props.like.length
  
  return (
    <Section>
      <AuthorDetails>
        <img src={props.author.photo} alt="" />
      <h3>{props.author.name}</h3>
      {/* <h5>{props.author}</h5> */}
      </AuthorDetails>
      <Description>
      <h4>{props.description}</h4>
      {
        props.image === undefined ? 'hello' : null
      }
      </Description>
      <PostStats>
        {/* {totalLikes} */}
        {props.comments}
      </PostStats>
      <hr />
      <PostBottom>
      </PostBottom>
    </Section>
  );
};

export default PostFeed;
