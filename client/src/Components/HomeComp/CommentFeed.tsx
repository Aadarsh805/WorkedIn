import React from 'react'
import styled from 'styled-components'
import { userProps } from '../../Utils/GlobalContants'

const Section = styled.div`
/* display: flex; */
`

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
    comment: commentProps,
    user: userProps
}

const CommentFeed = (props: commentFeedProps) => {
  return (
    <Section>
        {props.comment.comment}
    </Section>
  )
}

export default CommentFeed