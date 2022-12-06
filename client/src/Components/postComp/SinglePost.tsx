import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import { BASE_URL, postEnd } from "../../utils/APIRoutes";
import { localStorageUser, userProps } from "../../utils/GlobalContants";
import Navbar from "../generalComp/Navbar";
import ActivityBox from "../homeComp/ActivityBox";
import CommentBox from "../homeComp/CommentBox";
import ProfileBriefBox from "../homeComp/ProfileBriefBox";
import PostContent from "./PostContent";

const Section = styled.div`
background-color: ${(props) => props.theme.grey};
  width: 100%;
  min-height: calc(100vh);
  display: flex;
  border: 1px solid red;
  padding: 0 5vw 0 5vw;
`;

const PostContainer = styled.div`
  border: 1px solid red;
  width: 40vw;
  margin: 0 5vw;
`;

interface postObjProps {
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

const SinglePost = () => {
  const [post, setPost] = useState<postObjProps>();
  const [isCommentBoxOpen, setIsCommentBoxOpen] = useState(false);
  const [postId, setPostId] = useState<string>()

  const [userData, setUserData] = useState<userProps>({});

  const params = useParams();
    useEffect(() => {
        console.log(params.id);
        setPostId(params.id)
    }, [])

  // get userData 
  useEffect(() => {
    async function fetchUserData() {
      const data = await JSON.parse(
        localStorage.getItem(localStorageUser) || "{}"
      );
      setUserData(data);
    }
    fetchUserData();
  }, []);

  const commentBoxModal = () => {
    setIsCommentBoxOpen(!isCommentBoxOpen);
  };

  async function fetchPost() {
    const { data } = await axios.get(
      `${BASE_URL}${postEnd}${postId}`
    );
    const postData = data.data.data;
    setPost(postData);
  }

  useEffect(() => {
    if (postId) {
        fetchPost();
    }
  }, [postId]);

  return (
    <>
      <Section>
        <ProfileBriefBox/>
        <PostContainer>
        <PostContent commentBoxModal={commentBoxModal} post={post} />
        {
            post && 
        <CommentBox userData={userData} isCommentBoxOpen={isCommentBoxOpen} postId={post._id} />
        }
        </PostContainer>
        <ActivityBox/>
      </Section>
    </>
  );
};

export default SinglePost;
