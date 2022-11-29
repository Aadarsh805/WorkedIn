import axios from 'axios'
import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { BASE_URL, postEnd } from '../../Utils/APIRoutes'
import { userProps } from '../../Utils/GlobalContants'
import { getHeaders, getUserData } from '../../Utils/helperFunction'
import CommentFeed from './CommentFeed'
import CreateComment from './CreateComment'



const Section = styled.div`
display: ${(props: commentStylesProps) => props.isCommentBoxOpen ? 'block' : 'none'};
opacity: ${(props : commentStylesProps) => props.isCommentBoxOpen ? 1 : 0};
/* max-height: ${(props : commentStylesProps) => props.isCommentBoxOpen ? '10vh' : 0}; */
/* transition: max-height 0.25s linear, opacity 0.2s linear; */
`

interface commentStylesProps {
  isCommentBoxOpen: Boolean
}

interface commentProps {
  comment: string,
  createdAt: string,
  user: {
    name: string,
    photo: string,
    tagline: string,
    _id: string,
  },
  _id: string
}

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