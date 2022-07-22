import { User } from './user.interface';

export interface Call {
  roomNo: string;
  users: User[];
}

export interface CallUser extends User {
  socketId: string;
  stream: MediaStream;
}

export interface PCS {
  [key: string]: RTCPeerConnection;
}
