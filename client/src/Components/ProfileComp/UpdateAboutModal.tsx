import React, { useRef, useState } from "react";
import styled from "styled-components";
import { useOutsideAlerter } from "../../utils/OutsideAlerter";

const Section = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  width: 60vw;
  height: 75vh;
  box-sizing: border-box;
  background-color: #735f32;
  /* background-color: #faf8f1; */
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
    height: 10rem;
    margin: 0rem 0 0.6rem;
    font-size: 1.1rem;
    background-color: #faf8f1;
    color: rgb(58, 66, 27);
    resize: none;

    &::placeholder {
      font-size: 1.1rem;
      color: rgb(58, 66, 27);
      font-weight: 500;
    }

    &::-webkit-scrollbar {
      width: 0.3rem;
      &-thumb {
        background-color: #faf8f1;
        width: 0.1rem;
        border-radius: 1rem;
      }
    }
  }

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
  margin-top: 2rem;
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

interface updateAboutProps {
  closeUpdateAboutModal: any;
  userAbout: string;
  mail: string
}

const UpdateAboutModal = ({
  closeUpdateAboutModal,
  userAbout,
  mail
}: updateAboutProps) => {
  const wrapperRef = useRef<HTMLDivElement | null>(null);
  useOutsideAlerter(wrapperRef, closeUpdateAboutModal);

  const [updateAbout, setUpdateAbout] = useState(userAbout !== '' ? userAbout : '');
  const [email, setEmail] = useState(mail !== '' ? mail : '');

  return (
    <Section ref={wrapperRef}>
      <h1>Update About</h1>
      <h2>About</h2>
      <textarea
        placeholder="Tell us more about yourself"
        value={updateAbout}
        onChange={(e) => setUpdateAbout(e.target.value)}
      />
      <h2>Email</h2>
      <input type="email" placeholder="workedin@example.com" value={email} onChange={(e) => setEmail(e.target.value)} />
      <UpdateBtn>
        <button>Update About</button>
      </UpdateBtn>
    </Section>
  );
};

export default UpdateAboutModal;
