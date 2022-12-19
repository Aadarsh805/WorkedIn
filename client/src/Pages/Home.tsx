import React, { useEffect, useState } from "react";
import styled from "styled-components";
import CreatePost from "../components/homeComp/CreatePost";
import Navbar from "../components/generalComp/Navbar";
import { BASE_URL, postEnd } from "../utils/APIRoutes";
import ProfileBriefBox from "../components/homeComp/ProfileBriefBox";
import { apiProvider } from "../utils/helperFunction";
import ActivityBox from "../components/homeComp/ActivityBox";
import PostFeed from "../components/homeComp/PostFeed";
import { localStorageUser } from "../utils/GlobalContants";
import { postProps } from "../types/postProps";
import { userProps } from "../types/userProps";

const Section = styled.div`
  /* background-color: ${(props) => props.theme.grey}; */
  /* border: 1px solid red; */
  width: 100%;
  /* min-height: calc(100vh - 2.5rem); */
  display: flex;
  padding: 0 5vw;
  background-color: rgba(207, 186, 148, 255);
`;

const PostContainer = styled.div`
  /* border: 1px solid red; */
  width: 40vw;
  margin: 0 5vw;
  min-height: calc(100vh - 2.5rem);
  margin-top: 2rem;
  /* border-radius: 12px; */
  /* background-color: rgba(236,227,212,255); */
`;

const Home = () => {
  

  const [userData, setUserData] = useState<userProps>({});
  const [posts, setPosts] = useState<Array<postProps>>([]);

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
            return (<PostFeed post={post} user={userData} key={index} />);
          })}
        </PostContainer>
        <ActivityBox />
      </Section>
    </>
  );
};

export default Home;
