import React, { useEffect, useState } from "react";
import styled from "styled-components";
import CreatePost from "../components/homeComp/CreatePost";
import Navbar from "../components/generalComp/Navbar";
import { BASE_URL, postEnd } from "../utils/APIRoutes";
import ProfileBriefBox from "../components/homeComp/ProfileBriefBox";
import { apiProvider } from "../utils/helperFunction";
import ActivityBox from "../components/homeComp/ActivityBox";
import PostFeed from "../components/homeComp/PostFeed";
import { localStorageUser, userProps } from "../utils/GlobalContants";

const Section = styled.div`
  background-color: ${(props) => props.theme.grey};
  width: 100%;
  min-height: calc(100vh - 3rem);
  display: flex;
  border: 1px solid red;
  padding: 0 5vw 0 5vw;
`;

const PostContainer = styled.div`
  border: 1px solid red;
  width: 40vw;
  margin: 0 5vw;
`;

const Home = () => {
  interface postArr {
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

  const [userData, setUserData] = useState<userProps>({});
  const [posts, setPosts] = useState<Array<postArr>>([]);

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

  //  get all posts
  useEffect(() => {
    async function fetchPosts() {
      const { data } = await apiProvider.get(`${BASE_URL}${postEnd}`);
      console.log(data.data.data);
      setPosts(data.data.data);
    }
    fetchPosts();
  }, []);

  return (
    <>
      <Navbar />
      <Section>
        <ProfileBriefBox />
        <PostContainer>
          <CreatePost />
          {posts.map((post, index) => {
            return <PostFeed post={post} user={userData} key={index} />;
          })}
        </PostContainer>
        <ActivityBox />
      </Section>
    </>
  );
};

export default Home;
