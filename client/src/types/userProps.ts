import { contractProps } from "./contractTypes";

export interface userProps {
  about?: string;
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
