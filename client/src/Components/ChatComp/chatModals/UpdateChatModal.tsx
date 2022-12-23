import axios from "axios";
import { useState, useRef } from "react";
import styled from "styled-components";
import { BASE_URL, chatEnd } from "../../../utils/apiRoutes";
import { getHeaders } from "../../../utils/helperFunction";
import { useOutsideAlerter } from "../../../utils/outsideAlerter";

const Section = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  width: 50vw;
  max-height: 50vh;
  transform: translate(-50%, -50%);
  box-sizing: border-box;
  border-radius: 10px;
  padding: 1.5rem 2rem;
  background-color: #735f32;
  overflow-y: auto;

  h2 {
    color: rgba(236, 227, 212, 255);
    font-size: 2rem;
    margin-bottom: 1.5rem;
    font-weight: 500;
  }

  h3 {
    color: rgba(236, 227, 212, 255);
    font-size: 1rem;
    margin-bottom: 1rem;
    text-transform: uppercase;
    font-weight: 400;
  }
`;

const UpdateChatForm = styled.div`
  width: 100%;
  box-sizing: border-box;
  /* border: 2px solid white; */
  display: flex;

  /* align-items: center; */
  justify-content: center;
`;

const UpdateContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  width: 100%;
  margin: 0 auto;
  /* border: 2px solid white; */
  margin-top: 0.4rem;
`;
// 50vw - 4rem - 5rem (Image) -

const UpdateImage = styled.div`
  /* border: 2px solid purple; */
  width: 50%;
  align-items: center;
  justify-content: space-around;
`;

const ImageContainer = styled.div`
  width: 6rem;
  height: 6rem;
  /* border: 1px solid red; */
  margin-right: 0.5rem;
  /* margin: 0 1.5rem 0 0; */

  img {
    border-radius: 50%;
    width: 100%;
    height: 100%;
    object-fit: cover;
    border: 2px solid rgba(236, 227, 212, 255);
  }
`;

const Upload = styled.div`
  /* border: 1px solid red; */
  padding-left: 1rem;

  h4 {
    font-size: 1rem;
    color: rgba(236, 227, 212, 255);
    margin-bottom: 1rem;
    font-weight: 500;
  }

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

const ServerName = styled.div`
  margin-bottom: 2rem;
  width: 50%;

  input {
    box-sizing: border-box;
    padding: 0.7rem 1rem;
    border-radius: 10px;
    outline: none;
    border: none;
    /* margin-bottom: 0.5rem; */
    font-size: 1rem;
    font-weight: 500;
    width: calc(100% - 2rem);
    background: #faf8f1;
    color: rgb(58, 66, 27);

    &::placeholder {
      color: rgba(58, 66, 27, 0.8);
      /* color: rgba(250, 248, 241, 0.7); */
    }
  }
`;

const UpdateButton = styled.div`
  /* border: 1px solid white; */
  margin-top: 1.5rem;
  display: flex;
  justify-content: flex-end;
  justify-content: center;

  button {
    width: 50%;
    border-radius: 4px;
    cursor: pointer;
    padding: 12px 24px;
    background-color: #735f32;
    box-sizing: border-box;
    font-size: 1rem;
    color: #fff;
    font-weight: 500;
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

interface updateChatModalProps {
  selectedChatId?: string;
  selectedChatImage?: string;
  selectedChatName?: string;
  userId?: string;
  userToken?: string;
  closeUpdateServerModal: any;
}

const UpdateChatModal = ({
  selectedChatId,
  userId,
  userToken,
  selectedChatImage,
  selectedChatName,
  closeUpdateServerModal,
}: updateChatModalProps) => {
  const [newChatName, setNewChatName] = useState<string>("");

  const [newChatImage, setNewChatImage] = useState(selectedChatImage);

  const wrapperRef = useRef<HTMLDivElement | null>(null);
  useOutsideAlerter(wrapperRef, closeUpdateServerModal);

  const updateChatInfoHandler = async (e: any) => {
    const { data } = await axios.patch(
      `${BASE_URL}${chatEnd}${selectedChatId}/rename`,
      {
        chatName: newChatName,
        chatPhoto: newChatImage,
      },
      {
        headers: getHeaders(userToken ?? ""),
      }
    );
    console.log(data);
    window.location.reload();
  };

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
          setNewChatImage(data.url.toString());
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

  return (
    <Section ref={wrapperRef}>
      <h2>Chat Review</h2>
      <UpdateChatForm>
        <ServerName>
          <h3>Chat Name</h3>
          <input
            type="text"
            placeholder="New Chat Name"
            value={newChatName}
            onChange={(e) => setNewChatName(e.target.value)}
          />
        </ServerName>
        <UpdateImage>
          <UpdateContainer>
            <ImageContainer>
              <img src={newChatImage} alt="groupImage" />
            </ImageContainer>
            <Upload>
              <div className="input-container">
                Choose a photo
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => postImage(e.target.files)}
                />
              </div>
            </Upload>
          </UpdateContainer>
        </UpdateImage>
      </UpdateChatForm>
      <UpdateButton>
        <button onClick={updateChatInfoHandler}>Update</button>
      </UpdateButton>
    </Section> 
  );
};

export default UpdateChatModal;
