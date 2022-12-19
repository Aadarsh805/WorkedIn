export interface commentProps {
  comment: string;
  createdAt: string;
  user: {
    name: string;
    photo: string;
    tagline: string;
    _id: string;
  };
  _id: string;
}
