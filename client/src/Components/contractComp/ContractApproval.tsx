import axios from 'axios';
import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { userProps } from '../../utils/GlobalContants';

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

    const [percentageApproval, setPercentageApproval] = useState(0)

    const totalMembers = (selectedChat.users as unknown as any[]).length;
    const membersApproved = selectedChat.contractAprovedBy.length;
    const percentApproval = (membersApproved / totalMembers) * 100;

    useEffect(() => {
        setPercentageApproval(percentApproval)
    }, [selectedChat]);

    const finaliseContractHandler = async () => {
        // const { data } = await axios.post
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