export interface Chat {
    _id: string;
    createdAt: Date;
    updatedAt: Date;
    users: User[];
    messages: Message[];
  }
  
  interface User {
    nickname: string;
    image?: string;
  }
  
  interface Message {
    user: string;
    type: string;
    content: string;
    createdAt: Date;
  }