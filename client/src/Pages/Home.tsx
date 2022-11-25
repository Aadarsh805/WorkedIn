import React, { useEffect } from 'react'
import styled from 'styled-components'
import CreatePost from '../Components/HomeComp/CreatePost'
import Navbar from '../Components/GeneralComp/Navbar'
import { BASE_URL, postEnd } from '../Utils/APIRoutes'
import ProfileBriefBox from '../Components/HomeComp/ProfileBriefBox'
import { apiProvider } from '../Utils/helperFunction'
import ActivityBox from '../Components/HomeComp/ActivityBox'
import PostFeed from '../Components/HomeComp/PostFeed'

const Section = styled.div`
    background-color: ${props => props.theme.grey};
    width: 100%;
    min-height: calc(100vh - 3rem);
    display: flex;
    border: 1px solid red;
    padding: 0 5vw 0 5vw;
`

const PostContainer = styled.div`
  border: 1px solid red;
width: 40vw;
margin: 0 5vw;
`

const Home = () => {
  useEffect(() => {
    async function fetchPosts () {
      const {data} = await apiProvider.get(`${BASE_URL}${postEnd}`);
      console.log(data.data.data);
    }
    fetchPosts()
  }, [])
  
  return (
    <>
    <Navbar/>
    <Section>
      <ProfileBriefBox />
      <PostContainer>
      <CreatePost/>
      <PostFeed/>
      </PostContainer>
      <ActivityBox />
    </Section>
    </>
  )
}

export default Home