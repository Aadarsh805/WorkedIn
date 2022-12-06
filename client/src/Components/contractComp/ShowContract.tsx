import axios from 'axios';
import React, { useEffect } from 'react'
import styled from 'styled-components'
import { BASE_URL, contractEnd, userEnd } from '../../utils/APIRoutes';
import { userProps } from '../../utils/GlobalContants';
import { getHeaders } from '../../utils/helperFunction';

const Section = styled.div`
    position: absolute;
    top: 50%;
    left: 50%;
    width: 70vw;
    height: 80vh;
    background-color: aquamarine;
    transform: translate(-50%, -50%);
    overflow: auto;
`

const Buttons = styled.div`
display: flex;
align-items: center;
justify-content: space-around;
`

interface member {
    name: string;
    _id: string;
    photo: string;
}
  
interface teamMember {
    approved: Boolean;
    denied: Boolean;
    member: member;
    responsibility: string;
    review: number;
    role: string;
}

interface contractProps {
    chatId: string;
    contractName: string;
    createdAt: string;
    dueDate: string;
    lead: member;
    prevDueDates: [];
    projectDescription: string;
    startDate: string;
    status: string;
    team: Array<teamMember>;
    _id: string;
  }

interface contractModalProps {
    contract: contractProps,
    userData: userProps
}

const ShowContract = ({contract, userData}: contractModalProps) => {
    useEffect(() => {
      console.log(contract.contractName);
      
    }, [])
    
    const acceptContractHandler = async () => {
        const { data } = await axios.patch(`${BASE_URL}${contractEnd}${contract._id}/accept`, {
            chatId: contract.chatId
        }, {
            headers: getHeaders(userData.token ?? '')
        })
        console.log(data);
    }

    const denyContractHandler = async () => {
        console.log(userData.token);
        
        const { data } = await axios.patch(`${BASE_URL}${contractEnd}${contract._id}/deny`, {}, {
            headers: getHeaders(userData.token ?? '')
        });

        console.log(data);
        
    }
  return (
    <Section>
        <h1>{contract.contractName}</h1>
        <h4>Created by {contract.lead.name}</h4>
        <p>{contract.projectDescription}</p>
        <h3>My Role :- {contract.team.find(member => member.member._id === userData._id)?.role}</h3>
        <p>My Responibilities :- {contract.team.find(member => member.member._id === userData._id)?.responsibility}</p>
        {
            contract.team.filter(member => {
                if (member.member._id !== userData._id) {
                return member
            } else return null
        }).map(member => {
            return (
                <>
                <h2>{member.member.name}</h2>
                <h3>{member.role}</h3>
                <h4>{member.responsibility}</h4>
                </>
            )
        })
        }
        {
            contract.team.filter(member => {
                if (member.member._id === userData._id) {
                    return member
                } else return null
            })[0].approved ? null :
        <Buttons>
            <button onClick={acceptContractHandler} >Accept Contract</button>
            <button onClick={denyContractHandler} >Deny Contract</button>
        </Buttons>
        }
    </Section>
  )
}

export default ShowContract