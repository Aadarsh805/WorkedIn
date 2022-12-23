import axios from "axios";
import { useRef, useState } from "react";
import styled from "styled-components";
import { userProps } from "../../../types/userTypes";
import { BASE_URL, userEnd } from "../../../utils/apiRoutes";
import { getHeaders } from "../../../utils/helperFunction";
import { useOutsideAlerter } from "../../../utils/outsideAlerter";

const Section = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  width: 60vw;
  height: 80vh;
  box-sizing: border-box;
  background-color: #735f32;
  transform: translate(-50%, -53.5%);
  border-radius: 10px;
  overflow-y: auto;
  z-index: 2;
  box-sizing: border-box;
  padding: 2rem 2rem 1.5rem;

  &::-webkit-scrollbar {
    width: 0.4rem;
    &-thumb {
      background-color: #fff;
      width: 0.1rem;
      border-radius: 1rem;
    }
  }

  h1 {
    color: #faf8f1;
    font-size: 1.8rem;
    font-weight: 600;
    margin-bottom: 1.2rem;
  }

  h2 {
    color: #faf8f1;
    font-size: 1.2rem;
    font-weight: 600;
    margin-bottom: 0.2rem;
  }

  textarea {
    padding: 1rem;
    border-radius: 10px;
    outline: none;
    border: none;
    width: 90%;
    box-sizing: border-box;
    height: 5rem;
    /* margin: 0.6rem 0 0rem; */
    font-size: 1rem;
    background-color: #faf8f1;
    color: rgb(58, 66, 27);
    resize: none;

    &::placeholder {
      font-size: 1rem;
      color: rgb(58, 66, 27);
      font-weight: 500;
    }
    
    &::-webkit-scrollbar {
      width: 0.3rem;
      &-thumb {
        background-color:rgb(58, 66, 27);
        width: 0.1rem;
        border-radius: 1rem;
      }
    }
  }
`;

const UpdateProfile = styled.div`
  display: flex;
  margin-bottom: 1.2rem;
  /* border: 1px solid white; */
  `;

const UpdateImage = styled.div`
  /* border: 1px solid white; */
  width: 40%;
  display: flex;
  flex-direction: column;
  align-items: center;
  /* justify-content: center; */

  img {
    width: 8rem;
    height: 8rem;
    border-radius: 50%;
    margin-bottom: 1.25rem;
    object-fit: cover;
  }
`;

const UpdateUserName = styled.div`
  /* border: 1px solid white; */
  width: 60%;
  padding-left: 1rem;
  box-sizing: border-box;
`;

const UpdateSocials = styled.div``;

const UpdateSocial = styled.div`
  /* border: 1px solid white; */
  margin-bottom: 1rem;
  input {
    box-sizing: border-box;
    padding: 0.7rem 1rem;
    border-radius: 10px;
    outline: none;
    border: none;
    font-size: 1rem;
    font-weight: 500;
    width: 90%;
    background: #faf8f1;
    color: rgb(58, 66, 27);

    &::placeholder {
      color: rgb(58, 66, 27);
    }
  }
`;

const UpdateBtn = styled.div`
  margin-top: 2.5rem;
  display: flex;
  align-items: center;
  justify-content: flex-end;

  button {
    border-radius: 4px;
    cursor: pointer;
    padding: 12px 44px;
    background-color: #735f32;
    box-sizing: border-box;
    font-size: 1rem;
    color: #fff;
    font-weight: 400;
    border: 2px solid rgba(236, 227, 212, 255);
    box-shadow: 3px 3px 0px rgba(236, 227, 212, 255);
    translate: -3px -3px;
    transition: all 0.15s ease-in;

    &:hover {
      translate: 0;
      box-shadow: 0 0 0;
    }
  }
`;

const Upload = styled.div`
  /* border: 1px solid red; */
  /* padding-left: 1rem; */
  width: 50%;

  div.input-container {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 10px 16px;
    background-color: #735f32;
    border: 2px solid rgba(236, 227, 212, 255);
    box-shadow: 3px 3px 0px rgba(236, 227, 212, 255);
    border-radius: 4px;
    color: white;
    font-weight: 400;
    font-size: 0.8rem;
    box-sizing: border-box;
    cursor: pointer;
    translate: -3px -3px;
    transition: all 0.15s ease-in;
    position: relative;
    overflow: hidden;

    &:hover {
      translate: 0;
      box-shadow: 0 0 0;
      cursor: pointer;
    }

    input {
      top: 0;
      left: 0;
      position: absolute;
      z-index: 1000;
      opacity: 0;
      cursor: pointer;
      font-size: 24px;
      height: 100%;
    }
  }
