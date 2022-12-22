import React, { useState, useEffect } from "react";
import { FiArrowUpRight } from "react-icons/fi";
import ReactImageGallery, { ReactImageGalleryItem } from "react-image-gallery";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { contractProps } from "../../types/contractTypes";
import { userProps } from "../../types/userProps";
import { getReadableTime } from "../../utils/helperFunction";
import ContractBroker from "./ContractBroker";
import TeamMemberCard from "./TeamMemberCard";

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

const MyRole = styled.div`
  /* border: 1px solid red; */
  margin: 1.5rem 0 1.5rem;

  h2 {
    color: #faf8f1;
    font-size: 1.2rem;
    font-weight: 600;
  }
`;

const MyCardContainer = styled.div`
  /* border: 1px solid red; */
  width: 50%;
  margin: 0.5rem auto 0.5rem;
`;

const TeamRoles = styled.div`
  h2 {
    margin-bottom: 1rem;
    color: #faf8f1;
    font-size: 1.2rem;
    font-weight: 600;
  }
`;

const TeamRolesContainer = styled.div`
  display: grid;
  grid-template-columns: auto auto;
`;

const ContractDates = styled.div`
  position: absolute;
  top: -1.3rem;
  right: 0rem;
  font-size: 1rem;
  font-weight: 400;
  color: #faf8f1;

  h2 {
    font-weight: 400;
    font-size: 1rem;

    span {
      text-decoration: underline;
      font-weight: 500;
      font-size: 1.2rem;
      text-transform: uppercase;
    }
  }
`;

const Links = styled.div`
  /* border: 1px solid white; */
  margin-top: 1.7rem;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Link = styled.div`
  /* border: 1px solid #fff; */
  width: 100%;
  overflow: hidden;
  white-space: nowrap;
  display: flex;
  align-items: center;


  &:first-child{
    margin-bottom: 1rem;
  }

  h2 {
    color: #faf8f1;
    font-size: 1.2rem;
    font-weight: 600;
    /* margin-right: 1rem; */
    /* border: 1px solid #fff; */
    width: 17.5%;
  }
  
  div {
    /* border: 1px solid #fff; */
    display: flex;
    align-items: center;

    h4 {
      color: rgba(236, 227, 212, 255);
      font-size: 1rem;
      font-weight: 300;
      line-height: 100%;
      text-decoration: underline;
    }

    svg {
      /* border: 1px solid white; */
      margin-left: 0.6rem;
      width: 1.4rem;
      height: 1.4rem;
      transition: all 0.15s linear;
      cursor: pointer;
    }
  }
`;

const ProjectGallery = styled.div`
  border: 1px solid #fff;
  margin-top: 1.5rem;

  h2 {
    margin-bottom: 0.4rem;
    color: #faf8f1;
    font-size: 1.2rem;
    font-weight: 600;
  }
`;

const GalleryContainer = styled.div`
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

    &:hover {
      stroke: #faf8f1;
    }
  }
`

interface contractBodyProps {
  contract: contractProps;
  userData: userProps;
}

const ContractBody = ({ contract, userData }: contractBodyProps) => {
  const [galleryImages, setGalleryImages] = useState<
    readonly ReactImageGalleryItem[]
  >([]);

  const projectImages = contract.projectImages;

  useEffect(() => {
    projectImages.map((image) => {
      return setGalleryImages([
        ...galleryImages,
        {
          original: image,
          thumbnail: image,
        },
      ]);
    });
  }, [projectImages]);

  const currentUser = contract.team.find(
    (member) => member.member._id === userData._id
  );

  const navigationHandler = (url: string) => {
    window.open(url, '_blank')
  };

  return (
    <>
      <Header>
        <h1>{contract.contractName}</h1>
        <h4>Created by</h4>
        <h3>{contract.lead.name}</h3>
        <ContractDates>
          <div>
            {getReadableTime(contract.startDate.slice(0, 10))} -{" "}
            {getReadableTime(contract.dueDate.slice(0, 10))}
          </div>
          <h2>
            Status:- <span>{contract.status}</span>
          </h2>
        </ContractDates>
      </Header>
      <Description>{contract.projectDescription}</Description>
      {contract.finishContractInitiated ? (
        <>
          <Links>
            <Link>
              <h2>Github Link </h2>
              <div>
                <h4>{contract.githubLink}</h4>
                <div
                  onClick={() => navigationHandler(contract.githubLink)}
                  style={{ color: "rgba(236, 227, 212, 255)" }}
                >
                  <FiArrowUpRight />
                </div>
              </div>
            </Link>
            {contract.liveLink ? (
              <Link>
                <h2>Live Link</h2>
                <div>
                  <h4>{contract.liveLink}</h4>
                  <div
                    onClick={() => navigationHandler(contract.liveLink)}
                    style={{ color: "rgba(236, 227, 212, 255)" }}
                  >
                    <FiArrowUpRight />
                  </div>
                </div>
              </Link>
            ) : null}
          </Links>
          {/* <ProjectGallery>
            <h2>Project Gallery</h2>
            <GalleryContainer>
            <ReactImageGallery items={galleryImages}/>
            </GalleryContainer>
          </ProjectGallery> */}
        </>
      ) : null}
      <MyRole>
        <h2>My Role :- </h2>
        <MyCardContainer>
          <TeamMemberCard currentUser={currentUser!} />
        </MyCardContainer>
      </MyRole>
      <TeamRoles>
        <h2>Team Member's Role :-</h2>
        <TeamRolesContainer>
          {contract.team
            .filter((member) => {
              if (member.member._id !== userData._id) {
                return member;
              } else return null;
            })
            .map((member) => {
              return <TeamMemberCard currentUser={member} />;
            })}
        </TeamRolesContainer>
      </TeamRoles>
      {contract.contractBroken.isBroken ? <ContractBroker broker={contract.contractBroken} /> : null}
    </>
  );
};

export default ContractBody;
