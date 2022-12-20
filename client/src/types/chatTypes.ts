export interface member {
    _id: string;
    name: string;
    photo: string;
  }
  
export interface chatObj {
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
    users?: Array<member>;
    _id?: string;
    contractId?: string;
    contractAprovedBy: Array<string>;
    contractApproved: Boolean;
    contractSuccessful: boolean;
    contractBroken: boolean;
    contractFinishedApprovedBy: Array<string>
  }