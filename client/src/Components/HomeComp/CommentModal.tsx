import React from "react";
import styled from "styled-components";
import { userProps } from "../../Utils/GlobalContants";

const Menu = styled.div`
  position: absolute;
  width: fit-content;
  z-index: 2;
  min-width: 13vw;
  background-color: #ffffff;
  cursor: auto;
  border-radius: 10px;
  padding: 0.4rem 0;
  /* border: 1px solid red; */
`;

const MenuItem = styled.div`
/* border: 1px solid red; */
margin: 0.6rem 0.7rem;
cursor: pointer;

h4{
    font-size: 0.8rem;
}
`;

interface commentModalProps {
  userData: userProps;
  commentId: string;
  commentAuthorId: string;
}

const CommentModal = ({
  userData,
  commentId,
  commentAuthorId,
}: commentModalProps) => {
  return (
    <Menu>
      {commentAuthorId === userData._id ? (
        <>
          <MenuItem><h4>Update Comment</h4></MenuItem>
          <MenuItem><h4>Delete Comment</h4></MenuItem>
        </>
      ) : (
        <MenuItem>Report Post</MenuItem>
      )}
    </Menu>
  );
};

export default CommentModal;
