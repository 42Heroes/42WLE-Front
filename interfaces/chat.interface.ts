export interface Chat {
    _id: string;
    createdAt: string;
    updatedAt: string;
    users: User[];
    messages: Message[];
  }
  
  interface User {
    nickname: string;
    image: string;
  }
  
  interface Message {
    user: string;
    type: string;
    content: string;
    createdAt: string;
  }