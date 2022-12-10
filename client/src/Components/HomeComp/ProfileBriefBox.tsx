import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { localStorageUser, userProps } from "../../utils/GlobalContants";

const Section = styled.div`
  /* border: 1px solid red; */
  width: 20vw;
  margin-top: 2rem;
  height: 50vh;
  height: fit-content;
  padding: 1rem 0;
  background-color: #fff;
  background-color: rgba(236, 227, 212, 255);
  border-radius: 12px;
  display: flex;
  flex-direction: column;
  align-items: center;
  -webkit-box-shadow: 6px 6px 0px 3px #3a421b;
  -moz-box-shadow: 6px 6px 0px 3px #3a421b;
  box-shadow: 6px 6px 0px 3px #3a421b;

  img {
    width: 4rem;
    height: 4rem;
    border-radius: 50%;
    /* margin: 1rem auto 0.7rem; */
    margin-bottom: 0.7rem;
    /* border: 1px solid white; */
    -webkit-box-shadow: 0px 0px 5px 3px rgba(0, 0, 0, 0.22);
    -moz-box-shadow: 0px 0px 5px 3px rgba(0, 0, 0, 0.22);
    box-shadow: 0px 0px 5px 3px rgba(0, 0, 0, 0.22);
  }

  h3 {
    font-size: 1.2rem;
    margin-bottom: 0.5rem;
  }
`;

const ContractStats = styled.div`
  /* border: 1px solid #fff; */
  width: 80%;
  margin: 0.5rem auto 0;

  h4 {
    font-size: 0.8rem;
    margin-bottom: 0.4rem;

    span {
      font-size: 1.1rem;
      color: brown;
    }
  }
`;

const ProfileBriefBox = () => {
  const [user, setUser] = useState<userProps>();

  useEffect(() => {
    async function fetchUserData() {
      const data = await JSON.parse(
        localStorage.getItem(localStorageUser) || "{}"
      );
      setUser(data);
    }
    fetchUserData();
  }, []);

  return (
    <Section>
      <img src={user?.photo} alt="" />
      <h3>{user?.name?.split(" ")[0]}</h3>
      <ContractStats>
        <h4>
        <span>🔥 4.3</span> Karma
        </h4>
        <h4>
          <span>🤝🏻 4</span> Successful Contracts
        </h4>
        <h4>
           <span>📜 6</span> Total Contracts
        </h4>
        <h4>
           <span>✨ 100</span> Profile Views
        </h4>
      </ContractStats>
    </Section>
  );
};

export default ProfileBriefBox;
