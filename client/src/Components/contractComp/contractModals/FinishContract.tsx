import axios from "axios";
import React, { useState, useRef, useEffect } from "react";
import ReactImageGallery, { ReactImageGalleryItem } from "react-image-gallery";
import styled from "styled-components";
import { contractProps } from "../../../types/contractTypes";
import { userProps } from "../../../types/userTypes";
import { BASE_URL, contractEnd } from "../../../utils/apiRoutes";
import { getHeaders, getReadableTime } from "../../../utils/helperFunction";
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

  box-sizing: border-box;
  padding: 2rem 2rem 1.5rem;

  &::-webkit-scrollbar {
    width: 0.25rem;
    &-thumb {
      background-color: #fff;
      width: 0.1rem;
      border-radius: 1rem;
    }
  }

  h2 {
    color: #faf8f1;
    font-size: 1.2rem;
    font-weight: 600;
    margin-bottom: 0.4rem;
  }

  h2.proof{
    margin-bottom: 0;
    /* border: 1px solid red; */
  }

  h4{
    color: rgba(250, 248, 241, 0.8);
    font-size: 0.8rem;
    font-weight: 500;
    
  }
`;

const Header = styled.div`
  /* border: 1px solid red; */
  position: relative;
  h1,
  h3,
  h4 {
    color: #faf8f1;
    display: inline;
  }

  h1 {
    font-weight: 300;
    margin-right: 0.6rem;
    text-transform: capitalize;
    font-size: 2rem;
  }

  h3 {
    font-weight: 300;
    text-decoration: underline;
    font-size: 1.2rem;
  }

  h4 {
    font-weight: 600;
    font-size: 0.9rem;
    margin-right: 0.2rem;
  }
`;

const ContractDates = styled.div`
  position: absolute;
  top: -0.8rem;
  right: 0rem;
  font-size: 1rem;
  font-weight: 400;
  color: #faf8f1;
`;

const Description = styled.p`
  /* border: 1px solid red; */
  /* margin: 0 auto; */
  padding: 1rem;
  border-radius: 8px;
  margin-top: 1rem;
  color: rgb(58, 66, 27);
  font-weight: 600;
  width: 95%;
  box-sizing: border-box;
  line-height: 160%;
  background-color: #faf8f1;
`;

const Links = styled.div`
  /* border: 1px solid white; */
  margin-top: 1rem;
`;
const Link = styled.div`
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

const FinishBtn = styled.div`
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

const ImageContainer = styled.div`
  /* border: 1px solid white; */
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 1.2rem 0 2rem;
`;

const GalleryContainer = styled.div`
  width: 70%;
  /* border: 1px solid white; */

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

interface finishContractProps {
  user: userProps;
  contractId: string;
  closeFinishContractModal: any;
}

const FinishContract = ({
  user,
  contractId,
  closeFinishContractModal,
}: finishContractProps) => {
  const [contract, setContract] = useState<contractProps>();
  const [githubLink, setGithubLink] = useState<string>("");
  const [liveLink, setLiveLink] = useState<string>("");
  const [projectImages, setProjectImages] = useState<Array<string>>([]);
  const [galleyImages, setGalleyImages] = useState<readonly ReactImageGalleryItem[]>([]);

  const wrapperRef = useRef<HTMLDivElement | null>(null);
  useOutsideAlerter(wrapperRef, closeFinishContractModal);

  async function fetchContract() {
    const { data } = await axios.get(`${BASE_URL}${contractEnd}${contractId}`, {
      headers: getHeaders(user.token ?? ""),
    });
    console.log(data);
    const contractData = data.contract;
    setContract(contractData);
  }

  useEffect(() => {
    if (contractId) {
      fetchContract();
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
          setProjectImages([...projectImages, data.url.toString()]);
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

  const initialiseFinishHandler = async () => {
    const { data } = await axios.patch(
      `${BASE_URL}${contractEnd}${contractId}/finish/initialise`,
      {
        githubLink,
        liveLink,
        projectImages,
      },
      {
        headers: getHeaders(user.token ?? ""),
      }
    );
    console.log(data);
    window.location.reload();
  };

  return contract ? (
    <Section ref={wrapperRef}>
      <Header>
        <h1>{contract.contractName}</h1>
        <h4>Created by</h4>
        <h3>{contract.lead.name}</h3>
        <ContractDates>
          {getReadableTime(contract.startDate.slice(0, 10))} -{" "}
          {getReadableTime(contract.dueDate.slice(0, 10))}
        </ContractDates>
      </Header>
      <Description>{contract.projectDescription}</Description>
      <Links>
        <Link>
          <h2>Github Link</h2>
          <input
            type="url"
            placeholder="https://github.com/"
            value={githubLink}
            onChange={(e) => setGithubLink(e.target.value)}
            autoFocus
          />
        </Link>
        <Link>
          <h2>Deployed Version</h2>
          <input
            type="url"
            placeholder="https://example.com/"
            value={liveLink}
            onChange={(e) => setLiveLink(e.target.value)}
          />
        </Link>
      </Links>
      <h2 className="proof">Share proof of work</h2>
      <h4>Upload at least 3 images as a proof of you project work</h4>
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
          <ReactImageGallery items={galleyImages} />
        </GalleryContainer> : null
        }
      </ImageContainer>      
      <FinishBtn>
        <button onClick={initialiseFinishHandler}>Initialise Finish</button>
      </FinishBtn>
    </Section>
  ) : (
    <Section ref={wrapperRef}>Loading..</Section>
  );
};

export default FinishContract;
