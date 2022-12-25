import { useState, useEffect } from "react";
import styled, { keyframes, css } from "styled-components";
import { BiCommentDetail, BiShareAlt } from "react-icons/bi";
import { FaRegThumbsUp, FaThumbsUp } from "react-icons/fa";
import { HiDotsVertical } from "react-icons/hi";
import PostModal from "./PostModal";
import { userProps } from "../../types/userTypes";
import { postProps } from "../../types/postTypes";
import { ThumbsUp } from "../generalComp/SVG";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { BASE_URL, postEnd } from "../../utils/apiRoutes";
import { getHeaders } from "../../utils/helperFunction";

const AuthorDetails = styled.div`
  display: flex;
  margin-bottom: 0.5rem;
  padding-left: 0.5rem;
  /* border: 1px solid red; */
`;

const AuthorImage = styled.div`
  /* border: 1px solid red; */
  margin: 0;
  border-radius: 50%;
  padding: 0;
  img {
    width: 4vw;
    height: 4vw;
    border-radius: 50%;
    object-fit: cover;
    -webkit-box-shadow: 0px 0px 5px 3px rgba(0, 0, 0, 0.22);
    -moz-box-shadow: 0px 0px 5px 3px rgba(0, 0, 0, 0.22);
    box-shadow: 0px 0px 5px 3px rgba(0, 0, 0, 0.22);
  }
`;

const AuthorTopSection = styled.div`
  /* border: 1px solid red; */
  text-align: center;
  /* width: 100%; */
  padding-left: 0.8rem;
  width: 35vw;
  box-sizing: border-box;
  /* margin-top: 1rem; */

  div {
    display: flex;
    align-items: center;
    justify-content: space-between;

    h3 {
      font-size: 1.2rem;
      margin-bottom: 0.1rem;
    }
  }

  h5 {
    /* border: 1px solid red; */
    text-align: left;
    width: 90%;
    white-space: nowrap;
    overflow: hidden;
    overflow: hidden;
    font-size: 0.8rem;
    font-weight: 500;
  }
`;

const PostOptions = styled.div`
  position: relative;
  right: 0.5rem;
  cursor: pointer;
`;

const Description = styled.div`
  font-size: 0.8rem;
  width: 100%;
  margin-bottom: 0.4rem;
  /* border: 1px solid red; */

  h4 {
    /* border: 1px solid red; */
    margin: 0 2rem 0.5rem 1.5rem;
  }
`;

const ImageContainer = styled.div`
  width: 100%;
  max-height: 90vh;

  img {
    width: 100%;
    max-height: 90vh;
    object-fit: cover;
  }
`;

const PostStats = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 95%;
  margin: 0 auto 0.5rem;

  h5 {
    font-size: 0.8rem;

    span {
      font-weight: 500;
    }
  }

  div {
    /* border: 1px solid red; */
    display: flex;
    align-items: flex-end;

    h5 {
      line-height: 80%;
    }

    svg {
      width: 1rem;
      margin-right: 0.2rem;
    }
  }
`;

const likeAnimation = keyframes`
  0%{
    transform: rotate(0deg);
  } 
  25%{
    transform: rotate(-30deg) scale(1.3);
  }
  50% {
    transform: rotate(0deg) scale(1.2);
  }
  75%{
    transform: rotate(40deg) scale(1.1);
  }
  100%{
    transform: rotate(0deg) scale(1);
  }
`;

interface likeProps {
  likeAnimate: boolean;
}

const PostBottom = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-around;

  svg {
    width: 1.6rem;
    height: 1.4rem;
    cursor: pointer;
  }

  div.like {
    /* border: 1px solid red; */

    svg {
      animation: ${(props: likeProps) =>
        props.likeAnimate &&
        css`
          ${likeAnimation} 0.6s linear
        `};
    }
  }
`;

interface postContentProps {
  post: postProps;
  user: userProps;
  commentBoxHandler: any;
}

const PostContent = ({ post, user, commentBoxHandler }: postContentProps) => {
  const [isPostModalOpen, setIsPostModalOpen] = useState<boolean>(false);
  const [likeAnimate, setSvgAnimate] = useState<boolean>(false);
  const [postLikes, setPostLikes] = useState<number>(post.like.length);
  const [postLikeArr, setPostLikeArr] = useState<Array<string>>(post.like);

  const navigate = useNavigate();

  const closePostModal = () => {
    setIsPostModalOpen(false);
  };

  const host = window.location.protocol + "//" + window.location.host;

  const slugify = (name: string) => {
    const slugName = name
      .toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, "")
      .replace(/[\s_-]+/g, "-")
      .replace(/^-+|-+$/g, "");
    return slugName;
  };

  const profileNavigator = () => {
    console.log("LOCAL USER ID :- " + user._id);
    console.log("POST AUTHOR ID :- " + post.author._id);
    if (post.author._id !== user._id) {
      const slugName = slugify(post.author.name);
      navigate(`/profile/${slugName}`, {
        state: {
          id: post.author._id,
        },
      });
    } else {
      navigate("/profile/me");
    }
  };

  const likeHandler = async () => {
    setSvgAnimate(true);


    if (!postLikeArr.find(id => {
      return id === user._id
    })) {
      setPostLikes(postLikes + 1)
      setPostLikeArr([...postLikeArr, user._id!])
    } else {
      setPostLikes(postLikes - 1)
      setPostLikeArr(postLikeArr => postLikeArr.filter(id => id !== user._id))
    }

    const { data } = await axios.patch(
      `${BASE_URL}${postEnd}${post._id}/like`,
      {},
      {
        headers: getHeaders(user.token ?? ""),
      }
    );
    console.log(data);

    setTimeout(() => {
      setSvgAnimate(false);
    }, 1000);
  };

  return post ? (
    <>
      <AuthorDetails>
        <AuthorImage onClick={profileNavigator}>
          <img src={post.author.photo} alt="postAuthorImg" />
        </AuthorImage>
        <AuthorTopSection>
          <div>
            <h3>{post.author.name}</h3>
            <PostOptions onClick={() => setIsPostModalOpen(!isPostModalOpen)}>
              <HiDotsVertical />
              {isPostModalOpen ? (
                <PostModal
                  post={post}
                  user={user}
                  closePostModal={closePostModal}
                />
              ) : null}
            </PostOptions>
          </div>
          <h5>{post.author.tagline !== "" ? post.author.tagline : "......"}</h5>
        </AuthorTopSection>
      </AuthorDetails>
      <Description>
        <h4>{post.description}</h4>
        <ImageContainer>
          {post.image !== "" ? (
            <img src={post.image} alt="postImg" loading="lazy" />
          ) : null}
        </ImageContainer>
      </Description>
      <PostStats>
        <div>
          <ThumbsUp />
          <h5>{postLikes}</h5>
        </div>
        <h5>
          {post.comments} <span>comments</span>
        </h5>
      </PostStats>
      <hr />
      <PostBottom likeAnimate={likeAnimate}>
        <div className="like" onClick={likeHandler}>
          {postLikeArr.find((id) => {
            return id === user._id;
          }) ? (
            <FaThumbsUp />
          ) : (
            <FaRegThumbsUp />
          )}
        </div>
        <div onClick={commentBoxHandler}>
          <BiCommentDetail />
        </div>
        <div
          onClick={() => {
            navigator.clipboard.writeText(`${host}/posts/${post._id}`);
          }}
        >
          <BiShareAlt />
        </div>
      </PostBottom>
    </>
  ) : null;
};

export default PostContent;
