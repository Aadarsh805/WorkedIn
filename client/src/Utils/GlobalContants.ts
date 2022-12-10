export const localStorageUser = 'workedin-user';

export interface member {
  name: string;
  _id: string;
  photo: string;
}

export interface teamMember {
  approved: Boolean;
  denied: Boolean;
  member: member;
  responsibility: string;
  review: number;
  role: string;
}

export interface contractProps {
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

export interface userProps {
    about?: string
    connections?: Array<string>;
    discord?: string;
    email?: string;
    github?: string;
    linkedin?: string;
    name?: string;
    pastProjects?: Array<contractProps>;
    personalWebsite?: string;
    photo?: string;
    skills?: Array<string>;
    tagline?: string;
    twitter?: string;
    _id?: string;
    token?: string;
}


  export const months = [
    "Jan",
    "Feb",
    "March",
    "April",
    "May",
    "June",
    "July",
    "Aug",
    "Sept",
    "Oct",
    "Nov",
    "Dec",
  ];