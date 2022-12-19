import axios from 'axios'
import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { commentProps } from '../../types/commentTypes'
import { userProps } from '../../types/userProps'
import { BASE_URL, postEnd } from '../../utils/APIRoutes'
import { getHeaders, getUserData } from '../../utils/helperFunction'
import CommentFeed from './CommentFeed'
import CreateComment from './CreateComment'

interface commentStylesProps {
  isCommentBoxOpen: Boolean
}

const Section = styled.div`
display: ${(props: commentStylesProps) => props.isCommentBoxOpen ? 'block' : 'none'};
opacity: ${(props : commentStylesProps) => props.isCommentBoxOpen ? 1 : 0};
margin-top: 0.8rem;
background-color: rgba(236, 227, 212, 255);
`

interface commentFeedProps {
  isCommentBoxOpen: Boolean
  postId: string;
  userData: userProps
}

const CommentBox = (props: commentFeedProps) => {

  const [comments, setComments] = useState<Array<commentProps>>([]);

  let isCommentBoxOpen = props.isCommentBoxOpen;

  async function fetchComments () {
    const {data} = await axios.get(`${BASE_URL}${postEnd}${props.postId}/comment`, {
      headers: getHeaders(props.userData.token ?? '' )
    })
    console.log(data.data.data);
    const allComments = data.data.data;
    setComments(allComments)
  }

  useEffect(() => {    
    if (isCommentBoxOpen) {
      fetchComments()
    }
  }, [isCommentBoxOpen])

  return (
    <Section isCommentBoxOpen={props.isCommentBoxOpen} > 
        <CreateComment postId={props.postId} userData={props.userData} />
        {
          comments.map((comment,index) => {
            return (
              // author img, author name, comment id, comment, author tagline
              <CommentFeed key={index} comment={comment} userData={props.userData} postId={props.postId} />
            )
          })
        }
    </Section>
  )
}

export default CommentBox