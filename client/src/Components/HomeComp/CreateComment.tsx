import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { userProps } from "../../Utils/GlobalContants";
import { getUserData } from "../../Utils/helperFunction";

const Section = styled.div`

display: flex;
align-items: center;

img{
  width: 5vw;
}

input{

}
`;

interface commentProps {
  postId: string;
  userData: userProps
}

const CreateComment = (props: commentProps) => {


  return (
    <Section>
      <img src={props.userData.photo} alt="userImg" />
      <input type="text" placeholder="Share your thoughts on this post"/>
    </Section>
  );
};

export default CreateComment;
