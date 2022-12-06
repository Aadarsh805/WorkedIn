import axios from 'axios';
import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { BASE_URL, chatEnd } from '../../utils/APIRoutes';
import { userProps } from '../../utils/GlobalContants';
import { getHeaders } from '../../utils/helperFunction';

const Section = styled.div`
    
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

interface contractApprovalProps {
    selectedChat: chatObj,
    user: userProps;
}

const ContractApproval = ({selectedChat, user}: contractApprovalProps) => {

    const totalMembers = (selectedChat.users as unknown as any[]).length;
    const membersApproved = selectedChat.contractAprovedBy.length;
    const percentApproval = (membersApproved / totalMembers) * 100;

    const finaliseContractHandler = async () => {
        if (user._id !== selectedChat.groupAdmin?._id) {
            return
        }
        const { data } = await axios.patch(`${BASE_URL}${chatEnd}${selectedChat._id}/finalisecontract`, {}, {
            headers: getHeaders(user.token ?? '')
        })
        console.log(data);   
    }
    

  return (
    <Section>
        {
            user._id === selectedChat.groupAdmin?._id ? 
            <button disabled={percentApproval !== 100} onClick={percentApproval !== 100 ? undefined : finaliseContractHandler} >
                {
                    percentApproval !== 100 ?
                    `${percentApproval}%` : 'Finalise Contract'
                }
            </button>
            : 
             <button disabled>{percentApproval}%</button>
        }
    </Section>
  )
}

export default ContractApproval