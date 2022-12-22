import React from "react";
import styled from "styled-components";
import { contractBrokenProps } from "../../types/contractTypes";

const Section = styled.div`
  /* border: 1px solid #fff; */
  margin-top: 2rem;

  h2 {
    margin-bottom: 0.4rem;
    color: rgba(250, 248, 241, 0.9);
    font-size: 1.2rem;
    font-weight: 400;
    
    span{
        color: #faf8f1;
        font-weight: 600;
        font-size: 1.4rem;
        text-decoration: underline;
    }
  }
`;

const BrokerReasons = styled.p`
  padding: 1rem;
  margin-bottom: 1.2rem;
  border-radius: 8px;
  color: rgb(58, 66, 27);
  font-weight: 600;
  width: 95%;
  box-sizing: border-box;
  line-height: 160%;
  background-color: #faf8f1;
`;

interface contratBrokenProps {
  broker: contractBrokenProps
}

const ContractBroker = ({ broker }: contratBrokenProps) => {
  return (
    <Section>
      <h2>This contract was broken by <span>{broker.brokenBy?.name}</span> becz</h2>
      <BrokerReasons>{broker.reason}</BrokerReasons>
      <h2>They claim to have done this much of work</h2>
      <BrokerReasons>{broker.workDoneByBroker}</BrokerReasons>
    </Section>
  );
};

export default ContractBroker;
