import axios from "axios";
import React, { useState, useEffect } from "react";
import { AiOutlineFileText } from "react-icons/ai";
import styled from "styled-components";
import { BASE_URL, contractEnd } from "../../utils/APIRoutes";
import { userProps } from "../../utils/GlobalContants";
import { getHeaders } from "../../utils/helperFunction";

interface reviewContractProps {
  user: userProps;
  contractId?: string;
}

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

const ReviewContract = ({ user, contractId }: reviewContractProps) => {
  const [contract, setContract] = useState<contractProps>();

  async function fetchContract() {
    const { data } = await axios.get(`${BASE_URL}${contractEnd}${contractId}`, {
      headers: getHeaders(user.token ?? ""),
    });
    console.log(data.contract);
    
    const contractData = data.contract;
    setContract(contractData);
  }

  useEffect(() => {
    if (contractId) {
      fetchContract();
    }
  }, []);

  return (
    <div>
      <AiOutlineFileText />
    </div>
  );
};

export default ReviewContract;
