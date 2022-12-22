export interface messageProps {
    chat: string;
    content: string;
    createdAt: string;
    sender: {
      name: string;
      photo: string;
      _id: string;
    };
    _id: string;
  }