import React, { useRef, useState, useEffect } from "react";
import styled from "styled-components";
import { userProps } from "../../utils/GlobalContants";
import { useOutsideAlerter } from "../../utils/OutsideAlerter";
import ImageGallery, { ReactImageGalleryItem } from "react-image-gallery";
import axios from "axios";
import { BASE_URL, contractEnd } from "../../utils/APIRoutes";
import { getHeaders } from "../../utils/helperFunction";
// @import "~react-image-gallery/styles/css/image-gallery.css";
// import 'react-image-gallery/styles/css'

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
    font-size: 1.6rem;
    font-weight: 500;
    /* margin-bottom: 0.6rem; */
  }

  h2 {
    color: #faf8f1;
    font-size: 1.2rem;
    font-weight: 600;
    margin-bottom: 0.2rem;
  }

  h3 {
    color: rgba(250, 248, 241, 0.8);
    font-size: 1rem;
    font-weight: 500;
    margin-bottom: 1rem;
  }

  textarea {
    padding: 0.7rem 1rem;
    border-radius: 10px;
    outline: none;
    border: none;
    width: 95%;
    height: 8rem;
    margin: 0.2rem 0 1rem;
    font-size: 1rem;
    background: #faf8f1;
    color: rgb(58, 66, 27);
    resize: none;
    box-sizing: border-box;

    &::placeholder {
      font-size: 1rem;
      color: rgb(58, 66, 27);
      font-weight: 500;
    }

    &::-webkit-scrollbar {
      width: 0.3rem;
      &-thumb {
        background-color: rgb(58, 66, 27);
        width: 0.1rem;
        border-radius: 1rem;
      }
    }
  }
`;

const ImageContainer = styled.div`
  border: 1px solid white;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 1.2rem 0 2rem;
`;

const GalleryContainer = styled.div`
  width: 70%;
  border: 1px solid white;

  div {
    border-radius: 10px;
    /* border: 1px solid red; */
  }

  img {
    /* border: 1px solid purple; */
    border-radius: 10px;
  }

  svg {
    /* border: 1px solid purple; */
    stroke: rgba(250, 248, 241, 0.8);
    transition: all 0.15s linear;
    /* stroke: #fff; */

    &:hover {
      /* stroke:rgba(250, 248, 241, 0.8); */
      stroke: #faf8f1;
    }
  }
`;

const Upload = styled.div`
  /* border: 1px solid red; */
  width: 20%;
  margin: 1rem auto;

  div.input-container {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 10px 16px;
    background-color: #735f32;
    border: 2px solid rgba(236, 227, 212, 255);
    /* box-shadow: 3px 3px 0px rgba(236, 227, 212, 255); */
    border-radius: 4px;
    color: white;
    font-weight: 400;
    font-size: 0.8rem;
    box-sizing: border-box;
    cursor: pointer;
    /* translate: -3px -3px; */
    /* transition: all 0.15s ease-in; */
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

const Confirm = styled.div`
  display: flex;
  /* border: 2px solid red; */
  align-items: flex-start;

  input {
    /* border: 2px solid red; */
    margin-right: 1rem;
    margin-top: 0.25rem;
  }

  p {
    /* border: 1px solid red; */
    color: #faf8f1;
    width: 90%;
    font-size: 1rem;
    line-height: 120%;
  }
`;

const UpdateButton = styled.div`
  /* border: 1px solid white; */
  margin-top: 2.5rem;
  display: flex;
  justify-content: flex-end;

  button {
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

    &:last-child {
      margin-left: 2.5rem;
    }
  }
`;

interface breakContractProps {
  closeBreakContractModal: any;
  user: userProps;
  contractId: string;
  chatId: string
}

const BreakContract = ({
  closeBreakContractModal,
  user,
  chatId,
  contractId,
}: breakContractProps) => {
  const [reason, setReason] = useState<string>('');
  const [workDoneByBroker, setWorkDoneByBroker] = useState<string>('');
  const [galleyImages, setGalleyImages] = useState<readonly ReactImageGalleryItem[]>([]);
  const [workProof, setworkProof] = useState<Array<string>>([])
  const [confirmBreak, setConfirmBreak] = useState(false)

  const wrapperRef = useRef<HTMLDivElement | null>(null);
  useOutsideAlerter(wrapperRef, closeBreakContractModal);

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
          setGalleyImages([...galleyImages, {
            original: data.url.toString(),
            thumbnail: data.url.toString()
          }]);
          setworkProof([...workProof, data.url.toString()])
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

  const breakContractHandler = async () => {
    if (!confirmBreak) {
      console.log('Havent confirmed breaking the contract');
      return
    }

    const { data } = await axios.patch(`${BASE_URL}${contractEnd}${contractId}/break`, {
      reason,
      workDoneByBroker,
      workProof,
      chatId
    }, {
      headers: getHeaders(user.token ?? '')
    })
    console.log(data);
    window.location.reload();
  }


  return (
    <Section ref={wrapperRef}>
      <h1>Leave Contract</h1>
      <h3>
        Before breaking the contract we would like to take feedback from you
      </h3>
      <h2>Reason</h2>
      <textarea
        placeholder="Reason why you are breaking this contract"
        autoFocus
        value={reason}
        onChange={(e) => setReason(e.target.value)}
      />
      <h2>Work you completed from your side</h2>
      <textarea
       placeholder="How much did you completed the project from your side"
       value={workDoneByBroker}
       onChange={(e) => setWorkDoneByBroker(e.target.value)}
      />
      <h2>Proof of work you have done so far</h2>
      <ImageContainer>
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
        {
          galleyImages.length !== 0 ?
          <GalleryContainer>
          <ImageGallery items={galleyImages} />
        </GalleryContainer> : null
        }
      </ImageContainer>
      <Confirm>
        <div onClick={() => setConfirmBreak(!confirmBreak)} >
        <input type="radio" checked={confirmBreak} />
        </div>
        <p>
          Are you sure you want to break the contract ?? This will impact your
          profiles as well your other teammates profiles
        </p>
      </Confirm>
      <UpdateButton>
        <button onClick={breakContractHandler}>Yes, Break Contract</button>
        <button onClick={closeBreakContractModal}>No, Go Back</button>
      </UpdateButton>
    </Section>
  );
};

export default BreakContract;

// reason for leaving
// what you expected from the project
// did u got what u expected
// is the behaviour of members good
