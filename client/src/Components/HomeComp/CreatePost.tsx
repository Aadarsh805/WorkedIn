import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { localStorageUser, userProps } from "../../Utils/GlobalContants";

const Section = styled.div`
  height: 40vh;
  border: 1px solid red;

  form {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }

  textarea {
    width: 100%;
    height: 25vh;
  }
`;

const Buttons = styled.div`
display: flex;
align-items: center;
justify-content: space-between;
width: 100%;
`

const CreatePost = () => {
  const [userData, setUserData] = useState<userProps>({});
  useEffect(() => {
    async function fetchUserData() {
      const data = await JSON.parse(
        localStorage.getItem(localStorageUser) || "{}"
      );
      // console.log(data);

      setUserData(data);
    }
    fetchUserData();
  }, []);

  const createPostHandler = (e: React.FormEvent<HTMLFormElement>) => {
    alert("created");
    e.preventDefault();
  };

  return (
    <Section>
      <form onSubmit={(e) => createPostHandler(e)}>
        <textarea
          name=""
          id=""
          placeholder={`Create a post ${userData.name?.split(" ")[0]}`}
        />
        <Buttons>
          <input type="file" name="" id="" />
          <button type="submit">Create Post</button>
        </Buttons>
      </form>
    </Section>
  );
};

export default CreatePost;
