export interface Call {
  roomNo: string;
}

export interface CallUser {
  socketId: string;
  stream: MediaStream;
}

export interface PCS {
  [key: string]: RTCPeerConnection;
}
