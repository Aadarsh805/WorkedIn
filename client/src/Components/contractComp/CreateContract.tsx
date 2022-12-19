import React, { useState } from 'react'
import styled from 'styled-components'
import { chatObj } from '../../types/chatTypes'
import { userProps } from '../../types/userProps'
import CreateContractModal from './CreateContractModal'

const Section = styled.div`
    /* border: 1px solid white; */
    margin-top: 0.35rem;
    display: flex;
    align-items: center;
    justify-content: center;
`

const ContractBtn = styled.div`
    width: 90%;
    border-radius: 4px;
    cursor: pointer;
    padding: 12px 0px;
    background-color: #735f32;
    box-sizing: border-box;
    display: flex;
    align-items: center;
    justify-content: center;
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
`

interface contractModalProps {
    selectedChat: chatObj;
    user: userProps;
  }

const CreateContract = ({ selectedChat, user }: contractModalProps) => {
    const [contractModal, setContractModal] = useState(false)

    const closeContractModal = () => {
      setContractModal(false)
    }

  return (
    <Section>
        <ContractBtn onClick={() => setContractModal(!contractModal)} >Create Contract</ContractBtn>
        {
            contractModal ? <CreateContractModal selectedChat={selectedChat} user={user} closeContractModal={closeContractModal} /> : null
        }
    </Section>
  )
}

export default CreateContract