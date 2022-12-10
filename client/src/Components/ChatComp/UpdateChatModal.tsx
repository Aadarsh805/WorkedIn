import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import { useOutsideAlerter } from "../../utils/OutsideAlerter";

const Section = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  width: 50vw;
  min-height: 50vh;
  transform: translate(-50%, -50%);
  padding: 2rem;
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

  h3{
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
    object-fit: contain;
    /* -webkit-box-shadow: 0px 0px 16px 2px rgba(0,0,0,1); */
/* -moz-box-shadow: 0px 0px 16px 2px rgba(0,0,0,1); */
/* box-shadow: 0px 0px 16px 2px rgba(0,0,0,1); */
border: 2px solid rgba(236, 227, 212, 255);;
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
  /* border: 1px solid white; */
  margin-bottom: 1rem;
  width: 50%;
  /* height: 100%; */

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
      color: rgb(58, 66, 27);
    }
  }
`;

const UpdateButton = styled.div`
  /* border: 1px solid white; */
  margin-top: 1.5rem;
  display: flex;
  justify-content: flex-end;
  justify-content: center;
  padding-right: 2rem;

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
  closeUpdateServerModal: any;
}

const UpdateChatModal = ({
  selectedChatId,
  userId,
  selectedChatImage,
  selectedChatName,
  closeUpdateServerModal,
}: updateChatModalProps) => {
  const [newChatName, setNewChatName] = useState(selectedChatName);

  const wrapperRef = useRef<HTMLDivElement | null>(null);
  useOutsideAlerter(wrapperRef, closeUpdateServerModal);

  const updateChatInfoHandler = (e: any) => {
    e.preventDefault();
    alert(newChatName);
    // {{URL}}{{ChatEnd}}/638845f3d4536216311c2785/rename
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
              <img src={selectedChatImage} alt="groupImage" />
            </ImageContainer>
            <Upload>
              {/* <h5>Upload an image of atleast 512 X 512</h5> */}
              <div className="input-container">
                Choose a photo
                <input type="file" name="" id="" />
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
