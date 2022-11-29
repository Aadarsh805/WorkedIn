import axios from "axios";
import React from "react";
import styled from "styled-components";
import { BASE_URL, postEnd } from "../../Utils/APIRoutes";
import { userProps } from "../../Utils/GlobalContants";
import { getHeaders } from "../../Utils/helperFunction";

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

interface commentType {
    comment: string;
    createdAt: string;
    user: {
      name: string;
      photo: string;
      tagline: string;
      _id: string;
    };
    _id: string;
  }

interface commentModalProps {
  userData: userProps;
  comment: commentType,
  postId: string,
  setUpdateComment: any,
}

const CommentModal = ({
  userData,
  comment,
  postId,
  setUpdateComment,
}: commentModalProps) => {

    const updateCommentHandler = async () => {
        setUpdateComment(true)   
    }

    const deleteCommentHandler = async () => {
        await axios.delete(`${BASE_URL}${postEnd}${postId}/comment/${comment._id}`, {
            headers: getHeaders(userData.token ?? '')
        })
        window.location.reload();
    }

    const reportCommentHandler = async () => {
        const {data} = await axios.post(`${BASE_URL}${postEnd}${postId}/comment/${comment._id}`, {}, {
            headers: getHeaders(userData.token ?? '')
        })
        console.log(data);
        alert(data)
    }

  return (
    <Menu>
      {comment.user._id === userData._id ? (
        <>
          <MenuItem onClick={updateCommentHandler} ><h4>Update Comment</h4></MenuItem>
          <MenuItem onClick={deleteCommentHandler} ><h4>Delete Comment</h4></MenuItem>
        </>
      ) : (
        <MenuItem onClick={reportCommentHandler} >Report Post</MenuItem>
      )}
    </Menu>
  );
};

export default CommentModal;
