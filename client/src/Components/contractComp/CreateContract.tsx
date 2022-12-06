import React, { useState } from 'react'
import styled from 'styled-components'
import { userProps } from '../../utils/GlobalContants'
import ContractModal from './CreateContractModal'

const Section = styled.div`
    
`

const ContractBtn = styled.div`
    cursor: pointer;
`

interface groupMemberProps {
    _id: string;
    name: string;
    photo: string;
  }
  
  interface chatObj {
    chatName?: string;
    contracted?: Boolean;
    chatPhoto?: string;
    createdAt?: string;
    groupAdmin?: {
      _id?: string;
      name?: string;
      photo?: string;
    };
    isGroupChat?: Boolean;
    users?: Array<groupMemberProps>;
    _id?: string;
    contractId?: string;
    contractAprovedBy: Array<string>;
    contractApproved: Boolean
}

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
            contractModal ? <ContractModal selectedChat={selectedChat} user={user} closeContractModal={closeContractModal} /> : null
        }
    </Section>
  )
}

export default CreateContract