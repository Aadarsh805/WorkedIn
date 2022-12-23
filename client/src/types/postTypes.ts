export interface postProps {
    author: {
      name: string;
      photo: string;
      tagline: string;
      _id: string;
    };
    description: string;
    image: string;
    comments: number;
    like: Array<string>;
    _id: string;
    createdAt: string;
}