`;

interface updateIntroProps {
  user: userProps;
  userToken: string;
  closeUpdateIntroModal: any;
}

const UpdateIntroModal = (props : updateIntroProps) => {

  const { user, userToken, closeUpdateIntroModal } = props

  const [name, setName] = useState(user.name);
  const [tagline, setTagline] = useState(user.tagline !== '' ? user.tagline : '')
  const [photo, setPhoto] = useState(user.photo)
  const [github, setGithub] = useState(user.github !== '' ? user.github : '')
  const [linkedin, setLinkedin] = useState(user.linkedin !== '' ? user.linkedin : '')
  const [discord, setDiscord] = useState(user.discord !== '' ? user.discord : '')
  const [twitter, setTwitter] = useState(user.twitter !== '' ? user.twitter : '')
  const [personalWebsite, setPersonalWebsite] = useState(user.personalWebsite !== '' ? user.personalWebsite : '')

  const wrapperRef = useRef<HTMLDivElement | null>(null);
  useOutsideAlerter(wrapperRef, closeUpdateIntroModal);

  const postImage = (pics: FileList | null) => {
    console.log(pics);
    if (!pics) return;
    const pic = pics[0];
    if (pic.type === "image/jpeg" || pic.type === "image/png") {
      const data = new FormData();
      data.append("file", pic);
      data.append("upload_preset", "chat-app");
      data.append("cloud_name", "dkgrvhkxb");
      fetch("https://api.cloudinary.com/v1_1/dkgrvhkxb/image/upload", {
        method: "post",
        body: data,
      })
        .then((res) => res.json())
        .then((data) => {
          setPhoto(data.url.toString());
          console.log(data);
          console.log(data.url.toString());
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      console.log("errrrrrorrrr");
    }
  };

  const updateProfileHandler = async () => {
    const { data } = await axios.patch(`${BASE_URL}${userEnd}me/profile`, {
      name,
      photo,
      tagline,
      github,
      linkedin,
      discord,
      twitter,
      personalWebsite
    }, {
      headers: getHeaders(userToken)
    })

    console.log(data);
    window.location.reload();
  }

  return (
    <Section ref={wrapperRef}>
      <h1>Update Profile</h1>
      <UpdateProfile>
        <UpdateImage>
          <img src={photo} alt="" />
          <Upload>
            <div className="input-container">
              Choose a photo
              <input type="file" accept="image/*" onChange={(e) => postImage(e.target.files)}/>
            </div>
          </Upload>
        </UpdateImage>
        <UpdateUserName>
          <UpdateSocial>
            <h2>Username</h2>
            <input type="text" autoFocus value={name} placeholder="Your Username" onChange={(e) => setName(e.target.value)} />
          </UpdateSocial>
          <UpdateSocial>
            <h2>Tagline</h2>
            <textarea value={tagline} placeholder="Your Tagline" onChange={(e) => setTagline(e.target.value)} />
          </UpdateSocial>
        </UpdateUserName>
      </UpdateProfile>
      <UpdateSocials>
        <UpdateSocial>
          <h2>Github</h2>
          <input type="url" placeholder="https://github.com/" value={github} onChange={(e) => setGithub(e.target.value)} />
        </UpdateSocial>
        <UpdateSocial>
          <h2>Linkedin</h2>
          <input type="url" placeholder="https://www.linkedin.com/in/" value={linkedin} onChange={(e) => setLinkedin(e.target.value)} />
        </UpdateSocial>
        <UpdateSocial>
          <h2>Discord</h2>
          <input type="url" placeholder="https://discord.com/" value={discord} onChange={(e) => setDiscord(e.target.value)} />
        </UpdateSocial>
        <UpdateSocial>
          <h2>Twitter</h2>
          <input type="url" placeholder="https://twitter.com/" value={twitter} onChange={(e) => setTwitter(e.target.value)} />
        </UpdateSocial>
        <UpdateSocial>
          <h2>Personal Website</h2>
          <input type="url" placeholder="https://example.com/" value={personalWebsite} onChange={(e) => setPersonalWebsite(e.target.value)} />
        </UpdateSocial>
      </UpdateSocials>
      <UpdateBtn>
        <button onClick={updateProfileHandler} >Update Profile</button>
      </UpdateBtn>
    </Section>
  );
};

export default UpdateIntroModal;
