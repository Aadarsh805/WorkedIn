import React from 'react'
import styled from 'styled-components'
import { userProps } from '../../Utils/GlobalContants'

const Section = styled.div`
/* display: flex; */
/* width: 80%; */
border: 1px solid purple;
margin: 0.8rem 0rem 0.5rem 1rem;
`

const CommentAuthor = styled.div`
display: flex;

img{
    width: 3.5vw;
}
`

interface commentType {
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

interface commentProps {
    comment: commentType
}

const CommentFeed = ({comment}: commentProps) => {
  return (
    <Section>
        <CommentAuthor>
            <img src={comment.user.photo} alt="" />
            <div>
                <h3>{comment.user.name}</h3>
                <h4>{comment.user.tagline}</h4>
            </div>
        </CommentAuthor>
        {comment.comment}
    </Section>
  )
}

export default CommentFeed