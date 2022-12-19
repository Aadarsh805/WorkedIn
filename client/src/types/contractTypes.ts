export interface member {
  name: string;
  _id: string;
  photo: string;
}

export interface teamMember {
  approved: Boolean;
  denied: Boolean;
  finishedApproved: Boolean;
  member: member;
  responsibility: string;
  review: number;
  role: string;
}

export interface contractProps {
  chatId: string;
  contractBroken: {
    reason: string | null,
    brokenBy: member
  };
  contractName: string;
  createdAt: string;
  dueDate: string;
  finishContractInitiated: boolean;
  githubLink: string;
  lead: member;
  liveLink: string;
  prevDueDates: [];
  projectDescription: string;
  projectImages: Array<string>;
  startDate: string;
  status: string;
  team: Array<teamMember>;
  _id: string;
}