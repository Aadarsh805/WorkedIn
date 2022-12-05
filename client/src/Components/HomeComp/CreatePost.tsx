import axios from "axios";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { BASE_URL, postEnd } from "../../utils/APIRoutes";
import { localStorageUser, userProps } from "../../utils/GlobalContants";
import { getHeaders } from "../../utils/helperFunction";

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
`;

const CreatePost = () => {
  const [userData, setUserData] = useState<userProps>({});

  const [description, setDescription] = useState('');
  const [image, setImage] = useState();

  useEffect(() => {
    async function fetchUserData() {
      const data = await JSON.parse(
        localStorage.getItem(localStorageUser) || "{}"
      );
      setUserData(data);
    }
    fetchUserData();
  }, []);

  const createPostHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { data } = await axios.post(`${BASE_URL}${postEnd}`, {
      description,
      image
    }, {
      headers: getHeaders(userData.token ?? '')
    })
    console.log(data);
  };

  const postDetails = (pics: FileList | null) => {
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
          setImage(data.url.toString());
          console.log(data);
          console.log(data.url.toString());
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      console.log('errrrrrorrrr');
      
    }
  }

  return (
    <Section>
      <form onSubmit={(e) => createPostHandler(e)}>
        <textarea
          placeholder={`Create a post ${userData.name?.split(" ")[0]}`}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <Buttons>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => postDetails(e.target.files)}
          />
          <button type="submit">Create Post</button>
        </Buttons>
      </form>
    </Section>
  );
};

export default CreatePost;
